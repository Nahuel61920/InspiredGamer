import React, {useState, useEffect} from 'react';
import { size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import {getLastGameApi} from "./api/game";
import { Loader } from 'semantic-ui-react';
import ListGames from '../components/ListGames/ListGames';

export default function Home() {
  const [games, setGames] = useState(null)
  console.log(games);
  

  useEffect(() => {
    (async () => {
      const response = await getLastGameApi(30);
      if(size(response) > 0) setGames(response)
      else setGames(null)
    })()
  }, [])
  
  return (
      <BasicLayout className="home">
        {!games && <Loader active>Loading Games</Loader>}
        {games && size(games) === 0 && (
          <div>
            <h3>No games</h3>
          </div>
        )}
        {size(games) > 0 && <ListGames games={games}/>}
      </BasicLayout>
  )
}
