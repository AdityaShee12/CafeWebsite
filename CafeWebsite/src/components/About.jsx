/* ── About ── */
import { useEffect, useRef, useState } from "react";

const About = () => {
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
    const [ref, inView] = useInView();

    return (
        <section id="about" className="relative overflow-hidden" style={{ padding: "112px 0", background: "#120A02" }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" style={{ fontFamily: "'Playfair Display',serif", fontSize: "20vw", fontWeight: 700, color: "rgba(212,175,90,.02)", lineHeight: 1 }}>AROMA</div>
            <div className="max-w-7xl mx-auto" style={{ padding: "0 clamp(20px,5vw,56px)" }}>
                <div ref={ref} className="grid items-center" style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,6vw,80px)" }}>
                    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-24px)", transition: "all .9s ease", position: "relative" }}>
                        <div className="relative flex items-center justify-center overflow-hidden" style={{ aspectRatio: "4/5", background: "#2A1A06", borderRadius: 4, fontSize: "9rem" }}>
                            ☕
                            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(212,175,90,.07),transparent 60%)" }} />
                        </div>
                        <div className="absolute -z-10" style={{ bottom: -14, right: -14, width: "70%", height: "70%", border: "1px solid rgba(212,175,90,.16)", borderRadius: 4 }} />
                        <div className="absolute text-center" style={{ top: -18, right: -18, background: "#D4AF5A", borderRadius: 4, padding: "18px 22px", boxShadow: "0 12px 40px rgba(212,175,90,.26)" }}>
                            <span className="block" style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, color: "#0F0802" }}>6+</span>
                            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".6rem", fontWeight: 500, color: "#0F0802", letterSpacing: ".12em", textTransform: "uppercase" }}>Years</span>
                        </div>
                    </div>
                    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(24px)", transition: "all .9s ease .2s" }}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="block" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                            <span style={{ color: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: ".68rem", fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>Our Story</span>
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#F5EDD6", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1.12, fontWeight: 700, marginBottom: 22 }}>A Dream Brewed<br />in a <em style={{ color: "#D4AF5A" }}>Small Kitchen</em></h2>
                        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".92rem", fontWeight: 300, color: "rgba(245,237,214,.5)", lineHeight: 1.9, marginBottom: 16 }}>In 2018, Priya Sharma left her corporate job with a simple dream — to build a space where people could slow down, connect, and enjoy truly great coffee.</p>
                        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".92rem", fontWeight: 300, color: "rgba(245,237,214,.5)", lineHeight: 1.9, marginBottom: 36 }}>What started as a twelve-seat cafe on a quiet Kolkata lane has grown into a beloved neighbourhood institution.</p>
                        <div className="grid grid-cols-3 gap-2.5 mb-9">
                            {[["🌱", "Locally Sourced"], ["♻️", "Sustainable"], ["❤️", "Made with Love"]].map(([ic, lb]) => (
                                <div key={lb} className="flex flex-col items-center gap-2 text-center" style={{ padding: "14px 8px", background: "rgba(212,175,90,.05)", border: "1px solid rgba(212,175,90,.1)", borderRadius: 4 }}>
                                    <span style={{ fontSize: "1.3rem" }}>{ic}</span>
                                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".62rem", fontWeight: 500, color: "rgba(245,237,214,.42)", letterSpacing: ".1em", textTransform: "uppercase" }}>{lb}</span>
                                </div>
                            ))}
                        </div>
                        <a href="#about"
                            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 34px", background: "#D4AF5A", color: "#0F0802", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", boxShadow: "0 8px 24px rgba(212,175,90,.22)", transition: "transform .3s" }}>
                            Our Full Story
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;