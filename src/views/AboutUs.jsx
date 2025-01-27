
import Hero from "@/components/pages/AboutUs/Hero.jsx";
import Objectives from "@/components/pages/AboutUs/Objectives.jsx";
import Team from "@/components/pages/AboutUs/Team.jsx";
import AboutUsFAQ from "@/components/pages/AboutUs/FAQ.jsx";
import PageLayout from '@/components/layouts/PageLayout';

const AboutUs = () => {
    return (
        <PageLayout>
            <Hero />  
            <Objectives />  
            <Team />  
            <AboutUsFAQ />  
        </PageLayout>
    );
}

export default AboutUs;