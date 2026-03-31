/* ── Gallery ── */
import { useEffect, useRef, useState } from "react";

const Gallery = () => {
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
    const GALLERY = [{ emoji: "☕", label: "Signature Pour", big: true }, { emoji: "🥗", label: "Garden Salad", big: false }, { emoji: "🍰", label: "Praline Cake", big: false }, { emoji: "🪴", label: "Interior Vibes", big: false }, { emoji: "🫖", label: "Artisan Tea", big: false }];

    return (
        <section id="gallery" style={{ padding: "112px 0", background: "#0F0802" }}>
            <div className="max-w-7xl mx-auto" style={{ padding: "0 clamp(20px,5vw,56px)" }}>
                <div ref={ref} className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: 52 }}>
                    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .7s ease" }}>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="block" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                            <span style={{ color: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: ".68rem", fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>Moments</span>
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#F5EDD6", fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, fontWeight: 700, margin: 0 }}>A Glimpse <em>Inside</em></h2>
                    </div>
                    <a href="#gallery" className="shrink-0"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", border: "1.5px solid rgba(212,175,90,.35)", color: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none" }}>
                        View All Photos
                    </a>
                </div>
                <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(3,1fr)", gridAutoRows: "180px" }}>
                    {GALLERY.map((g, i) => {
                        const [cr, cv2] = useInView();
                        return (
                            <div key={i} ref={cr}
                                className="gallery-item relative cursor-pointer overflow-hidden"
                                style={{ background: "#2A1A06", borderRadius: 4, border: "1px solid rgba(212,175,90,.07)", gridRow: g.big ? "span 2" : "span 1", opacity: cv2 ? 1 : 0, transform: cv2 ? "none" : "scale(.96)", transition: `opacity .6s ease ${i * .08}s,transform .6s ease ${i * .08}s` }}>
                                <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: "5rem" }}>{g.emoji}</div>
                                <div className="g-ov absolute inset-0 flex items-end" style={{ background: "rgba(15,8,2,.62)", padding: 16 }}>
                                    <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".8rem", fontWeight: 500, color: "rgba(245,237,214,.9)", letterSpacing: ".06em" }}>{g.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Gallery;