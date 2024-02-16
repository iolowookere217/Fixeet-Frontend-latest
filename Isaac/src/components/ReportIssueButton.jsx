import ReportIssue from "./ReportIssue";
import React, { useState } from "react";

const ReportIssueButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className=" w-[100%] cursor-pointer flex text-white  bg-tetiary hover:bg-[#007A4E] items-center rounded-[0.25rem] h-[2.7rem] md:w-[10rem] justify-center "
        variant="primary"
      >
        Report an Issue
      </button>
      {showModal && <ReportIssue onClose={handleModalClose} />}
    </>
  );
};

export default ReportIssueButton;
