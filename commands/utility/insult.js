const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require("fs")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('insult')
    .setDescription('be rather rude to someone.'),
     
    async execute(interaction) {
         fs.readFile('./insult component/main.json', 'utf8', function(err, data){
            const json = JSON.parse(data);
            console.log(json)
        });
         
    await interaction.reply("test insult")
    }
}