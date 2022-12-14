'use strict';
const {
  Model
} = require('sequelize');
const review = require('./review');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async createSpot({ownerId, address, city, state, country, lat, lng, name, description, price}){
      const owner = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });
      return await Spot.findByPk(owner.id)
    }
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'});
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'})
      Spot.hasMany(models.Review, {foreignKey: 'spotId'});
      Spot.hasMany(models.Booking, {foreignKey:'spotId'})

    }
  }
  Spot.init({
    ownerId: {
     type:DataTypes.INTEGER,
     allowNull: false
    },
    address:{
      type:DataTypes.TEXT,
      allowNull: false
     },
    city: {
      type:DataTypes.TEXT,
      allowNull: false
     },
    state: {
      type:DataTypes.TEXT,
      allowNull: false
     },
    country: {
      type:DataTypes.TEXT,
      allowNull: false
     },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull: false
     },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull: false
     },
    name:{
      type:DataTypes.TEXT,
      allowNull: false
     },
    description: {
      type:DataTypes.TEXT,
      allowNull: false
     },
    price: {
      type:DataTypes.DECIMAL,
      allowNull: false
     },
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['owner']
      }
    }
  });
  return Spot;
};