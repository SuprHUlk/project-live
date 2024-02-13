import Navbar from "./Navbar";

import bg from "../assets/plive.jpg";
import i1 from "../assets/1.png";
import i2 from "../assets/2.png";
import i3 from "../assets/3.png";

export default function auth() {
    return (
        <>
            <Navbar />
            <div
                className="w-[100%] h-[100vh] flex justify-between items-center bg-[#0E0E10] text-white"
                id="mainbg"
            >
                <div className="">
                <img src={i1} className="absolute top-[65vh] left-[10%] z-10" />
                <img src={i2} className="absolute top-[50vh] left-[40%] z-20" />
                <img src={i3} className="absolute top-[25vh] left-[5%] z-10" />
                <img src={bg} className="w-[40%] absolute top-[30vh] left-[10%]" />
                </div>
            </div>
        </>
    )
}