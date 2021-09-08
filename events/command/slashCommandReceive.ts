import Event from "../event";
import {Interaction} from "discord.js";
import {commandService} from "../../index";

export default {
    name: "interactionCreate",
    run: t => {
        if(t.isCommand()) {
            commandService.executeSlash(t)
        }
    }
} as Event<Interaction>