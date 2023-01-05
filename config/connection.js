const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://rabbit-app:her6gYNu9PfQfAk@rabbit-app.dsfvpug.mongodb.net/rabbit`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
