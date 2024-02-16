import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";

export const ReportsContext = createContext(null);

export const ReportsContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const reportsRef = collection(db, "reports");

  const getIssues = async () => {
    const dataFire = await getDocs(reportsRef);
    const filteredData = dataFire.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setData(filteredData);
    try {
    } catch (error) {
      toast.error("An error occurred pls try again");
      console.log(error);
    }
  };

  const handleAddReport = (newReport) => {
    setData([newReport, ...data]);
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <ReportsContext.Provider
      value={{
        getIssues,
        data,
        handleAddReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
