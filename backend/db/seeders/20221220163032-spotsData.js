'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA; //define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

const spotsDemos = [
  {
    ownerId: 1,
    address: '123 lane',
    city: 'Albany',
    state: 'New York',
    country: 'USA',
    lat: 42.6526,
    lng: 73.7562,
    name: 'john green',
    description: 'great place',
    price: 150.55
  },
  {
    ownerId: 2,
    address: '456 lane',
    city: 'virginia beach',
    state: 'virginia',
    country: 'USA',
    lat: 42.6526,
    lng: 73.7562,
    name: 'jessica long',
    description: 'nice place',
    price: 200.55
  },
  {
    ownerId: 3,
    address: '789 lane',
    city: 'Atlanta',
    state: 'georgia',
    country: 'USA',
    lat: 36.8516,
    lng: 75.9792,
    name: 'jose solis',
    description: 'awesome place',
    price: 120.55
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
    options.tableName = "Spots"
    return queryInterface.bulkInsert(options,spotsDemos)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      ownerId: {[Op.in]: spotsDemos}
    })
  }
};
