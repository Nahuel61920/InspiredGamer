const baseUrl = process.env.BASE_PATH;
import { authFetch } from "../../utils/fetch";

export async function createAddressApi(address: any, logout: any) {
  try {
    const url = `${baseUrl}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressesApi(idUser: string, logout: any) {
  try {
    const url = `${baseUrl}/addresses?users_permissions_user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAddressesApi(idAdreess: string, logout: any) {
  try {
    const url = `${baseUrl}/addresses/${idAdreess}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) {
      throw "Server error";
    }
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateAddressesApi(
  idAdreess: string,
  address: any,
  logout: any
) {
  try {
    const url = `${baseUrl}/addresses/${idAdreess}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
