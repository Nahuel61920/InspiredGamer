import React from 'react'
import { Form, Button } from 'semantic-ui-react';

import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function AddressForm() {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            console.log(formData)
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
                <label>Address title</label>
                <input type='text' placeholder='Address title' name='title' onChange={formik.handleChange} value={formik.values.title}/>
                {formik.errors.title && <span className='error-msg'>{formik.errors.title}</span>}
            </Form.Field>

            <Form.Group widths="equal">
                <Form.Field>
                    <label>Name and surname</label>
                    <input type='text' placeholder='Name and surname' name='name' onChange={formik.handleChange} value={formik.values.name}/>
                    {formik.errors.name && <span className='error-msg'>{formik.errors.name}</span>}
                </Form.Field>
                <Form.Field>
                    <label>Address</label>
                    <input type='text' placeholder='Address' name='address' onChange={formik.handleChange} value={formik.values.address}/>
                    {formik.errors.address && <span className='error-msg'>{formik.errors.address}</span>}
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>City</label>
                    <input type='text' placeholder='City' name='city' onChange={formik.handleChange} value={formik.values.city}/>
                    {formik.errors.city && <span className='error-msg'>{formik.errors.city}</span>}
                </Form.Field>
                <Form.Field>
                    <label>State / Province / Region</label>
                    <input type='text' placeholder='State / Province / Region' name='state' onChange={formik.handleChange} value={formik.values.state}/>
                    {formik.errors.state && <span className='error-msg'>{formik.errors.state}</span>}
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Postal code</label>
                    <input type='text' placeholder='Postal code' name='postalCode' onChange={formik.handleChange} value={formik.values.postalCode}/>
                    {formik.errors.postalCode && <span className='error-msg'>{formik.errors.postalCode}</span>}
                </Form.Field>
                <Form.Field>
                    <label>Phone number</label>
                    <input type='text' placeholder='Phone number' name='phone' onChange={formik.handleChange} value={formik.values.phone}/>
                    {formik.errors.phone && <span className='error-msg'>{formik.errors.phone}</span>}
                </Form.Field>
            </Form.Group>
            <div className='actions'>
                <Button className='submit' type='submit'>
                    Create address
                </Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        title: '',
        name: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: ''
    }
}

function validationSchema() {
    return {
        title: Yup.string().required("Title is required."),
        name: Yup.string().required("Name is required."),
        address: Yup.string().required("Address is required."),
        city: Yup.string().required("City is required."),
        state: Yup.string().required("State is required."),
        postalCode: Yup.string().required("Postal code is required."),
        phone: Yup.string().required("Phone number is required."),
    }
}
