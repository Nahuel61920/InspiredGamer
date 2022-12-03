import React, {useState, useEffect} from 'react'
import BasicLayout from '../layouts/BasicLayout/BasicLayout'
import { useRouter } from 'next/router';
import { Grid, Icon, Button } from 'semantic-ui-react';

import useAuth from '../hooks/useAuth';
import { getMeApi } from '../pages/api/user';
import ChangeNameForm from '../components/Account/ChangeNameForm/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm/ChangePasswordForm';
import BasicModal from '../components/Modal/BasicModal/BasicModal';

export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null);
        })()
    }, [auth])

    if(user === undefined) return null;

    if(!auth && !user) {
        router.replace('/');
        return null;
    }

    return (
        <BasicLayout className='account'>
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser} />
            <Address />
        </BasicLayout>
    )
}

function Configuration(props: any) {
    const { user, logout, setReloadUser } = props;

    return (
        <div className='account__configuration'>
            <h2 className='title'>Configuration</h2>
            <div className='data'>
                <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangePasswordForm user={user} logout={logout}/>
            </div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

function Address() {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [formModal, setFormModal] = useState(null)

    const openModal = (title: string) => {
        setTitleModal(title)
        setFormModal(<h2>New Address...</h2>)
        setShowModal(true)
    }

    return (
        <div className='account__addresses'>
            <h2 className='title'>
                Addresses
                <Icon name="plus" link onClick={() => openModal("New Address")}/>   
            </h2>
            <div>
                <p>Address list</p>
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                <p>Form</p>
            </BasicModal>
        </div>
    )
}
