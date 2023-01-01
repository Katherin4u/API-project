const express = require('express')
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { getAttributes } = require('sequelize/lib/model');
const user = require('../../db/models/user');
const router = express.Router();

const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const reviewValidation = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true })
        .custom((value, { req }) => !isNaN(value) && value >= 1 && value <= 5)
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check("city").exists({ checkFalsy: true }).withMessage("City is required"),
    check("state").exists({ checkFalsy: true }).withMessage("State is required"),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check("lat").isNumeric().withMessage("Latitude is not valid"),
    check("lng").isNumeric().withMessage("Longitude is not valid"),
    check("name")
        // .isLength({ max: 50 })
        .notEmpty()
        .withMessage("Name is required"),
    check("name")
        .isLength({ max: 50 })
        // .notEmpty()
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .not()
        // .isInt({ min: 1 })
        // .isNumeric()
        .withMessage("Price per day is required"),
    handleValidationErrors,
]

const allSpotValidation = [
    check("page")
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("Page must be greater than or equal to 1"),
    check("size")
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("Size must be greater than or equal to 1"),
    check("minLat")
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Minimum latitude is invalid"),
    check("maxLat")
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Maximum latitude is invalid"'),
    check("minLng")
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Minimum longitude is invalid"),
    check("maxLng")
        .optional()
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Maximum longitude is invalid"),
    check("minPrice")
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check("maxPrice")
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors,
];

//creating a spot
router.post(
    '/',
    validateCreateSpot,
    requireAuth,
    async (req, res) => {
        const ownerId = req.user.id
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const owner = await Spot.createSpot({ ownerId, address, city, state, country, lat, lng, name, description, price })

        return res.json(
            owner
        )
    }
);


//getting all spots
router.get("/", allSpotValidation, async (req, res, next) => {
    const { page, size } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedSize = parseInt(size) || 20;
    const limit = parsedSize > 20 ? 20 : parsedSize;
    const offset = parsedSize > 20 ? limit * (parsedPage - 1) : 0;

    const allSpots = await Spot.findAll({
        include: [{ model: SpotImage }, { model: Review }],
        limit,
        offset,
    });

    const spotList = allSpots.map((spot) => spot.toJSON());

    const formattedSpotList = spotList.map((spot) => {
        const { SpotImages, Reviews, ...rest } = spot;
        const previewImage = SpotImages.find((image) => image.preview)?.url;
        const totalStars = Reviews.reduce((prev, next) => prev + next.stars, 0);
        const avgRating = Reviews.length ? totalStars / Reviews.length : 0;

        return {
            ...rest,
            previewImage,
            avgRating: avgRating.toFixed(2),
        };
    });

    res.json({ Spots: formattedSpotList, page: parsedPage, size: parsedSize });
});


// get all spots owned by the current User
router.get("/current", requireAuth, async (req, res, next) => {
    const currentUserSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        include: [
            { model: Review, attributes: [] },
            { model: SpotImage, attributes: [] },
        ],
        attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
            [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
            [sequelize.col("SpotImages.url"), "previewImage"],
        ],
        group: ["Reviews.stars", "SpotImages.url", "Spot.id"],
    });
    return res.json({ Spots: currentUserSpots });
});


// Get details of spot from a specific id
router.get('/:spotId', async (req, res, next) => {
    const specificSpot = await Spot.findOne({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User
            },
        ],
        where: {
            id: req.params.spotId
        },

    })

    if (!specificSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }


    detailedSpot = specificSpot.toJSON();
    const review = detailedSpot.Reviews;
    const numReview = review.length;
    const avgStarRating = review.reduce((previous, next) => previous + next.stars, 0) / numReview;

    detailedSpot.Owner = detailedSpot['User']

    delete detailedSpot.Reviews;
    delete detailedSpot.User;
    detailedSpot['numReview'] = numReview;
    detailedSpot['avgStarRating'] = avgStarRating;
    return res.json(detailedSpot)
});






