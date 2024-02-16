import React, { useState, useEffect, useContext } from "react";
import { ReportIssueSchema } from "@/config/schema";
import useSubmit from "@/hooks/useSubmit";
import Input from "@/components/input";
import AppButton from "@/components/button";
import { Controller } from "react-hook-form";
import { categoryList, lgaList, Nigeria } from "@/utils/dummyData";
import {
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IoCaretBackOutline } from "react-icons/io5";
import { FaTrash, FaImage } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { ReportsContext } from "../context/ReportsContext";

const ReportIssue = ({ onClose }) => {
  const preset_key = "augsp4tj";
  const cloud_name = "dzsomaq4z";
  const BASE_URL = "https://api.cloudinary.com/v1_1/";
  const UPLOAD_URL = `${BASE_URL}${cloud_name}/image/upload`;
  const { user } = useContext(AuthContext);
  const { handleAddReport } = useContext(ReportsContext);

  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [showHoverModal, setShowHoverModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lgas, setLgas] = useState(lgaList.Lagos);
  const [errResponse, seterrResponse] = useState(null);
  const [successRes, setsuccessRes] = useState(null);
  const reportsRef = collection(db, "reports");

  const [selectedState, setSelectedState] = useState("");
  const [lga, setLga] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const { errors, register, handleSubmit, control } =
    useSubmit(ReportIssueSchema);

  const handleFile = () => {
    const files = Array.from(images);
    const formData = new FormData();

    const uploadPromises = files.map((file) => {
      formData.append("file", file);
      formData.append("upload_preset", preset_key);

      return axios
        .post(`${UPLOAD_URL}`, formData)
        .then((res) => {
          console.log(res);
          return { id: res.data.public_id, url: res.data.secure_url };
        })
        .catch((err) => console.log(err));
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      if (images.length === 0) {
        // Handle the case when no images are selected
        toast.error("Please select at least one image.");
        return;
      }

      const missingFields = [];
      const numberFields = [];
      const numbersOnlyRegex = /^[0-9]+$/;
      if (numbersOnlyRegex.test(desc)) {
        numberFields.push("Description");
      }
      if (numbersOnlyRegex.test(title)) {
        numberFields.push("Title");
      }

      if (category === "") {
        missingFields.push("Category");
      }
      if (selectedState === "") {
        missingFields.push("State");
      }
      if (lga === "") {
        missingFields.push("LGA");
      }
      if (title === "") {
        missingFields.push("Title");
      }
      if (desc === "") {
        missingFields.push("Description");
      }

      if (missingFields.length > 0) {
        const missingFieldsString = missingFields.join(", ");
        toast.error(
          `Please fill in the required fields: ${missingFieldsString}`
        );
        return;
      }

      const newImagesData = await handleFile();
      setImagesData((prevImages) => [...prevImages, ...newImagesData]);
      const reportData = {
        category,
        state: selectedState,
        lga: lga,
        title,
        report_detail: desc,
        images: newImagesData,
      };
      await addDoc(reportsRef, reportData);
      handleAddReport(reportData);

      setShowSuccess(true);

      resetForm();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const changeState = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
  };

  // Use useEffect to ensure that the lgas state is updated before proceeding
  useEffect(() => {
    const selectedStateData = Nigeria.find(
      (state) => state.name === selectedState
    );
    setLgas(selectedStateData ? selectedStateData.lgas : []);
  }, [selectedState]);

  const handleOnClose = (e) => {
    if (e.target.id === "close-modal") onClose();
  };
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const newImageFiles = Array.from(fileList);

    const filteredImages = newImageFiles
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 3);

    const newImages = [...images, ...filteredImages];
    newImages.map((n) => {
      n.id = uuidv4();
    });

    setImages(newImages);
  };

  const deleteImage = (id) => {
    const updatedImages = [...images];
    updatedImages.splice(id, 1);
    setImages(updatedImages);
  };

  // const resetEditor = () => {
  //   setText(""); // Clear the text input
  //   setImages([]); // Clear the images array
  // };

  const isPostButtonDisabled = text === "";

  const resetForm = () => {
    setCategory("");
    setSelectedState("");
    setLga("");
    setTitle("");
    setDesc("");
    setImages([]);
    setImagesData([]);
  };

  useEffect(() => {
    console.log("Category is sha", category);
    console.log("State is sha", selectedState);
  }, [category, selectedState]);

  return (
    <React.Fragment>
      <section
        id="close-modal"
        onClick={handleOnClose}
        className="flex flex-col items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-[0.8] backdrop-blur-0 w-[100%]"
      >
        <div className="flex flex-col gap-8 w-[95%] bg-[#fff]  md:mx-24 p-8 rounded-xl h-auto md:w-[30rem] md:max-w-[50%]">
          <h1 className="text-primary md:text-4xl text-2xl font-bold ">
            Report an Issue
          </h1>
          {user ? (
            <div>
              {errResponse ? (
                <div
                  className="text-center gen alert alert-danger text-danger"
                  id="message"
                  role="alert"
                  style={{ color: "red" }}
                >
                  {errResponse}
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
                  All fields are required
                </p>
              )}
              <form
                className="flex flex-col gap-2 w-auto"
                onSubmit={(e) => handleSubmitReport(e)}
              >
                <div className="flex flex-col gap-4 ">
                  <div className="flex items-start gap-2">
                    <div>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select
                            placeholder="Category"
                            name="category"
                            borderRadius=".25rem"
                            h="2.5rem"
                            size="md"
                            border="1px solid #D4D4D4"
                            color="typography.dark"
                            outline="typography.dark"
                            w={{ base: "13rem", sm: "18rem" }}
                            {...field}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {categoryList.map((option, index) => (
                              <option
                                key={index}
                                value={option.value}
                                className="text-primary font-semibold"
                              >
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.category && (
                        <p className="text-[#FF0000] text-xs mt-2">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    <p
                      id="close-modal"
                      onClick={handleOnClose}
                      className="text-sm flex items-center cursor-pointer text-tetiary"
                    >
                      {" "}
                      <IoCaretBackOutline /> Go Back
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <Select
                            placeholder="State"
                            name="state"
                            borderRadius=".25rem"
                            h="2.5rem"
                            size="sm"
                            border="1px solid #D4D4D4"
                            color="typography.dark"
                            outline="typography.dark"
                            w={{ base: "full", sm: "10rem", lg: "12rem" }}
                            {...field}
                            onChange={changeState}
                            value={selectedState}
                          >
                            {Nigeria.map((state, index) => (
                              <option
                                key={index}
                                value={state.name}
                                className="text-red-600 font-semibold"
                              >
                                {state.name}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.state && (
                        <p className="text-[#FF0000] text-xs mt-2">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Controller
                        name="lgas"
                        control={control}
                        render={({ field }) => (
                          <Select
                            placeholder="L.G.A"
                            name="lgas"
                            borderRadius=".25rem"
                            h="2.5rem"
                            size="sm"
                            border="1px solid #D4D4D4"
                            color="typography.dark"
                            outline="typography.dark"
                            w={{ base: "full", sm: "10rem", lg: "13rem" }}
                            {...field}
                            onChange={(e) => setLga(e.target.value)}
                          >
                            {lgas?.map((option, index) => (
                              <option
                                key={index}
                                value={option}
                                className="text-primary font-semibold"
                              >
                                {option}
                              </option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.lgas && (
                        <p className="text-[#FF0000] text-xs mt-2">
                          {errors.lgas.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Input
                    name="title"
                    type="text"
                    register={register}
                    errors={errors}
                    placeholder="Enter the Report Title"
                    id="title"
                    variant="primary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="What is the issue?"
                    {...register("report_detail", {
                      required: "Text is required",
                    })}
                    outline="typography.dark"
                    className="w-[auto] h-[auto] text-primary resize-none focus:outline-none rounded-md p-2 overflow-y-scroll"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-start overflow-x-hidden">
                      {images.slice(0, 3).map((image, id) => (
                        <div key={id} className="relative border-2 ">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`img-${id}`}
                            className="p-2 md:max-w-[8rem] md:max-h-[7rem]"
                            name="image"
                          />
                          <button
                            onClick={() => deleteImage(id)}
                            className="absolute top-0  bg-white rounded-full p-1 text-[.5rem]"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center ">
                      <label
                        htmlFor="upload-image"
                        className="cursor-pointer  text-center flex gap-2"
                        onMouseEnter={() => setShowHoverModal(true)}
                        onMouseLeave={() => setShowHoverModal(false)}
                      >
                        <FaImage className=" flex text-primary text-2xl justify-start" />{" "}
                        Upload Image
                      </label>
                      <input
                        id="upload-image"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      {showHoverModal && (
                        <div className="absolute text-primary text-sm rounded-lg bg-white p-1 shadow-md -mt-14 border border-1">
                          <p>Add Image(s)</p>
                        </div>
                      )}
                    </div>
                    <AppButton
                      // disabled={isPostButtonDisabled}
                      className={`text-[#fff] rounded-[4px] h-[3rem] px-4 py-2 text-sm ${
                        isPostButtonDisabled
                          ? "bg-secondary cursor-not-allowed"
                          : "bg-tetiary cursor-pointer hover:bg-[#007A4E]"
                      }`}
                      variant="primary"
                      type="submit"
                      // className="h-[3rem] rounded-[4px] hover:bg-[#007A4E]"
                    >
                      Send
                    </AppButton>
                  </div>

                  <Modal
                    isOpen={showSuccess}
                    onClose={() => {
                      setShowSuccess(false);
                      onClose();
                    }}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalCloseButton />
                      <ModalBody p={8}>
                        <div className="w-[20rem] h-[16rem] border border-[#E9E9E9] rounded-md p-4 flex flex-col items-center justify-center gap-8">
                          <FaCheck className=" flex items-center justify-center p-4 text-7xl text-green bg-slate-400 rounded-full" />

                          <p className=" flex font-bold text-2xl text-primary">
                            {" "}
                            Report Submitted
                          </p>
                        </div>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <div>
                    {images.length > 3 && (
                      <p>Sorry, You can only add 3 images</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <p
              className="text-secondary text-center text-sm md:text-base font-normal "
              style={{
                color: "red",
                fontSize: "20px",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              Please Log in in order to report an isssue
            </p>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default ReportIssue;
