import React, {useState, useEffect} from 'react'
import BasicLayout from '../layouts/BasicLayout/BasicLayout'
import { useRouter } from 'next/router';
import { Grid, Icon, Button } from 'semantic-ui-react';

import useAuth from '../hooks/useAuth';
import { getMeApi } from '../pages/api/user';
import ChangeNameForm from '../components/Account/ChangeNameForm/ChangeNameForm';

export default function account() {
    const [user, setUser] = useState(undefined);
    const { auth, logout } = useAuth();
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
            <Configuration user={user} logout={logout} />
        </BasicLayout>
    )
}

function Configuration(props: any) {
    const { user, logout } = props;

    return (
        <div className='account__configuration'>
            <div className='title'>Configuration</div>
            <div className='data'>
                <ChangeNameForm user={user} logout={logout} />
            </div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}
