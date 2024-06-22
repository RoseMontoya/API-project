'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoReviews = [
  {
    "userId": 5,
    "spotId": 1,
    "review": "Damp and dingy",
    "stars": 1,
  },
  {
    "userId": 3,
    "spotId": 1,
    "review": "It's definitely got a mood.",
    "stars": 2,
  },
  {
    "userId": 2,
    "spotId": 2,
    "review": "A bit cold, but overall acceptable. My son loved the gardens.",
    "stars": 4,
  },
  {
    "userId": 3,
    "spotId": 2,
    "review": "This was an awesome spot!",
    "stars": 5,
  },
  {
    "userId": 3,
    "spotId": 4,
    "review": "Say what you will about Minrathous, but there's no denying it's beauty",
    "stars": 5,
  },
  {
    "userId": 2,
    "spotId": 6,
    "review": "A respectable library for studying. Plus conventent location to the markets",
    "stars": 5,
  },
  {
    "userId": 5,
    "spotId": 7,
    "review": "Don't know what else I expected in denerim. The south is ever so quaint.",
    "stars": 2,
  },
  {
    "userId": 4,
    "spotId": 8,
    "review": "An amazing get away. So peaceful.",
    "stars": 5,
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(demoReviews, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
