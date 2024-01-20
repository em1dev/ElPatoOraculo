import { CommandRequestBody } from "./types";

const baseUrl = 'https://discord.com/api/v10/';

type APIMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

const _baseRequest = async <T>(path: string, method: APIMethods = 'GET', body: object) => {
  const url = baseUrl + path;

  const headers = new Headers({
    Authorization: `Bot ${process.env['DISCORD_TOKEN']}`,
    'Content-Type': 'application/json; charset=UTF-8',
    'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
  });

  const resp = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers
  });

  if (!resp.ok) {
    const erroData = await resp.json();
    console.error(erroData);
    throw new Error('Discord api has failed');
  }

  return resp.json() as T;
};

const installApiCommands = async (appId: string, commands: Array<CommandRequestBody>) => {
  const endpoint = `applications/${appId}/commands`;
  await _baseRequest(endpoint, 'PUT', commands);
}

const discordApi = {
  installApiCommands
};

export default discordApi;