import React, { useState, useEffect, useContext } from "react";
import ReportCard from "./reportCard";
// import { myData } from "@/utils/dummyData";
import AppButton from "@/components/button";
import axios from "axios";
import { apiurl } from "../config/apiurl";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { ReportsContext } from "../context/ReportsContext";

const perPage = 3;

const Report = () => {
  const { data } = useContext(ReportsContext);
  const [errRes, seterrRes] = useState("");

  const [page, setPage] = useState(1);
  const skip = page * perPage - perPage;
  const isDisabled = page === Math.ceil(data.length / perPage);

  const handleNext = () => {
    if (!isDisabled) {
      setPage((page) => page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex flex-col relative md:flex-row gap-4 py-4 px-4 md:px-4  max-w-[90rem] mx-auto w-full items-start justify-center space-x-5 ">
          <div className="flex flex-col gap-4 ">
            {data ? (
              data.slice(skip, skip + perPage).map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 cursor-pointer p-2"
                >
                  <Link to={`/report/${data.id}`}>
                    <ReportCard report={data} />
                  </Link>
                </div>
              ))
            ) : errRes ? (
              <div
                className="text-center alert alert-success"
                id="message"
                role="alert"
                style={{ color: "red", fontSize: "20px", marginTop: "50px" }}
              >
                {errRes}
              </div>
            ) : (
              <p
                className="text-danger text-sm md:text-base font-normal "
                style={{ color: "red", fontSize: "20px", marginTop: "50px" }}
              >
                Could not fetch issues, please try again later
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 justify-around font-semibold ">
          <AppButton
            variant="tertiary"
            className={`${
              page === 1 ? "text-[#fff]" : "text-[#000]"
            } bg-gray-300 p-2 rounded-md hover:bg-[#989898]`}
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </AppButton>
          <AppButton
            variant="primary"
            className={`${
              isDisabled ? "text-[#fff]" : "text-[#000]"
            } bg-green-300 p-2 rounded-md hover:bg-[#007A4E]`}
            onClick={handleNext}
            disabled={isDisabled}
          >
            Next
          </AppButton>
        </div>
      </div>
    </>
  );
};

export default Report;
