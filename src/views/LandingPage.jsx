import PageLayout from "@/components/layouts/PageLayout";
import SplashSection from "@/pages/landingpage/SplashSection";
import UpcomingEvents from "@/pages/landingpage/UpcomingEvents";
import WhyNepalCan from "@/pages/landingpage/WhyNepalCan";
import CTASmall from "@/pages/landingpage/CTASmall";
import SustainableVision from "@/pages/landingpage/SustainableVision";
import Testimonials from "@/pages/landingpage/Testimonials";
import OurBlogs from "@/pages/landingpage/OurBlogs";
import OurSupport from "@/pages/landingpage/OurSupport";
import CTABig from "@/pages/landingpage/CTABig";
import FAQ from "@/pages/landingpage/FAQ";

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

        <div className="-mx-[2.5rem] -my-[1rem] w-screen">
          <Testimonials />
        </div>
        <OurBlogs />
        <OurSupport />
        <div className="-mx-[2.5rem] -my-[1rem]">
          <CTABig />
        </div>
        <FAQ />
      </div>
    </PageLayout>
  );
}
