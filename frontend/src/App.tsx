import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";
import PrivateRoutes from "./shared/PrivateRoutes";
import Auth from "./components/Auth";
import Alert from "./components/Alert";
import { useState } from "react";
import { SnackbarCloseReason } from "@mui/material";

function App() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const openAlert = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth openAlert={openAlert} />} />
          <Route path="/loading" element={<Loading />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <Alert open={open} handleClose={handleClose} message={message} />
    </>
  );
}

export default App;
