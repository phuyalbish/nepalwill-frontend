import Hero from "@/components/pages/AboutUs/Hero.jsx";
import Objectives from "@/components/pages/AboutUs/Objectives.jsx";
import Team from "@/components/pages/AboutUs/Team.jsx";
import PageLayout from "@/components/layouts/PageLayout";
import FAQ from "@/components/pages/landingpage/FAQ";

const AboutUs = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-28">
        <Hero />
        <Objectives />
        <Team />
        <FAQ />
      </div>
    </PageLayout>
  );
};

export default AboutUs;
