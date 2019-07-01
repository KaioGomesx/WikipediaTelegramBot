"use strict";
/*
  Telegram bot for Wikipedia search

  Autor: R1S3
  Telegram: @Risezin
  GitHub: https://github.com/RIS33
  Version: 0.0.1
*/
// API's
const algorithmia = require('algorithmia');
const TelegramBot = require('node-telegram-bot-api');
// API's Token
const algorithmiaToken = 'your algorithmia api token';
const botToken = 'your telegram bot token';
// Bot Init
const bot = new TelegramBot(botToken, { polling: true });
// Return using mode to user
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = { reply_to_message_id: msg.message_id };
    bot.sendMessage(chatId, 'Modo de uso: /wiki TERMO_A_BUSCAR', opts);
});
// Search 
bot.onText(/\/wiki (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = { reply_to_message_id: msg.message_id };
    const input = {
        "articleName": match[1],
        "lang": 'pt'
    };
    algorithmia.client(algorithmiaToken)
        .algo("web/WikipediaParser/0.1.2")
        .pipe(input)
        .then((response) => {
        try {
            const res = response.get();
            bot.sendMessage(chatId, `${res['summary']}`, opts);
        }
        catch (Exception) {
            bot.sendMessage(chatId, "Falha a pegar resposta do Wikipedia", opts);
        }
    });
});
