import { useParams } from "react-router-dom";

import Chat from "../renders/StreamPage/Chat";
import Video from "../renders/StreamPage/Video";
import Sidebar from "../renders/Dashboard_structure/Sidebar";
import React from "react";

interface Props {
  openAlert: (message: string, isDanger: boolean) => void;
}

const Stream: React.FC<Props> = ({ openAlert }) => {
  const { username } = useParams();
  return (
    <>
      <Sidebar openAlert={openAlert} />
      <Chat roomId={username!} />
      <Video roomId={username!} />
    </>
  );
};

export default Stream;
