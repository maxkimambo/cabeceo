/* global module */
'use strict';

var Chance = require('chance');
var chance = new Chance();
var User = require('../api/user/user.model');
var log = require('./../components/logger');

var dances = [
  {name: 'Salsa', proficiency: chance.integer({min:0, max:10})},
  {name: 'Bachata', proficiency: chance.integer({min:0, max:10})},
  {name: 'Kizomba', proficiency: chance.integer({min:0, max:10})},
  {name: 'Tango', proficiency: chance.integer({min:0, max:10})},
  {name: 'Merengue', proficiency: chance.integer({min:0, max:10})},
  {name: 'Ballet', proficiency: chance.integer({min:0, max:10})},
  {name: 'Hiphop', proficiency: chance.integer({min:0, max:10})},
  {name: 'Afrobeat', proficiency: chance.integer({min:0, max:10})},
];
var membershipTypes = ['basic', 'premium', 'school', 'promoter'];
var languages = ['English', 'German', 'French', 'Spanish', 'Italian', 'Bulgarian'];


function generateUserData(){

  // return {
  //        provider: 'local',
  //        firstName: chance.first(),
  //        lastName: chance.last(),
  //        name:  chance.first() + ' '+ chance.last(),
  //        gender: chance.gender(),
  //        score: chance.integer({min: 10, max:1000}),
  //        Newsletter: chance.bool(),
  //        optInDate: chance.date(),
  //        dateOfBirth: chance.birthday(),
  //        height: chance.integer({min: 150, max:220}),
  //        mobile: chance.phone({country: "fr", mobile: true}),
  //        address: chance.address(),
  //        dances: chance.pickset(dances, 3),
  //        bioText: chance.sentence(),
  //        photos: ['photo1.jpg', 'photo2.jpg'],
  //        membershipType: chance.pick(membershipTypes),
  //        userSince: chance.date(),
  //        lastLogin: chance.date(),
  //        email: chance.email(),
  //        password: chance.word()
  // };
  return User.create({
    provider: 'local',
         firstName: chance.first(),
         lastName: chance.last(),
         name:  chance.first() + ' '+ chance.last(),
         gender: chance.gender(),
         score: chance.integer({min: 10, max:1000}),
         Newsletter: chance.bool(),
         optInDate: chance.date(),
         dateOfBirth: chance.birthday(),
         height: chance.integer({min: 150, max:220}),
         mobile: chance.phone({country: "de", mobile: true}),
         address: {
           street: chance.word(),
           house: chance.integer({min:1, max:200}),
           plz : chance.integer({min:10000, max:80000}),
           city: chance.city(),
           country: chance.country({full: true})
         },
         languages: chance.pickset(languages, 2),
         dances: chance.pickset(dances, 3),
         matchDances: chance.pickset(dances, 3),
         bioText: chance.sentence(),
         photos: ['photo1.jpg', 'photo2.jpg'],
         membershipType: chance.pick(membershipTypes),
         userSince: chance.date(),
         lastLogin: chance.date(),
         email: chance.email(),
         password: chance.word()
  });

}


function seed(records){
  for(let i=0; i<= records; i++){
      generateUserData().then(u =>{
        console.log('user inserted'); 
      });
  }

}
module.exports = seed;



// /**
//  * Populate DB with sample data on server start
//  * to disable, edit config/environment/index.js, and set `seedDB: false`
//  */
//
// 'use strict';
// let User from '../api/user/user.model';
//
// // find all remove and recreate
// User.find({}).remove()
//   .then(() => {
//     User.create({
//       provider: 'local',
//       name: 'test',
//       firstName: 'Joe',
//       lastName: 'Doe',
//       email: 'test@example.com',
//       score: 100,
//       password: 'test'
//     }, {
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       firstName: 'Admin',
//       lastName: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin'
//     }, {
//
//       provider: 'local',
//       firstName: 'Jane',
//       lastName: 'Doe',
//       name: 'Fake User',
//       gender: 'Female',
//       score: 10,
//       Newsletter: true,
//       optInDate: Date.now(),
//       dateOfBirth: Date('2000-01-01'),
//       height: 170,
//       mobile: '111222333444',
//       address: {
//         street: 'Some street',
//         house: '1',
//         plz: '10367',
//         city: 'Berlin',
//         country: 'Deutschland'
//       },
//       dances: [{name: 'Salsa', proficiency: 7}, {name: 'Bachata', proficiency:2}],
//       bioText: 'Hi i am Jane and I love to dance',
//       photos: ['photo1.jpg', 'photo2.jpg'],
//       membershipType: 'basic',
//       userSince: Date('2010-01-01'),
//       lastLogin: Date('2010-01-01'),
//       email: 'test@example.com',
//       password: 'password'
//     })
//     .then(() => {
//       console.log('finished populating users');
//     });
//   });
