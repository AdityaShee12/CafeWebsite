import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ scrollY }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const solid = scrollY > 60 || location.pathname !== "/";
    const NAV = [
      { name: "Home", path: "/" },
      { name: "Menu", path: "/menu" },
      { name: "Contact", path: "/contact" },
      { name: "Login", path: "/login" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-outfit ${solid ? 'bg-[#0F0802]/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`} style={{ padding: "0 clamp(20px,5vw,56px)" }}>
            <div className="max-w-7xl mx-auto flex items-center h-[76px] justify-between">
                <Link to="/" className="shrink-0 no-underline font-playfair text-[#D4AF5A] text-2xl font-bold tracking-wider">☕ Aroma</Link>

                <div className="hidden md:flex flex-1 justify-center gap-1">
                    {NAV.map(l => (
                        <Link key={l.name} to={l.path}
                            className={`px-4 py-2 text-[0.7rem] font-medium tracking-[0.14em] uppercase no-underline transition-colors duration-200 rounded-sm ${location.pathname === l.path ? 'text-[#D4AF5A]' : 'text-white/70 hover:text-[#D4AF5A]'}`}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link to="/#reservations" className="shrink-0 no-underline px-6 py-2.5 bg-[#D4AF5A] text-[#0F0802] font-outfit text-[0.7rem] font-medium tracking-[0.14em] uppercase rounded-sm transition-transform duration-250 hover:-translate-y-0.5"
                    >Book Table</Link>
                </div>

                <button onClick={() => setOpen(o => !o)} className="md:hidden bg-transparent border-0 cursor-pointer p-1.5 text-[#D4AF5A] ml-auto">
                    {open
                        ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>}
                </button>
            </div>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0F0802]/95 ${open ? 'max-h-[340px]' : 'max-h-0'}`}>
                <div className="flex flex-col gap-1 px-4 pb-6">
                    {NAV.map(l => (
                        <Link key={l.name} to={l.path} onClick={() => setOpen(false)}
                            className={`py-3.5 text-[0.86rem] font-medium tracking-[0.12em] uppercase border-b border-[#D4AF5A]/10 no-underline ${location.pathname === l.path ? 'text-[#D4AF5A]' : 'text-white/70'}`}>
                            {l.name}
                        </Link>
                    ))}
                    <Link to="/#reservations" onClick={() => setOpen(false)}
                        className="mt-4 p-3.5 text-center text-[0.72rem] font-medium tracking-[0.14em] uppercase bg-[#D4AF5A] text-[#0F0802] rounded-sm no-underline">
                        Book Table
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;