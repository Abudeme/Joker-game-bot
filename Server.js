// Import necessary libraries
const { Telegraf } = require('telegraf');  // Telegram Bot library
const admin = require('firebase-admin');   // Firebase Admin SDK

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-credentials/serviceAccountKey.json');  /// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx_Iiif1_KDTInM6JcBiTBPYQgViVnOkY",
  authDomain: "joker-698.firebaseapp.com",
  databaseURL: "https://joker-698-default-rtdb.firebaseio.com",
  projectId: "joker-698",
  storageBucket: "joker-698.firebasestorage.app",
  messagingSenderId: "805035588602",
  appId: "1:805035588602:web:9c76a83f42fab09b55c243",
  measurementId: "G-W08QEL3D6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);/ Replace with the actual path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();  // Firestore reference for saving data

// Create the Telegram bot
const bot = new Telegraf('7836032963:AAERaj4uPangWXPjxoq6JJ1--oyRpZUBjog');  // Replace with your actual bot token

// Handle the /start command
bot.command('start', async (ctx) => {
    const userId = ctx.from.id;
    const userName = ctx.from.username || 'Unknown User';

    // Save user data to Firebase
    await db.collection('users').doc(userId.toString()).set({
        username: userName,
        startTime: new Date(),
        progress: 1,  // Initialize the user's progress at level 1
    });

    // Reply to the user
    ctx.reply(`Welcome to Joker Game, ${userName}! Your journey begins at level 1.`);
});

// Handle the /progress command to check the user's game progress
bot.command('progress', async (ctx) => {
    const userId = ctx.from.id;

    // Retrieve user data from Firebase
    const userDoc = await db.collection('users').doc(userId.toString()).get();

    if (userDoc.exists) {
        const userData = userDoc.data();
        ctx.reply(`Hello ${userData.username}, your current level is ${userData.progress}.`);
    } else {
        ctx.reply('You have not started the game yet! Type /start to begin.');
    }
});

// Start the bot
bot.launch().then(() => {
    console.log('Joker Game Bot is running...');
});

// Graceful shutdown on process termination
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
require('dotenv').config(); // Load .env variables
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN); // Access BOT_TOKEN from .env

bot.start((ctx) => ctx.reply('Welcome to the game!')); // Start command
bot.launch(); // Launch the bot

console.log('Bot is running...');