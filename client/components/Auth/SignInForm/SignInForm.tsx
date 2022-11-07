import React, { useState } from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {registerApi} from "../../../pages/api/user"

import { toast } from 'react-toastify';


export default function SignInForm(props: any) {

    const [loading, setLoading] = useState(false);
    const { showLoginForm } = props

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await registerApi(formData);
            if (response?.jwt) {
                toast.success("Successfully registered user");
                showLoginForm();
            } else {
                toast.error("Error registering user, try again later");
            }
            setLoading(false);
        },
    });

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    error={formik.errors.name}
                >
                    <label>Name</label>
                    <input
                        name='name'
                        type="text"
                        placeholder='Name'
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.name ? <p className='error-msg'>{formik.errors.name}</p> : null
                    }
                </Form.Field>
                <Form.Field
                    error={formik.errors.lastname}
                >
                    <label>Last Name</label>
                    <input
                        name='lastname'
                        type="text"
                        placeholder='Last Name'
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.lastname ? <p className='error-msg'>{formik.errors.lastname}</p> : null
                    }
                </Form.Field>
            </Form.Group>
            <Form.Field
                error={formik.errors.username}
            >
                <label>User Name</label>
                <input
                    name='username'
                    type="text"
                    placeholder='User Name'
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.username ? <p className='error-msg'>{formik.errors.username}</p> : null
                }
            </Form.Field>
            <Form.Field
                error={formik.errors.email}
            >
                <label>Email</label>
                <input
                    name='email'
                    type="text"
                    placeholder='Email'
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.email ? <p className='error-msg'>{formik.errors.email}</p> : null
                }
            </Form.Field>
            <Form.Group widths='equal'>
                <Form.Field
                    error={formik.errors.password}
                >
                    <label>Password</label>
                    <input
                        name='password'
                        type="password"
                        placeholder='Password'
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.password ? <p className='error-msg'>{formik.errors.password}</p> : null
                    }
                </Form.Field>
                <Form.Field
                    error={formik.errors.confirmpassword}
                >
                    <label>Confirm Password</label>
                    <input
                        name='confirmpassword'
                        type="password"
                        placeholder='Confirm Password'
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.confirmpassword ? <p className='error-msg'>{formik.errors.confirmpassword}</p> : null
                    }
                </Form.Field>
            </Form.Group>

            <div className="actions">
                <Button type="button" basic onClick={showLoginForm}>
                    Login
                </Button>
                <Button className="submit" type="submit" loading={loading}>
                    Enter
                </Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    };
}

function validationSchema() {
    return {
        name: Yup.string().required("Name is required."),
        lastname: Yup.string().required("Last name is required."),
        username: Yup.string().required("Username is required."),
        email: Yup.string().email("The email is not valid.").required("User email is required."),
        password: Yup.string().required("The password is required.").min(6, 'Your password is too short.'),
        confirmpassword: Yup.string().oneOf([Yup.ref('password.'), null], 'Passwords must match.')
    };
}