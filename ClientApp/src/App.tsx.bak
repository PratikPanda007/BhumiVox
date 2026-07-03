import { Routes, Route, Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import NotFound from "@/components/NotFound";

import Home from "@/routes/index";
import About from "@/routes/about";
import Contact from "@/routes/contact";
import Experiences from "@/routes/experiences";
import Intelligence from "@/routes/intelligence";
import Journal from "@/routes/journal";
import Plan from "@/routes/plan";
import WhyBhumivox from "@/routes/why-bhumivox";
import DestinationsIndex from "@/routes/destinations.index";
import DestinationDetail from "@/routes/destinations.$slug";
import JourneysIndex from "@/routes/journeys.index";
import JourneyDetail from "@/routes/journeys.$slug";

function Layout() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/why-bhumivox" element={<WhyBhumivox />} />
        <Route path="/destinations" element={<DestinationsIndex />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/journeys" element={<JourneysIndex />} />
        <Route path="/journeys/:slug" element={<JourneyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
