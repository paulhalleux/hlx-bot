import CommandService from "./commands/command-service";
import "./extensions/strings"
import EventService from "./events/event-service";

const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
export const commandService = new CommandService()
export const eventService = new EventService(client)

client.on('ready', async () => {
    console.log(`[HLXBOT] Connected as ${client.user.tag}`)
    await commandService.register()
    await eventService.register()
})

client.login(config.TOKEN).catch(reason => {
    console.log(`[HLXBOT] Could not login with given token.\n${reason}`)
})