import {Client, Message} from "discord.js";

export default interface Command {
    name: string
    description: string
    execute: ({args, message, client}: CommandArguments) => void
    subcommands?: Command[]
}

export interface CommandArguments {
    args: string[]
    message: Message
    client: Client
}