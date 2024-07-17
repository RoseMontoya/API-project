'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoUsers = [
  {
    "firstName": "Alistair",
    "lastName": "Theirin",
    "email": "alistair.theirin@greywardens.com",
    "username": "greywardenlover",
    hashedPassword: bcrypt.hashSync("greywarden123")
  },
  {
    "firstName": "Morrigan",
    "lastName": "Flemeth",
    "email": "morrigan.flemeth@wilds.net",
    "username": "WickedWitchofTheWilds",
    hashedPassword: bcrypt.hashSync("darkritual")
  },
  {
    "firstName": "Varric",
    "lastName": "Tethras",
    "email": "varric.tethras@kirkwall.com",
    "username": "VarricTheChronicler",
    hashedPassword: bcrypt.hashSync("bianca987")
  },
  {
    "firstName": "Cassandra",
    "lastName": "Pentaghast",
    "email": "cassandra.pentaghast@inquisition.com",
    "username": "SeekerCassandra",
    hashedPassword: bcrypt.hashSync("righteousness777")
  },
  {
    "firstName": "Dorian",
    "lastName": "Pavus",
    "email": "dorian.pavus@tevinter.imperium",
    "username": "MageOfTevinter",
    hashedPassword: bcrypt.hashSync("magisterial123")
  },
  {
    "firstName": "Leliana",
    "lastName": "Oisine",
    "email": "leliana@spymaster.com",
    "username": "TheNightingale",
    hashedPassword: bcrypt.hashSync("chantrysecrets")
  },
  {
    firstName: "Josephine",
    lastName: "Montilyet",
    email: "josephine.montilyet@inquisition.com",
    username: "AmbassadorJosephine",
    hashedPassword: bcrypt.hashSync("diplomacy123")
  },
  {
    "firstName": "Solas",
    "lastName": "Wolf",
    "email": "theDreadWolf@fade.com",
    "username": "ApostateSolas",
    "hashedPassword": bcrypt.hashSync("fadewalker123")
  },
  {
    "firstName": "Vivienne",
    "lastName": "de Fer",
    "email": "vivienne.defer@example.com",
    "username": "MadameDeFer",
    "hashedPassword": bcrypt.hashSync("imperialenvy999")
  },
  {
    "firstName": "Iron Bull",
    "lastName": "Charger",
    "email": "iron.bull@benhasarath.qun",
    "username": "IronBullQunari",
    "hashedPassword": bcrypt.hashSync("strongestHorns123")
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await User.bulkCreate(demoUsers, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["greywardenlover", "WickedWitchofTheWilds", "VarricT", "SeekerCassandra", "DorianPavus", 'TheNightingale', 'AmbassadorJosephine', 'ApostateSolas', 'MadameDeFer', 'IronBullQunari' ] }
    }, {});
  }
};
