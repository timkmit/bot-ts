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
    throw new Error('BOT_TOKEN .env not found')
}

const bot = new TelegramBot(token, {polling: true})

bot.onText(/\/tstim (.+)/, async (msg, match)=> {

    const {telegramId, text, name, sendMessage} = msgData(msg)

    //const chatId = msg.chat.id
    if (match && telegramId) {
        const weight = parseFloat(match[1]);
        await controller.saveWeight(telegramId, name, new Date(2024, 3, 26), weight, sendMessage)
    }
})

bot.on('message', async (msg) => {
    const {telegramId, name} = msgData(msg)

    if(telegramId){
        await controller.registerUser(telegramId, name)
    }
})