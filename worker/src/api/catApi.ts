const catErrorCodeUrl = (code: number) => `https://http.cat/images/${code}.jpg`;

const getRandomCatUrl = async (): Promise<string> => {
    try {
        const resp = await fetch('https://cataas.com/cat?json=true');
        const { _id } = await resp.json() as { _id: string };

        if (!_id) return catErrorCodeUrl(resp.status);

        return `https://cataas.com/cat/${_id}`;
    } catch {
        return catErrorCodeUrl(500);
    }
};

export const CatApi = {
    getRandomCatUrl,
    catErrorCodeUrl,
};