import {ClientEvents} from "discord.js";
import {CustomEvent} from "./event-service";

export default interface Event<T> {
    name: keyof ClientEvents | keyof CustomEvent
    run: (t: T) => void
    custom?: boolean
}