import React, { useState } from "react";
import useSubmit from "@/hooks/useSubmit";
import { LoginSchema } from "@/config/schema";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import MapView from "@/components/mymap";
import Button from "@/components/button";
import SearchBox from "@/components/search";
import Report from "@/components/report";
import { useLocation } from "react-router-dom";

const AllReports = () => {
  const location = new URLSearchParams(useLocation().search).get("position");

  console.log("the location: ", location);
  const { errors, register, handleSubmit } = useSubmit(LoginSchema);
  const [selectPosition, setSelectPosition] = useState(null);

  const onLogin = (data) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <NavBar />

      <section className="bg-white items-start justify-center ">
        <div className="flex flex-col md:flex-row gap-4 py-4 px-4 md:px-4  max-w-[90rem] mx-auto w-full items-start justify-center space-x-5 ">
          <div
            // onClick={() => {
            //   window.location.href = "/report";
            // }}
            className="flex flex-col gap-4 cursor-pointer p-2"
          >
            <div className="flex flex-col ">
              <p className="text-secondary text-2xl font-semibold">
                All Reports
              </p>
              <p className="text-secondary text-sm font-semibold">
                showing <span className="text-tetiary">1-3</span> of 245 results
              </p>
            </div>
            <Report />
            
          </div>
          <div className="flex flex-col gap-2">
            <SearchBox selectPosition={location} setSelectPosition={location} />
            <div className="hidden md:flex md:flex-col gap-4  md:p-1 bg-tetiary z-10">
              <MapView selectPosition={selectPosition} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default AllReports;
