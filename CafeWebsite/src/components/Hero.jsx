/* ── Hero ── */
import { useEffect, useRef, useState } from "react";
import Particles from "./Particles";

const Hero = () => {

    const [on, setOn] = useState(false);
    useEffect(() => { setTimeout(() => setOn(true), 120); }, []);
    const rv = d => ({
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(30px)",
        transition: `opacity .9s ease ${d}s,transform .9s ease ${d}s`,
    });

    return (
        <section className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#0F0802" }}>
            <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85')", filter: "brightness(.24) saturate(.6)" }} />
            <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right,rgba(15,8,2,.97) 40%,rgba(15,8,2,.3))" }} />
            <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top,rgba(15,8,2,.88) 0%,transparent 52%)" }} />
            <div className="absolute inset-0 z-20"><Particles /></div>
            <div className="absolute top-0 bottom-0 z-20" style={{ left: "11%", width: 1, background: "linear-gradient(to bottom,transparent,#D4AF5A 28%,#D4AF5A 72%,transparent)", opacity: .22 }} />

            <div className="relative z-30 w-full max-w-7xl mx-auto" style={{ padding: "80px clamp(20px,5vw,56px) 0" }}>
                <div style={{ maxWidth: 680 }}>
                    <div style={rv(.1)} className="flex items-center gap-3" style2={{ marginBottom: 20 }}>
                        <div style={{ ...rv(.1), display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                            <span className="block shrink-0" style={{ width: 32, height: 1, background: "#D4AF5A" }} />
                            <span style={{ fontFamily: "'Outfit',sans-serif", color: "#D4AF5A", fontSize: ".68rem", fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase" }}>Est. 2018 · Kolkata</span>
                        </div>
                    </div>
                    <h1 style={{ ...rv(.25), fontFamily: "'Playfair Display',serif", fontSize: "clamp(3.2rem,8vw,6.5rem)", fontWeight: 700, lineHeight: 1.05, color: "#F5EDD6", margin: 0 }}>Where Every</h1>
                    <h1 style={{ ...rv(.38), fontFamily: "'Playfair Display',serif", fontSize: "clamp(3.2rem,8vw,6.5rem)", fontWeight: 700, fontStyle: "italic", lineHeight: 1.05, color: "#D4AF5A", marginBottom: 28 }}>Cup Speaks</h1>
                    <p style={{ ...rv(.52), fontFamily: "'Outfit',sans-serif", fontSize: "1rem", fontWeight: 300, lineHeight: 1.88, color: "rgba(245,237,214,.56)", maxWidth: 440, marginBottom: 40 }}>
                        Handcrafted coffee, seasonal menus &amp; warm hospitality — your neighbourhood escape from the everyday.
                    </p>
                    <div style={rv(.65)} className="flex flex-wrap" style2={{ gap: 14 }}>
                        <div style={{ ...rv(.65), display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <a href="#menu"
                                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 36px", background: "#D4AF5A", color: "#0F0802", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", boxShadow: "0 8px 32px rgba(212,175,90,.32)", transition: "transform .3s" }}>
                                Explore Menu
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </a>
                            <a href="#reservations"
                                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                                style={{ display: "inline-flex", alignItems: "center", padding: "14px 36px", border: "1.5px solid rgba(212,175,90,.45)", color: "rgba(245,237,214,.85)", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", transition: "transform .3s" }}>
                                Reserve a Table
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".56rem", color: "rgba(212,175,90,.42)", letterSpacing: ".2em", textTransform: "uppercase" }}>Scroll</span>
                <div className="relative overflow-hidden" style={{ width: 1, height: 44, background: "rgba(212,175,90,.14)" }}>
                    <div className="scroll-anim absolute top-0 left-0 w-full" style={{ height: "40%", background: "#D4AF5A" }} />
                </div>
            </div>
        </section>
    );
};

export default Hero;