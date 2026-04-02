import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Particles from "./Particles";

const BACKEND_API = import.meta.env.VITE_BACKEND_API || "http://localhost:8000";

/* ── useInView ── */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ── Shared style tokens ── */
const GOLD = "#D4AF5A";
const DARK = "#0F0802";
const CREAM = "#F5EDD6";
const OT = "'Outfit',sans-serif";
const PF = "'Playfair Display',serif";

/* ── Time slots ── */
const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
];

const OCCASIONS = [
  "", "Birthday", "Anniversary", "Date Night",
  "Business Lunch", "Family Gathering", "Bridal Shower", "Other",
];

const SEATING = [
  "No Preference", "Indoor", "Outdoor",
  "Window Seat", "Private Corner",
];

/* ── Input style ── */
const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(212,175,90,0.22)",
  borderRadius: 4,
  padding: "13px 16px",
  color: CREAM,
  fontFamily: OT,
  fontSize: "0.88rem",
  fontWeight: 300,
  outline: "none",
  transition: "border-color .2s",
};

const labelStyle = {
  display: "block",
  fontFamily: OT,
  fontSize: "0.68rem",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(212,175,90,0.75)",
  marginBottom: 7,
};

/* ── Field component ── */
const Field = ({ label, error, children }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={labelStyle}>{label}</label>
    {children}
    {error && (
      <span style={{ fontFamily: OT, fontSize: "0.72rem", color: "#f87171", marginTop: 5 }}>
        {error}
      </span>
    )}
  </div>
);

