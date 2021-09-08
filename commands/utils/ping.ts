import Command from "../command";

export default {
    name: "ping",
    description: "Replies with 'Pong' to the command.",
    execute: ({args, message, member}) => {
        message.channel.send({content: "Pong!"})
    },
    subcommands: [
        {
            name: "salut",
            description: "Say salut",
            execute: ({args, message, member}) => {
                message.channel.send({content: "Salut!"})
            }
        }
    ]
} as Command