/* ── Testimonials ── */
import { motion } from "framer-motion";

const Testimonials = () => {
    const REVIEWS = [
        { name: "Ritika Bose", stars: 5, text: "The espresso here is the best I've had outside of Naples. The sourdough toast? Absolute perfection. My weekly ritual." },
        { name: "Arnab Ghosh", stars: 5, text: "Aroma has this rare quality — it feels like a secret even when it's packed. Beautiful interiors, thoughtful menu, exceptional service." },
        { name: "Sneha Mukherjee", stars: 5, text: "Came for the cold brew, stayed for three hours. The seasonal menu is inspired. This place understands what a cafe should feel like." },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const reviewVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
    };

    return (
        <section className="py-28 bg-[#1A0D03] relative z-10">
            <div className="max-w-7xl mx-auto px-[clamp(20px,5vw,56px)]">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="block w-8 h-[1px] bg-gold" />
                        <span className="text-gold font-outfit text-[0.68rem] font-medium tracking-[0.2em] uppercase">Guest Reviews</span>
                        <span className="block w-8 h-[1px] bg-gold" />
                    </div>
                    <h2 className="font-playfair text-cream text-[clamp(2rem,4vw,3rem)] font-bold m-0 leading-tight">
                        What Our <em className="text-gold not-italic">Guests Say</em>
                    </h2>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {REVIEWS.map((r, i) => (
                        <motion.div 
                            key={i}
                            variants={reviewVariants}
                            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(212,175,90,0.3)" }}
                            className="bg-dark/80 border border-gold/10 border-b-[3px] border-b-gold rounded-md p-8 flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all cursor-default"
                        >
                            <span className="block font-playfair text-[4.5rem] text-gold/10 leading-[0.8] mb-3">"</span>
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: r.stars }).map((_, j) => (
                                    <span key={j} className="text-gold text-[0.8rem]">★</span>
                                ))}
                            </div>
                            <p className="flex-1 font-playfair italic text-cream/70 text-[0.95rem] leading-[1.78] mb-6">
                                {r.text}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-gold font-outfit text-dark font-bold text-[1rem] shadow-[0_0_12px_rgba(212,175,90,0.4)]">
                                    {r.name[0]}
                                </div>
                                <span className="font-outfit font-medium text-[0.86rem] text-cream/80">
                                    {r.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;