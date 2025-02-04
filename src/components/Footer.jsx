import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col gap-12 bg-dark-background px-[2.5rem] pt-[8rem] pb-[1rem] mt-20">
        <div className="flex flex-col md:flex-row justify-between items gap-10  ">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl">NepalWill</h1>
              <p className="text-sm">Empowering Young minds</p>
            </div>
            <p className="text-base">Kritipur, Nepal</p>
          </div>

          <div className="">
            <ul className="">
              <div>
                <li className="inline-block cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 p-[0.5rem]">
                  Home
                </li>
              </div>
              <div>
                <li className="inline-block cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 p-[0.5rem]">
                  About
                </li>
              </div>
              <div>
                <li className="inline-block cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 p-[0.5rem]">
                  Gallery
                </li>
              </div>
              <div>
                <li className="inline-block cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 p-[0.5rem]">
                  Our Programs
                </li>
              </div>
              <div>
                <li className="inline-block cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 p-[0.5rem]">
                  Blog
                </li>
              </div>
              <div>
                <li className="inline-block cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 p-[0.5rem]">
                  Contact
                </li>
              </div>
            </ul>
          </div>

          <div className=" flex flex-col gap-8">
            <h2 className="text-2xl font-bold">Connect with Us:</h2>
            <div className="flex gap-8">
              <IconContext.Provider value={{ size: "1.7rem" }}>
                <div className="text-[#1877F2]">
                  <FaFacebook />
                </div>

                <div className="text-black">
                  <FaInstagram />
                </div>

                <div className="text-[#1DA1F2]">
                  <FaTwitter />
                </div>

                <div className="text-[#0A66C2]">
                  <FaLinkedin />
                </div>

                <div className="text-[#FF0302]">
                  <FaYoutube />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-basepnp">
            NepalWill 2024 © All right Reserved.{" "}
            <a
              target="_blank"
              href="https://webodle.vercel.app/"
              className="font-semibold"
            >
              Designed by Webodle
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
