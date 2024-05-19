require('dotenv').config()
const { REST, Routes } = require('discord.js');
const token = process.env.auth
const guildId = process.env.guildId
const clientId = process.env.clientId
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Register global commands
    const globalData = await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
    );

    } catch (error) {
        console.error(error);
    } finally {
        console.log("done!")
    }
})();