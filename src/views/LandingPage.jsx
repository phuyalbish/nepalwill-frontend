import PageLayout from "@/components/layouts/PageLayout.jsx";
import SplashSection from "@/pages/landingpage/SplashSection";
import UpcomingEvents from "@/pages/landingpage/UpcomingEvents";
import WhyNepalCan from "@/pages/landingpage/WhyNepalCan";
import CTASmall from "@/pages/landingpage/CTASmall";
import SustainableVision from "../pages/landingpage/SustainableVision";
export default function LandingPage() {
  return (
    <PageLayout>
      <div className="flex flex-col  gap-24 md:mt-20">
        <SplashSection />
        <UpcomingEvents />
        <WhyNepalCan />
        <div className="-mx-[2.5rem] -my-[1rem]">
          <CTASmall />
        </div>
        <SustainableVision />
      </div>
    </PageLayout>
  );
}
