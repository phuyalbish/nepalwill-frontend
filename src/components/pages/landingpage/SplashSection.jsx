import { useState, useEffect } from "react";
import logo1 from "@/assets/splashImg1.png";
import logo2 from "@/assets/splashImg2.png";
import logo3 from "@/assets/splashImg3.png";
import logo4 from "@/assets/splashImg4.png";
import { MdOutlineMouse } from "react-icons/md";

import MainButton from "@/components/buttons/MainButton.jsx";

export default function SplashSection() {
  const words = ["Grow.", "Thrive.", "Leap.", "Achieve."];
  const logos = [logo1, logo2, logo3, logo4];

  const [currentWord, setCurrentWord] = useState(0);
  const [currentLogo, setCurrentLogo] = useState(0);

  useEffect(() => {
    const wordIntervalId = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord + 1) % words.length);
    }, 2000);

    const logoIntervalId = setInterval(() => {
      setCurrentLogo((prevLogo) => (prevLogo + 1) % logos.length);
    }, 2000);

    return () => {
      clearInterval(wordIntervalId);
      clearInterval(logoIntervalId);
    };
  }, [words.length, logos.length]);

  const handleClick = () => {
    alert("We are Still Working on it!");
  };

  return (
    <div className="flex sm:w-[90vw]  m-auto flex-col sm:gap-20 select-none">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col gap-[1rem] sm:gap-[3rem]">
          <div className="text-[35px] sm:text-[50px] heading-font">
            NepalWill{" "}
            <span className="text-accent animate-slideUp">
              {words[currentWord]}
            </span>
          </div>
          <div className="test-sm sm:text-base text-default opacity-50">
            A foundation initiated to provide all kind of skills to the students
            to close the gap between the privileged students and the government
            studying students in the outskirts of Kathmandu valley.
          </div>

          <div className="flex w-[10rem] animate-slideUp">
            <MainButton text="Get Involved" onClick={handleClick} />
          </div>
        </div>
        <div
          style={{ userDrag: "none" }}
          className="flex relative flex-col gap-2   justify-center items-center sm:w-[95vw] lg:h-[30rem] md:h-[24rem]"
        >
          <img
            src={logos[currentLogo]}
            alt=""
            className="object-cover z-0 lg:h-[30rem] h-[16rem] sm:h-[24rem] w-full rounded-3xl select-none"
          />
          <div className="flex absolute z-10 bottom-5 gap-2">
            {logos.map((_, index) => (
              <div
                key={index}
                className={`py-1 rounded-full  ${
                  currentLogo === index
                    ? "bg-primary px-3 animate-smoothCarousel"
                    : "bg-secondary px-2 animate-smoothCarouselEnd"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="sm:flex gap-3 text-lg justify-center items-center animate-bounce hidden">
        <MdOutlineMouse className="text-xl" />
        <p>Scroll to see more</p>
      </div>
    </div>
  );
}
