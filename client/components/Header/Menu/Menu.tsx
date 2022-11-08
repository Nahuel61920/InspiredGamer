import React, {useState} from 'react'
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react"
import Link from 'next/link'

export default function MenuWeb() {

    return (
        <div className='menu'>
            <Container>
                <Grid>
                    <Grid.Column className='menu__left' width={6}>
                        <MenuPlatfomrs />
                    </Grid.Column>
                    <Grid.Column className='menu__right' width={10}>
                        <MenuOptions />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

function MenuPlatfomrs() {
    return (
        <Menu>
            <Link href="/ps5">
                <Menu.Item>
                    PS5
                </Menu.Item>
            </Link>
            <Link href="/xbox">
                <Menu.Item>
                    Xbox
                </Menu.Item>
            </Link>
            <Link href="/switch">
                <Menu.Item>
                    Switch
                </Menu.Item>
            </Link>
        </Menu>
    )
}

function MenuOptions() {
    return (
        <Menu>
            <Menu.Item>
                <Icon name='user outline' />
                My account
            </Menu.Item>
        </Menu>
    )
}
