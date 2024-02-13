import { Transition } from "react-transition-group";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/base/Snackbar";

interface Props {
  message: string;
  handleClose: () => void;
  handleOnExited: () => void;
  handleOnEnter: () => void;
  open: boolean;
  exited: boolean;
  isDanger: boolean;
}

const Alert: React.FC<Props> = ({
  message,
  open,
  exited,
  handleClose,
  handleOnEnter,
  handleOnExited,
  isDanger,
}) => {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={open}
      onClose={handleClose}
      exited={exited}
      className="fixed z-50 font-sans flex right-4 bottom-4 left-auto max-w-xl	min-w-xs"
    >
      <Transition
        timeout={{ enter: 400, exit: 400 }}
        in={open}
        appear
        unmountOnExit
        onEnter={handleOnEnter}
        onExited={handleOnExited}
        nodeRef={null}
      >
        {(status) => (
          <div
            className="flex gap-4	overflow-hidden	bg-white dark:bg-slate-900 rounded-lg	border border-solid border-slate-200 dark:border-slate-700 shadow-md text-slate-900 dark:text-slate-50 p-3	text-start"
            style={{
              transform: positioningStyles[status],
              transition: "transform 300ms ease",
            }}
            ref={null}
          >
            {isDanger && (
              <CloseRoundedIcon
                sx={{
                  color: "red",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "1.5rem",
                }}
              />
            )}
            {!isDanger && (
              <CheckRoundedIcon
                sx={{
                  color: "green",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "1.5rem",
                }}
              />
            )}
            <div className="flex-1	max-w-full">
              <p className="m-0 leading-normal mr-2 font-medium">
                {message.split(":")[0]}
              </p>
              <p className="m-0 leading-normal font-normal	text-slate-800 dark:text-slate-400">
                {message.split(":")[1]}
              </p>
            </div>
            <CloseIcon
              onClick={handleClose}
              className="cursor-pointer	shrink-0	p-0.5	rounded hover:bg-slate-50 hover:dark:bg-slate-800"
            />
          </div>
        )}
      </Transition>
    </Snackbar>
  );
};

const positioningStyles = {
  entering: "translateX(0)",
  entered: "translateX(0)",
  exiting: "translateX(500px)",
  exited: "translateX(500px)",
  unmounted: "translateX(500px)",
};

export default Alert;
