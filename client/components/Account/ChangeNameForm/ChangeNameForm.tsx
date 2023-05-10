import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateNameApi } from "../../../pages/api/user";

export default function ChangeNameForm(props: any) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameApi(user.id, formData, logout);
      if (!response) {
        toast.error("Error updating name and lastname");
      } else {
        toast.success("Name and lastname updated");
      }
      setLoading(false);
      setReloadUser(true);
    },
  });

  return (
    <div className="change">
      <h4>Change name and last name</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field error={formik.errors.name}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Form.Field>
          <Form.Field error={formik.errors.lastname}>
            <label>Last name</label>
            <input
              type="text"
              placeholder="Last name"
              name="lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
          </Form.Field>
        </Form.Group>
        <Button className="submit" loading={loading}>
          Update
        </Button>
      </Form>
    </div>
  );
}

function initialValues(user: any) {
  return {
    name: user.name || "",
    lastname: user.lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("Name is required"),
    lastname: Yup.string().required("Last name is required"),
  };
}
