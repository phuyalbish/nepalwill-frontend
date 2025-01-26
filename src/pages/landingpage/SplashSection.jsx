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
    <div className="flex flex-col w-full gap-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
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

          <div className="flex w-[10rem] animate-slideUp">
            <MainButton text="Get Involved" onClick={handleClick} />
          </div>
        </div>
        <img
          src={logo}
          alt=""
          className="sm:w-auto w-full lg:h-[30rem]  md:h-[24rem] h-auto  rounded-3xl"
        />
      </div>
      <div className="sm:flex gap-3 text-lg justify-center items-center animate-bounce hidden ">
        <MdOutlineMouse className="text-xl" />
        <p>Scroll to see more</p>
      </div>
    </div>
  );
}
