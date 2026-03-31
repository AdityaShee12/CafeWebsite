/* ── Stats ── */
import { useEffect, useRef, useState } from "react";

const Stats = () => {
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
    /* ── Counter ── */
    const Counter = ({ target, suffix = "" }) => {
        const [n, setN] = useState(0);
        const [ref, inView] = useInView();
        useEffect(() => {
            if (!inView) return;
            let v = 0; const step = target / 60;
            const t = setInterval(() => { v += step; if (v >= target) { setN(target); clearInterval(t); } else setN(Math.floor(v)); }, 16);
            return () => clearInterval(t);
        }, [inView, target]);
        return <span ref={ref}>{n}{suffix}</span>;
    };
    const STATS = [{ value: 6, suffix: "+", label: "Years of Craft" }, { value: 12, suffix: "K+", label: "Happy Guests" }, { value: 30, suffix: "+", label: "Menu Creations" }, { value: 4, suffix: ".9★", label: "Average Rating" }];

    return (
        <section style={{ background: "#1A0D03", borderTop: "1px solid rgba(212,175,90,.12)", borderBottom: "1px solid rgba(212,175,90,.12)" }}>
            <div className="max-w-7xl mx-auto grid grid-cols-4">
                {STATS.map((s, i) => (
                    <div key={i} className="flex flex-col items-center" style={{ padding: "48px 20px", borderRight: i < 3 ? "1px solid rgba(212,175,90,.09)" : "none" }}>
                        <span style={{ fontFamily: "'Playfair Display',serif", color: "#D4AF5A", fontSize: "2.7rem", fontWeight: 700, lineHeight: 1 }}><Counter target={s.value} suffix={s.suffix} /></span>
                        <span className="mt-2" style={{ fontSize: ".68rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(245,237,214,.36)", fontFamily: "'Outfit',sans-serif" }}>{s.label}</span>
                    </div>
                ))}
            </div>
        </section>);
}

export default Stats;