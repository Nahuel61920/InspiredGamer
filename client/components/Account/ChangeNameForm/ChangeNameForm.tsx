import React, {useState, useEffect} from 'react'
import { Grid, Icon, Button, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/useAuth';
import { getMeApi } from '../../../pages/api/user';

export default function ChangeNameForm(props: any) {
    const { user, logout } = props;

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log(formData);
        }
    })

    return (
        <div className='change-name-form'>
            <h4>Change name and last name</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field
                        error={formik.errors.name}
                    >
                        <input type='text' placeholder='Name' name='name' onChange={formik.handleChange} value={formik.values.name} />
                    </Form.Field>
                    <Form.Field
                        error={formik.errors.lastname}
                    >
                        <input type='text' placeholder='Last name' name='lastname' onChange={formik.handleChange} value={formik.values.lastname} />
                    </Form.Field>
                </Form.Group>
                <Button className='submit'>
                    Update
                </Button>
            </Form>
        </div>
    )
}

function initialValues(user: any) {
    return {
        name: user.name || '',
        lastname: user.lastname || ''
    }
}

function validationSchema() {
    return {
        name: Yup.string().required("Name is required"),
        lastname: Yup.string().required("Last name is required")
    }
}