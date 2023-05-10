import React, { useState, useEffect } from "react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { getLastGamesApi } from "./api/game";
import { Loader } from "semantic-ui-react";
import ListGames from "../components/ListGames/ListGames";
import Seo from "../components/Seo";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(30);
      if (size(response) > 0) setGames(response);
      else setGames(null);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {!games && <Loader active>Loading Games</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No games</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
