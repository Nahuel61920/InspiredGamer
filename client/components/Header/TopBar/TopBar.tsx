import React, {useState} from 'react'
import { Grid, Input, Icon, Container, Button } from 'semantic-ui-react';

import Link from 'next/link';

export default function TopBar() {
    const [ open , setOpen ] = useState(false);
    

    return (
        <div>
            <div className='top-bar'>
                <Container className='top-bar-container'>
                    <Icon {...open ? {name: "times"} : {name: "search"}} className={ open ? "active-times" : "" } onClick={ () => setOpen(!open)}/>
                    <Link href="#destacados">Destacados</Link>
                    <Link href="#juegos">Juegos</Link>
                    <Link href="/" className="logo">Inspired<span>Gamer</span></Link>
                    <Link href="#blog">Blog</Link>
                    <Link href="#contacto">Contacto</Link>
                    <Icon name="cart" />
                </Container>
            </div>
            <Input
                id="search"
                icon={{ name: "search" }}
                className={ open ? "active" : "" }
            />
        </div>
    )
}
