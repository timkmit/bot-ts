require('dotenv/config')

const token = process.env.BOT_TOKEN

if(!token){
    throw new Error('BOT_TOKEN not found')
}

console.log('hey2')