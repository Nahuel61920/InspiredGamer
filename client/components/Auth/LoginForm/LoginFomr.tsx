import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../pages/api/user";

export default function LoginFomr(props: any) {
  const [loading, setLoading] = useState(false);
  const { showSignInForm, onCloseModal } = props;
  const { login, auth } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        toast.success("essfully logged in");
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("Email or password are incorrect");
      }
      setLoading(false);
    },
  });

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: "You must enter a valid email" });
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Field error={formik.errors.identifier}>
        <label>Email</label>
        <input
          name="identifier"
          type="text"
          placeholder="Email"
          onChange={formik.handleChange}
        />
        {formik.errors.identifier ? (
          <p className="error-msg">{formik.errors.identifier}</p>
        ) : null}
      </Form.Field>
      <Form.Field error={formik.errors.password}>
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
        />
        {formik.errors.password ? (
          <p className="error-msg">{formik.errors.password}</p>
        ) : null}
      </Form.Field>

      <div className="actions">
        <Button type="button" basic onClick={showSignInForm}>
          Sign In
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Enter
          </Button>
          <Button className="submit" type="button" onClick={resetPassword}>
            Have you forgotten the password?
          </Button>
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string()
      .email("The email is not valid.")
      .required("User email is required."),
    password: Yup.string()
      .required("The password is required.")
      .min(6, "Your password is too short."),
  };
}
