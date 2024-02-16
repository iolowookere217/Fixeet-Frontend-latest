import React, { useContext, useState, useEffect } from "react";
import useSubmit from "@/hooks/useSubmit";
import { LoginSchema } from "@/config/schema";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import MapView from "@/components/mymap";
import Button from "@/components/button";
import { Flex, Input, InputGroup, Divider, Center } from "@chakra-ui/react";
import { Select, Textarea } from "@chakra-ui/react";
import { IoCaretBackOutline } from "react-icons/io5";
import SearchBox from "@/components/search";
import { SelectContext } from "../context/SelectContext";

import { useParams } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../config/apiurl";

import { useAuth } from "@/components/isauth";

const Report = (handleOnClose) => {
  const { isLoggedin } = useAuth();

  const { errors, register, handleSubmit } = useSubmit(LoginSchema);
  // const [selectPosition, setSelectPosition] = useState(null);
  const { selected, setSelected } = useContext(SelectContext);

  const { id } = useParams();

  const [data, setData] = useState(0);
  const [errRes, seterrRes] = useState("");

  const getIssueByID = async () => {
    try {
      const response = await axios.post(apiurl + "/getIssueByID", {
        id,
      });

      setData(response.data.singleissue);
      seterrRes("");
      console.log(response);

      console.log(data);
    } catch (error) {
      seterrRes(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getIssueByID();
  }, []);

  return (
    <React.Fragment>
      <NavBar />

      <section className="bg-white items-center justify-center ">
        {data ? (
          data && (
            <div className="flex flex-col w-auto md:flex-row gap-4 p-4 md:px-4   justify-center  bg-white ">
              <div className="flex flex-col gap-4  p-4">
                <div className="flex items-center  gap-4 ">
                  <p className="text-primary text-[1.1rem]  md:text-2xl font-bold ">
                    {data.Title}
                  </p>
                  <p
                    id="close-modal"
                    onClick={() => {
                      window.location.href = "/all-reports";
                    }}
                    className="text-sm w-[6rem] flex items-center cursor-pointer text-tetiary"
                  >
                    {" "}
                    <IoCaretBackOutline /> Go Back
                  </p>
                </div>

                <div className="flex items-center bg-white">
                  <img
                    className="rounded-[4px] h-[20rem] w-[28rem]"
                    src={data.imageUrl[0]}
                    alt={data.Title}
                  />
                </div>
                <div className="grid grid-cols-3 items-center max-w-md  justify-content-between">
                  <img
                    src={data.imageUrl[1]}
                    alt={data.Title}
                    style={{ marginRight: "10px" }}
                  />
                  <img src={data.imageUrl[2]} alt={data.Title} />
                  {/* <img src={data.imageUrl[3]} alt={data.Title} /> */}
                </div>

                <div className="flex flex-col ">
                  <p className="text-xs text-tetiary">{data.DateRegistered}</p>
                  <p className=" flex  w-[auto]  text-secondary ">
                    {data.IssuesDetails}
                  </p>
                </div>
                {isLoggedin && (
                  <div className="flex gap-4 items-center justify-between ">
                    <Button className="hover:bg-[#989898]" variant="primary1">
                      <div className="flex items-center  justify-center gap-4 text-white font-semibold">
                        <h2 className="text-2xl"> 24 </h2>
                        <Center height="40px">
                          <Divider orientation="vertical" />
                        </Center>
                        <p className="font-medium flex flex-col">Upvote</p>
                      </div>
                    </Button>
                    <Button className="hover:bg-[#007A4E]" variant="primary">
                      <div className="flex items-center  justify-center gap-4 text-white font-semibold">
                        <h2 className="text-3xl"> 0 </h2>
                        <Center height="40px">
                          <Divider orientation="vertical" />
                        </Center>
                        <div className="font-medium flex flex-col">
                          <p>Resolved</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                )}

                {isLoggedin && (
                  <div className="flex flex-col bg-light  p-4 gap-4 w-[auto] rounded-[4px]">
                    <Textarea placeholder="Enter comments here" />
                    <Button variant="primary" type="submit">
                      Comment
                    </Button>
                  </div>
                )}

                <p className="  text-secondary ">
                  This is a comment made by{" "}
                  <span className=" text-tetiary">Firstname Lastname</span> on{" "}
                  <span className="text-sm text-tetiary">Dec 12, 2023</span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <SearchBox
                  selectPosition={selected}
                  setSelectPosition={setSelected}
                />
                <div className="hidden md:flex md:flex-col gap-4  md:p-1 bg-tetiary z-10">
                  <MapView selectPosition={selectPosition} />
                </div>
              </div>
            </div>
          )
        ) : (
          <p
            className="text-secondary text-sm md:text-base font-normal "
            style={{ color: "red", fontSize: "20px", marginTop: "50px" }}
          >
            Could not find this issue, please try again later
          </p>
        )}
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default Report;
