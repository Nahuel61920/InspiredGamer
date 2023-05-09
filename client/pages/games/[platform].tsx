import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { useRouter } from "next/router";
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../api/game";

import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import ListGames from "../../components/ListGames/ListGames";
import Pagination from "../../components/Pagination/Pagination";

const limitPerPage = 5;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null as any);
  const [totalGames, setTotalGames] = useState(null as any);

  const QueryPage: any = query.page;

  const getStartItem = () => {
    const currentPage = parseInt(QueryPage);

    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesPlatformApi(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platform);
      setTotalGames(response);
    })();
  }, [query]);

  return (
    <BasicLayout>
      {!games && <Loader active>Loader Games</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No game found</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}

      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(QueryPage) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
