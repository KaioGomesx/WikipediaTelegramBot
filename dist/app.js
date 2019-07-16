"use strict";
/*
  Telegram bot for Wikipedia search

  Autor: R1S3
  Telegram: @Risezin
  GitHub: https://github.com/RIS33
  Version: 0.0.1
*/
const algorithmia = require('algorithmia');
const TelegramBot = require('node-telegram-bot-api');
const algorithmiaToken = 'simtfw6iJqtKENkzXPFXB89YN3d1';
const botToken = '624875537:AAEn5On7oPtZco5Az9vxCixI9Ov6c132RUs';
const bot = new TelegramBot(botToken, { polling: true });
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = { reply_to_message_id: msg.message_id };
    bot.sendMessage(chatId, "I'm here.", opts);
});
// help
bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;
    const opts = { reply_to_message_id: msg.message_id };
    bot.sendMessage(chatId, 'Modo de usar: /wiki idioma termo_a_pesquisar', opts);
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
            bot.sendMessage(chatId, "Não foram encontrado resultados, tente com algo mais específico", opts);
        }
    });
});
