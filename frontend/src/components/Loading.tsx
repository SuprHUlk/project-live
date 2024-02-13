import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Perform any asynchronous task here
      // For example, you can fetch data from an API, or perform any other asynchronous task
      // After the task is completed, you can perform any cleanup or state updates here
    }, 1000);

    return () => {
      clearTimeout(timer); // Cleanup if component unmounts before the timeout
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className="w-[100%] h-[100vh] bg-black absolute top-0 z-10 flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default Loading;
