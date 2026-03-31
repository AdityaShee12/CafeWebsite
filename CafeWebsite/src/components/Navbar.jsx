/* ── Navbar ── */
import { useState } from "react";

const Navbar = ({ scrollY }) => {

    const [open, setOpen] = useState(false);
    const solid = scrollY > 60;
    const NAV = ["Menu", "About", "Gallery", "Reservations", "Contact"];

    return (
        <>
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "0 clamp(20px,5vw,56px)",
                fontFamily: "'Outfit',sans-serif",
                background: solid ? "rgba(15,8,2,0.94)" : "transparent",
                backdropFilter: solid ? "blur(20px)" : "none",
                boxShadow: solid ? "0 1px 40px rgba(0,0,0,0.55)" : "none",
                transition: "background .5s,box-shadow .5s",
            }}>
                <div className="max-w-7xl mx-auto flex items-center gap-7" style={{ height: 76 }}>
                    <a href="#" className="shrink-0 no-underline" style={{ fontFamily: "'Playfair Display',serif", color: "#D4AF5A", fontSize: "1.55rem", fontWeight: 700, letterSpacing: ".03em" }}>☕ Aroma</a>

                    <div className="cafe-nav-links flex flex-1 justify-center gap-1">
                        {NAV.map(l => (
                            <a key={l} href={`#${l.toLowerCase()}`}
                                style={{ padding: "8px 14px", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", textDecoration: "none", transition: "color .2s", borderRadius: 2 }}
                                onMouseEnter={e => e.currentTarget.style.color = "#D4AF5A"}
                                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.7)"}
                            >{l}</a>
                        ))}
                    </div>

                    <a href="#reservations" className="cafe-nav-cta shrink-0 no-underline"
                        style={{ padding: "11px 22px", background: "#D4AF5A", color: "#0F0802", fontFamily: "'Outfit',sans-serif", fontSize: ".7rem", fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", borderRadius: 2, transition: "transform .25s" }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                    >Book Table</a>

                    <button onClick={() => setOpen(o => !o)} className="cafe-hamburger hidden bg-transparent border-0 cursor-pointer ml-auto" style={{ color: "#D4AF5A", padding: 6 }}>
                        {open
                            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>}
                    </button>
                </div>

                <div style={{ maxHeight: open ? "340px" : "0", overflow: "hidden", transition: "max-height .4s ease", background: "rgba(15,8,2,.97)" }}>
                    <div className="flex flex-col gap-1" style={{ padding: "0 16px 24px" }}>
                        {NAV.map(l => (
                            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                                style={{ padding: "14px 0", fontSize: ".86rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", borderBottom: "1px solid rgba(212,175,90,.1)", textDecoration: "none" }}>
                                {l}
                            </a>
                        ))}
                        <a href="#reservations" onClick={() => setOpen(false)}
                            style={{ marginTop: 16, padding: "14px", textAlign: "center", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", background: "#D4AF5A", color: "#0F0802", borderRadius: 2, textDecoration: "none" }}>
                            Book Table
                        </a>
                    </div>
                </div>
            </nav>
            <style>{`
        @media(max-width:900px){
          .cafe-nav-links{display:none!important;}
          .cafe-nav-cta{display:none!important;}
          .cafe-hamburger{display:flex!important;}
        }
      `}</style>
        </>
    );
};

export default Navbar;