import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import RouteProgress from "./RouteProgress";
import PageTransition from "./PageTransition";
import RouteFocus from "./RouteFocus";
import ScrollToTop from "./ScrollToTop";

/** App shell: progress bars, sticky navbar, animated route outlet, footer. Used as the root route element. */
export default function RootLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <RouteFocus />
      <ScrollProgress />
      <RouteProgress />
      <Navbar />
      <main id="main" className="min-h-[calc(100vh-72px)]">
        <PageTransition />
      </main>
      <Footer />
    </>
  );
}
