const baseUrl = process.env.BASE_PATH;
import { authFetch } from "../../utils/fetch";
import { size } from "lodash";

export async function isFavoriteApi(
  idUser: string,
  idGame: string,
  logout: any
) {
  try {
    const url = `${baseUrl}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(
  idUser: string,
  idGame: string,
  logout: any
) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0 || !dataFound) {
      return "You already have this game in your favorites list";
    } else {
      const url = `${baseUrl}/favorites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users_permissions_user: idUser, game: idGame }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(
  idUser: string,
  idGame: string,
  logout: any
) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);
    if (size(dataFound) > 0) {
      const url = `${baseUrl}/favorites/${dataFound[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      };
      const result = await authFetch(url, params, logout);
      return result;
    } else {

    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(
  idUser: string,
  logout: any
) {
  try {
    const url = `${baseUrl}/favorites?users_permissions_user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

