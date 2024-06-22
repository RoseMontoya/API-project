'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpots = [
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
    "ownerId": 4,
    "address": "1300 Skyhold Heights",
    "city": "Skyhold",
    "state": "Frostback Mountains",
    "country": "Thedas",
    "lat": 53.505,
    "lng": -2.217,
    "name": "Inquisitor's Haven",
    "description": "Commander's quarters in Skyhold, offering breathtaking views of the Frostback Mountains",
    "price": 250
  },
  {
    "ownerId": 2,
    "address": "4 Dalish Campsite",
    "city": "Emerald Graves",
    "state": "Ostwick",
    "country": "Thedas",
    "lat": 37.7749,
    "lng": -122.4194,
    "name": "Elven Sanctuary",
    "description": "Secluded campsite nestled in the ancient woods of the Emerald Graves, perfect for nature lovers",
    "price": 120
  },
  {
    "ownerId": 5,
    "address": "6 Magister's Terrace",
    "city": "Minrathous",
    "state": "Tevinter Imperium",
    "country": "Thedas",
    "lat": 39.9042,
    "lng": 116.4074,
    "name": "Imperial Palace Retreat",
    "description": "Elegant suite within the Imperial Palace, offering luxurious amenities and views of Minrathous",
    "price": 600
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
    "ownerId": 2,
    "address": "9 Crestwood Cottage",
    "city": "Crestwood",
    "state": "Ferelden",
    "country": "Thedas",
    "lat": 45.4215,
    "lng": -75.6919,
    "name": "Tranquil Lakeside Retreat",
    "description": "Cozy cottage overlooking the tranquil waters of Lake Calenhad in Crestwood",
    "price": 180
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
