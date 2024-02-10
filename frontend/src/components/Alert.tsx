import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  message: string;
  handleClose: () => void;
  open: boolean;
}

const Alert: React.FC<Props> = (props) => {
  const { message, handleClose, open } = props;

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={message}
        action={action}
      />
    </>
  );
};

export default Alert;
