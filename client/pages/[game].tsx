import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { getGameByUrlApi } from './api/game';
import HeaderGame from '../components/Game/HeaderGame/HeaderGame';
import TabsGame from '../components/Game/TabsGame/TabsGame';

export default function game() {
    const [game, setGame] = useState(null)
    const {query} = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getGameByUrlApi(query.game)
            setGame(response);
            
        })()
    }, [query])

    if(!game) return null
    
    return (
        <BasicLayout>
            <HeaderGame game={game}/>
            <TabsGame game={game}/>
        </BasicLayout>
    )
}
