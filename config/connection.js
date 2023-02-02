const mongoose = require('mongoose');
require('dotenv').config();



mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@rabbit-app.dsfvpug.mongodb.net/rabbit`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://curriculum-admin:${process.env.MONGODB_PASSWORD}@cluster0.umgm8xe.mongodb.net/rabbit`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

module.exports = mongoose.connection;
