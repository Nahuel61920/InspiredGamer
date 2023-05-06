import React, { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';

export default function HeaderGame(props: any) {
    const { game } = props;
    const { poster, title } = game
    console.log(game);

    return (
        <Grid className='header-game'>
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={`http://localhost:1337${poster.url}`} alt={title} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info game={game} />
            </Grid.Column>
        </Grid>
    )
}

function Info(props: any) {
    const { game } = props;
    const { title, summary, price, discount } = game;

    return (
        <>
            <div className="header-game__title">
                {title}
                <Icon name='heart outline' className='like' link />
            </div>
            <div className='header-game__delivery'>Delivery 24/48h</div>
            <div className='header-game__summary' dangerouslySetInnerHTML={{ __html: summary }} />
            <div className='header-game__buy'>
                {
                    discount ?
                        <div className='header-game__buy-price'>
                            <p>Price: {price}$</p>
                            <div className='header-game__buy-price-actions'>
                                <p>{discount}%</p>
                                <p>{price - Math.floor(price * discount) / 100}$</p>
                            </div>
                        </div>
                        : 
                        <div className='header-game__buy-price'>
                            <div className='header-game__buy-price-actions'>
                                <p>Price: </p>
                                <p>{price}$</p>
                            </div>
                        </div>
                }
                <Button className='header-game__buy-btn'>Buy</Button>
            </div>
        </>
    )
}

