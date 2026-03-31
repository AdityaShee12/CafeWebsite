/* ── Footer ── */
const NAV = ["Menu", "About", "Gallery", "Reservations", "Contact"];

const Footer = () => (
    <footer style={{ background: "#080401", borderTop: "1px solid rgba(212,175,90,.1)" }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "72px clamp(20px,5vw,56px)" }}>
            <div className="grid mb-13" style={{ gridTemplateColumns: "2fr 1fr 1.2fr", gap: "clamp(28px,5vw,64px)" }}>
                <div>
                    <a href="#" className="block mb-4 no-underline" style={{ fontFamily: "'Playfair Display',serif", color: "#D4AF5A", fontSize: "1.75rem", fontWeight: 700 }}>☕ Aroma</a>
                    <p className="mb-5.5" style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 300, fontSize: ".84rem", color: "rgba(245,237,214,.36)", lineHeight: 1.85, maxWidth: 240 }}>Where every cup tells a story.<br />Crafted with love since 2018.</p>
                    <div className="flex gap-2.25">
                        {["📸", "📘", "💬"].map((ic, i) => (
                            <a key={i} href="#"
                                className="flex items-center justify-center no-underline"
                                style={{ width: 34, height: 34, border: "1px solid rgba(212,175,90,.2)", borderRadius: "50%", fontSize: ".82rem", transition: "transform .25s" }}
                                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                            >{ic}</a>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".66rem", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: "#D4AF5A", marginBottom: 18 }}>Quick Links</h4>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.25">
                        {NAV.map(l => (
                            <li key={l}><a href={`#${l.toLowerCase()}`}
                                style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".86rem", fontWeight: 300, color: "rgba(245,237,214,.4)", textDecoration: "none", transition: "color .2s" }}
                                onMouseEnter={e => e.currentTarget.style.color = "#D4AF5A"}
                                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,237,214,.4)"}
                            >{l}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".66rem", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: "#D4AF5A", marginBottom: 18 }}>Contact</h4>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.75">
                        {[["📍", "42 Coffee Lane, Park Street, Kolkata"], ["📞", "+91 98765 43210"], ["✉️", "hello@aromacafe.in"], ["🕐", "Mon–Sun: 8 AM – 11 PM"]].map(([ic, tx]) => (
                            <li key={tx} className="flex items-start gap-2.25">
                                <span className="shrink-0 mt-px" style={{ fontSize: ".8rem" }}>{ic}</span>
                                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".82rem", fontWeight: 300, color: "rgba(245,237,214,.4)", lineHeight: 1.55 }}>{tx}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(212,175,90,.08)" }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".72rem", color: "rgba(245,237,214,.2)", fontWeight: 300 }}>© {new Date().getFullYear()} Aroma Cafe. All rights reserved.</p>
                <a href="/admin/login" style={{ fontFamily: "'Outfit',sans-serif", fontSize: ".66rem", color: "rgba(245,237,214,.13)", letterSpacing: ".12em", textTransform: "uppercase", textDecoration: "none" }}>Admin</a>
            </div>
        </div>
    </footer>
);

export default Footer