import { Link } from "react-router-dom";

/* ── Footer ── */
const NAV = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Reservations", path: "/#reservations" },
  { name: "Contact", path: "/contact" }
];

const Footer = () => (
    <footer style={{ background: "#080401", borderTop: "1px solid rgba(212,175,90,.1)" }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "72px clamp(20px,5vw,56px)" }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-13">
                <div className="md:col-span-2">
                    <Link to="/" className="block mb-4 no-underline font-playfair text-[#D4AF5A] text-[1.75rem] font-bold">☕ Aroma</Link>
                    <p className="mb-5.5 font-outfit font-light text-[.84rem] text-[#F5EDD6]/40 leading-[1.85] max-w-[240px]">Where every cup tells a story.<br />Crafted with love since 2018.</p>
                    <div className="flex gap-2.25">
                        {["📸", "📘", "💬"].map((ic, i) => (
                            <a key={i} href="#"
                                className="flex items-center justify-center no-underline w-[34px] h-[34px] border border-[#D4AF5A]/20 rounded-full text-[.82rem] transition-transform duration-250 hover:-translate-y-0.5"
                            >{ic}</a>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-outfit text-[.66rem] font-medium tracking-[.18em] uppercase text-[#D4AF5A] mb-4">Quick Links</h4>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                        {NAV.map(l => (
                            <li key={l.name}>
                                <Link to={l.path} className="font-outfit text-[.86rem] font-light text-[#F5EDD6]/40 no-underline transition-colors duration-200 hover:text-[#D4AF5A]">
                                    {l.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-outfit text-[.66rem] font-medium tracking-[.18em] uppercase text-[#D4AF5A] mb-4">Contact</h4>
                    <ul className="list-none p-0 m-0 flex flex-col gap-3">
                        {[["📍", "42 Coffee Lane, Park Street, Kolkata"], ["📞", "+91 98765 43210"], ["✉️", "hello@aromacafe.in"], ["🕐", "Mon–Sun: 8 AM – 11 PM"]].map(([ic, tx]) => (
                            <li key={tx} className="flex items-start gap-2.5">
                                <span className="shrink-0 mt-px text-[.8rem]">{ic}</span>
                                <span className="font-outfit text-[.82rem] font-light text-[#F5EDD6]/40 leading-[1.55]">{tx}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-between pt-5 border-t border-[#D4AF5A]/10 mt-10">
                <p className="font-outfit text-[.72rem] text-[#F5EDD6]/20 font-light">© {new Date().getFullYear()} Aroma Cafe. All rights reserved.</p>
                <Link to="/admin" className="font-outfit text-[.66rem] text-[#F5EDD6]/10 tracking-[.12em] uppercase no-underline hover:text-[#F5EDD6]/30 transition-colors">Admin</Link>
            </div>
        </div>
    </footer>
);

export default Footer;