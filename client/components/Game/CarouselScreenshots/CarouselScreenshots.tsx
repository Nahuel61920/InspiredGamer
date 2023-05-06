import React, { useState } from 'react';
import { Image, Modal } from 'semantic-ui-react';
import Slider from "react-slick";
import { map } from 'lodash';

const settings = {
    className: "carousel-screenshots",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
}


export default function CarouselScreenshots(props: any) {

    const { title, screenshots } = props;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null || String);

    const openImage = (url: string) => {
        setUrlImage(url);
        setShowModal(true)
    }


    return (
        <>
            <Slider {...settings}>
                {map(screenshots, (screenshot) => (
                    <Image
                        key={screenshot.id}
                        src={`http://localhost:1337${screenshot.url}`}
                        alt={screenshot.name}
                        onClick={() => openImage(`http://localhost:1337${screenshot.url}`)}
                    />
                ))}
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size='large'>
                <Image src={urlImage} alt={title} />
            </Modal>
        </>
    )
}
