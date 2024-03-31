import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import httpInterceptor from "../../shared/httpInterceptor";

interface Props {
  roomId: string;
}

const Video: React.FC<Props> = ({ roomId }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = "http://localhost:8080/hls/" + roomId + ".m3u8";

  const [viewerCount, setViewerCount] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    }
  }, [src]);

  const test = async () => {
    const res = await httpInterceptor.post(
      "http://localhost:3000/live/countViewers",
      {
        username: roomId,
      }
    );
    setViewerCount(res.data.result);
  };

  test();

  setInterval(test, 30000);

  return (
    <>
      <video ref={videoRef} controls />
      <p>Viewer Count -{viewerCount}</p>
    </>
  );
};

export default Video;
