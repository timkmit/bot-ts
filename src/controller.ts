import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const controller = {
    async registerUser(telegramId: string, name: string){
        const user = await prisma.user.findFirst({
            where: {
                telegramId
            }
        })

        if(user) return user

        return prisma.user.create({
            data: {
                telegramId,
                name,
                registeredAt: new Date()
            }
        })
    }
}