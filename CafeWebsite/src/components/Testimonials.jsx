/* ── Testimonials ── */
import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
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
    const REVIEWS = [
        { name: "Ritika Bose", stars: 5, text: "The espresso here is the best I've had outside of Naples. The sourdough toast? Absolute perfection. My weekly ritual." },
        { name: "Arnab Ghosh", stars: 5, text: "Aroma has this rare quality — it feels like a secret even when it's packed. Beautiful interiors, thoughtful menu, exceptional service." },
        { name: "Sneha Mukherjee", stars: 5, text: "Came for the cold brew, stayed for three hours. The seasonal menu is inspired. This place understands what a cafe should feel like." },
    ];

    return (
        <section style={{ padding: "112px 0", background: "#1A0D03" }}>
            <div className="max-w-7xl mx-auto" style={{ padding: "0 clamp(20px,5vw,56px)" }}>
                <div ref={ref} className="text-center" style={{ marginBottom: 60, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .7s ease" }}>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="block" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                        <span style={{ color: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: ".68rem", fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>Guest Reviews</span>
                        <span className="block" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#F5EDD6", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, margin: 0 }}>What Our <em>Guests Say</em></h2>
                </div>
                <div className="grid gap-5.5" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                    {REVIEWS.map((r, i) => {
                        const [cr, cv2] = useInView();
                        return (
                            <div key={i} ref={cr}
                                className="flex flex-col"
                                style={{ background: "#0F0802", border: "1px solid rgba(212,175,90,.1)", borderBottom: "3px solid #D4AF5A", borderRadius: 4, padding: 30, opacity: cv2 ? 1 : 0, transform: cv2 ? "none" : "translateY(22px)", transition: `opacity .7s ease ${i * .12}s,transform .7s ease ${i * .12}s` }}>
                                <span className="block" style={{ fontFamily: "'Playfair Display',serif", fontSize: "4.5rem", color: "rgba(212,175,90,.1)", lineHeight: .8, marginBottom: 14 }}>"</span>
                                <div className="flex gap-0.75 mb-3.5">
                                    {Array.from({ length: r.stars }).map((_, j) => <span key={j} style={{ color: "#D4AF5A", fontSize: ".8rem" }}>★</span>)}
                                </div>
                                <p className="flex-1" style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "rgba(245,237,214,.65)", fontSize: ".95rem", lineHeight: 1.78, marginBottom: 22 }}>{r.text}</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center shrink-0" style={{ width: 38, height: 38, borderRadius: "50%", background: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0F0802" }}>{r.name[0]}</div>
                                    <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 500, fontSize: ".86rem", color: "rgba(245,237,214,.75)" }}>{r.name}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;