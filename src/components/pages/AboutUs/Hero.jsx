import Quote from "@/assets/Quote.png";
import WhyNepalWill from "@/components/pages/landingpage/WhyNepalWill";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile";
import logo1 from "@/assets/splashImg2.png";
const Hero = () => {
  return (
    <div className="flex flex-col gap-28">
      <div className="flex flex-col gap-5">
        <SectionHeadingTile heading="About Us" />
        <div className="flex flex-col md:flex-row items-center gap-20 justify-center">
          <p className="md:w-1/2">
            <strong className="text-3xl">NepalWill</strong> is a
            non-governmental organization dedicated to uplifting primary school
            children in Nepal by providing essential educational resources and
            opportunities. Believing in the transformative power of education,
            NepalWill works to bridge the resource gap that hinders many
            children from accessing quality learning environments. What sets
            NepalWill apart is its commitment to transparency and integrity by
            exclusively accepting in-kind contributions such as books, school
            supplies, and infrastructure support. This ensures that every
            donation makes a tangible difference in the lives of the children we
            aim to serve. At NepalWill, we strive to empower communities and
            schools by fostering collaborations with local and international
            supporters. Our ultimate goal is to create sustainable educational
            opportunities that inspire young learners to dream big and achieve
            their full potential. NepalWill—because together, we can create a
            brighter future for Nepal’s children.
          </p>
          <img className="w-full md:w-[40%]" src={logo1} alt="" />
        </div>
      </div>
      <WhyNepalWill />

      <div className="bg-primary rounded-md text-center px-[5rem] md:px-[13rem] py-[1.5rem]">
        <div className="flex flex-col gap-5  relative ">
          <SectionHeadingTile heading="Vision" />
          <p className="text-center">
            NepalWill envisions a future where every Nepali, regardless of
            background, has the skills, confidence, and resources to thrive in a
            rapidly evolving world. By fostering education, innovation, and
            global connectivity, we aim to build a society where Nepalese
            individuals can unlock their full potential and contribute to
            national and global progress.
          </p>
          <img
            className="hidden sm:block absolute top-0 right-[-30px] translate-x-1/2 translate-y-1/2"
            src={Quote}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
