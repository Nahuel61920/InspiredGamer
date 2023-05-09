import React from "react";
import { Image, Grid } from "semantic-ui-react";
import { map } from "lodash";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpLg,
  breakpointUpMd,
  breakpointUpSm,
} from "../../utils/breakpoint";

export default function ListGames(props: any) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;

      case width > breakpointUpMd:
        return 3;

      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnRender()}>
          {map(games, (game) => (
            <Game game={game} key={game.id} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game(props: any) {
  const { game } = props;

  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <div className="list-games__game-poster">
          <Image
            src={`http://localhost:1337${game.poster.url}`}
            alt={game.title}
          />
          <div className="list-games__game-poster-info">
            {game.discount ? (
              <span className="discount">-{game.discount}%</span>
            ) : (
              <span />
            )}
            <span className="price">{game.price}$</span>
          </div>
        </div>
        <h2>{game.title}</h2>
      </Link>
    </Grid.Column>
  );
}
