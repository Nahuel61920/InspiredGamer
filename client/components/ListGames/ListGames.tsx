import React from 'react';
import { map } from 'lodash';

export default function ListGames(props: any) {
    const {games} = props;
    return (
        <div className='list-games'>
            {
                map(games, (game) => (
                    <h3>{game.title}</h3>
                ))
            }
        </div>
    )
}
