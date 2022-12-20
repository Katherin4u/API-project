'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA; //define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */

const reviewsDemo = [
  {
    spotId: 1,
    userId:1,
    review:'Great view',
    stars: 4.5
  },
  {
    spotId: 2,
    userId:2,
    review:'very nice home',
    stars: 5.0
  },
  {
    spotId: 3,
    userId:3,
    review:'it was awful',
    stars: 2.5
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = "Reviews";
   return queryInterface.bulkInsert(options, reviewsDemo);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      spotId:{[Op.in]: reviewsDemo}
    })
  }
};
