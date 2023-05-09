import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { searchGameByUrlApi } from "./api/game";
import ListGames from "../components/ListGames/ListGames";

export default function search() {
  const [games, setGames] = useState({} as any);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-game")?.focus();
    let classBar = document.getElementsByClassName("topBarSearch");
    if (classBar.length > 0) {
      classBar[0].classList.add("active");
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGameByUrlApi(query.query);
        if (size(response) > 0) setGames(response);
        else setGames({});
      } else {
        setGames({});
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      {!games && <Loader active>loading games</Loader>}
      {games && size(games) === 0 && (
        <div className="data__not-found">
          <h3>No game found</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
