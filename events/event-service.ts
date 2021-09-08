import Service, {getFilesAndFolders} from "../domain/service";
import {Client} from "discord.js";
import Event from "./event";

export type CustomEvent = {
}

export default class EventService implements Service{

    private readonly _client: Client
    private readonly _customEvents: Event<any>[]

    constructor(client: Client) {
        this._client = client
        this._customEvents = []
    }

    async register(): Promise<void> {
        await this.registerFolder(__dirname)
    }

    call<T extends keyof CustomEvent>(event: T, options: CustomEvent[T]) {
        this._customEvents.forEach(e => {
            if(e.name.equalsIgnoreCase(event)) {
                e.run(options)
            }
        })
    }

    private async registerFolder(filePath: string) {
        const {files, folders} = await getFilesAndFolders(filePath);

        for (const file of files) {
            try {
                const event = require(filePath + '/' + file.replace(/\.[^/.]+$/, ""))
                if(this.isEvent(event)) {
                    if(event.default.custom) {
                        this._customEvents.push(event.default)
                    } else this._client.on(event.default.name, event.default.run)
                }
            } catch (error) {
                console.error(error)
            }
        }

        for (const folder of folders) {
            await this.registerFolder(`${filePath}/${folder}`);
        }
    }

    private isEvent(event: any) {
        let defaultEvent = event.default;
        return defaultEvent
            && defaultEvent.name
            && defaultEvent.run
    }

}