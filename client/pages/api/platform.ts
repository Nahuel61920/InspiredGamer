const baseUrl = process.env.BASE_PATH;

export async function getPlataformsApi() {
    try {
        const url = `${baseUrl}/platforms?_sort=positions`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}