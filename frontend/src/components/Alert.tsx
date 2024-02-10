import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
function Alert(props: any) {
  console.log(props.message);
  const [open, setOpen] = React.useState(false);
  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <p>X</p>
      </IconButton>
    </>
  );
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.message}
        action={action}
      />
    </>
  );
}
export default Alert;
