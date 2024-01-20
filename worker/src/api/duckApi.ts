import { config } from "../config";

const duckErrorCodeUrl = (code: number) => `https://random-d.uk/api/http/${code}.jpg`;

const getRandomDuckUrl = async ():Promise<string> => {
  try {
    const resp = await fetch('https://random-d.uk/api/random');
    const { url } = await resp.json() as { url: string };

    if (!url) return duckErrorCodeUrl(resp.status);

    const isBanned = config.bannedDuckIds.includes(url.split('/').at(-1) ?? "");
    if (isBanned) {
      return await getRandomDuckUrl();
    }

    return url;
  } catch {
    return duckErrorCodeUrl(500);
  }
}

export const DuckApi = {
  getRandomDuckUrl,
  duckErrorCodeUrl
};