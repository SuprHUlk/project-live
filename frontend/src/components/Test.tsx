import { useEffect, useRef } from "react";
import Hls from "hls.js";

const Test = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = "http://localhost:8080/hls/admin.m3u8";
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

  return <video ref={videoRef} controls />;
};

export default Test;
