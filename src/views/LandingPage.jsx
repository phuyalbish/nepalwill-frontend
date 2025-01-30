import PageLayout from "@/components/layouts/PageLayout";
import SplashSection from "@/components/pages/landingpage/SplashSection";
import UpcomingEvents from "@/components/pages/landingpage/UpcomingEvents";
import WhyNepalWill from "@/components/pages/landingpage/WhyNepalWill";
import CTASmall from "@/components/pages/landingpage/CTASmall";
import SustainableVision from "@/components/pages/landingpage/SustainableVision";
import Testimonials from "@/components/pages/landingpage/Testimonials";
import OurBlogs from "@/components/pages/landingpage/OurBlogs";
import OurSupport from "@/components/pages/landingpage/OurSupport";
import CTABig from "@/components/pages/landingpage/CTABig";
import FAQ from "@/components/pages/landingpage/FAQ";

export default function LandingPage() {
  return (
    <PageLayout>
      <div className="flex flex-col  gap-24 md:mt-20">
        <SplashSection />
        <UpcomingEvents />
        <WhyNepalWill />
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
