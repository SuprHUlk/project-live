import Navbar from "./components/Navbar";
import bg from "./assets/plive.jpg";
import i1 from "./assets/1.png";
import i2 from "./assets/2.png";
import i3 from "./assets/3.png";
function App() {
  return (
    <>
      <Navbar />
      <div
        className="w-[100%] h-[100vh] flex justify-between items-center bg-[#0E0E10] text-white"
        id="mainbg"
      >
        <div className="">
          <img src={i1} className="absolute top-[65vh] left-[10%]" />
          <img src={i2} className="absolute top-[50vh] left-[30%]" />
          <img src={i3} className="absolute top-[20vh] left-[1%]" />
          <img src={bg} className="w-[40%] ml-20" />
        </div>
      </div>
    </>
  );
}

export default App;
