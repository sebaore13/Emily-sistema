import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { MECHANICS, nextSevenDays, SERVICES, TIME_SLOTS } from "../data";
import { LottieCar } from "../components/LottieCar";
import {
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconChevronLeft,
  IconPhone,
  IconUser,
  IconWrench,
} from "../components/icons";

const STEP_LABELS = ["Servicio", "Fecha y hora", "Confirmar"];

const slide: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -64 : 64, opacity: 0 }),
};

const spring = { type: "spring", stiffness: 300, damping: 30 } as const;

export function BookingScreen() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [service, setService] = useState<string | null>("s1");
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const days = useMemo(() => nextSevenDays(), []);
  const [mechanicIdx] = useState(() => Math.floor(Math.random() * MECHANICS.length));
  const mechanic = MECHANICS[mechanicIdx];
  const chosen = SERVICES.find((s) => s.id === service);
  const chosenDay = days.find((d) => d.key === dayKey);

  const ready = step === 0 ? !!service : step === 1 ? !!dayKey && !!slot : name.trim().length > 1 && phone.trim().length > 6;

  const go = (s: number) => {
    setDir(s > step ? 1 : -1);
    setStep(s);
  };

  const confirm = () => {
    setDir(1);
    setStep(3);
  };

  const reset = () => {
    setStep(0);
    setService("s1");
    setDayKey(null);
    setSlot(null);
    setName("");
    setPhone("");
    setDir(1);
  };

  // Confeti (solo en pantalla de éxito)
  const confetti = useMemo(() => {
    const colors = ["#8b5cf6", "#7c3aed", "#e11d48", "#f59e0b", "#10b981", "#ffffff"];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: 8 + ((i * 47) % 84),
      top: 6 + ((i * 31) % 30),
      size: 7 + ((i * 13) % 8),
      color: colors[i % colors.length],
      delay: (i % 6) * 0.08,
      rotate: (i % 5) * 60 - 120,
    }));
  }, []);

  return (
    <div className="screen">
      <motion.div
        className="mt-md mb-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="section-label mb-sm">Reserva de horas</div>
        <h1 className="title">Agenda tu cita técnica</h1>
        <p className="muted" style={{ fontSize: "0.84rem", marginTop: 6 }}>
          Tres simples pasos y listo. Tu auto en las mejores manos.
        </p>
      </motion.div>

      {/* Indicador de pasos */}
      <div className="wizard-dots">
        {STEP_LABELS.map((label, i) => {
          const state = i < step ? "done" : i === step ? "active" : "todo";
          return (
            <div key={label} style={{ flex: 1 }}>
              <div className="wz-dot">
                <motion.div
                  className="wz-dot-fill"
                  initial={false}
                  animate={{ scaleX: state === "done" ? 1 : state === "active" ? 1 : 0 }}
                  transition={spring}
                  style={{ transformOrigin: "left" }}
                />
              </div>
              <div
                style={{
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  marginTop: 6,
                  color: state === "done" || state === "active" ? "var(--purple-800)" : "var(--ink-3)",
                }}
              >
                {state === "done" ? `✓ ${label}` : label}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        {/* Paso 1: Servicio */}
        {step === 0 && (
          <motion.div key="step1" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={spring}>
            <div className="stack mt-lg">
              {SERVICES.map((s) => {
                const on = service === s.id;
                return (
                  <motion.button
                    key={s.id}
                    className={`select-card${on ? " select-card-selected" : ""}`}
                    onClick={() => setService(s.id)}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * SERVICES.indexOf(s) }}
                  >
                    <span
                      className="quick-icon quick-icon-purple"
                      style={{ width: 42, height: 42, flexShrink: 0 }}
                    >
                      <IconWrench width={20} height={20} />
                    </span>
                    <span style={{ flex: 1 }}>
                      <span className="acc-title">{s.name}</span>
                      <span className="acc-sub">{s.desc} · {s.time}</span>
                    </span>
                    <motion.span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        border: "2px solid var(--purple-300)",
                        display: "grid",
                        placeItems: "center",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                      animate={{ background: on ? "var(--purple-600)" : "transparent", borderColor: on ? "var(--purple-600)" : "var(--purple-300)" }}
                    >
                      {on && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={spring} style={{ display: "grid" }}>
                          <IconCheck width={14} height={14} strokeWidth={3.5} />
                        </motion.span>
                      )}
                    </motion.span>
                  </motion.button>
                );
              })}
              <motion.button
                className="btn btn-primary mt-sm"
                disabled={!ready}
                onClick={() => go(1)}
                whileTap={{ scale: 0.96 }}
              >
                Continuar <IconArrowRight width={18} height={18} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Paso 2: Fecha y hora */}
        {step === 1 && (
          <motion.div key="step2" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={spring}>
            <div className="mt-lg">
              <div className="section-label mb-sm">Elige el día</div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginInline: -18, paddingInline: 18 }}>
                {days.map((d) => {
                  const on = dayKey === d.key;
                  return (
                    <motion.button
                      key={d.key}
                      className={`chip${on ? " chip-active" : ""}`}
                      onClick={() => setDayKey(d.key)}
                      whileTap={{ scale: 0.92 }}
                      style={{ flexDirection: "column", gap: 2, padding: "10px 14px", minWidth: 66, whiteSpace: "nowrap" }}
                    >
                      <span style={{ fontSize: "0.72rem", opacity: 0.85 }}>{d.weekday}</span>
                      <span style={{ fontSize: "1.05rem", fontWeight: 800 }}>{d.day}</span>
                      <span style={{ fontSize: "0.68rem", opacity: 0.85, textTransform: "uppercase" }}>{d.month}</span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {dayKey && (
                  <motion.div
                    key={`slots-${dayKey}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={spring}
                    className="mt-md"
                  >
                    <div className="section-label mb-sm">Elige la hora</div>
                    <div className="slot-grid">
                      {TIME_SLOTS.map((t) => {
                        const on = slot === t;
                        return (
                          <motion.button
                            key={t}
                            className={`chip${on ? " chip-active" : ""}`}
                            onClick={() => setSlot(t)}
                            whileTap={{ scale: 0.92 }}
                            style={{ justifyContent: "center" }}
                          >
                            {t}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="row mt-lg" style={{ gap: 10 }}>
                <motion.button className="btn btn-ghost" onClick={() => go(0)} whileTap={{ scale: 0.96 }}>
                  <IconChevronLeft width={18} height={18} /> Volver
                </motion.button>
                <motion.button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={!ready}
                  onClick={() => go(2)}
                  whileTap={{ scale: 0.96 }}
                >
                  Continuar <IconArrowRight width={18} height={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Paso 3: Confirmar */}
        {step === 2 && (
          <motion.div key="step3" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={spring}>
            <div className="stack mt-lg">
              <div className="card">
                <div className="section-label mb-md">Resumen de tu cita</div>
                {[
                  { icon: IconWrench, label: chosen?.name ?? "", sub: `${chosen?.desc} · ${chosen?.price}` },
                  { icon: IconCalendar, label: chosenDay ? chosenDay.full : "" , sub: `${slot} hrs · 45 min estimados` },
                  { icon: IconUser, label: mechanic, sub: "Tu mecánica asignada" },
                ].map((r) => (
                  <motion.div
                    key={r.label}
                    className="row"
                    style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: "var(--purple-100)",
                        color: "var(--purple-800)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <r.icon width={19} height={19} />
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: "0.92rem" }}>{r.label}</div>
                      <div className="muted" style={{ fontSize: "0.78rem" }}>{r.sub}</div>
                    </div>
                  </motion.div>
                ))}

                <div className="row space-between mt-md" style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                  <span className="muted" style={{ fontSize: "0.85rem" }}>Total estimado</span>
                  <motion.span
                    key={chosen?.price}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    style={{ fontWeight: 900, fontSize: "1.15rem", color: "var(--purple-800)" }}
                  >
                    {chosen?.price}
                  </motion.span>
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="bk-name">Tu nombre</label>
                <input
                  id="bk-name"
                  className="field"
                  placeholder="Emily Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="bk-phone">Teléfono de contacto</label>
                <input
                  id="bk-phone"
                  className="field"
                  placeholder="+56 9 1234 5678"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <motion.button
                className="btn btn-primary"
                disabled={!ready}
                onClick={confirm}
                whileTap={{ scale: 0.96 }}
              >
                <IconCheck width={18} height={18} /> Confirmar cita
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Éxito */}
        {step === 3 && (
          <motion.div key="success" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={spring}>
            <div className="success-wrap mt-lg">
              {/* Confeti */}
              <div style={{ position: "relative", width: "100%", height: 200 }}>
                {confetti.map((c) => (
                  <motion.span
                    key={c.id}
                    className="confetti-piece"
                    style={{ left: `${c.left}%`, top: `${c.top}%`, width: c.size, height: c.size, background: c.color }}
                    initial={{ y: -40, opacity: 0, rotate: 0 }}
                    animate={{ y: 40 + (c.id % 4) * 18, opacity: [0, 1, 1, 0], rotate: c.rotate }}
                    transition={{ duration: 1.6, delay: c.delay, ease: "easeOut", repeat: Infinity, repeatDelay: 1.2 }}
                  />
                ))}
                <div className="car-box car-box-sm">
                  <LottieCar className="car-lottie" />
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
              >
                <h2 className="title" style={{ fontSize: "1.4rem" }}>¡Cita confirmada! 🎉</h2>
                <p className="muted mt-sm" style={{ maxWidth: 280 }}>
                  Te esperamos el <strong style={{ color: "var(--ink)" }}>{chosenDay?.full}</strong> a las{" "}
                  <strong style={{ color: "var(--ink)" }}>{slot} hrs</strong>. Recibirás un resumen por tu teléfono.
                </p>
              </motion.div>

              <div className="card card-flat mt-lg" style={{ width: "100%" }}>
                <div className="row space-between">
                  <span className="muted">Servicio</span>
                  <span style={{ fontWeight: 800 }}>{chosen?.name}</span>
                </div>
                <div className="row space-between mt-sm" style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                  <span className="muted">Mecánica</span>
                  <span style={{ fontWeight: 800 }}>{mechanic}</span>
                </div>
                <div className="row space-between mt-sm" style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                  <span className="muted">Contacto</span>
                  <span style={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 6 }}>
                    <IconPhone width={14} height={14} /> {phone || "—"}
                  </span>
                </div>
              </div>

              <motion.button
                className="btn btn-ghost mt-lg"
                style={{ width: "100%" }}
                onClick={reset}
                whileTap={{ scale: 0.96 }}
              >
                Hacer otra reserva
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}