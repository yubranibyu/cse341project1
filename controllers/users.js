const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDB();
    const users = await db.collection('users').find().toArray();

    res.status(200).json(users);
  } catch (err) {
    console.error('Failed obtaining users:', err);
    res.status(500).json({ error: 'Failed obtaining users' });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDB();
    const user = await db.collection('users').findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Failed obtaining user:', err);
    res.status(500).json({ error: 'Failed obtaining user' });
  }
};

module.exports = {
  getAll,
  getSingle,
};
