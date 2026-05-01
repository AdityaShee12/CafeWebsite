/* ── About ── */
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="relative overflow-hidden py-28 bg-[#120A02]">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-playfair text-[20vw] font-bold text-gold/5 leading-none">
                AROMA
            </div>
            
            <div className="max-w-7xl mx-auto px-[clamp(20px,5vw,56px)] relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-[clamp(32px,6vw,80px)]">
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
                        className="relative"
                    >
                        <div className="relative flex items-center justify-center overflow-hidden aspect-[4/5] bg-[#2A1A06] rounded-md text-[9rem] shadow-2xl">
                            ☕
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -z-10 bottom-[-14px] right-[-14px] w-[70%] h-[70%] border border-gold/20 rounded-md" />
                        
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                            className="absolute top-[-18px] right-[-18px] bg-gold rounded-md py-4 px-5 text-center shadow-[0_12px_40px_rgba(212,175,90,0.3)]"
                        >
                            <span className="block font-playfair text-[2rem] font-bold text-dark leading-none pb-1">6+</span>
                            <span className="font-outfit text-[0.6rem] font-bold text-dark tracking-[0.12em] uppercase">Years</span>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="block w-8 h-[1px] bg-gold" />
                            <span className="text-gold font-outfit text-[0.68rem] font-medium tracking-[0.2em] uppercase">Our Story</span>
                        </div>
                        <h2 className="font-playfair text-cream text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.12] font-bold mb-6">
                            A Dream Brewed<br />in a <em className="text-gold not-italic">Small Kitchen</em>
                        </h2>
                        
                        <p className="font-outfit text-[0.92rem] font-light text-cream/50 leading-[1.9] mb-4">
                            In 2018, Priya Sharma left her corporate job with a simple dream — to build a space where people could slow down, connect, and enjoy truly great coffee.
                        </p>
                        <p className="font-outfit text-[0.92rem] font-light text-cream/50 leading-[1.9] mb-9">
                            What started as a twelve-seat cafe on a quiet Kolkata lane has grown into a beloved neighbourhood institution.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-3 mb-10">
                            {[
                                { icon: "🌱", label: "Locally Sourced" },
                                { icon: "♻️", label: "Sustainable" },
                                { icon: "❤️", label: "Made with Love" }
                            ].map((item, idx) => (
                                <motion.div 
                                    key={item.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
                                    className="flex flex-col items-center gap-2 text-center py-4 px-2 bg-gold/5 border border-gold/10 rounded-sm hover:bg-gold/10 transition-colors"
                                >
                                    <span className="text-[1.3rem]">{item.icon}</span>
                                    <span className="font-outfit text-[0.62rem] font-medium text-cream/40 tracking-[0.1em] uppercase">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.a 
                            href="#about"
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark font-outfit text-[0.7rem] font-semibold tracking-[0.16em] uppercase rounded-sm shadow-[0_8px_24px_rgba(212,175,90,0.22)] no-underline transition-all hover:bg-cream"
                        >
                            Our Full Story
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;