import { useState, useEffect } from "react";
import logo from "@/assets/splashImg.png";
import { MdOutlineMouse } from "react-icons/md";
import MainButton from "@/components/buttons/MainButton.jsx";
export default function SplashSection() {
  const words = ["Grow.", "Thrive.", "Leap.", "Achieve."];
  const [currentWord, setCurrentWord] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord + 1) % words.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    alert("Button Clicked!");
  };

  return (
    <div className="flex flex-col  w-full gap-16">
      <div className="flex flex-col-reverse md:flex-row  h-[30rem] justify-between items-center gap-10">
        <div className="flex flex-col gap-[3rem]">
          <div className="text-[50px] heading-font ">
            NepalWill{" "}
            <span className="text-accent  animate-slideUp">
              {words[currentWord]}
            </span>
          </div>
          <div className="text-base text-default opacity-50">
            A foundation initiated to provide the English education to the
            students to close the gap between the privileged students and the
            government studying students in the outskirts of Kathmandu valley.
          </div>

          <div className="flex md:w-1/4 w-1/3 animate-slideUp">
            <MainButton text="Get Involved" onClick={handleClick} />
          </div>
        </div>
        <img src={logo} alt="" className="h-full rounded-3xl" />
      </div>
      <div className="flex gap-3 text-lg justify-center items-center animate-bounce ">
        <MdOutlineMouse className="text-xl" />
        <p>Scroll to see more</p>
      </div>
    </div>
  );
}
