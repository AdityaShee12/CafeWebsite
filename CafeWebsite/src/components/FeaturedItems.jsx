/* ── FeaturedItems ── */
import { useEffect, useRef, useState } from "react";

const FeaturedItems = () => {
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
    const ITEMS = [
        { name: "Signature Espresso", desc: "Double-shot, Ethiopian Yirgacheffe, served black or with steamed oat milk.", price: "₹180", tag: "Bestseller", emoji: "☕" },
        { name: "Truffle Sourdough Toast", desc: "House-baked sourdough, truffle butter, micro-greens, smoked sea salt.", price: "₹320", tag: "Chef's Pick", emoji: "🍞" },
        { name: "Mango Cold Brew", desc: "18-hour cold-brewed Arabica, fresh Alphonso mango, coconut jaggery.", price: "₹240", tag: "Seasonal", emoji: "🥭" },
        { name: "Hazelnut Praline Cake", desc: "Layered Valrhona chocolate, hazelnut praline cream, gold dust finish.", price: "₹380", tag: "Special", emoji: "🍰" },
    ];

    return (
        <section id="menu" style={{ padding: "112px 0", background: "#0F0802" }}>
            <div className="max-w-7xl mx-auto" style={{ padding: "0 clamp(20px,5vw,56px)" }}>
                <div ref={ref} className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: 60 }}>
                    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .7s ease" }}>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="block" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                            <span style={{ color: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: ".68rem", fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>Chef's Selection</span>
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#F5EDD6", fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, fontWeight: 700, margin: 0 }}>Today's <em>Specials</em></h2>
                    </div>
                    <a href="#menu" className="shrink-0"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", border: "1.5px solid rgba(212,175,90,.35)", color: "#D4AF5A", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none" }}>
                        Full Menu <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                </div>
                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}>
                    {ITEMS.map((item, i) => {
                        const [cr, cv2] = useInView();
                        return (
                            <div key={i} ref={cr}
                                style={{ background: "#1A0D03", border: "1px solid rgba(212,175,90,.1)", borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer", opacity: cv2 ? 1 : 0, transform: cv2 ? "translateY(0)" : "translateY(28px)", transition: `opacity .7s ease ${i * .1}s,transform .7s ease ${i * .1}s,box-shadow .3s` }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,.5)"}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                                <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 200, background: "#2A1A06", fontSize: "5rem" }}>{item.emoji}
                                    <span className="absolute top-3 left-3" style={{ background: "#D4AF5A", color: "#0F0802", fontFamily: "'Outfit',sans-serif", fontSize: ".58rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2 }}>{item.tag}</span>
                                </div>
                                <div className="flex flex-col flex-1" style={{ padding: 20 }}>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", color: "#F5EDD6", fontSize: "1.1rem", fontWeight: 500, marginBottom: 8 }}>{item.name}</h3>
                                    <p className="flex-1" style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".82rem", fontWeight: 300, color: "rgba(245,237,214,.4)", lineHeight: 1.65, marginBottom: 16 }}>{item.desc}</p>
                                    <div className="flex items-center justify-between" style={{ paddingTop: 14, borderTop: "1px solid rgba(212,175,90,.1)" }}>
                                        <span style={{ fontFamily: "'Playfair Display',serif", color: "#D4AF5A", fontSize: "1.18rem", fontWeight: 700 }}>{item.price}</span>
                                        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".68rem", color: "rgba(212,175,90,.48)", letterSpacing: ".1em" }}>ORDER →</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedItems;