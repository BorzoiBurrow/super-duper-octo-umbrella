const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const date = require('date-and-time');
const now = new Date();
const fs = require("fs");
const path = require('path');
const logpath = "../logs";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test scenario that logs time and basic things.'),
	async execute(interaction) {
		// const PermCheck = PermissionsBitField.Flags.ADMINISTRATOR; 
        const memberPermissions = interaction.member.permissions;
        if (!memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: "You do not have permission to use this command!", ephemeral: true });
        }


		const reply = date.format(now, 'MM/DD/YYYY h:mm A [EST]'); 
		const username = interaction.user.globalName
		const server = interaction.guild.name
	if (!fs.existsSync(logpath)) {
    fs.mkdirSync(logpath, { recursive: true }); 
	}

	const info = {
    "log": [
        { "Server": `${server}` },
        { "initiating user": `${username}` },
        { "response": `${reply}` }
    ]
	};
	try {
		time = date.format(now, 'MM_DD_YYYY h-mm-ss')
		const filePath = path.join(logpath, `${time} log.json`);
    	fs.writeFileSync(filePath, JSON.stringify(info, null, 2));
	} catch (error) {
    	console.error(error);
	}

		await interaction.reply(`Recieved at ${reply} from ${username} in ${server}. Additional Logging information dumped in logs folder.`);
	},
};
