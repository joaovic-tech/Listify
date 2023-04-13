require('dotenv').config();
const mongoose = require('mongoose');

class Connection {
  constructor() {
    this.mongoose = mongoose;
    this.app = require('../../app');
  }

  async init() {
    try {
      await this.mongoose.set('strictQuery', false);
      await this.mongoose.connect(process.env.CONNECTIONSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await this.app.emit('Connected to database');
    } catch (error) {
      if (error.name === 'MongoNetworkError') {
        console.error('Error connecting to database:', error.message);
      } else {
        console.error(error);
      }
    }
  }
}

module.exports = new Connection().init();