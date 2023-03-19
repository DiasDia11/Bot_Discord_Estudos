const { SlashCommandBuilder } = require("discord.js")

module.exports = {
   data: new SlashCommandBuilder().setName("playlist").setDescription("ouça a melhor playlist de estudos"),

    async execute(interaction){
        await interaction.reply("https://open.spotify.com/playlist/1o8LBEpr6g0YiGDw3M8AV0?si=fc6c144a24724d4e")
    }
}