//creating and returning a new review for a spot specified by id
router.post("/:spotId/reviews",
    requireAuth,
    reviewValidation,
    async (req, res, next) => {
        const userId = req.user.id;
        const spotId = req.params.spotId;
        const { review, stars } = req.body;

        const specificSpot = await Spot.findByPk(spotId, {
            include: {
                model: Review
            }
        })


        if (!specificSpot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404,
            });
        }
        const spot = specificSpot.toJSON();


        let reviewExists = false;
        spot.Reviews.forEach((review) => {
            if (review.userId === userId) {
                reviewExists = true;
                return;
            }
        });


        if (reviewExists) {
            return res.status(403).json({
                message: "User already has a review for this spot",
                statusCode: 403,
            });
        }
        const spotReview = await Review.create({
            userId,
            spotId: +spotId,
            review,
            stars,
        });
        res.status(201);
        return res.json(spotReview)
    }
);


//returns all the reviews that belong to a spot specified by id
router.get("/:spotId/reviews", async (req, res, next) => {
    const spotId = req.params.spotId;

    // Find the spot with the matching ID
    const spot = await Spot.findByPk(spotId);
    if (!spot) return res.status(404).json({ message: "Spot not found", statusCode: 404 });

    // Find all reviews for the spot
    const reviews = await Review.findAll({
        where: { spotId },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ["username", "hashedPassword", "email", "createdAt", "updatedAt"],
                },
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ["reviewId", "createdAt", "updatedAt"],
                },
            },
        ],
    });

    // Return the reviews in the response
    return res.json({ Reviews: reviews });
});

// create and return a new image for a spot specified by id
router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Not authorized",
            statusCode: 403,
        });
    }
    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview,
    });
    return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview,
    });
});

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    try {
        const spotId = req.params.spotId;
        const userId = req.user.id;
        const { startDate, endDate } = req.body;
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404,
            });
        }
        if (spot.ownerId === req.user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403,
            });
        }
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate",
                },
            });
        }
        const existingBookings = await Booking.findAll({
            where: {
                spotId,
                [Op.or]: [
                    {
                        startDate: {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    {
                        endDate: {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                ],
            },
        });
        if (existingBookings.length > 0) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking",
                },
            });
        }
        const newBooking = await Booking.create({
            spotId: spot.id,
            userId,
            startDate,
            endDate,
        });
        return res.json(newBooking);
    } catch (error) {
        next(error);
    }
});

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    // Find the spot with the matching ID
    const spot = await Spot.findByPk(spotId);
    if (!spot) return res.status(404).json({ message: "Spot not found", statusCode: 404 });

    // Find all bookings for the spot
    const bookings = await Booking.findAll({
        where: { spotId },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ["username", "hashedPassword", "email", "createdAt", "updatedAt"],
                },
            },
        ],
    });

    // Filter the bookings based on the user's ID
    const filteredBookings = bookings.map((booking) => {
        const data = booking.toJSON();
        if (data.userId !== userId) {
            delete data.id;
            delete data.userId;
            delete data.createdAt;
            delete data.updatedAt;
            delete data.User;
        }
        return data;
    });

    // Return the filtered bookings in the response
    return res.status(200).json({ Bookings: filteredBookings });
});

//Edit spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spotId = req.params.spotId;

    // Find the spot with the matching ID
    const spot = await Spot.findByPk(spotId);
    if (!spot) return res.status(404).json({ message: "Spot not found", statusCode: 404 });

    // Check if the current user is the owner of the spot
    if (spot.ownerId !== req.user.id) return res.status(403).json({ message: "Not authorized", statusCode: 403 });

    // Update the spot with the new data
    const updatedSpot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    });

    // Return the updated spot in the response
    return res.status(200).json(updatedSpot);
});

//Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    if (spot.ownerId !== userId) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403,
        });
    }
    await spot.destroy();
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
    });
});


module.exports = router;