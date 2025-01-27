import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import MainButton from "@/components/buttons/MainButton";
import clsx from "clsx";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavbarVisibility = () => {
    setShowNavbar(!showNavbar);
  };

  const navMenuClassName = clsx({
    hidden: !showNavbar,
    block: showNavbar,
  });

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <nav
                style={{
                    bbackground: "rgba(255,255,255, 0.75)",
                    backdropFilter: "blur(8px)",
                    webkitBackdropFilter: "blur(8px)",
                    boxShadow: "0 4px 6px rgba(153, 242, 200, 0.4)",
                }}
                className="z-50 relative md:sticky top-0 bg-background/70 border-primary flex justify-between items-center px-[2.5rem] py-[1rem]"
            >
                <div className="">
                    <h1 className="text-3xl">NepalWill</h1>
                </div>

        <div className={navMenuClassName}>
          <ul className="flex flex-col md:flex-row text-center select-none items-center sm:pb-0 pb-10  sm:bg-transparent bg-background shadow md:shadow-none absolute md:static left-0 bottom-0 translate-y-full md:translate-y-0 w-full ">
            <li className="cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 px-[1rem] py-[0.5rem]">
              About
            </li>
            <li className="cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 px-[1rem] py-[0.5rem]">
              Gallery
            </li>
            <li className="cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 px-[1rem] py-[0.5rem]">
              Programs
            </li>
            <li className="cursor-pointer border-b-4 border-transparent hover:border-accent hover:-translate-y-[1px] transition-all duration-300 px-[1rem] py-[0.5rem]">
              Blog
            </li>

            <div className="flex w-1/2 items-center md:hidden flex-grow-0">
              <MainButton text="Get Involved" />
            </div>
          </ul>
        </div>

        <div className="hidden md:flex flex-grow-0">
          <MainButton text="Get Involved" />
        </div>
        <div className="block md:hidden" onClick={toggleNavbarVisibility}>
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <GiHamburgerMenu />
          </IconContext.Provider>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
