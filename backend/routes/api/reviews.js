const express = require("express");
const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize, } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const router = express.Router();


const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true })
        .isNumeric({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
];


// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: { userId },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            {
                model: Spot,
                include: [
                    {
                        model: SpotImage,
                    },
                ],
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"],
                },
                group: ["SpotImages.id"],
            },
            { model: ReviewImage, attributes: ["id", "url"] },
        ],
    });

    const reviewList = reviews.map((review) => review.toJSON());

    for (const review of reviewList) {
        const spotImages = review.Spot.SpotImages;
        delete review.Spot.SpotImages;

        for (const spotImage of spotImages) {
            if (spotImage.preview) {
                review.Spot.previewImage = spotImage.url;
                break;
            }
        }
    }

    res.status(200);
    return res.json({ Reviews: reviewList });

});

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {

    const { url } = req.body;
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.status(404).json({
            message: "Review not found",
            statusCode: 404,
        });
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403,
        });
    }

    const count = await ReviewImage.count({ where: { reviewId } });
    if (count >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403,
        });
    }

    const reviewImage = await ReviewImage.create({
        reviewId,
        url,
    });

    return res.json({ id: reviewImage.id, url: reviewImage.url });

});

// Edit a Review
router.put(
    "/:reviewId",
    requireAuth,
    validateReview,
    async (req, res, next) => {
        const reviewId = req.params.reviewId;
        const { review, stars } = req.body;

        const reviewToUpdate = await Review.findByPk(reviewId);
        if (!reviewToUpdate) {
            return res.status(404).json({
                message: "Review not found",
                statusCode: 404,
            });
        }

        if (reviewToUpdate.userId !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403,
            });
        }

        await reviewToUpdate.update({ review, stars });
        return res.json(reviewToUpdate);

    }
);


// Delete a Review
router.delete("/:reviewId", requireAuth, async (req, res, next) => {

    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.status(404).json({
            message: "Review not found",
            statusCode: 404,
        });
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403,
        });
    }

    await review.destroy();
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
    });

});
















module.exports = router;