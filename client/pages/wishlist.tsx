import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { size, forEach } from "lodash";
import useAuth from "../hooks/useAuth";
import { getFavoriteApi } from "./api/favorite";

export default function wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      console.log(auth.idUser);
      const response = await getFavoriteApi(auth.idUser, logout);
      setGames(response);
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">wishlist</div>
        <div className="data">
          <p>ListGames</p>
        </div>
      </div>
    </BasicLayout>
  );
}
