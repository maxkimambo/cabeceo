module.exports = {}; 



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