/* ── Success Card ── */
const SuccessCard = ({ data, onReset }) => (
  <div
    className="text-center"
    style={{ padding: "48px 32px", background: "rgba(212,175,90,0.06)", border: "1px solid rgba(212,175,90,0.2)", borderRadius: 8 }}
  >
    <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>☕</div>
    <h3 style={{ fontFamily: PF, color: CREAM, fontSize: "1.8rem", fontWeight: 700, marginBottom: 10 }}>
      You're all set!
    </h3>
    <p style={{ fontFamily: OT, color: "rgba(245,237,214,0.55)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: 28 }}>
      We're looking forward to welcoming you, <strong style={{ color: CREAM }}>{data.name}</strong>.
    </p>

    <div style={{ background: "rgba(212,175,90,0.1)", border: "1px solid rgba(212,175,90,0.25)", borderRadius: 6, padding: "20px 24px", marginBottom: 28, textAlign: "left" }}>
      <div style={{ fontFamily: OT, fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>
        Booking Summary
      </div>
      {[
        ["Confirmation Code", data.confirmationCode],
        ["Date", new Date(data.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })],
        ["Time", data.time],
        ["Guests", data.guests],
        ["Status", data.status.toUpperCase()],
      ].map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(212,175,90,0.1)" }}>
          <span style={{ fontFamily: OT, fontSize: "0.8rem", color: "rgba(245,237,214,0.5)" }}>{k}</span>
          <span style={{ fontFamily: k === "Confirmation Code" ? PF : OT, fontSize: "0.88rem", fontWeight: k === "Confirmation Code" ? 700 : 500, color: k === "Confirmation Code" ? GOLD : CREAM }}>
            {v}
          </span>
        </div>
      ))}
    </div>

    <p style={{ fontFamily: OT, fontSize: "0.78rem", color: "rgba(245,237,214,0.35)", marginBottom: 24, lineHeight: 1.7 }}>
      Save your confirmation code — you'll need it to modify or cancel your reservation.
    </p>

    <button
      onClick={onReset}
      style={{ padding: "12px 32px", border: "1.5px solid rgba(212,175,90,0.4)", color: GOLD, background: "transparent", fontFamily: OT, fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: 2, cursor: "pointer" }}
    >
      Make Another Reservation
    </button>
  </div>
);

/* ── Main Component ── */
const ReservationCTA = () => {
  const [ref, inView] = useInView();

  /* ── Form state ── */
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    date: "", time: "", guests: "2",
    occasion: "", seatingPreference: "No Preference",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  /* ── Fetch available slots when date changes ── */
  useEffect(() => {
    if (!form.date) { setSlots([]); return; }
    const fetchSlots = async () => {
      setSlotsLoading(true);
      try {
        const res = await axios.get(`${BACKEND_API}/api/reservations/available-slots?date=${form.date}`);
        setSlots(res.data.data);
      } catch {
        setSlots(TIME_SLOTS.map(t => ({ time: t, available: true, remaining: 3 })));
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [form.date]);

  /* ── Handlers ── */
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time slot";
    if (!form.guests || form.guests < 1) e.guests = "At least 1 guest required";
    if (form.guests > 20) e.guests = "Maximum 20 guests";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setServerError("");
    try {
      const res = await axios.post(`${BACKEND_API}/api/reservations`, {
        ...form,
        guests: parseInt(form.guests),
      });
      setSuccess(res.data.data);
      setShowForm(false);
    } catch (err) {
      setServerError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(null);
    setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", occasion: "", seatingPreference: "No Preference", specialRequests: "" });
    setErrors({});
    setSlots([]);
  };

  /* ── Tomorrow as min date ── */
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      <style>{`
        .res-input:focus { border-color: rgba(212,175,90,0.7) !important; }
        .res-input::placeholder { color: rgba(245,237,214,0.2); }
        .res-input option { background: #1A0D03; color: #F5EDD6; }
        .slot-btn { transition: all .2s; }
        .slot-btn:hover:not(:disabled) { border-color: #D4AF5A !important; color: #D4AF5A !important; }
        .slot-btn.active { background: #D4AF5A !important; color: #0F0802 !important; border-color: #D4AF5A !important; }
        .slot-btn:disabled { opacity: .35; cursor: not-allowed; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(212,175,90,.45) !important; }
        .submit-btn:disabled { opacity: .6; cursor: not-allowed; }
        @media (max-width: 640px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .form-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <section
        id="reservations"
        className="relative overflow-hidden"
        style={{ padding: "120px 0", background: DARK }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')", filter: "brightness(.13) saturate(.4)" }}
        />
        <div className="absolute inset-0 z-10" style={{ background: "rgba(15,8,2,.8)" }} />
        <div className="absolute inset-0 z-20"><Particles /></div>

        <div
          ref={ref}
          className="relative z-30 mx-auto"
          style={{ maxWidth: 900, padding: "0 clamp(20px,5vw,56px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(22px)", transition: "all .9s ease" }}
        >
          {/* ── Header ── */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block" style={{ width: 32, height: 1, background: GOLD }} />
              <span style={{ color: GOLD, fontFamily: OT, fontSize: ".68rem", fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase" }}>
                Reserve a Table
              </span>
              <span className="block" style={{ width: 32, height: 1, background: GOLD }} />
            </div>
            <h2 style={{ fontFamily: PF, color: CREAM, fontSize: "clamp(2.4rem,6vw,4.2rem)", lineHeight: 1.08, fontWeight: 700, marginBottom: 14 }}>
              Join Us for a<br /><em style={{ color: GOLD }}>Memorable Meal</em>
            </h2>
            <p style={{ fontFamily: OT, fontSize: ".93rem", fontWeight: 300, color: "rgba(245,237,214,.45)", lineHeight: 1.9, maxWidth: 480, margin: "0 auto" }}>
              Book your table online in seconds. We're open daily from 8 AM to 11 PM.
            </p>
          </div>

          {/* ── Success state ── */}
          {success ? (
            <SuccessCard data={success} onReset={handleReset} />
          ) : (
            <>
              {/* ── CTA buttons when form is hidden ── */}
              {!showForm && (
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                  <button
                    onClick={() => setShowForm(true)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 40px", background: GOLD, color: DARK, fontFamily: OT, fontSize: ".7rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(212,175,90,.3)", transition: "transform .3s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Book a Table
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </button>
                  <a
                    href="tel:+919876543210"
                    style={{ display: "inline-flex", alignItems: "center", padding: "14px 40px", border: "1.5px solid rgba(212,175,90,.4)", color: "rgba(245,237,214,.85)", fontFamily: OT, fontSize: ".7rem", fontWeight: 500, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none", transition: "transform .3s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    Call Us
                  </a>
                </div>
              )}

              {/* ── Booking Form ── */}
              {showForm && (
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,90,0.15)", borderRadius: 8, padding: "clamp(24px,4vw,48px)" }}>

                  {/* Section: Guest Info */}
                  <div style={{ marginBottom: 32 }}>
                    <p style={{ fontFamily: OT, fontSize: ".68rem", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: GOLD, marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(212,175,90,.1)" }}>
                      Guest Information
                    </p>
                    <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <Field label="Full Name *" error={errors.name}>
                        <input
                          className="res-input"
                          name="name" value={form.name}
                          onChange={handleChange}
                          placeholder="Priya Sharma"
                          style={{ ...inputStyle, borderColor: errors.name ? "#f87171" : "rgba(212,175,90,0.22)" }}
                        />
                      </Field>
                      <Field label="Email Address *" error={errors.email}>
                        <input
                          className="res-input"
                          type="email" name="email" value={form.email}
                          onChange={handleChange}
                          placeholder="priya@email.com"
                          style={{ ...inputStyle, borderColor: errors.email ? "#f87171" : "rgba(212,175,90,0.22)" }}
                        />
                      </Field>
                    </div>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input
                        className="res-input"
                        name="phone" value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        style={{ ...inputStyle, maxWidth: "calc(50% - 8px)", borderColor: errors.phone ? "#f87171" : "rgba(212,175,90,0.22)" }}
                      />
                    </Field>
                  </div>

                  {/* Section: Booking Details */}
                  <div style={{ marginBottom: 32 }}>
                    <p style={{ fontFamily: OT, fontSize: ".68rem", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: GOLD, marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(212,175,90,.1)" }}>
                      Booking Details
                    </p>
                    <div className="form-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
                      <Field label="Date *" error={errors.date}>
                        <input
                          className="res-input"
                          type="date" name="date" value={form.date}
                          min={minDate}
                          onChange={handleChange}
                          style={{ ...inputStyle, colorScheme: "dark", borderColor: errors.date ? "#f87171" : "rgba(212,175,90,0.22)" }}
                        />
                      </Field>
                      <Field label="Number of Guests *" error={errors.guests}>
                        <input
                          className="res-input"
                          type="number" name="guests" value={form.guests}
                          min={1} max={20}
                          onChange={handleChange}
                          style={{ ...inputStyle, borderColor: errors.guests ? "#f87171" : "rgba(212,175,90,0.22)" }}
                        />
                      </Field>
                      <Field label="Occasion">
                        <select
                          className="res-input"
                          name="occasion" value={form.occasion}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: "pointer" }}
                        >
                          {OCCASIONS.map(o => (
                            <option key={o} value={o}>{o || "Select occasion (optional)"}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Time Slots */}
                    <Field label={`Time Slot * ${form.date ? "" : "— select a date first"}`} error={errors.time}>
                      {slotsLoading ? (
                        <p style={{ fontFamily: OT, fontSize: "0.82rem", color: "rgba(245,237,214,0.35)", padding: "12px 0" }}>
                          Checking availability...
                        </p>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                          {(slots.length ? slots : TIME_SLOTS.map(t => ({ time: t, available: true }))).map(slot => (
                            <button
                              key={slot.time}
                              className={`slot-btn ${form.time === slot.time ? "active" : ""}`}
                              disabled={!slot.available}
                              onClick={() => {
                                if (!slot.available) return;
                                setForm(f => ({ ...f, time: slot.time }));
                                if (errors.time) setErrors(e => ({ ...e, time: "" }));
                              }}
                              style={{
                                padding: "8px 14px",
                                border: `1px solid ${form.time === slot.time ? GOLD : "rgba(212,175,90,0.2)"}`,
                                borderRadius: 3,
                                background: form.time === slot.time ? GOLD : "transparent",
                                color: form.time === slot.time ? DARK : "rgba(245,237,214,0.6)",
                                fontFamily: OT,
                                fontSize: "0.78rem",
                                fontWeight: 500,
                                cursor: slot.available ? "pointer" : "not-allowed",
                              }}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      )}
                    </Field>
                  </div>

                  {/* Section: Preferences */}
                  <div style={{ marginBottom: 32 }}>
                    <p style={{ fontFamily: OT, fontSize: ".68rem", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase", color: GOLD, marginBottom: 20, paddingBottom: 10, borderBottom: "1px solid rgba(212,175,90,.1)" }}>
                      Preferences <span style={{ color: "rgba(212,175,90,0.4)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>(Optional)</span>
                    </p>
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle}>Seating Preference</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {SEATING.map(s => (
                          <button
                            key={s}
                            className={`slot-btn ${form.seatingPreference === s ? "active" : ""}`}
                            onClick={() => setForm(f => ({ ...f, seatingPreference: s }))}
                            style={{
                              padding: "8px 16px",
                              border: `1px solid ${form.seatingPreference === s ? GOLD : "rgba(212,175,90,0.2)"}`,
                              borderRadius: 3,
                              background: form.seatingPreference === s ? GOLD : "transparent",
                              color: form.seatingPreference === s ? DARK : "rgba(245,237,214,0.6)",
                              fontFamily: OT, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Field label="Special Requests / Dietary Needs">
                      <textarea
                        className="res-input"
                        name="specialRequests"
                        value={form.specialRequests}
                        onChange={handleChange}
                        placeholder="Allergies, high chair needed, vegan menu, candles for anniversary..."
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical", minHeight: 90 }}
                      />
                    </Field>
                  </div>

                  {/* ── Server Error ── */}
                  {serverError && (
                    <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 4, padding: "14px 18px", marginBottom: 20 }}>
                      <p style={{ fontFamily: OT, fontSize: "0.85rem", color: "#f87171", margin: 0 }}>{serverError}</p>
                    </div>
                  )}

                  {/* ── Submit ── */}
                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      className="submit-btn"
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 40px", background: GOLD, color: DARK, fontFamily: OT, fontSize: ".7rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", borderRadius: 2, border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(212,175,90,.28)", transition: "all .3s" }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                          Confirming...
                        </>
                      ) : (
                        <>
                          Confirm Reservation
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => { setShowForm(false); setErrors({}); setServerError(""); }}
                      style={{ padding: "14px 24px", border: "1.5px solid rgba(212,175,90,0.25)", color: "rgba(245,237,214,0.5)", fontFamily: OT, fontSize: ".7rem", fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", borderRadius: 2, background: "transparent", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                  </div>

                  <p style={{ fontFamily: OT, fontSize: "0.72rem", color: "rgba(245,237,214,0.25)", marginTop: 18, lineHeight: 1.6 }}>
                    By confirming, you agree to our cancellation policy. Reservations can be modified up to 2 hours before your booking.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ReservationCTA;