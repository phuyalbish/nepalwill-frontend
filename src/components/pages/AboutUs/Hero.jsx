const Hero = () => {
    return (
        <>
            <div className="h-[80vh]">
                <h1 className="text-center text-5xl mt-5 mb-16">About Us</h1>
                <div className="flex items-center gap-20 justify-center">
                    <p className="w-1/2">
                        <strong className="text-3xl">NepalCan</strong> is a non-governmental organization dedicated to
                        uplifting primary school children in Nepal by providing
                        essential educational resources and opportunities.
                        Believing in the transformative power of education,
                        NepalCan works to bridge the resource gap that hinders
                        many children from accessing quality learning
                        environments. What sets NepalCan apart is its commitment
                        to transparency and integrity by exclusively accepting
                        in-kind contributions such as books, school supplies,
                        and infrastructure support. This ensures that every
                        donation makes a tangible difference in the lives of the
                        children we aim to serve. At NepalCan, we strive to
                        empower communities and schools by fostering
                        collaborations with local and international supporters.
                        Our ultimate goal is to create sustainable educational
                        opportunities that inspire young learners to dream big
                        and achieve their full potential. NepalCan—because
                        together, we can create a brighter future for Nepal’s
                        children.
                    </p>
                    <img style={{ width: "40%" }} src="/image2.png" alt="" />
                </div>
            </div>

            <div>
                <h1 className="text-center text-5xl mb-16">Why NepalWill?</h1>
                <div className="flex gap-28 items-center justify-center">
                    <img style={{ width: "40%" }} src="/image1.png" alt="" />
                    <ul
                        className="flex flex-col gap-7 w-1/3"
                        style={{ listStyleType: "url('')" }}
                    >
                        <li className="flex gap-[0.8rem]">
                            <img src="/check_circle.svg" alt="" />
                            <span>Bridging Educational Gaps</span>
                        </li>

                        <li className="flex gap-[0.8rem]">
                            <img src="/check_circle.svg" alt="" />
                            <span>Focus on Primary Education</span>
                        </li>

                        <li className="flex gap-[0.8rem]">
                            <img src="/check_circle.svg" alt="" />
                            <span>Interactive Learning Environment</span>
                        </li>

                        <li className="flex gap-[0.8rem]">
                            <img src="/check_circle.svg" alt="" />
                            <span>Volunteer Support from Diverse Nations</span>
                        </li>

                        <li className="flex gap-[0.8rem]">
                            <img src="/check_circle.svg" alt="" />
                            <span>Empowering Students for Global Success</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-accent text-center px-[13rem] py-[1.5rem]">
                <div className="flex flex-col gap-5  relative ">
                    <h1 className="text-5xl">Vision</h1>
                    <p className="text-center">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Voluptate autem officiis asperiores, quae facilis
                        pariatur neque eveniet aut? Ipsam officiis error non
                        enim maiores animi reprehenderit incidunt minima
                        accusamus praesentium?
                    </p>
                    <img
                        className="absolute top-0 right-[-10px] translate-x-1/2 translate-y-1/2"
                        src="/format_quote.png"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default Hero;
