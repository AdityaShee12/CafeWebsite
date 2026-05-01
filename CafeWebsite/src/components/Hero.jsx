/* ── Hero ── */
import Particles from "./Particles";
import { motion } from "framer-motion";

const Hero = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } }
    };

    return (
        <section className="relative w-full flex items-center overflow-hidden min-h-screen bg-dark">
            <div className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10s] scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85')", filter: "brightness(0.3) saturate(0.8)" }} />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-dark/95 via-dark/70 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-transparent to-dark/40" />
            
            <div className="absolute inset-0 z-20"><Particles /></div>
            
            <div className="absolute top-0 bottom-0 z-20 w-[1px] opacity-30 left-[11%] bg-gradient-to-b from-transparent via-gold to-transparent" />

            <div className="relative z-30 w-full max-w-7xl mx-auto px-[clamp(20px,5vw,56px)] pt-20">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
                    }}
                    className="max-w-[680px]">
                    
                    <motion.div variants={textVariants} className="flex items-center gap-3 mb-6">
                        <span className="block shrink-0 w-8 h-[1px] bg-gold" />
                        <span className="font-outfit text-gold text-[0.7rem] font-medium tracking-[0.25em] uppercase">Est. 2018 · Kolkata</span>
                    </motion.div>
                    
                    <div className="overflow-hidden pb-2">
                        <motion.h1 
                            variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } } }}
                            className="font-playfair text-[clamp(4rem,9vw,6.5rem)] font-bold leading-[1.05] text-cream m-0 drop-shadow-2xl">
                            Where Every
                        </motion.h1>
                    </div>
                    
                    <div className="overflow-hidden mb-8 pb-2">
                        <motion.h1 
                            variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } } }}
                            className="font-playfair text-[clamp(4rem,9vw,6.5rem)] font-bold italic leading-[1.05] text-gold drop-shadow-[0_0_15px_rgba(212,175,90,0.3)] m-0">
                            Cup Speaks
                        </motion.h1>
                    </div>
                    
                    <motion.p 
                        variants={textVariants}
                        className="font-outfit text-base font-light leading-[1.88] text-cream/60 max-w-[440px] mb-10">
                        Handcrafted coffee, seasonal menus &amp; warm hospitality — your neighbourhood escape from the everyday.
                    </motion.p>
                    
                    <motion.div variants={textVariants} className="flex flex-wrap gap-4">
                        <motion.a 
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#menu"
                            className="inline-flex items-center gap-3 px-9 py-4 bg-gold text-dark font-outfit text-[0.75rem] font-semibold tracking-[0.16em] uppercase rounded-sm shadow-[0_8px_32px_rgba(212,175,90,0.3)] transition-all hover:bg-cream">
                            Explore Menu
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </motion.a>
                        <motion.a 
                            whileHover={{ y: -3, backgroundColor: "rgba(212, 175, 90, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            href="#reservations"
                            className="inline-flex items-center px-9 py-4 border-[1.5px] border-gold/40 text-cream/90 font-outfit text-[0.75rem] font-medium tracking-[0.16em] uppercase rounded-sm transition-all hover:border-gold">
                            Reserve a Table
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
            
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
                <span className="font-outfit text-[0.6rem] text-gold/60 tracking-[0.25em] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll</span>
                <div className="relative overflow-hidden w-[1px] h-12 bg-gold/15">
                    <motion.div 
                        animate={{ y: ["-100%", "300%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-[40%] bg-gold shadow-[0_0_8px_rgba(212,175,90,0.8)]" 
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;