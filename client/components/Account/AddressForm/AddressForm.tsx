import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

import { useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "../../../hooks/useAuth";
import {
  createAddressApi,
  updateAddressesApi,
} from "../../../pages/api/address";
import { toast } from "react-toastify";

export default function AddressForm(props: any) {
  const { setShowModal, setReloadAddresses, newAddress, address } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  const createAddress = async (formData: any) => {
    setLoading(true);

    const authID: any = auth;
    const formDataTemp = {
      ...formData,
      users_permissions_user: authID.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.warning("Error created address");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
      toast.success("Address created successfully");
    }
  };

  const updateAddress = async (formData: any) => {
    setLoading(true);

    const authID: any = auth;
    const formDataTemp = {
      ...formData,
      users_permissions_user: authID.idUser,
    };
    const response = await updateAddressesApi(
      address._id,
      formDataTemp,
      logout
    );
    if (!response) {
      toast.warning("Error updating address");
      setLoading(false);
    } else {
      formik.resetForm();
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
      toast.success("Address updating successfully");
    }
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Field error={formik.errors.title}>
        <label>Address title</label>
        <input
          type="text"
          placeholder="Address title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {/* {formik.errors.title && <span className='error-msg'>{newAddress ? formik.errors.title : null}</span>} */}
      </Form.Field>

      <Form.Group widths="equal">
        <Form.Field error={formik.errors.name}>
          <label>Name and surname</label>
          <input
            type="text"
            placeholder="Name and surname"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {/* {formik.errors.name && <span className='error-msg'>{formik.errors.name}</span>}*/}
        </Form.Field>
        <Form.Field error={formik.errors.address}>
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {/* {formik.errors.address && <span className='error-msg'>{formik.errors.address}</span>} */}
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field error={formik.errors.city}>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          {/* {formik.errors.city && <span className='error-msg'>{formik.errors.city}</span>} */}
        </Form.Field>
        <Form.Field error={formik.errors.state}>
          <label>State / Province / Region</label>
          <input
            type="text"
            placeholder="State / Province / Region"
            name="state"
            onChange={formik.handleChange}
            value={formik.values.state}
          />
          {/* {formik.errors.state && <span className='error-msg'>{formik.errors.state}</span>} */}
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field error={formik.errors.postalCode}>
          <label>Postal code</label>
          <input
            type="text"
            placeholder="Postal code"
            name="postalCode"
            onChange={formik.handleChange}
            value={formik.values.postalCode}
          />
          {/* {formik.errors.postalCode && <span className='error-msg'>{formik.errors.postalCode}</span>} */}
        </Form.Field>
        <Form.Field error={formik.errors.phone}>
          <label>Phone number</label>
          <input
            type="text"
            placeholder="Phone number"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {/* {formik.errors.phone && <span className='error-msg'>{formik.errors.phone}</span>} */}
        </Form.Field>
      </Form.Group>
      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Create address" : "Update address"}
        </Button>
      </div>
    </Form>
  );
}

function initialValues(address: any) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
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
  };
}
