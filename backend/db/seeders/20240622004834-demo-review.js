'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoReviews = [
  {
    "userId": 5,
    "spotId": 4,
    "review": "Damp and dingy",
    "stars": 1,
  },
  {
    "userId": 3,
    "spotId": 4,
    "review": "It's definitely got a mood.",
    "stars": 2,
  },
  {
    "userId": 2,
    "spotId": 2,
    "review": "I recently stayed at the Commander's Quarters in Skyhold. While the room was a bit chilly, the ambiance was undeniably charming and elegant. The breathtaking views of the Frostback Mountains added to the allure. My son particularly enjoyed exploring the gardens, which were well-maintained and serene. The library's extensive collection provided ample entertainment. Overall, it was a delightful experience, though a bit more warmth would make it perfect. Four stars.",
    "stars": 4,
  },
  {
    "userId": 3,
    "spotId": 2,
    "review": "I recently had the pleasure of staying at the Commander's Quarters in Skyhold, and I must say, it exceeded all expectations. Cassandra Pentaghast has created a truly remarkable retreat. The views of the Frostback Mountains are absolutely breathtaking, providing the perfect backdrop for inspiration. The room itself was cozy and elegantly decorated, with a fantastic library that kept me entertained for hours. The private balcony was a great spot for enjoying a drink and some peace. The gardens were a hit as well, offering a tranquil escape. Plus, playing Wicked Grace in the tavern with fellow travelers was an absolute highlight. Five stars all the way!",
    "stars": 5,
  },
  {
    "userId": 3,
    "spotId": 1,
    "review": "Staying at Pavus' Suite in Minrathous was an unforgettable experience. The grandeur of the Imperial Palace, combined with the luxurious decor, made for an exceptional experience. The suite's attention to detail, from the intricate tapestries to the opulent lounge area, was impressive. The view from the private balcony is stunning, offering a breathtaking panorama of Minrathous. The marble bathroom and soaking tub were perfect for unwinding after a day of exploring the city. Say what you will about Minrathous, but there's no denying its beauty, especially from this vantage point. Five stars, and I'd gladly stay again!",
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
  },
  {
    "userId": 7,
    "spotId": 1,
    "review": "My stay in Minrathous was nothing short of splendid. The elegance of the Imperial Palace and the luxurious accommodations made for a truly memorable visit. The suite itself is tastefully decorated, exuding Tevinter opulence, and the private balcony offers breathtaking views of the city. The marble bathroom, complete with a soaking tub, was a delightful and added an extra layer of indulgence. The personalized concierge service ensured every need was met with grace and efficiency. Minrathous is a city of great beauty and history, and this suite perfectly encapsulates its grandeur. Five stars, without hesitation!",
    "stars": 5
  },
  {
    userId: 10,
    spotId: 1,
    review: "Staying at the suite in Minrathous was a unique experience. The Imperial Palace's grandeur is something to behold, and the suite itself didn't disappoint. The decor is rich and luxurious, with a comfortable king-sized bed and an impressive lounge area. The private balcony offered fantastic views of the city, a real highlight. The marble bathroom and soaking tub were perfect for relaxing after a long day. While the opulence was impressive, I found the atmosphere a bit too refined for my taste. Still, it's an excellent spot for those seeking luxury. Four stars.",
    stars: 4
  },
  {
    userId: 2,
    spotId: 3,
    review: "Solas's campsite in the heart of the Emerald Graves is a testament to the ancient wisdom and quiet power of the Dalish. Nestled among towering trees and ensconced in the hushed whispers of nature, it offers a refuge that speaks of forgotten lore and reverence for the wilds. The atmosphere, imbued with an enigmatic tranquility, resonates with echoes of ancient rituals and mystical contemplation. A place where one can glimpse the secrets of the Fade in the rustling leaves and find solace in the embrace of the untouched wilderness.",
    stars: 5
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
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
