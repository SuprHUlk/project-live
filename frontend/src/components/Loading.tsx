import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="w-[100%] h-[100vh] bg-black absolute top-0 z-10 flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}
