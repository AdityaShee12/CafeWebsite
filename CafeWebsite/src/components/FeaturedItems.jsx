/* ── FeaturedItems ── */
import { motion } from "framer-motion";

const FeaturedItems = () => {
    const ITEMS = [
        { name: "Signature Espresso", desc: "Double-shot, Ethiopian Yirgacheffe, served black or with steamed oat milk.", price: "₹180", tag: "Bestseller", image: "/assets/signature_espresso.png" },
        { name: "Truffle Sourdough Toast", desc: "House-baked sourdough, truffle butter, micro-greens, smoked sea salt.", price: "₹320", tag: "Chef's Pick", image: "/assets/truffle_toast.png" },
        { name: "Mango Cold Brew", desc: "18-hour cold-brewed Arabica, fresh Alphonso mango, coconut jaggery.", price: "₹240", tag: "Seasonal", image: "/assets/mango_cold_brew.png" },
        { name: "Hazelnut Praline Cake", desc: "Layered Valrhona chocolate, hazelnut praline cream, gold dust finish.", price: "₹380", tag: "Special", image: "/assets/hazelnut_cake.png" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
    };

    return (
        <section id="menu" className="py-28 bg-dark relative z-10">
            <div className="max-w-7xl mx-auto px-[clamp(20px,5vw,56px)]">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="block w-8 h-[1px] bg-gold" />
                            <span className="text-gold font-outfit text-[0.68rem] font-medium tracking-[0.2em] uppercase">Chef's Selection</span>
                        </div>
                        <h2 className="font-playfair text-cream text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-bold m-0">
                            Today's <em className="text-gold not-italic">Specials</em>
                        </h2>
                    </motion.div>
                    <motion.a 
                        href="#menu" 
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 90, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border-[1.5px] border-gold/40 text-gold font-outfit text-[0.7rem] font-medium tracking-[0.14em] uppercase rounded-sm no-underline transition-colors hover:border-gold">
                        Full Menu <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </motion.a>
                </div>
                
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}>
                    {ITEMS.map((item, i) => (
                        <motion.div 
                            key={i} 
                            variants={itemVariants}
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ ease: "easeOut", duration: 0.3 }}
                            className="bg-[#1A0D03] border border-gold/10 rounded-md overflow-hidden flex flex-col cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_15px_rgba(212,175,90,0.15)] hover:border-gold/30">
                            
                            <div className="relative flex items-center justify-center overflow-hidden h-[220px] bg-black group p-4">
                                <motion.img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover rounded-sm transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.65,0.3,0.9)] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D03] via-transparent to-transparent opacity-80" />
                                <span className="absolute top-4 left-4 bg-gold text-dark font-outfit text-[0.58rem] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm shadow-lg z-10">{item.tag}</span>
                            </div>
                            
                            <div className="flex flex-col flex-1 p-6 relative">
                                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                                <h3 className="font-playfair text-cream text-[1.15rem] font-medium mb-3 group-hover:text-gold transition-colors">{item.name}</h3>
                                <p className="flex-1 font-outfit text-[0.85rem] font-light text-cream/50 leading-[1.65] mb-5">{item.desc}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                                    <span className="font-playfair text-gold text-[1.25rem] font-bold">{item.price}</span>
                                    <motion.span 
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                        className="font-outfit text-[0.68rem] text-gold/80 tracking-[0.1em] font-semibold flex items-center gap-1 group/btn">
                                        ORDER <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedItems;