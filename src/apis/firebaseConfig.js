require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_JSON_PATH); // Descarga tu clave desde Firebase Console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_DATABASE_URL, // Reemplaza con el bucket de tu proyecto
});

const bucket = admin.storage().bucket();

module.exports = bucket;
