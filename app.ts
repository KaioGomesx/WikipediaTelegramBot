/*
  Telegram bot for Wikipedia search

  Autor: R1S3
  Telegram: @Risezin
  GitHub: https://github.com/RIS33
  Version: 0.0.1
*/

// API's
const algorithmia: any = require('algorithmia');
const TelegramBot: any = require('node-telegram-bot-api');

// API's Token
const algorithmiaToken: string = 'algorithmia api token here';
const botToken: string = 'telegram bot token here';

// Bot Init
const bot: any = new TelegramBot (botToken, {polling: true});

// Return using mode to user
bot.onText(/\/start/, (msg: any, match: any): void => {
  const chatId: number  = msg.chat.id;
  const opts: object = {reply_to_message_id: msg.message_id}
  bot.sendMessage(chatId, 'Modo de uso: /wiki idioma termo_a_buscar', opts);
});

// Search 
bot.onText(/\/wiki (.+ )(.+)/, (msg: any, match: any) => {
  const chatId: number  = msg.chat.id;
  const opts = {reply_to_message_id: msg.message_id}
  const input: any = {
    "articleName": match[2],
    "lang": match[1]
  };

  algorithmia.client(algorithmiaToken)
    .algo("web/WikipediaParser/0.1.2")
    .pipe(input)
    .then((response: any) => {
      try {
        const res: string = response.get();
        bot.sendMessage(chatId, `${res['summary']}`, opts);
      } catch(Exception){
        bot.sendMessage(chatId, "Falha a pegar resposta do Wikipedia", opts);
      }
    });
});
