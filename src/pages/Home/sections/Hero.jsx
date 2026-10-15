import { useMemo } from "react";
import { useGetSiteQuery } from "@/api/nepalwillApi";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Skeleton from "@/components/ui/Skeleton";
import splash1 from "@/assets/splashImg1.png";
import splash2 from "@/assets/splashImg2.png";
import splash3 from "@/assets/splashImg3.png";
import cta from "@/assets/ctaSmallImg.png";
import HeroCarousel from "../components/HeroCarousel";
import MeshBlobs from "../components/MeshBlobs";
import TypedWord from "../components/TypedWord";

const FALLBACK_SLIDES = [
  { src: splash1, alt: "Smiling students at a partner school" },
  { src: splash3, alt: "Two students writing in their notebooks" },
  { src: cta, alt: "A student in a blue uniform listening in class" },
  { src: splash2, alt: "Children gathered at a community class" },
];

export default function Hero() {
  const { data, isLoading } = useGetSiteQuery();

  const slides = useMemo(() => {
    const fromApi = (data?.gallery ?? [])
      .filter((item) => item.image_url)
      .slice(0, 4)
      .map((item) => ({ src: item.image_url, alt: item.title || "NepalWill gallery photo" }));
    return fromApi.length ? fromApi : FALLBACK_SLIDES;
  }, [data]);

  return (
    <section className="relative overflow-hidden pb-24 pt-12 md:pb-32 md:pt-20">
      <MeshBlobs />
      <div className="container-page relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Empowering young minds since 2015</Eyebrow>
          <h1 className="h-display">
            NepalWill <TypedWord />
          </h1>
          <p className="max-w-xl text-lg leading-8 text-ink-700">
            A foundation initiated to provide all kinds of skills to students, closing the gap
            between the privileged and the underserved in the outskirts of Kathmandu valley.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Button to="/contact" size="lg" magnetic arrow>
              Get Involved
            </Button>
            <Button to="/about" variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div>
            <Skeleton className="aspect-[4/3] w-full rounded-hero" />
            <Skeleton className="mx-auto mt-6 h-2.5 w-24 rounded-pill" />
          </div>
        ) : (
          <HeroCarousel slides={slides} />
        )}
      </div>
    </section>
  );
}
