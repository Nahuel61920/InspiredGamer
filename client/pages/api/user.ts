const baseUrl = process.env.BASE_PATH;
import { authFetch } from "../../utils/fetch";

export async function registerApi(formData: any) {
    try {
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

export async function updateNameApi(idUser: string, data: any, logout: any) {
    try {
        const url = `${baseUrl}/users/${idUser}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const result = await authFetch(url, params, logout);
        return result ? result : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateEmailApi(idUser: string, email: string, logout: any) {
    try {
        const url = `${baseUrl}/users/${idUser}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        };
        const result = await authFetch(url, params, logout);
        return result ? result : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updatePasswordApi(emailUser: string, idUser: string, currentPassword: string, newPassword: string, logout: any) {
    // comprobamos si la contraseña actual es correcta
    const result = await loginApi({ identifier: emailUser, password: currentPassword });
    if (result.statusCode === 400) {
        return result;
    } else {
        try {
            const url = `${baseUrl}/users/${idUser}`;
            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newPassword }),
            };
            const result = await authFetch(url, params, logout);
            return result ? result : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}