import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { updateEmailApi } from "../../../pages/api/user";

export default function ChangeEmailForm(props: any) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response) {
        toast.error("Error updating email");
      } else if (response.statusCode === 400) {
        toast.error(response.message[0].messages[0].message);
      } else {
        toast.success("Email updated");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change">
      <h4>Change email</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field error={formik.errors.email}>
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <span className="error-msg">{formik.errors.email}</span>
            )}
          </Form.Field>
          <Form.Field error={formik.errors.repeatEmail}>
            <label>Repeat email</label>
            <input
              type="text"
              placeholder="Repeat email"
              name="repeatEmail"
              onChange={formik.handleChange}
              value={formik.values.repeatEmail}
            />
            {formik.errors.repeatEmail && (
              <span className="error-msg">{formik.errors.repeatEmail}</span>
            )}
          </Form.Field>
        </Form.Group>
        <Button className="submit" loading={loading}>
          Update
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    repeatEmail: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email("The email is not valid.")
      .required("User email is required."),
    repeatEmail: Yup.string()
      .required("Repeat email is required.")
      .oneOf([Yup.ref("email")], "The emails must be the same."),
  };
}
