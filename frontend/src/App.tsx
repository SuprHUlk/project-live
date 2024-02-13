import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./shared/PrivateRoutes";
import Auth from "./components/Auth";
import Alert from "./components/Alert";
import { useState } from "react";
import { SnackbarCloseReason } from "@mui/material";

function App() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [exited, setExited] = useState(true);
  const [isDanger, setIsDanger] = useState(false);

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const openAlert = (msg: string, isDanger: boolean) => {
    setMessage(msg);
    setOpen(true);
    setIsDanger(isDanger);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth openAlert={openAlert} />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <Alert
        open={open}
        exited={exited}
        handleClose={handleClose}
        handleOnEnter={handleOnEnter}
        handleOnExited={handleOnExited}
        message={message}
        isDanger={isDanger}
      />
    </>
  );
}

export default App;
