import React, { useState, useEffect, useContext } from "react";
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import useSubmit from "@/hooks/useSubmit";
import { LoginSchema } from "@/config/schema";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import AppButton from "@/components/button";
import { FaLocationArrow } from "react-icons/fa6";
import { Flex, Input, InputGroup, Divider, Center } from "@chakra-ui/react";
import SearchBox from "@/components/search";
import ReportIssueButton from "@/components/ReportIssueButton";
import { SelectContext } from "../context/SelectContext";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../config/apiurl";

const Home = () => {
  const { errors, register, handleSubmit } = useSubmit(LoginSchema);
  const [selectPosition, setSelectPosition] = useState(null);
  const { selected, setSelected } = useContext(SelectContext);
  const navigate = useNavigate();

  const [recentIssues, setrecentIssues] = useState();
  const [recentIssuesRes, setrecentIssuesRes] = useState("");

  const lastissues = recentIssues ? recentIssues[0] : "";

  const getRecent = () => {
    axios
      .get(apiurl + "/getRecentIssues")
      .then(function (response) {
        setrecentIssues(response.data.RecentIssuesdocuments);
        setrecentIssuesRes("");
      })
      .catch(function (error) {
        setrecentIssuesRes(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {}, []);
  const gimmeUrLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setSelected({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      navigate(`/all-reports`);
    });
  };

  const center = {
    lat: currentLocation.lat,
    lng: currentLocation.lng,
  };

  useEffect(() => {
    getRecent();
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <section className="bg-white ">
        <div className="flex flex-col md:flex-row gap-4 p-8 px-4 md:px-8 justify-center items-center w-auto h-auto">
          <div className="flex flex-col gap-8 md:p-4">
            <p className="text-2xl font-semibold  md:text-6xl lg:text-8xl md:font-bold ">
              Bring your local issues to{" "}
              <span className="text-tetiary">Light!</span>
            </p>
          </div>
          <div className="flex flex-col gap-8 p-4 md:p-4">
            {" "}
            <h2 className="text-primary  flex flex-wrap md:text-2xl font-semibold text-[1.1rem]">
              Call attention to issues in your locality and notify the
              appropriate authorities to get them resolved
            </h2>
            <SearchBox
              selectPosition={selected}
              setSelectPosition={setSelected}
            />
            <div className="flex flex-col gap-4 w-auto align-middle md:flex-row  md:max-w-[full] justify-between">
              {" "}
              <AppButton
                variant="tertiary"
                type="submit"
                onClick={gimmeUrLocation}
                className=" rounded-[0.25rem] flex items-center gap-2 justify-center hover:border-[#007A4E]"
              >
                <FaLocationArrow /> Use my Location
              </AppButton>
              <div>
                <ReportIssueButton />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light flex flex-col gap-4 py-4 items-center space-x-10">
        <h2 className="font-bold text-2xl mt-4 flex mx-12 ">
          How to report an Issue.
        </h2>

        <div className="flex-col   flex md:flex-row md:space-x-10 gap-4 ">
          <div className="flex items-center gap-4 text-secondary font-semibold">
            <h2 className="text-5xl"> 1 </h2>
            <Center height="50px">
              <Divider orientation="vertical" />
            </Center>
            <div className="font-medium flex flex-col">
              <p className="">Click Report Issue</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-secondary font-semibold">
            <h2 className="text-5xl"> 2 </h2>
            <Center height="50px">
              <Divider orientation="vertical" />
            </Center>
            <div className="font-medium">
              <p className="">Enter details of the issue</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-secondary font-semibold">
            <h2 className="text-5xl"> 3 </h2>
            <Center height="50px">
              <Divider orientation="vertical" />
            </Center>
            <div className="font-medium">
              <p className="">Add Images </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-secondary font-semibold">
            <h2 className="text-5xl"> 4 </h2>
            <Center height="50px">
              <Divider orientation="vertical" />
            </Center>
            <div className="font-medium">
              <p className="">We'll send to the right authorities</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white items-center justify-center ">
        <div className="flex flex-col items-center p-8">
          <h2 className="font-bold text-2xl  ">Recent Reports</h2>
          {recentIssues ? (
            <div className="flex flex-col min-w-[10rem] lg:flex-row gap-4 py-4 px-2 md:px-8  md:max-w-[90rem]  w-auto items-center justify-center space-x-5">
              {lastissues && (
                <div
                  key={lastissues._id}
                  onClick={() => {
                    window.location.href = `/report/${lastissues._id}`;
                  }}
                  className="flex flex-col gap-4 p-2 md:p-4"
                >
                  {" "}
                  <img
                    className="w-[auto] h-[auto]"
                    src={lastissues.imageUrl[0]}
                    alt="fire incidence"
                  />
                  <div>
                    <p className="text-xs text-tetiary">
                      {lastissues.DateRegistered}
                    </p>
                    <h2 className="md:text-2xl font-semibold text-primary">
                      {lastissues.Title}
                    </h2>
                    <p className="text-xl flex flex-wrap md:w-[36rem] text-secondary">
                      {lastissues.IssuesDetails}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col  gap-4 cursor-pointer p-2 ">
                {recentIssues.slice(1).map((newissue, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      window.location.href = `/report/${newissue._id}`;
                    }}
                    className="flex flex-col gap-4 p-2 md:p-4"
                  >
                    {" "}
                    <img
                      className="w-[auto] h-[auto]"
                      src={newissue.imageUrl[0]}
                      alt="fire incidence"
                    />
                    <div>
                      <p className="text-xs text-tetiary">
                        {newissue.DateRegistered}
                      </p>
                      <h2 className="md:text-2xl font-semibold text-primary">
                        {newissue.Title}
                      </h2>
                      <p className="text-xl flex flex-wrap md:w-[36rem] text-secondary">
                        {newissue.IssuesDetails}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : recentIssuesRes ? (
            <div
              className="text-center alert alert-success"
              id="message"
              role="alert"
              style={{ color: "red", fontSize: "20px", marginTop: "50px" }}
            >
              {recentIssuesRes}
            </div>
          ) : (
            <p
              className="text-secondary text-sm md:text-base font-normal "
              style={{ color: "red", fontSize: "20px", marginTop: "50px" }}
            >
              Could not fetch any recent issues, please try again later
            </p>
          )}
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
