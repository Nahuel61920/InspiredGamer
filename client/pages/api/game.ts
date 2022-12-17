const baseUrl = process.env.BASE_PATH;

export async function getLastGameApi(limit: number) {
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