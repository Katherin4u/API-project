'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA; //define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */

const bookingsDemo = [
  {
    spotId: 1,
    userId:1,
    startDate: "2-24-2023",
    endDate:"3-07-2023"
  },
  {
    spotId: 2,
    userId:2,
    startDate: "3-04-2023",
    endDate: "3-15-2023"
  },
  {
    spotId: 3,
    userId:2,
    startDate: "5-10-2023",
    endDate: "5-17-2023"
  }
];
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
    options.tableName = "Bookings"
    return queryInterface.bulkInsert(options,bookingsDemo)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      spotId: {[Op.in]: bookingsDemo}
    })
  }
};
