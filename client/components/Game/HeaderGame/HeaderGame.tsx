import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../pages/api/favorite";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import classNames from "classnames";

export default function HeaderGame(props: any) {
  const { game } = props;
  const { poster, title } = game;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={`http://localhost:1337${poster.url}`} alt={title} />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props: any) {
  const { game } = props;

  const { title, summary, price, discount, url } = game;

  const [isFavorite, setIsFavorite] = useState(false);
  const [reealoadFavorite, setReloadFavorite] = useState(false);

  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  useEffect(() => {
    (async () => {
      const userId = auth?.idUser;
      const response = await isFavoriteApi(userId, game.id, logout);
      if (size(response) > 0) setIsFavorite(true);
      else setIsFavorite(false);
    })();
    setReloadFavorite(false);
  }, [game, reealoadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({ like: isFavorite })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Delivery 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        {discount ? (
          <div className="header-game__buy-price">
            <p>Price: {price}$</p>
            <div className="header-game__buy-price-actions">
              <p>{discount}%</p>
              <p>{(price - Math.floor(price * discount) / 100).toFixed(2)}$</p>
            </div>
          </div>
        ) : (
          <div className="header-game__buy-price">
            <div className="header-game__buy-price-actions">
              <p>Price: </p>
              <p>{price}$</p>
            </div>
          </div>
        )}
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Buy
        </Button>
      </div>
    </>
  );
}
