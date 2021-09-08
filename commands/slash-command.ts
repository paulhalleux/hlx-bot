import {SlashCommandBuilder} from '@discordjs/builders';
import {CommandInteraction} from "discord.js";

export default interface SlashCommand {
    name: string
    description: string
    command: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    execute: (interaction: CommandInteraction) => void
}