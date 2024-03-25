import TelegramBot from "node-telegram-bot-api"
import { controller } from "./controller";

require('dotenv/config')

const msgData = (msg: TelegramBot.Message) => {
    const [chatId, telegramId, text, name] = [msg.chat.id, msg.from?.id.toString(), msg.text, `${msg.from?.first_name} ${msg.from?.last_name}`];
    return {
        telegramId,
        text,
        name,
        async sendMessage(msgText: string): Promise<void> {
            await bot.sendMessage(chatId, msgText);
        }
    }
}   

const token = process.env.BOT_TOKEN

if(!token){
    throw new Error('BOT_TOKEN not found')
}

const bot = new TelegramBot(token, {polling: true})

bot.onText(/\/echo (.+)/, (msg, match)=> {

    const chatId = msg.chat.id
    if (match !== null) {
        const resp = match[1];
        bot.sendMessage(chatId, resp);
    } else {
        
        bot.sendMessage(chatId, "No match found.");
    }
})

bot.on('message', async (msg) => {
    const {telegramId, name} = msgData(msg)

    if(telegramId){
        await controller.registerUser(telegramId, name)
    }
})