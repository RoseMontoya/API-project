'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpotImages = [
  {
    spotId: 1,
    url: "https://i.quotev.com/oq3izkvagcnq.jpg",
    preview: true

  },
  {
    spotId: 1,
    url: "https://static.wikia.nocookie.net/dragonage/images/5/54/Soldier%27s_Peak_Entrance_Hall.png/revision/latest/scale-to-width-down/1000?cb=20131002094537"
  },
  {
    spotId: 2,
    url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7abebfd5-65cb-4a0b-9d30-b5d1f0da43f4/dbkyvwf-1b0e321d-7d80-453d-8eca-cacb6a98b36d.png/v1/fit/w_800,h_450,q_70,strp/skyhold___dragon_age_fanart_by_danihaynes_dbkyvwf-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvN2FiZWJmZDUtNjVjYi00YTBiLTlkMzAtYjVkMWYwZGE0M2Y0XC9kYmt5dndmLTFiMGUzMjFkLTdkODAtNDUzZC04ZWNhLWNhY2I2YTk4YjM2ZC5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.pczSC0gg6fhnRaEdJo6oH0Q7KixOfuwKEYfdNPZEVxA",
    preview: true
  },
  {
    spotId: 2,
    url: "https://static.wikia.nocookie.net/dragonage/images/e/ec/Inquisitor%27s_Quarters.png/revision/latest/scale-to-width-down/1000?cb=20150407053457"
  },
  {
    spotId: 3,
    url: "https://i.pinimg.com/originals/59/7e/03/597e03eb2488d785c200755dbf6acd0d.jpg",
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
    url: "https://pbs.twimg.com/media/DhEg107UwAAfmqq?format=jpg&name=medium",
    preview: true
  },
  {
    spotId: 5,
    url: "https://static.wikia.nocookie.net/dragonage/images/d/d2/Hightown-02-p.jpg/revision/latest/scale-to-width-down/1000?cb=20190706122746"
  },
  {
    spotId: 6,
    url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/03/dragon_age_tevinter_building_concept_art.jpg",
    preview: true
  },
  {
    spotId: 6,
    url: "https://static.wikia.nocookie.net/dragonage/images/2/27/Minrathous_Docktown.jpeg/revision/latest/scale-to-width-down/1000?cb=20240611023510"
  },
  {
    spotId: 7,
    url: "https://i.quotev.com/xkujl4ggoznq.jpg",
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
