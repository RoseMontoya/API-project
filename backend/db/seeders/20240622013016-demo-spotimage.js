'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpotImages = [
  {
    spotId: 4,
    url: "https://i.quotev.com/oq3izkvagcnq.jpg",
    preview: true

  },
  {
    spotId: 4,
    url: "https://static.wikia.nocookie.net/dragonage/images/5/54/Soldier%27s_Peak_Entrance_Hall.png/revision/latest/scale-to-width-down/1000?cb=20131002094537"
  },
  {
    spotId: 2,
    url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7abebfd5-65cb-4a0b-9d30-b5d1f0da43f4/dbkyvwf-1b0e321d-7d80-453d-8eca-cacb6a98b36d.png/v1/fit/w_800,h_450,q_70,strp/skyhold___dragon_age_fanart_by_danihaynes_dbkyvwf-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDUwIiwicGF0aCI6IlwvZlwvN2FiZWJmZDUtNjVjYi00YTBiLTlkMzAtYjVkMWYwZGE0M2Y0XC9kYmt5dndmLTFiMGUzMjFkLTdkODAtNDUzZC04ZWNhLWNhY2I2YTk4YjM2ZC5wbmciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.pczSC0gg6fhnRaEdJo6oH0Q7KixOfuwKEYfdNPZEVxA",
    preview: true
  },
  {
    spotId: 2,
    url: "https://lh3.googleusercontent.com/fife/ALs6j_GqR0w0sjoorZ0dKoWylcKmpoZ4zfH3uO__NslHOZRO17eez1FV66yg8bHJRl6aA1D95KBZM-zUb5TZ50J1LFtr_DjHw3ij_x-osxNchpANdFVLhh0xzgVFkbdkZxkUj1Jvl8wzwQfTWFyJ51ddcs0ZU3zpvkMY5XsAlgNYP_6v1vTs_ZJrvz6yPVUOmJvzlOHKZfux_4Jcn_CSBrFKV-TIY5DMLTI0t8gnVCmU_ioK558jFKQrhRcL-jHiyESAbS4pQONcP7V9gQzHuAhCsFlYewigHQ7ymPFIFYtIsmIOB2a_LPr6AAEBv08mMrtLH-sp9V2Brj2kjLnsQFB5VvM3jYVuZYudw-fjPq-D6X32v9hCn_P6v6AdfLfDpSTEqekPcwusPzX6Dl_mf8UBu0VKVLzpufbBq1jnyGLZmjJ3EbmWMTfqe5iIyCRg_62X6Q-_gY_XaSeRJu6mk1cVd2x7qf2JNtiDfB2A24N7TkdPifhJgi95nXvXFjcbReh9vtSG_fnIkbVWVSEA1ztd0KNV8atC3SRCPEhb_qGBmP9EeFTmiX7uFdit0-oTEHB9LaeDqNtazKCAefOugoGPpbVGbKsaFgAHs1Zfd_O1yOPZIKtOAypnq3F0-pCzyXNFMyAhCWh3USVHHzHA9reUS1vdFhUTghMzwLOXUZCM-92Ps9h9OmdYki6gMVzu8qxkWThittCUNTnQDDZ-qAxDfAYdLuRDhgPwBLzLau1GQ4JVVrrCCyvU7zI5qjUr8uQSd2iVEQm2qCrUARxogP-BrJrZPNXm79nweHSVFiPW07IXH1KfRp3VsR1fnAFgNHOnNP6VHVRp3CH4m3kB3Tg5_BFXJjGLZC-yiaheRYKRJmdx0GZd3QZ3UweZ0YknRInppZ6rUNfBvxQ763Fsslmlmcs28oQ3-hpMhBuEwFpGfNHpVSc_tkV_u56Kffxwn7QydNYTffpXRPRI3KfAQGPEtxDhqGQvTTvO1rQNBkX0yV9sOjR4yOY_Xi8-_U9G8N1wkNJ20Q1q0lwJ30Tv8opkEVpXt1k6h9zi67GdRZIJpr943_nJIls6Xy-gn1Xb16W2d7fBEXdr9HUoZ0vDE3A-nzLSAu1_prgEW9NqsECErqrFlw88PGvfUd2pTE6mdMmDd1NASLMtvrflh9yKw1YLi8ERcI1LCP7DhChB-XOz8jFqJ5qSj2mTiAZSSDYmWPaMTNulm-outMJT8G6CAPhr3xaqqRfyXlViPnG_B6nku0iZwM8ZkIwSa0C4WrDHr8GchTNFFvxNtLU0CuGD2Tfm0m61cOIMtNtR0f_FTLHz9qEWd7aGy2CnvEcjop9M2ss7qEnbfKMpuEbXUidE2Jt1nuwu3BXJQENg6c-z4G_3uT9Bp-e8Q-6i=s512"
  },
  {
    spotId: 2,
    url: 'https://s3.amazonaws.com/prod-media.gameinformer.com/styles/body_default/s3/legacy-galleries/48628/Skyhold_WM_02_0.jpg'
  },
  {
    spotId: 2,
    url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/02/Dragon-Age-Skyhold-yard.jpg'
  },
  {
    spotId: 2,
    url: 'https://s3.amazonaws.com/prod-media.gameinformer.com/styles/body_default/s3/legacy-galleries/48628/Skyhold_WM_03_0.jpg'
  },
  {
    spotId: 3,
    url: "https://i.quotev.com/4k7vejdkxhja.jpg",
    preview: true
  },
  {
    spotId: 3,
    url: "https://starandshadow.wordpress.com/wp-content/uploads/2015/03/emerald-graves.jpg?w=300"
  },
  {
    spotId: 1,
    url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/11/ser.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
    preview: true
  },
  {
    spotId: 1,
    url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/08/dragon_age_dreadwolf_concept_art.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"
  },
  {
    spotId:1,
    url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/02/Dragon-Age-4-Minrathous.png"
  },
  {
    spotId:1,
    url: 'https://assetsio.gnwcdn.com/dragon-age-the-veilguard-04.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'
  },
  {
    spotId:1,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGOqhmtfUQHrcwuQ-3OGHFH7fYRh2jHPoIg&s'
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
