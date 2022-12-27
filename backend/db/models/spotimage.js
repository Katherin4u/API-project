'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static getCurrentUserById(id) {
      return SpotImage.scope('currentUser').findByPk(id);
    }
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {foreignKey: 'spotId'});
    }
  }
  SpotImage.init({
    spotId:  {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url:  {
      type: DataTypes.TEXT,
      allowNull: false
    },
    preview:  {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
    scope: {
      currentUser: {
        attributes: {exclude: ['spotId', 'createdAt', 'updatedAt']}
      }
    }
  });
  return SpotImage;
};