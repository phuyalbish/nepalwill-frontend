import Events from "./sections/Events";
import Faq from "./sections/Faq";
import Hero from "./sections/Hero";
import Impact from "./sections/Impact";
import Sdg from "./sections/Sdg";
import StatsRibbon from "./sections/StatsRibbon";
import Stories from "./sections/Stories";
import Supporters from "./sections/Supporters";
import Testimonials from "./sections/Testimonials";
import TransparencyBanner from "./sections/TransparencyBanner";
import Why from "./sections/Why";

/** Home page: hero, numbers, events, reasons, impact, SDGs, voices, stories, trust and FAQ. */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsRibbon />
      <Events />
      <Why />
      <Impact />
      <Sdg />
      <Testimonials />
      <Stories />
      <TransparencyBanner />
      <Supporters />
      <Faq />
    </>
  );
}
