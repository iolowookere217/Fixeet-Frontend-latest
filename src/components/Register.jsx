import React, { useContext, useState } from "react";
import axios from "axios";
import { SignUpSchema } from "@/config/schema";
import useSubmit from "@/hooks/useSubmit";
import AppButton from "@/components/button";
import Input from "@/components/input";
import { apiurl } from "../config/apiurl";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = ({ visible, onClose, switchToLogin }) => {
  const { signOutFire } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useSubmit(SignUpSchema);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [invalidUser, setIsInvalidUser] = useState("");
  const [repeatPasswd, setRepeatPasswd] = useState("");
  const [errResponse, seterrResponse] = useState(null);
  const [successRes, setsuccessRes] = useState(null);
  // const onSubmit = (data) => {
  //   // console.log(data);

  //   let userName = data.name;
  //   let emailAddress = data.email;
  //   let userPassword = data.password;
  //   let repeatPassword = data.repeatPassword;
  //   axios
  //     .post(apiurl + "/auth/registeruser", {
  //       userName,
  //       emailAddress,
  //       userPassword,
  //       repeatPassword,
  //     })
  //     .then(function (response) {
  //       // Handle successful login here (e.g., store tokens, redirect, etc.)
  //       setsuccessRes(response.data.message);
  //     })
  //     .catch(function (error) {
  //       if (error.response.status === 422) {
  //         seterrResponse(error.response.data.message);
  //       } else {
  //         seterrResponse("An error occurred. Please try again later.");
  //       }
  //     });
  // };

  const handleSubmitFire = async (e) => {
    e.preventDefault();
    try {
      const missingFields = [];
      if (fullName === "") {
        missingFields.push("Fullname");
      }
      if (email === "") {
        missingFields.push("Email");
      }
      if (password === "") {
        missingFields.push("Password");
      }
      if (repeatPasswd === "") {
        missingFields.push("Confirm password");
      }
      if (missingFields.length > 0) {
        const missingFieldsString = missingFields.join(", ");
        toast.error(
          `Please fill in the required fields: ${missingFieldsString}`
        );
        return;
      }

      if (password != repeatPasswd) {
        toast.error("Pls confirm password");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth?.currentUser, { displayName: fullName });
      await signOutFire();
      await switchToLogin();
    } catch (error) {
      console.log(error);
      console.log("Bawo ni naa");
      if (error.code === "auth/email-already-in-use") {
        setEmail("");
        setPassword("");
        setFullName("");
        setRepeatPasswd("");
        setIsInvalidUser("User already exists");
      } else if (error.code === "auth/weak-password") {
        setIsInvalidUser("Password is too weak");
      } else {
        setIsInvalidUser("An error occurred during sign-up.");
      }
    }
  };
  const handleOnClose = (e) => {
    if (e.target.id === "close-modal") onClose();
  };

  if (!visible) return null;

  return (
    <React.Fragment>
      <section
        id="close-modal"
        onClick={handleOnClose}
        className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-[0.8] backdrop-blur-0 z-40"
      >
        <div className="flex flex-col gap-2 bg-[#fff] mx-auto md:mx-24 p-10 rounded-xl h-[36rem] md:w-[28rem] md:max-w-[40%]">
          <h1 className="text-primary md:text-4xl text-2xl font-bold -mt-3">
            Register
          </h1>
          {invalidUser ? (
            <div
              className="text-center gen alert alert-danger text-danger"
              id="message"
              role="alert"
              style={{ color: "red" }}
            >
              {invalidUser}
            </div>
          ) : successRes ? (
            <div
              className="text-center gen alert alert-success"
              id="message"
              role="alert"
              style={{ color: "green", fontWeight: "bold" }}
            >
              {successRes}
            </div>
          ) : (
            <p className=" text-center  text-secondary text-sm md:text-base font-normal ">
              Enter your Account Details Below
            </p>
          )}

          <form
            className="flex flex-col gap-2 "
            onSubmit={(e) => handleSubmitFire(e)}
          >
            {/* <input
              type="text"
              value={fullName}
              placeholder="What should we call you?"
              onChange={(e) => setFullName(e.target.value)}
            /> */}
            <Input
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="What should we call you?"
              label="Full Name"
              variant="primary"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              name="email"
              type="email"
              register={register}
              errors={errors}
              autoComplete="email"
              placeholder="Enter Email Address"
              label="Email Address"
              variant="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              register={register}
              errors={errors}
              placeholder="Enter Password"
              id="password"
              label="Password"
              variant="primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              name="repeatPassword"
              type="password"
              register={register}
              errors={errors}
              placeholder="Confirm Password"
              id="repeatPassword"
              label="Repeat Password"
              variant="primary"
              value={repeatPasswd}
              onChange={(e) => setRepeatPasswd(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <AppButton variant="primary" type="submit">
                Register
              </AppButton>
              <p className="text-lg text-center text-secondary">
                Already have an account?{" "}
                <span
                  className="text-tetiary font-bold cursor-pointer"
                  onClick={switchToLogin}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;
