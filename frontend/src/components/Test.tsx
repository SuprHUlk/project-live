import { useEffect, useRef } from "react";
import Hls from "hls.js";
import axios from "axios";

const Test = () => {
  const videoRef1 = useRef<HTMLVideoElement | null>(null);
  const videoRef2 = useRef<HTMLVideoElement | null>(null);
  const src1 = "http://localhost:8080/hls/admin.m3u8";
  const src2 = "http://localhost:8080/hls/tyty.m3u8";
  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    if (video1) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src1);
        hls.attachMedia(video1);
      } else if (video1.canPlayType("application/vnd.apple.mpegurl")) {
        video1.src = src1;
      }
    }
    if (video2) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src2);
        hls.attachMedia(video2);
      } else if (video2.canPlayType("application/vnd.apple.mpegurl")) {
        video2.src = src2;
      }
    }
  }, [src1, src2]);

  const test = async () => {
    const res1 = await axios.post("http://localhost:3000/live/countViewers", {
      username: "tyty",
    });
    const res2 = await axios.post("http://localhost:3000/live/countViewers", {
      username: "admin",
    });
    console.log(res1.data);
    console.log(res2.data);
  };

  return (
    <>
      <video ref={videoRef1} controls />
      <video ref={videoRef2} controls />
      <button onClick={test}>asdmasl</button>
    </>
  );
};

export default Test;
