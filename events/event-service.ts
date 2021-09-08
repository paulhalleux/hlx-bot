import Service, {getFilesAndFolders} from "../domain/service";
import {Client} from "discord.js";

export default class EventService implements Service{

    private readonly _client: Client

    constructor(client: Client) {
        this._client = client
    }

    async register(): Promise<void> {
        await this.registerFolder(__dirname)
    }

    private async registerFolder(filePath: string) {
        const {files, folders} = await getFilesAndFolders(filePath);

        for (const file of files) {
            try {
                const event = require(filePath + '/' + file.replace(/\.[^/.]+$/, ""))
                if(this.isEvent(event)) {
                    this._client.on(event.default.name, event.default.run)
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