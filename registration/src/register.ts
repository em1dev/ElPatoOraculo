import 'dotenv/config';
import discordApi from './api/discordApi';
import { ApplicationCommandType, CommandRequestBody } from './api/discordApi/types';

const QUACK_COMMAND: CommandRequestBody = {
    name: 'quack',
    description: 'Get a random duck image to answer your questions',
    type: ApplicationCommandType.ChatInput,
};

const commands = [QUACK_COMMAND];

(async () => {

  const appId = process.env['APP_ID'];
  if (!appId) throw new Error('Missing API_ID from .env');

  console.log('Installing commands...');

  discordApi.installApiCommands(appId, commands);

  commands.forEach(command => console.log(`Installed: ${command.name}`));
  console.log('All done :D');
})();