'use strict';

const { query } = require('express');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; //define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
const reviewImagesDemo = [
  {
    reviewId: 1,
    url: 'https://a0.muscache.com/im/pictures/ec242181-817a-4cca-88f7-97c79e44196e.jpg?im_w=720',
  },
  {
    reviewId: 2,
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-595032592216838940/original/abb87538-212e-4615-8218-b53c842c4a90.jpeg?im_w=720',
  },
  {
    reviewId: 3,
    url: 'https://a0.muscache.com/im/pictures/23be904d-ba59-4814-91b5-b23f82481421.jpg?im_w=720',
  }
]
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, reviewImagesDemo);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: reviewImagesDemo }
    })
  }
};
