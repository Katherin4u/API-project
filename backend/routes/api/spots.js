const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize } = require('../../db/models');
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
router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll({
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                },
            ],
        });

        let spotsList = [];

        for (let i = 0; i < spots.length; i++) {
            let spot = spots[i];
            spotsList.push(spot.toJSON())
        };

        for (let i = 0; i < spotsList.length; i++) {
            let spot = spotsList[i];
            for (let i = 0; i < spot.SpotImages.length; i++) {
                let spotImage = spot.SpotImages[i];
                if (spotImage.preview === true) {
                    spot.previewImage = spotImage.url;
                }
            }
            const reviews = spot.Reviews;
            const totalStars =
                reviews.reduce((prev, next) => prev + next.stars, 0) || 0;
            avgRating = reviews.length ? totalStars / reviews.length : 0;
            spot.avgRating = avgRating.toFixed(2);

            delete spot.SpotImages;
            delete spot.Reviews;
        };

        return res.json({
            Spots: spotsList
        })
    }
);

// Get details of spot from a specific id
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId

    let allSpot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'LastName']
            }
        ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "numReviews"],
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
    })

    allSpot = allSpot.toJSON()
    allSpot.Owner = allSpot.User

    delete allSpot.Reviews;
    delete allSpot.User;
    return res.json(allSpot)
})


module.exports = router;