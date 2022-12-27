const express = require("express");
const { setTokenCookie, restoreUser, requireAuth, } = require("../../utils/auth");
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize, } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();


// Delete a Spot Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;
    const currUser = req.user.id;
    let spotImage = await SpotImage.findByPk(imageId);
  
    if (!spotImage) {
      res.status(404);
      return res.json({
        message: "Spot Image couldn't be found",
        statusCode: 404,
      });
    }
    let spot = await Spot.findByPk(spotImage.spotId);
    let spotCopy = spot.toJSON();
  
    if (currUser !== spotCopy.ownerId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
    await spotImage.destroy();
    res.status(200);
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  });

module.exports = router;