import {ClientEvents} from "discord.js";

export default interface Event<T = void> {
    name: keyof ClientEvents
    run: (t: T) => void
}