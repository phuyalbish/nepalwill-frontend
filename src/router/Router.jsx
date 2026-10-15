import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import ErrorState from "@/components/ui/ErrorState";
import Button from "@/components/ui/Button";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Programs = lazy(() => import("@/pages/Programs"));
const ProgramDetail = lazy(() => import("@/pages/Programs/ProgramDetail"));
const EventDetail = lazy(() => import("@/pages/Events/EventDetail"));
const Stories = lazy(() => import("@/pages/Stories"));
const StoryDetail = lazy(() => import("@/pages/Stories/StoryDetail"));
const Blog = lazy(() => import("@/pages/Stories/Blog"));
const BlogDetail = lazy(() => import("@/pages/Stories/BlogDetail"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Transparency = lazy(() => import("@/pages/Transparency"));
const Contact = lazy(() => import("@/pages/Contact"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Route-level crash screen (also catches failed lazy chunk loads). */
function RouteError() {
  const navigate = useNavigate();
  return (
    <div className="container-page flex min-h-screen flex-col items-center justify-center gap-4 py-16">
      <ErrorState
        message="This page failed to load. Reload to try again."
        onRetry={() => window.location.reload()}
      />
      <Button variant="ghost" onClick={() => navigate("/")}>
        Back to home
      </Button>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "aboutus", element: <Navigate to="/about" replace /> },
      { path: "programs", element: <Programs /> },
      { path: "programs/:slug", element: <ProgramDetail /> },
      { path: "events/:slug", element: <EventDetail /> },
      { path: "stories", element: <Stories /> },
      { path: "stories/:slug", element: <StoryDetail /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogDetail /> },
      { path: "gallery", element: <Gallery /> },
      { path: "transparency", element: <Transparency /> },
      { path: "contact", element: <Contact /> },
      { path: "favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
