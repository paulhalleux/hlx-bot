import SlashCommand from "../slash-command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageEmbed, TextChannel} from "discord.js";

export default {
    name: "clear",
    description: "Clear the amount of message given in argument or 50 if not given.",
    command: new SlashCommandBuilder()
        .addIntegerOption(builder => builder
            .setName('amount')
            .setDescription('Amount of message to delete')
            .setRequired(false)),
    execute: async (interaction) => {
        let amount: number = 50
        const entered = interaction.options.get('amount')
        if(entered != null) amount = entered.value as number
        await (interaction.channel as TextChannel).bulkDelete(amount)
        await interaction.reply({
            embeds: [new MessageEmbed()
                .setColor("RED")
                .setTitle('Canal éffacé!')
                .setDescription(`${amount} messages de ce canal ont étés supprimés.`)
            ],
            ephemeral: true
        })
    }
} as SlashCommand