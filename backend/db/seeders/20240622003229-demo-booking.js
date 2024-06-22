'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoBookings = [
  {
    "spotId": 1,
    "userId": 4,
    "startDate": "2024-7-19",
    "endDate": "2024-7-25",
  },
  {
    "spotId": 2,
    "userId": 2,
    "startDate": "2024-10-10",
    "endDate": "2024-12-29",
  },
  {
    "spotId": 5,
    "userId": 5,
    "startDate": "2024-11-11",
    "endDate": "2024-11-18",
  },
  {
    "spotId": 6,
    "userId": 3,
    "startDate": "2024-8-9",
    "endDate": "2024-8-27",
  },
  {
    "spotId": 5,
    "userId": 1,
    "startDate": "2024-10-31",
    "endDate": "2024-11-14",
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate(demoBookings, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
