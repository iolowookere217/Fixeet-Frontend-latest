import React from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.png";
import AppButton from "./button";
import { Divider } from "@chakra-ui/react";

const Footer = () => {
  return (
    <section className="bg-primary flex flex-col gap-4 p-6 items-center justify-center text-white w-auto m  ">
      <div className=" flex flex-col gap-8 md:flex-row md:justify-between md:mr-6">
        <div className="flex p-4 ml-4 ">
          <div className="flex items-center justify-center md:items-start flex-col  w-auto gap-2 ">
            <img src={Logo} alt="Fixeetlogo" />
            <p className="  text-secondary flex-wrap w-auto md:max-w-md">
              Mapping and reporting local issues to the authorities responsible
              for fixing them.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex justify-around flex-wrap items-center gap-4 p-4">
            {/* <Link className="" to="#">
              Contact Us
            </Link> */}
            {/* <Link to="/reports">Your Reports</Link> */}

            <Link to="/home">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/all-reports">All Reports</Link>
          </div>
        </div>
        <div className="flex flex-col items-center bg-white p-8 gap-4 w-[auto] rounded-[4px]">
          <p className=" text-secondary">
            You can help keep this site running by donating to the cause.
          </p>
          <AppButton variant="primary" type="submit">
            Donate Now
          </AppButton>
        </div>
      </div>

      <div className=" items-center text-center w-full text-[#FAFAFAAF] mt-4">
        <Divider />
        <p style={{ marginBottom: "3px" }}>
          <a href="https://www.linkedin.com/in/isaac-olowookere/">
            {" "}
            &copy; Copyright Fixeet {new Date().getUTCFullYear()}. All right
            reserved
          </a>
        </p>
      </div>
    </section>
  );
};

export default Footer;
