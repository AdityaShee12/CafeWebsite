/* ── Particles ── */
import { useEffect, useRef, useState } from "react";

const Particles = () => {
    const cv = useRef(null);
    useEffect(() => {
        const c = cv.current; if (!c) return;
        const ctx = c.getContext("2d");
        let w = (c.width = c.offsetWidth), h = (c.height = c.offsetHeight);
        const pts = Array.from({ length: 38 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + 0.3, dx: (Math.random() - .5) * .22, dy: -Math.random() * .38 - .08, o: Math.random() * .45 + .1 }));
        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(212,175,90,${p.o})`; ctx.fill(); p.x += p.dx; p.y += p.dy; if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; } if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; });
            raf = requestAnimationFrame(draw);
        };
        draw();
        const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
        window.addEventListener("resize", resize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);
    return <canvas ref={cv} className="absolute inset-0 w-full h-full pointer-events-none block" />;
};

export default Particles;