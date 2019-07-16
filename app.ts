/*
  Telegram bot for Wikipedia search

  Autor: R1S3
  Telegram: @Risezin
  GitHub: https://github.com/RIS33
  Version: 0.0.1
*/

const algorithmia: any = require('algorithmia');
const TelegramBot: any = require('node-telegram-bot-api');

const algorithmiaToken: string = 'simtfw6iJqtKENkzXPFXB89YN3d1';
const botToken: string = '624875537:AAEn5On7oPtZco5Az9vxCixI9Ov6c132RUs';

const bot: any = new TelegramBot (botToken, {polling: true});

bot.onText(/\/start/, (msg: any, match: any): void => {
  const chatId: number  = msg.chat.id;
	const opts: any = {reply_to_message_id: msg.message_id}
  bot.sendMessage(chatId, "I'm here.", opts)
});

// help
bot.onText(/\/help/, (msg: any, match: any): void => {
	const chatId: number = msg.chat.id;
	const opts: object = { reply_to_message_id: msg.message_id};
	bot.sendMessage(chatId, 'Modo de usar: /wiki idioma termo_a_pesquisar', opts);
});

// Search 
bot.onText(/\/wiki (.+) (.+)/, (msg: any, match: any): void => {
  const chatId: number  = msg.chat.id;
	const opts: object = {reply_to_message_id: msg.message_id}
  const input: object = {
    "articleName": match[2],
    "lang": match[1]
  };

  algorithmia.client(algorithmiaToken)
    .algo("web/WikipediaParser/0.1.2")
    .pipe(input)
    .then((response: any) => {
      try {
        const res: any = response.get();
				bot.sendMessage(chatId, `${res['summary']}`, opts);
      } catch(Exception){
				bot.sendMessage(chatId, "Não foram encontrado resultados, tente com algo mais específico", opts)
      }
    });
});


