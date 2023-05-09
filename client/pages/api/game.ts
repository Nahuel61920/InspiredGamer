const baseUrl = process.env.BASE_PATH;

export async function getLastGamesApi(limit: number) {
    try {
        const limitItems = `_limit=${limit}`;
        const sortItems = `_sort=releaseDate:desc`;
        const url = `${baseUrl}/games?${limitItems}&${sortItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getGamesPlatformApi(platform: any, limit: number, start: number) {
    try {
        const platformUrl = `platform.url=${platform}`;
        const limitItems = `_limit=${limit}`;
        const sortItems = `_sort=releaseDate:desc`;
        const startItems = `_start=${start}`;
        const url = `${baseUrl}/games?${platformUrl}&${limitItems}&${sortItems}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getTotalGamesPlatformApi(platform: any) {
    try {
        const platformUrl = `platform.url=${platform}`;
        const url = `${baseUrl}/games/count?${platformUrl}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function getGameByUrlApi(path: any) {
    try {
        const url = `${baseUrl}/games?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function searchGameByUrlApi(title: string | any) {
    try {
        const url = `${baseUrl}/games?_q=${title}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}