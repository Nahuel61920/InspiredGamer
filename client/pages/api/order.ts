import { authFetch } from "../../utils/fetch";

const baseUrl = process.env.BASE_PATH;

export const getOrdersApi = (idUser: string, logout: any) => {
    try {
        const url = `${baseUrl}/orders?_sort=createdAt:desc&users_permissions_user=${idUser}`;
        const result = authFetch(url, null, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}