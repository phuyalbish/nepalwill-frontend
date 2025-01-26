const Navbar = () => {
    return (
        <>
            <nav className="bg-background flex justify-between items-center px-[2.5rem] py-[1rem]">
                <div className="">
                    <h1 className="text-3xl">NepalWill</h1>
                </div>

                <div className="">
                    <ul className="flex">
                        <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Home</li>
                        <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">About</li>
                        <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Gallery</li>
                        <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Our Programs</li>
                        <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Blog</li>
                        <li className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 px-[1rem] py-[0.5rem]">Contact</li>
                    </ul>
                </div>
                
                <div className="">
                    <button className="px-[1rem] py-[0.5rem]">Get Involved</button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;