import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Stats from "./Stats.jsx";
import Footer from "./Footer.jsx";
import Particles from "./Particles.jsx";
import FeaturedItems from "./FeaturedItems.jsx";
import About from "./About.jsx";
import Gallery from "./Gallery.jsx";
import Testimonials from "./Testimonials.jsx";
import ReservationCTA from "./Reservations.jsx";

const injectFonts = () => {
  if (document.getElementById("cafe-fonts")) return;
  const l = document.createElement("link");
  l.id = "cafe-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Outfit:wght@300;400;500&display=swap";
  document.head.appendChild(l);
};

const injectGlobal = () => {
  if (document.getElementById("cafe-global")) return;
  const s = document.createElement("style");
  s.id = "cafe-global";
  s.innerHTML = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { background: #0F0802 !important; }
    body { background: #0F0802 !important; overflow-x: hidden; }
    #root { background: #0F0802; }
    @keyframes scrollBar {
      0%   { transform:translateY(-100%); opacity:0; }
      40%  { opacity:1; }
      100% { transform:translateY(300%); opacity:0; }
    }
    .scroll-anim { animation: scrollBar 2s ease infinite; }
    .g-ov { opacity: 0; transition: opacity 0.3s; }
    .gallery-item:hover .g-ov { opacity: 1; }
  `;
  document.head.appendChild(s);
};

/* ── Main Export ── */
const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    injectFonts();
    injectGlobal();
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ background: "#0F0802" }}>
      <Navbar scrollY={scrollY} />
      <Hero />
      <Stats />
      <FeaturedItems />
      <About />
      <Gallery />
      <Testimonials />
      <ReservationCTA />
      <Footer />
    </div>
  );
};

export default HomePage;