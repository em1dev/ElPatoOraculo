import { config } from "../config";

const API_URL = 'https://random-d.uk/api';
const duckErrorCodeUrl = (code: number) => `${API_URL}/http/${code}.jpg`;

interface DuckList 
{
  gif_count: number,
  gifs: Array<string>,
  http: Array<string>,
  image_count: number,
  images: Array<string>,
}

const getRandomDuckUrlFromList = async () => {
  try {
    const listResp = await fetch(`${API_URL}/list`);
    const data = await listResp.json() as DuckList;
    // for some reason images ending with capital JPG are not working on this api :v
    //    probably due to some internal issue, for now ill exclude them to avoid broken images
    let imgs = [
      ...data.images.filter(i => !i.endsWith('JPG')),
      ...data.gifs
    ];

    // exclude banned ducks
    imgs = imgs
    .filter(i => 
      !config.bannedDuckIds.includes(i.split('.').at(0) ?? "")
    );

    const randomImg = imgs[Math.floor(Math.random() * imgs.length)];
    return `${API_URL}/${randomImg}`;
  } catch (e) {
    return;
  }
}

const getRandomDuckUrl = async ():Promise<string> => {
  try {
    // try workaround first if that fails fall back to previous implementation since this api is quite unreliable (prob better to just store the images)
    const result = await getRandomDuckUrlFromList();
    if (result) return result;

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