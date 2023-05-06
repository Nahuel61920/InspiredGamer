import React from 'react';
import ReactPlayer from 'react-player/lazy';
import moment from 'moment';
import CarouselScreenshots from "../CarouselScreenshots/CarouselScreenshots"

export default function InfoGame(props: any) {
    const {game} = props;
    const {video, title, screenshots, releaseDate} = game
    return (
        <div className='info-game'>
            <ReactPlayer className="info-game__video" url={video} controls={true}/>
            <CarouselScreenshots title={title} screenshots={screenshots}/>
            <div className='info-game__content-date'>
                <h4>Release date:</h4>
                <p>{moment(releaseDate).format("LL")}</p>
            </div>
        </div>
    )
}
