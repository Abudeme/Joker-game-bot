require('dotenv').config();
const { Telegraf } = require('telegraf'); // Telegram Bot library
const admin = require('firebase-admin'); // Firebase Admin SDK

// Initialize Firebase Admin SDK
const serviceAccount = require('./config.key/firebase-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Use environment variable for database URL
    });

    const db = admin.firestore(); // Firestore reference for saving data
    // 
    // 
     // Create the Telegram bot
    const bot = new Telegraf(process.env.BOT_TOKEN); // Using .env for bot token

    bot.start((ctx) => ctx.reply('Welcome!'));
    bot.help((ctx) => ctx.reply('This is a bot that connects to Firebase.'));
    bot.on('text', async (ctx) => {
      const userMessage = ctx.message.text;
        
          // Example: Save user messages to Firestore
            await db.collection('messages').add({
                text: userMessage,
                    user: ctx.message.from.username,
                        timestamp: admin.firestore.FieldValue.serverTimestamp(),
                          });

                            ctx.reply('Your message has been saved!');
                            });

                            // Start bot
                            bot.launch();
                            // Firebase Firestore collection for player data
                            const playerRef = db.collection('players');

                            // Function to register a new player
                            async function registerPlayer(userId, username) {
                              const playerDoc = playerRef.doc(userId);
                                const playerData = {
                                    username: username,
                                        level: 1,  // Start at level 1
                                            score: 0,  // Starting score
                                                tokensLocked: 0,  // Tokens locked in the game
                                                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
                                                      };

                                                        await playerDoc.set(playerData);
                                                        }

                                                        // Function to update player level and score
                                                        async function updatePlayerProgress(userId, level, score, tokensLocked) {
                                                          const playerDoc = playerRef.doc(userId);
                                                            await playerDoc.update({
                                                                level: level,
                                                                    score: score,
                                                                        tokensLocked: tokensLocked,
                                                                          });
                                                                          }