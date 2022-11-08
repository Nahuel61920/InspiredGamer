import {getToken, hasExpiredToken} from "../pages/api/token";

export async function authFetch(url: string, params: any, logout: any) {
    const token = getToken();
    if (!token) {
        // User is not logged in
        logout();
    } else {
        if (hasExpiredToken(token)) {
            // User is logged in but token has expired
            logout();
        } else {
            // User is logged in and token has not expired
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, paramsTemp);
                const result = await response.json();
                return result;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    }
}