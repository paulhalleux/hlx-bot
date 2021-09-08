import {Client, GuildMember, Message, User} from "discord.js";

export default interface Command {
    name: string
    description: string
    execute: ({args, message, member}: CommandArguments) => void
    subcommands?: Command[]
}

export interface CommandArguments {
    args: string[]
    message: Message
    member: GuildMember
}