import Event from "../event";
import {Message} from "discord.js";
import {commandService} from "../../index";

export default {
    name: "messageCreate",
    run: async message => {
        if (message.content.startsWith('!') && !message.author.bot) {
            await commandService.execute(message, message.client, message.content)
        }
    }
} as Event<Message>