/* ── ReservationCTA ── */
import { useEffect, useRef, useState } from "react";
import Particles from "./Particles";

const useInView = (options = {}) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.15, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
};

const ReservationCTA = () => {
    const [ref, inView] = useInView();

    return (
        <section id="reservations" className="relative overflow-hidden" style={{ padding: "120px 0", background: "#0F0802" }}>
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')", filter: "brightness(.13) saturate(.4)" }} />
            <div className="absolute inset-0 z-10" style={{ background: "rgba(15,8,2,.8)" }} />
            <div className="absolute inset-0 z-20"><Particles /></div>
            <div ref={ref} className="relative z-30 text-center mx-auto" style={{ maxWidth: 780, padding: "0 clamp(20px,5vw,56px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: "all .9s ease" }}>
                <div className="flex items-center justify-center gap-3 mb-[14px]">
                    <span className="block" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                    <span style={{ color: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: ".68rem", fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase" }}>Ready to Visit?</span>
                    <span className="block" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                </div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#F5EDD6", fontSize: "clamp(2.4rem,6vw,4.2rem)", lineHeight: 1.08, fontWeight: 700, marginBottom: 18 }}>Reserve Your Table<br /><em style={{ color: "#D4AF5A" }}>Today</em></h2>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".93rem", fontWeight: 300, color: "rgba(245,237,214,.45)", lineHeight: 1.9, marginBottom: 44, maxWidth: 500, margin: "0 auto 44px" }}>
                    Join us for breakfast, lunch, or a long slow dinner. We're here to make your visit unforgettable.
                </p>
                <div className="flex gap-[14px] justify-center flex-wrap">
                    <a href="#reservations"
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                        style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 40px", background: "#D4AF5A", color: "#0F0802", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", boxShadow: "0 8px 32px rgba(212,175,90,.3)", transition: "transform .3s" }}>
                        Book a Table
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                    <a href="tel:+919876543210"
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                        style={{ display: "inline-flex", alignItems: "center", padding: "14px 40px", border: "1.5px solid rgba(212,175,90,.4)", color: "rgba(245,237,214,.85)", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", transition: "transform .3s" }}>
                        Call Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ReservationCTA;