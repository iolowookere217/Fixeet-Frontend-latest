/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
// import user from "/user.jpg";
// import image from "/flood.png";

const ReportCard = (report) => {
  useEffect(() => {
    console.log("report,", report);
  }, [report]);

  return (
    <div className="w-full items-center flex flex-col  md:w-[25rem] gap-4 rounded-md  relative">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <img
          className="rounded-none max-w-[14rem] w-full h-auto max-h-[11rem]"
          src={report?.report?.images[0]?.url}
          alt="Flood Picture"
        />

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between items-center text-xs text-tetiary">
            {/* <p className="text-xs text-tetiary">{DateRegistered}</p> */}
          </div>
          <p className="italic text-red-600">{report?.report?.title}</p>
          <p className=" text-xs md:text-xs text-primary font-bold">
            {report?.report?.report_detail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
