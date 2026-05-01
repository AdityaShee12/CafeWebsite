/* ── Stats ── */
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const Stats = () => {
    const Counter = ({ target, suffix = "" }) => {
        const ref = useRef(null);
        const [n, setN] = useState(0);
        const inView = useInView(ref, { once: true, margin: "-50px" });

        useEffect(() => {
            if (!inView) return;
            const controls = animate(0, target, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (value) => {
                    setN(Math.floor(value));
                }
            });
            return () => controls.stop();
        }, [inView, target]);

        return <span ref={ref}>{n}{suffix}</span>;
    };

    const STATS = [
        { value: 6, suffix: "+", label: "Years of Craft" },
        { value: 12, suffix: "K+", label: "Happy Guests" },
        { value: 30, suffix: "+", label: "Menu Creations" },
        { value: 4, suffix: ".9★", label: "Average Rating" }
    ];

    return (
        <section className="bg-[#1A0D03] border-y border-gold/10 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
                {STATS.map((s, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        key={i} 
                        className={`flex-1 flex flex-col items-center py-14 px-5 ${i < 3 ? 'md:border-r border-gold/5 border-b md:border-b-0' : ''}`}
                    >
                        <span className="font-playfair text-gold text-[3rem] font-bold leading-none drop-shadow-[0_0_12px_rgba(212,175,90,0.2)] hover:scale-105 transition-transform cursor-default">
                            <Counter target={s.value} suffix={s.suffix} />
                        </span>
                        <span className="mt-4 text-[0.75rem] font-medium tracking-[0.2em] uppercase text-cream/40 font-outfit">
                            {s.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;