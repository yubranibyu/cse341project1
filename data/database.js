const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDB = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client;
      console.log('Connected to MongoDB');
      callback(null, database);
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('Database is not initialized');
  }
  return database;
};

module.exports = {
  initDB,
  getDatabase
};