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
    "spotId": 7,
    "review": "I recently stayed at the Commander's Quarters in Skyhold. While the room was a bit chilly, the ambiance was undeniably charming and elegant. The breathtaking views of the Frostback Mountains added to the allure. My son particularly enjoyed exploring the gardens, which were well-maintained and serene. The library's extensive collection provided ample entertainment. Overall, it was a delightful experience, though a bit more warmth would make it perfect. Four stars.",
    "stars": 4,
  },
  {
    "userId": 3,
    "spotId": 7,
    "review": "I recently had the pleasure of staying at the Commander's Quarters in Skyhold, and I must say, it exceeded all expectations. Cassandra Pentaghast has created a truly remarkable retreat. The views of the Frostback Mountains are absolutely breathtaking, providing the perfect backdrop for inspiration. The room itself was cozy and elegantly decorated, with a fantastic library that kept me entertained for hours. The private balcony was a great spot for enjoying a drink and some peace. The gardens were a hit as well, offering a tranquil escape. Plus, playing Wicked Grace in the tavern with fellow travelers was an absolute highlight. Five stars all the way!",
    "stars": 5,
  },
  {
    "userId": 3,
    "spotId": 8,
    "review": "Staying at Pavus' Suite in Minrathous was an unforgettable experience. The grandeur of the Imperial Palace, combined with the luxurious decor, made for an exceptional experience. The suite's attention to detail, from the intricate tapestries to the opulent lounge area, was impressive. The view from the private balcony is stunning, offering a breathtaking panorama of Minrathous. The marble bathroom and soaking tub were perfect for unwinding after a day of exploring the city. Say what you will about Minrathous, but there's no denying its beauty, especially from this vantage point. Five stars, and I'd gladly stay again!",
    "stars": 5,
  },
  {
    "userId": 2,
    "spotId": 3,
    "review": "A respectable library for studying. Plus conventent location to the markets",
    "stars": 5,
  },
  {
    "userId": 5,
    "spotId": 4,
    "review": "Don't know what else I expected in denerim. The south is ever so quaint.",
    "stars": 2,
  },
  {
    "userId": 4,
    "spotId": 5,
    "review": "An amazing get away. So peaceful.",
    "stars": 5,
  },
  {
    "userId": 7,
    "spotId": 8,
    "review": "My stay in Minrathous was nothing short of splendid. The elegance of the Imperial Palace and the luxurious accommodations made for a truly memorable visit. The suite itself is tastefully decorated, exuding Tevinter opulence, and the private balcony offers breathtaking views of the city. The marble bathroom, complete with a soaking tub, was a delightful and added an extra layer of indulgence. The personalized concierge service ensured every need was met with grace and efficiency. Minrathous is a city of great beauty and history, and this suite perfectly encapsulates its grandeur. Five stars, without hesitation!",
    "stars": 5
  },
  {
    userId: 10,
    spotId: 8,
    review: "Staying at the suite in Minrathous was a unique experience. The Imperial Palace's grandeur is something to behold, and the suite itself didn't disappoint. The decor is rich and luxurious, with a comfortable king-sized bed and an impressive lounge area. The private balcony offered fantastic views of the city, a real highlight. The marble bathroom and soaking tub were perfect for relaxing after a long day. While the opulence was impressive, I found the atmosphere a bit too refined for my taste. Still, it's an excellent spot for those seeking luxury. Four stars.",
    stars: 4
  },
  {
    userId: 2,
    spotId: 6,
    review: "Solas's campsite in the heart of the Emerald Graves is a testament to the ancient wisdom and quiet power of the Dalish. Nestled among towering trees and ensconced in the hushed whispers of nature, it offers a refuge that speaks of forgotten lore and reverence for the wilds. The atmosphere, imbued with an enigmatic tranquility, resonates with echoes of ancient rituals and mystical contemplation. A place where one can glimpse the secrets of the Fade in the rustling leaves and find solace in the embrace of the untouched wilderness.",
    stars: 5
  },
  {
    userId: 9,
    spotId: 6,
    review: "I must admit, Solas's campsite in the Emerald Graves was not to my liking. While the natural beauty of the surroundings is undeniable, the accommodations were rather lacking in comfort and refinement. The rustic charm of the Dalish setup failed to impress, and I found the overall experience to be quite underwhelming. Two stars for the effort, but it certainly did not meet my expectations of a proper retreat.",
    stars: 2
  },
  {
    userId: 6,
    spotId: 6,
    review: "Solas's campsite in the Emerald Graves brought back fond memories of my days traveling with the Hero of Ferelden. The serene and secluded setting, amidst ancient trees and whispers of the past, was a perfect retreat. Although I am not a mage, I found there was still much wisdom to be gained from the tranquil environment and the subtle presence of ancient Dalish magic. The camp is beautifully maintained, and the simplicity of it all was a refreshing change from the complexities of court life. Four stars for a nostalgic and enlightening experience.",
    stars: 4
  },
  {
    userId: 7,
    spotId: 5,
    review: "Vivienne's stately lodge in the Emerald Graves is a true gem. The elegant decor and luxurious amenities create a wonderfully comfortable and sophisticated atmosphere, making it an ideal retreat for those seeking to escape the hustle and bustle of city life. Although I did not partake in the hunting excursions, the tranquility of the surroundings provided a perfect backdrop for unwinding by the grand fireplace with a good book. However, I found there wasn't much to do beyond enjoying the serene environment. Despite this, it was a delightful stay, and I highly recommend it for those looking to get away from it all. Four stars for an enchanting and memorable visit.",
    stars: 4
  },
  {
    userId: 1,
    spotId: 5,
    review: "The lodge was quite the experience. I really enjoyed the hunting excursions; they were well-organized and the guides knew their stuff. The surrounding forest was beautiful, and it's a great place to reconnect with nature. The decor, though, was a bit much for my taste. It felt a bit too opulent and fancy for a rustic retreat. However, the lodge is very comfortable and well-maintained. Overall,great spot, especially if you enjoy hunting. Four stars for a splendid and memorable stay.",
    stars: 4
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
