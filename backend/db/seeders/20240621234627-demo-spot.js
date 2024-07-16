'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpots = [
  {
    "ownerId": 5,
    "address": "6 Magister's Terrace",
    "city": "Minrathous",
    "state": "Tevinter Imperium",
    "country": "Thedas",
    "lat": 39.9042,
    "lng": 116.4074,
    "name": "Imperial Palace Retreat",
    "description": "Experience the epitome of luxury at this exquisite AirBnB suite in Minrathous, owned by the esteemed Dorian Pavus. Nestled within the grandeur of the Imperial Palace, this elegant retreat offers guests a taste of Tevinter opulence. The suite features a spacious and beautifully decorated bedroom with a king-sized bed, an opulent lounge area adorned with intricate tapestries, and a private balcony that provides breathtaking views of Minrathous. Guests can indulge in the luxurious amenities, including a lavish marble bathroom with a soaking tub, a fully stocked private bar, and personalized concierge service. Ideal for those seeking a blend of historical charm and modern comforts, this suite promises an unforgettable stay in the heart of Tevinter's capital.",
    "price": 600
  },
  {
    "ownerId": 4,
    "address": "1300 Skyhold Heights",
    "city": "Skyhold",
    "state": "Frostback Mountains",
    "country": "Thedas",
    "lat": 53.505,
    "lng": -2.217,
    "name": "Inquisitor's Haven",
    "description": "Nestled within the majestic fortress of Skyhold, the Commander's Quarters offers a truly unparalleled experience. This luxurious retreat boasts sweeping views of the Frostback Mountains. Guests can enjoy a serene and spacious suite featuring exquisite decor inspired by Orlesian elegance. The quarters include a plush king-sized bed, a cozy reading nook with an extensive library, and a private balcony perfect for savoring the tranquil mountain vistas. Guests will also have access to Skyhold's renowned amenities, including the tavern, gardens, and training grounds. Ideal for adventurers and relaxation seekers alike, the Commander's Quarters promises an unforgettable stay filled with comfort and splen",
    "price": 250
  },
  {
    "ownerId": 8,
    "address": "4 Dalish Campsite",
    "city": "Emerald Graves",
    "state": "Ostwick",
    "country": "Thedas",
    "lat": 37.7749,
    "lng": -122.4194,
    "name": "Elven Sanctuary",
    "description": "Hidden deep within the lush expanse of the Emerald Graves, Solas's secluded campsite offers a serene retreat for those attuned to the natural world. Nestled amidst towering ancient trees and verdant ferns, this Dalish-inspired sanctuary exudes an air of mystique and reverence for the forest's ancient spirits. The campsite, adorned with intricately woven Dalish tapestries and adorned with artifacts of forgotten lore, invites travelers to immerse themselves in the tranquility of the untamed wilderness. Here, under the canopy of whispering leaves and starlit skies, one can find solace and inspiration, away from the bustle of modern life.",
    "price": 120
  },
  {
    "ownerId": 1,
    "address": "1500 Warden's Keep",
    "city": "The Coastlands",
    "state": "Ferelden",
    "country": "Thedas",
    "lat": 42.5301,
    "lng": -76.4663,
    "name": "Warden's Retreat",
    "description": "Historic keep refurbished into a cozy retreat with a great view of the Waking sea. A perfect place to brood and create plans to fight against darkspawn.",
    "price": 150
  },
  {
    "ownerId": 3,
    "address": "7 Hightown Heights",
    "city": "Kirkwall",
    "state": "Free Marches",
    "country": "Thedas",
    "lat": 42.9408,
    "lng": -78.8655,
    "name": "Hightown Penthouse",
    "description": "Luxurious penthouse in the heart of Hightown, offering panoramic views of Kirkwall",
    "price": 400
  },
  {
    "ownerId": 5,
    "address": "8 Aurelian Plaza",
    "city": "Minrathous",
    "state": "Tevinter Imperium",
    "country": "Thedas",
    "lat": 40.7128,
    "lng": -74.006,
    "name": "Aurelian Court Apartment",
    "description": "Stylish apartment in the prestigious Aurelian Plaza, centrally located in Minrathous",
    "price": 450
  },

  {
    "ownerId": 1,
    "address": "10 Denerim Plaza",
    "city": "Denerim",
    "state": "Ferelden",
    "country": "Thedas",
    "lat": 53.3498,
    "lng": -6.2603,
    "name": "Grand Merchant's Residence",
    "description": "Grand residence in the bustling market district of Denerim, close to shops and taverns",
    "price": 300
  },
  {
    "ownerId": 2,
    "address": "11 Emerald Graves Estate",
    "city": "Emerald Graves",
    "state": "Ostwick",
    "country": "Thedas",
    "lat": 45.5017,
    "lng": -73.5673,
    "name": "Nobleman's Hunting Lodge",
    "description": "Stately lodge nestled in the ancient forests of the Emerald Graves, ideal for hunting and relaxation",
    "price": 250
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(demoSpots, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      country: 'Thedas'
    }, {});
  }
};
