import Command from "./command";
import {Client, Message} from "discord.js";

const util = require("util")
const fs = require("fs")
const readdir = util.promisify(fs.readdir)

export default class CommandManager {

    private readonly _commands: Command[]

    constructor() {
        this._commands = []
    }

    async register() {
        await this.registerFolder(__dirname)
    }

    async execute(message: Message, client: Client, command: string) {
        const split: string[] = command.split(" ")
        const args: string[] = split.slice(1)
        const commandName = split[0].replace(/^!/, '')
        this._commands.forEach(cmd => {
            if(cmd.name.equalsIgnoreCase(commandName)) {
                const [exeCommand, exeArgs] = this.getCommandToExecute(cmd, args)
                exeCommand.execute({args: exeArgs, message, client})
            }
        })
    }

    private getCommandToExecute(command: Command, args: string[]): [Command, string[]]  {
        const find = command.subcommands?.find(sub => sub.name.equalsIgnoreCase(args[0]))
        if(args.length == 0 || find == undefined) return [command, args];
        return this.getCommandToExecute(find, args.slice(1))
    }

    private async registerFolder(filePath: string) {
        const folderElements = await readdir(filePath);
        const files = folderElements.filter(value => fs.lstatSync(`${filePath}/${value}`).isFile() && (value.endsWith('.ts') || value.endsWith('.js')))
        const folders = folderElements.filter(value => fs.lstatSync(`${filePath}/${value}`).isDirectory())

        for (const file of files) {
            try {
                const command = require(filePath + '/' + file.replace(/\.[^/.]+$/, ""))
                if(this.isCommand(command)) {
                    this._commands.push(command.default)
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
    }

}