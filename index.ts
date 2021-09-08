import CommandManager from "./commands/command-manager";
import {Message} from "discord.js";
import "./extensions/strings"

const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const commandManager = new CommandManager()

client.on('ready', async () => {
    console.log(`[HLXBOT] Connected as ${client.user.username}`)
    await commandManager.register()
})

client.on('messageCreate', async (args: Message) => {
    if(args.content.startsWith('!') && !args.author.bot) {
        await commandManager.execute(args, client, args.content)
    }
})

client.login(config.TOKEN).catch(reason => {
    console.log(`[HLXBOT] Could not login with given token.\n${reason}`)
})