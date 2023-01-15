const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
  

  await User.deleteMany();

  await User.create({
    firstName: 'Yeon',
    lastName: 'Seo',
    email: 'yeon@me.com',
    password: 'password12345',
   
  });

  await User.create({
    firstName: 'Alexis',
    lastName: 'Woelffer',
    email: 'alexiswolfie@gmail.com',
    password: 'password12345'
  })

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
