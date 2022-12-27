const express = require("express");
const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { User, Spot, SpotImage, Review, ReviewImage, Booking, } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const currUserId = req.user.id;
    
        const reviewImage = await ReviewImage.findOne({
            where: { id: imageId },
            include: [{ model: Review, where: { userId: currUserId } }],
        });
        if (!reviewImage) {
            return res.status(404).json({
                message: "Review image not found",
                statusCode: 404,
            });
        }
        await reviewImage.destroy();
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200,
        });
});


module.exports = router;