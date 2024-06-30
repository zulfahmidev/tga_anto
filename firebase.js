// firebase.js
const admin = require('firebase-admin');
// const firebase = require('firebase');

const serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-test-ecd9a-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

const db = admin.database();

module.exports = { admin, db };