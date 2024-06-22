'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpotImages = [
  {
    spotId: 1,
    url: "https://static.wikia.nocookie.net/dragonage/images/7/70/Peak.jpg/revision/latest?cb=20091210191621",
    preview: true
  },
  {
    spotId: 1,
    url: "https://static.wikia.nocookie.net/dragonage/images/5/54/Soldier%27s_Peak_Entrance_Hall.png/revision/latest/scale-to-width-down/1000?cb=20131002094537"
  },
  {
    spotId: 2,
    url: "https://static.wikia.nocookie.net/dragonage/images/d/d0/Skyhold_Exterior.png/revision/latest/scale-to-width-down/1000?cb=20150718094736",
    preview: true
  },
  {
    spotId: 2,
    url: "https://static.wikia.nocookie.net/dragonage/images/e/ec/Inquisitor%27s_Quarters.png/revision/latest/scale-to-width-down/1000?cb=20150407053457"
  },
  {
    spotId: 3,
    url: "https://static.wikia.nocookie.net/dragonage/images/3/32/Emerald_Graves_Inquisition.jpg/revision/latest/scale-to-width-down/1000?cb=20150107042135",
    preview: true
  },
  {
    spotId: 3,
    url: "https://starandshadow.wordpress.com/wp-content/uploads/2015/03/emerald-graves.jpg?w=300"
  },
  {
    spotId: 4,
    url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/11/ser.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
    preview: true
  },
  {
    spotId: 4,
    url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/08/dragon_age_dreadwolf_concept_art.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"
  },
  {
    spotId: 5,
    url: "https://static.wikia.nocookie.net/dragonage/images/7/7d/Hightown_DA2.png/revision/latest/scale-to-width-down/1000?cb=20140409093317",
    preview: true
  },
  {
    spotId: 5,
    url: "https://static.wikia.nocookie.net/dragonage/images/d/d2/Hightown-02-p.jpg/revision/latest/scale-to-width-down/1000?cb=20190706122746"
  },
  {
    spotId: 6,
    url: "https://static.wikia.nocookie.net/dragonage/images/8/8a/Veilguard_promotional_4.jpg/revision/latest/scale-to-width-down/1000?cb=20240610030625",
    preview: true
  },
  {
    spotId: 6,
    url: "https://static.wikia.nocookie.net/dragonage/images/2/27/Minrathous_Docktown.jpeg/revision/latest/scale-to-width-down/1000?cb=20240611023510"
  },
  {
    spotId: 7,
    url: "https://static.wikia.nocookie.net/dragonage/images/c/c7/Denerim.JPG/revision/latest?cb=20091001003154",
    preview: true
  },
  {
    spotId: 7,
    url: "https://static.wikia.nocookie.net/dragonage/images/a/a8/Denerim1.jpg/revision/latest?cb=20121230023952"
  },
  {
    spotId: 8,
    url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/06/villa-maurel.png?q=50&fit=crop&w=740&dpr=1.5",
    preview: true
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(demoSpotImages, {
      validate: true
    })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
