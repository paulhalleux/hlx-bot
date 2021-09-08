import {commandService} from "../../index";
import Command from "../command";

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("../../config.json")
const rest = new REST({ version: '9' }).setToken(config.TOKEN);

export default {
    name: "deploy",
    description: "Deploy slash commands.",
    execute: async ({args, message, client}) => {
        const commands = commandService.slashCommands.map(value => value.command.toJSON());
        try {
            await rest.put(
                Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
                {body: commands},
            );

            await message.reply({
                content: "Commandes enregistrées avec succès."
            })
        } catch (error) {
            await message.reply({
                content: "Une erreur s'est produite lors de l'enregistrement."
            })
        }
    }
} as Command