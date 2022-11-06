import React from 'react'
import { Button } from 'semantic-ui-react'

export default function LoginFomr(props: any) {

    const { showSignInForm } = props
    return (
        <div>
            <h2>LoginFomr</h2>
            <Button onClick={showSignInForm}>Sign-In</Button>
        </div>
    )
}
