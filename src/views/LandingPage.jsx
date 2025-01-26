import SplashSection from "@/pages/landingpage/SplashSection";
import UpcomingEvents from "@/pages/landingpage/UpcomingEvents";
export default function LandingPage() {
  return (
    <div className="flex flex-col w-[90vw] m-auto gap-16 mt-32">
      <SplashSection />
      <UpcomingEvents />
    </div>
  );
}
