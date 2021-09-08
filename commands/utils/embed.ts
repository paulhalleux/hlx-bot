import SlashCommand from "../slash-command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {ColorResolvable, EmbedFieldData, MessageEmbed} from "discord.js";

export default {
    name: "embed",
    description: "Create an embed message.",
    command: new SlashCommandBuilder()
        .addStringOption(builder => builder.setRequired(false).setName('author').setDescription('Set embed author'))
        .addStringOption(builder => builder.setRequired(false).setName('author_icon').setDescription('Set embed author icon'))
        .addStringOption(builder => builder.setRequired(false).setName('title').setDescription('Set embed title'))
        .addStringOption(builder => builder.setRequired(false).setName('description').setDescription('Set embed description'))
        .addStringOption(builder => builder.setRequired(false).setName('image').setDescription('Set embed image (url)'))
        .addStringOption(builder => builder.setRequired(false).setName('url').setDescription('Set embed url'))
        .addStringOption(builder => builder.setRequired(false).setName('thumbnail').setDescription('Set embed thumbnail (url)'))
        .addStringOption(builder => builder.setRequired(false).setName('fields').setDescription('Set embed fields (json)'))
        .addStringOption(builder => builder.setRequired(false).setName('footer').setDescription('Set embed footer'))
        .addStringOption(builder => builder.setRequired(false).setName('footer_icon').setDescription('Set embed footer icon'))
        .addStringOption(builder => builder.setRequired(false).setName('color').setDescription('Set embed color')),
    execute: async interaction => {
        const options = interaction.options

        const author = options.get('author')?.value as string
        const author_icon = options.get('author_icon')?.value as string
        const title = options.get('title')?.value as string
        const description = options.get('description')?.value as string
        const image = options.get('image')?.value as string
        const url = options.get('url')?.value as string
        const color = options.get('color')?.value as string
        const fields = options.get('fields')?.value as string
        const footer = options.get('footer')?.value as string
        const footer_icon = options.get('footer_icon')?.value as string
        const thumbnail = options.get('thumbnail')?.value as string

        const embed = new MessageEmbed()
        if (author != undefined) embed.setAuthor(author, author_icon ?? author_icon)
        if (title != undefined) embed.setTitle(title)
        if (description != undefined) embed.setDescription(description)
        if (image != undefined) embed.setImage(image)
        if (url != undefined) embed.setURL(url)
        if (thumbnail != undefined) embed.setThumbnail(thumbnail)
        if (footer != undefined) embed.setFooter(footer, footer_icon ?? footer_icon)
        if (color != undefined) embed.setColor(`${color}` as ColorResolvable)

        try {
            embed.setFields(JSON.parse(fields) as EmbedFieldData[])
        } catch (e) {}

        await interaction.reply({content: 'Embed envoyé avec succès!', ephemeral: true})
        await interaction.channel.send({
            embeds: [embed]
        });
    }
} as SlashCommand