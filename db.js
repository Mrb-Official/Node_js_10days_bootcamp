const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/hotel_db'; 

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => console.log(' MongoDB connected!'));
db.on('error', (err) => console.log('Database error:', err));

module.exports = db;
