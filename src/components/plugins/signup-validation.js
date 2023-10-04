import * as Yup from "yup";

export const signup_schema = Yup.object({
  email: Yup.string().required("email is required").email("email is invalid"),
  password: Yup.string()
    .required("password is required")
    .min(6, "password must be at least 6 characters"),
  password2: Yup.string()
    .required("confirm password is required"),
  username: Yup.string().required("username is required"),
  full_name: Yup.string().required("full name is required"),

  phone: Yup.string()
    .required("phone is required")
    .matches(/^\d(3)-d(2)-\d(3)-\d(2)-\d(2)/, "phone is invalid"),
});
