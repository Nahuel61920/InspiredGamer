import React, {useState} from 'react'
import { Grid, Input, Icon, Container, Button } from 'semantic-ui-react';

import Link from 'next/link';
import Image from 'next/image';

import BasicModal from "../../Modal/BasicModal/BasicModal"
import Auth from '../../Auth/Auth';
import useAuth from '../../../hooks/useAuth';

export default function TopBar() {
    const [ open , setOpen ] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("Login")
    
    const { auth, logout } = useAuth();

    const onShowModal = () => {
        setShowModal(true)
    } 

    const onCloseModal = () => {
        setShowModal(false)
    } 

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
                    {
                        auth ? (
                            <Button onClick={logout}>Cerrar sesión</Button>
                        ) : (
                            <Icon name="user" onClick={onShowModal} />
                        )
                    }
                </Container>
            </div>
            <Input
                id="search"
                icon={{ name: "search" }}
                className={ open ? "active" : "" }
            />
            <BasicModal 
                show={showModal} 
                setShow={setShowModal}
                title={titleModal}
                size="small"
            >
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}/>
            </BasicModal>
        </div>
    )
}
