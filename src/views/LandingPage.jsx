import PageLayout from "@/components/layouts/PageLayout.jsx";
import SplashSection from "@/pages/landingpage/SplashSection";
import UpcomingEvents from "@/pages/landingpage/UpcomingEvents";
export default function LandingPage() {
  return (
    <PageLayout>
      <div className="flex flex-col sm:w-[90vw] m-auto gap-16 md:mt-24">
        <SplashSection />
        <UpcomingEvents />
      </div>
    </PageLayout>
  );
}
