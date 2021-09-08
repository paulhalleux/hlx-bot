import Command from "./command";
import Service, {getFilesAndFolders} from "../domain/service"
import {CommandInteraction, GuildMember, Message} from "discord.js";
import SlashCommand from "./slash-command";

export default class CommandService implements Service {

    private readonly _commands: Command[]
    private readonly _slashCommands: SlashCommand[]

    constructor() {
        this._commands = []
        this._slashCommands = []
    }

    async register(): Promise<void> {
        await this.registerFolder(__dirname)
    }

    async execute(message: Message, member: GuildMember, command: string) {
        const split: string[] = command.split(" ")
        const args: string[] = split.slice(1)
        const commandName = split[0].replace(/^!/, '')
        this._commands.forEach(cmd => {
            if(cmd.name.equalsIgnoreCase(commandName)) {
                const [exeCommand, exeArgs] = this.getCommandToExecute(cmd, args)
                exeCommand.execute({args: exeArgs, message, member})
            }
        })
    }

    executeSlash(interaction: CommandInteraction) {
        this._slashCommands.forEach(cmd => {
            if(cmd.name.equalsIgnoreCase(interaction.commandName)) {
                cmd.execute(interaction)
            }
        })
    }

    private getCommandToExecute(command: Command, args: string[]): [Command, string[]]  {
        const find = command.subcommands?.find(sub => sub.name.equalsIgnoreCase(args[0]))
        if(args.length == 0 || find == undefined) return [command, args];
        return this.getCommandToExecute(find, args.slice(1))
    }

    private async registerFolder(filePath: string) {
        const {files, folders} = await getFilesAndFolders(filePath);

        for (const file of files) {
            try {
                const command = require(filePath + '/' + file.replace(/\.[^/.]+$/, ""))
                if(this.isCommand(command)) {
                    this._commands.push(command.default)
                } else if (this.isSlashCommand(command)) {
                    const defaultCommand: SlashCommand = command.default
                    defaultCommand.command.setName(defaultCommand.name)
                    defaultCommand.command.setDescription(defaultCommand.description)
                    this._slashCommands.push(defaultCommand)
                }
            } catch (error) {
                console.error(error)
            }
        }

        for (const folder of folders) {
            await this.registerFolder(`${filePath}/${folder}`);
        }
    }

    private isCommand(command: any) {
        let defaultCommand = command.default;
        return defaultCommand
            && defaultCommand.name
            && defaultCommand.description
            && defaultCommand.execute
            && defaultCommand.command == undefined
    }

    private isSlashCommand(command: any) {
        let defaultCommand = command.default;
        return defaultCommand
            && defaultCommand.name
            && defaultCommand.description
            && defaultCommand.command
    }

    get commands(): Command[] {
        return this._commands;
    }

    get slashCommands(): SlashCommand[] {
        return this._slashCommands;
    }

}