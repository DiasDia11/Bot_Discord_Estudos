const { SlashCommandBuilder , ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js")

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhuma lingaguem selecionada")
            .addOptions({
                label: "javascript",
                descrption: "Veja a documentacao de javascript",
                value: "javascript"
            },
            {
                label: "discord.js",
                descrption: "Veja a documentacao do discord.js",
                value: "discord.js",
            },
            {
                label: "Laravel",
                descrption: "Veja a documentacao do Laravel",
                value: "Laravel"
            },
            {
                label: "React",
                descrption: "Veja a documentacao do React",
                value: "React"
            },
            {
                label: "SpringBoot",
                descrption: "Veja a documentacao do SpringBoot",
                value: "SpringBoot"
            })
    )

module.exports = {
   data: new SlashCommandBuilder().setName("docs").setDescription("Acesse a documentacao da linguagem"),

    async execute(interaction){
        await interaction.reply({content: "Selecione uma das techs abaixo:", components: [row]})
    }
}