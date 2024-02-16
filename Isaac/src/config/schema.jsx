import { object, string, ref, number, date } from "yup";
import * as yup from "yup";

export const LoginSchema = object().shape({
  email: string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: string().trim().required("Password is required"),
});

export const SignUpSchema = object().shape({
  fullName: string().trim().required("Your Full Name is required"),
  email: string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: string().trim().required("Password is required"),
  repeatPassword: string()
    .trim()
    .oneOf([yup.ref("password"), undefined], "Passwords Don't Match")
    .required(),
});
export const ReportIssueSchema = object().shape({
  category: string().trim().required("Please select a Category"),
  state: string().trim().required("Please select a state"),
  lga: string().trim().required("Please select a Local Government"),
  title: string().trim().required("Please enter a title for the report"),
});

// export const LoginSchema = yup.object().shape({
//   email: yup.string().trim().email().required("Email is required"),
//   password: yup.string().trim().min(8).required("Password is required"),
// });

// export const RegisterSchema = yup.object().shape({
//   fullName: yup.string().trim().required("Your Full Name is required"),
//   userName: yup.string().trim().required("Your Username is required"),
//   email: yup.string().trim().email().required("Your Email is Required"),
//   password: yup.string().trim().min(8).required(),
//   confirmPassword: yup
//     .string()
//     .trim()
//     .oneOf([yup.ref("password"), undefined], "Passwords Don't Match")
//     .required(),
// });
