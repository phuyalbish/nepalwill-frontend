import CtaBand from "@/pages/Home/components/CtaBand";
import Faq from "@/pages/Home/sections/Faq";
import StatsRibbon from "@/pages/Home/sections/StatsRibbon";
import TransparencyBanner from "@/pages/Home/sections/TransparencyBanner";
import Why from "@/pages/Home/sections/Why";
import HowWeWork from "./sections/HowWeWork";
import Intro from "./sections/Intro";
import MissionVision from "./sections/MissionVision";
import Objectives from "./sections/Objectives";
import Story from "./sections/Story";
import Team from "./sections/Team";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** About page: mission, story since 2015, values, in-kind process, team and a closing call to action. */
export default function About() {
  useDocumentTitle("About");
  return (
    <>
      <Intro />
      <MissionVision />
      <Story />
      <StatsRibbon />
      <Why />
      <Objectives />
      <HowWeWork />
      <Team />
      <TransparencyBanner />
      <Faq />
      <CtaBand />
    </>
  );
}
