import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updatePasswordApi } from '../../../pages/api/user';

export default function ChangePasswordForm(props: any) {
    const { user, logout } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updatePasswordApi(user.email, user.id, formData.currentPassword, formData.newPassword, logout);
            if(!response) {
                toast.error("Error updating password");
            } else if (response.statusCode === 400) {
                toast.error("Current password is incorrect");
            } else {
                toast.success("Password updated");
            }
            setLoading(false);
        }
    })

    return (
        <div className='change'>
            <h4>Change password</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Current password</label>
                        <input type='password' placeholder='Current password' name='currentPassword' onChange={formik.handleChange} value={formik.values.currentPassword} />
                    </Form.Field>
                    <Form.Field
                        error={formik.errors.newPassword}
                    >
                        <label>New password</label>
                        <input type='password' placeholder='New password' name='newPassword' onChange={formik.handleChange} value={formik.values.newPassword} />
                    </Form.Field>
                    <Form.Field
                        error={formik.errors.repeatNewPassword}
                    >
                        <label>Repeat new password</label>
                        <input type='password' placeholder='Repeat new password' name='repeatNewPassword' onChange={formik.handleChange} value={formik.values.repeatNewPassword} />
                    </Form.Field>
                </Form.Group>
                <Button className='submit' loading={loading}>Update</Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    }
}

function validationSchema() {
    return {
        currentPassword: Yup.string().required(true),
        newPassword: Yup.string().required(true),
        repeatNewPassword: Yup.string().required(true).oneOf([Yup.ref('newPassword')], true)
    }
}
