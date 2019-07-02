"use strict";
/*
  Telegram bot for Wikipedia search

  Autor: R1S3
  Telegram: @Risezin
  GitHub: https://github.com/RIS33
  Version: 0.0.2
*/

// API's
const algorithmia = require('algorithmia');
const TelegramBot = require('node-telegram-bot-api');

// API's Token
const algorithmiaToken: string = 'algorithmia api token here';
const botToken: string = 'telegram bot token here';

// Bot Init
const bot = new TelegramBot(botToken, { polling: true });

// Return using mode to user
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = { reply_to_message_id: msg.message_id };
    bot.sendMessage(chatId, 'Hello, friend', opts);
});

bot.onText(/\/help/, (msg, match) => {
  const chatId = msg.chat.id;
  const opts = { reply_to_message_id: msg.message_id};
  bot.sendMessage(chatId, 'Modo de usar: /wiki idioma termo_a_pesquisar' ,opts)
});

// Search 
bot.onText(/\/wiki (.+) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = { reply_to_message_id: msg.message_id };
    const input = {
        "articleName": match[2],
        "lang": match[1]
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
