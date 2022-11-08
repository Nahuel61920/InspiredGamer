const baseUrl = process.env.BASE_PATH;
import { authFetch } from "../../utils/fetch";

export async function registerApi(formData: any) {
    try {

        console.log(baseUrl);
        const url = `${baseUrl}/auth/local/register`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}

export async function loginApi(formData: any) {
    try {

        console.log(baseUrl);
        const url = `${baseUrl}/auth/local`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function resetPasswordApi(email: string) {
    try {
        console.log(email);
        const url = `${baseUrl}/auth/forgot-password`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMeApi(logout: any) {
    try {
        const url = `${baseUrl}/users/me`;
        const result = await authFetch(url, null, logout);
        return result ? result : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}