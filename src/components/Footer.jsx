import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
    return (
        <>
            <footer className="flex flex-col gap-12 bg-dark-background px-[2.5rem] pt-[8rem] pb-[1rem]">
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
                            <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Home</li>
                            <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">About</li>
                            <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Gallery</li>
                            <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Our Programs</li>
                            <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Blog</li>
                            <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Contact</li>
                        </ul>
                    </div>
                    
                    <div className=" flex flex-col gap-8">
                        <div>
                            <input style={{display: "block", width: "100%"}} type="email"  />
                        </div>
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
                    <p className="text-basepnp">NepalCan 2024 © All right Reserved. Designed by <strong>Webodle</strong></p>
                </div>
            </footer>
        </>
    );
}

export default Footer;