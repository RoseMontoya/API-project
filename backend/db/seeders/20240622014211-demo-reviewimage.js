'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


const demoReviewImages = [
  {
    reviewId: 1,
    url: "https://static.wikia.nocookie.net/dragonage/images/1/11/Soldier%27s_Peak_Warden-Commander%27s_Office.png/revision/latest?cb=20131002094005"
  },
  {
    reviewId: 2,
    url: "https://static.wikia.nocookie.net/dragonage/images/b/b5/Soldier%27s_Peak_Tower_interior.png/revision/latest/scale-to-width-down/1000?cb=20131002093750"
  },
  {
    reviewId: 3,
    url: "https://static.wikia.nocookie.net/dragonage/images/d/d4/Skyhold_Courtyard.png/revision/latest/scale-to-width-down/1000?cb=20210620193724"
  },
  {
    reviewId: 3,
    url: "https://static.wikia.nocookie.net/dragonage/images/7/7b/Skyhold_Garden.png/revision/latest/scale-to-width-down/1000?cb=20150407053457"
  },
  {
    reviewId: 4,
    url: "https://static.wikia.nocookie.net/dragonage/images/d/d0/Skyhold_Exterior.png/revision/latest/scale-to-width-down/1000?cb=20150718094736"
  },
  {
    reviewId: 5,
    url: "https://i.postimg.cc/8z06Wv5W/Dragon-Age-The-World-of-Thedas-v1-078.jpg"
  },
  {
    reviewId: 6,
    url: "https://static.wixstatic.com/media/c99ec0_43c957cefc1148b083c93428abf6f9ce~mv2.png/v1/fill/w_980,h_420,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/c99ec0_43c957cefc1148b083c93428abf6f9ce~mv2.png"
  },
  {
    reviewId: 7,
    url: "https://static.wikia.nocookie.net/dragonage/images/1/18/Denerim2.jpg/revision/latest/scale-to-width-down/1000?cb=20121230024100"
  },
  {
    reviewId: 8,
    url: "https://i.ytimg.com/vi/BTpk9goBKhI/maxresdefault.jpg"
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(demoReviewImages, {
      validate: true
    })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
