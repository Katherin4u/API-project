const express = require("express");
const { Op } = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { User, Spot, SpotImage, Review, ReviewImage, Booking, } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();


// Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res, next) => {
  // Find all bookings for the current user
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
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
        group: ["SpotImage.id"],
      },
    ],
  });

  // Convert the bookings to JSON format
  const bookingList = bookings.map((booking) => booking.toJSON());

  // Iterate through the bookings and add the preview image to each booking
  bookingList.forEach((booking) => {
    // Get the SpotImages for the current booking
    const spotImages = booking.Spot.SpotImages;

    // Delete the SpotImages because they are not needed
    delete booking.Spot.SpotImages;

    // Find the image with preview set to true and add it to the booking
    const previewImage = spotImages.find((spotImage) => spotImage.preview);
    if (previewImage) {
      booking.Spot.previewImage = previewImage.url;
    }
  });

  // Return the bookings in the response
  res.status(200);
  return res.json({ Bookings: bookingList });
});


// Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found",
      statusCode: 404,
    });
  }

  if (booking.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "End date cannot come before start date",
      },
    });
  }

  if (new Date() > new Date(booking.endDate)) {
    return res.status(403).json({
      message: "Past bookings cannot be modified",
      statusCode: 403,
    });
  }

  const overlappingBookings = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      startDate: { [Op.lte]: new Date(endDate) },
      endDate: { [Op.gte]: new Date(startDate) },
    },
  });

  if (overlappingBookings.length > 0) {
    return res.status(403).json({
      message: "Specified dates conflict with an existing booking",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  booking.startDate = startDate;
  booking.endDate = endDate;
  await booking.save();

  return res.json(booking);
});

// Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({
      message: "Booking not found",
      statusCode: 404,
    });
  }
  if (booking.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
 
    await booking.destroy();
    return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
 
});

module.exports = router;