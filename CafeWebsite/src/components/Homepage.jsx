import { useState } from "react";
import Hero from "./Hero.jsx";
import Stats from "./Stats.jsx";
import Particles from "./Particles.jsx";
import FeaturedItems from "./FeaturedItems.jsx";
import About from "./About.jsx";
import Gallery from "./Gallery.jsx";
import Testimonials from "./Testimonials.jsx";
import ReservationCTA from "./Reservations.jsx";

/* ── Main Export ── */
const HomePage = () => {
  return (
    <div className="w-full bg-[#0F0802]">
      <Hero />
      <Stats />
      <FeaturedItems />
      <About />
      <Gallery />
      <Testimonials />
      <ReservationCTA />
    </div>
  );
};

export default HomePage;