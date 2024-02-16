/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/config/schema";
import useSubmit from "@/hooks/useSubmit";
import AppButton from "@/components/button";
import Input from "@/components/input";
import toast from "react-hot-toast";
import { useAuth } from "./isauth";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "./auth";
import { auth as authFire } from "../config/firebase";

const Login = ({ visible, switchToRegister, onClose }) => {
  const { setuser } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { errors, register, handleSubmit } = useSubmit(LoginSchema);

  const [errResponse, seterrResponse] = useState(null);
  const [successRes, setsuccessRes] = useState(null);

  const navigate = useNavigate();

  // const onSubmit =  (data) => {
  //   // event.preventDefault();
  //   let email = data.email;
  //   let password = data.password;
  //   axios
  //     .post(apiurl + "/auth/userlogin", {
  //       email,
  //       password,
  //     })
  //     .then(function (response) {
  //       // Handle successful login here (e.g., store tokens, redirect, etc.)
  //       const { userdata } = response.data;
  //       console.log(userdata);
  //       setuser(userdata);
  //       // Cookies.set('userdataCookie', userdata.token, { expires: 7, path: '/', httpOnly: true });

  //       const expires = new Date(Date.now() + 60 * 60 * 10000);
  //       document.cookie = `token=${userdata.token}; expires=${expires.toUTCString()}; path=/; httpOnly: true;`;

  //       setsuccessRes(response.data.message);

  //       window.location.href = "./";
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
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(authFire, email, password);
      await toast.success("Successfully signed in");
      onClose();
    } catch (error) {
      // Handle different error codes using a switch case
      console.log(error);
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found. Please check your email and try again.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address. Please enter a valid email.");
          break;
        default:
          toast.error("An error occurred. Please try again later.");
          break;
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
        // className="flex items-center justify-center"
        className="flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-[0.8] backdrop-blur-0"
      >
        <div className="flex flex-col gap-8 bg-[#fff] mx-auto md:mx-24 p-10 rounded-[12px] h-auto md:w-[28rem] md:max-w-[50%]">
          <h1 className="text-primary md:text-4xl text-2xl font-bold ">
            Login
          </h1>
          {errResponse ? (
            <div
              className="text-center alert alert-danger text-danger"
              id="message"
              role="alert"
              style={{ color: "red" }}
            >
              {errResponse}
            </div>
          ) : successRes ? (
            <div
              className="text-center alert alert-success"
              id="message"
              role="alert"
              style={{ color: "green" }}
            >
              {successRes}
            </div>
          ) : (
            <p className="text-secondary text-sm md:text-base font-normal ">
              Enter your Account Details Below
            </p>
          )}

          <form
            onSubmit={(e) => handleSubmitFire(e)}
            className="flex flex-col gap-2 "
          >
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
              onChange={(e) => setEmail(e?.target?.value)}
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
              onChange={(e) => setPassword(e?.target?.value)}
            />
            <div className="flex flex-col gap-2 ">
              <AppButton variant="primary" type="submit">
                Login
              </AppButton>
              <p className="text-lg text-center text-secondary">
                Don't have an account?{" "}
                <span
                  className="text-tetiary font-bold cursor-pointer"
                  onClick={switchToRegister}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
