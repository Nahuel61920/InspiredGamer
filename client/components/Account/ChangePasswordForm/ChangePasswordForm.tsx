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
                formik.resetForm();
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
                        {formik.errors.currentPassword && <span className='error-msg'>{formik.errors.currentPassword}</span>}
                    </Form.Field>
                    <Form.Field
                        error={formik.errors.newPassword}
                    >
                        <label>New password</label>
                        <input type='password' placeholder='New password' name='newPassword' onChange={formik.handleChange} value={formik.values.newPassword} />
                        {formik.errors.newPassword && <span className='error-msg'>{formik.errors.newPassword}</span>}
                    </Form.Field>
                    <Form.Field
                        error={formik.errors.repeatNewPassword}
                    >
                        <label>Repeat new password</label>
                        <input type='password' placeholder='Repeat new password' name='repeatNewPassword' onChange={formik.handleChange} value={formik.values.repeatNewPassword} />
                        {formik.errors.repeatNewPassword && <span className='error-msg'>{formik.errors.repeatNewPassword}</span>}
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
        currentPassword: Yup.string().required("Current password is required"),
        newPassword: Yup.string().required("New password is required").min(6, 'Your password is too short.'),
        repeatNewPassword: Yup.string().required("Repeat new password is required").oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    }
}
