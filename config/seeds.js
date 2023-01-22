const db = require('./connection');
const { User } = require('../models');

const userData=[    {
  firstName: 'Yeon',
  lastName: 'Seo',
  email: 'yeon@me.com',
  password: 'password12345',

},
{
  firstName: 'Alexis',
  lastName: 'Woelffer',
  email: 'alexis@me.com',
  password: 'password12345'

},
{
  firstName: 'Elijah',
  lastName: 'Holt',
  email: 'eholt@testmail.com',
  password: 'password12345'
}]

db.once('open', async () => {


  await User.deleteMany();
 
  const users= await User.create(userData);
  const userId=users.map(user=>user._id);

  for (let i=0;i<userData.length-1;i++){
    await User.findOneAndUpdate(
      { _id:users[i]._id},
      {
        $addToSet: {
          friends: userId,
        },
      }
      
    );
  }


  console.log('users seeded');

  process.exit();
});
