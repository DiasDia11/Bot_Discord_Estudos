const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
// dotenv
const dotenv =  require('dotenv');
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

// Importação dos comandos
const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandsFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está em data`)
    }
}

// Login Bot
client.once(Events.ClientReady, c => {
	console.log(`Pront! login realizado como ${c.user.tag}`);
});
client.login(TOKEN);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction =>{
    if (interaction.isStringSelectMenu()){
        const selected = interaction.values[0]
        if(selected == "javascript"){
            await interaction.reply("Documentação do javascript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript")
        } else if(selected == "discord.js"){
            await interaction.reply("Documentação do discord.js: https://discordjs.guide/#before-you-begin")
        }else if(selected == "Laravel"){
            await interaction.reply("Documentação do Laravel: https://laravel.com/docs/10.x/readme")
        }else if(selected == "React"){
            await interaction.reply("Documentação do React: https://pt-br.reactjs.org/docs/getting-started.html")
        }else if(selected == "SpringBoot"){
            await interaction.reply("Documentação do SpringBoot: https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/")
        }
    }

    if(interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName)
        if(!command){
            console.error("Comando não encontrado")
            return
        }
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply("Houve um erro au utilizar sesse comando")
        }
    }
})