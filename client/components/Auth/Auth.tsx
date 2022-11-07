import React, {useState} from 'react'
import LoginFomr from './LoginForm/LoginFomr';
import SignInForm from './SignInForm/SignInForm';



export default function Auth(props: any) {

    const {onCloseModal, setTitleModal} = props;
    const [showLogin, setShowLogin] = useState(true)

    const showLoginForm = () => {
        setShowLogin(true)
        setTitleModal("Login")
    }
    const showSignInForm = () => {
        setShowLogin(false)
        setTitleModal("Sing-In")
    }

    return showLogin ? <LoginFomr showSignInForm={showSignInForm} onCloseModal={onCloseModal}/> : <SignInForm showLoginForm={showLoginForm}/>
}
