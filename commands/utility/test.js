const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const date = require('date-and-time');
const now = new Date();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with time of response and logs to server.'),
	async execute(interaction) {
		const PermCheck = PermissionsBitField.Flags.ADMINISTRATOR; 
        const memberPermissions = interaction.member.permissions;

        if (!memberPermissions.has(PermCheck)) {
            return interaction.reply({content: "You do not have permission to use this command!", ephemeral: true });
        }

		const reply = date.format(now, 'MM/DD/YYYY h:mm A [EST]'); 
		const username = interaction.user.globalName
		const server = interaction.guild.name
		await interaction.reply(`Recieved at ${reply} from ${username} in ${server}. Additional Logging information dumped in logs folder.`);
	},
};
