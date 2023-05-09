import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { size, forEach } from "lodash";
import useAuth from "../hooks/useAuth";
import { getFavoriteApi } from "./api/favorite";
import ListGames from "../components/ListGames/ListGames";

export default function wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const gameList: any | [] = [];
        forEach(response, (data) => {
          gameList.push(data.game);
        });
        setGames(gameList);
      } else {
        setGames(null);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">wishlist</div>
        <div className="data">
          {!games && <Loader active>Loading favorites</Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3>You have no favorite games</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
