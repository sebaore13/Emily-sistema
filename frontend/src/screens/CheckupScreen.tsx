import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CHECK_MODULES, type CheckModule } from "../data";
import { IconCheck, IconChevronDown, IconDroplet, IconGauge, IconOil, IconSparkles } from "../components/icons";

const MODULE_ICONS: Record<CheckModule["icon"], typeof IconOil> = {
  oil: IconOil,
  coolant: IconDroplet,
  tires: IconGauge,
};

const MODULE_COLORS: Record<CheckModule["icon"], string> = {
  oil: "#7c3aed",
  coolant: "#0e7490",
  tires: "#171220",
};

export function CheckupScreen() {
  const [open, setOpen] = useState<string | null>("oil");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totalSteps = useMemo(() => CHECK_MODULES.reduce((acc, m) => acc + m.steps.length, 0), []);
  const doneSteps = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneSteps / totalSteps) * 100);

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const isModuleDone = (m: CheckModule) => m.steps.every((s) => checked[s.id]);

  const R = 30;
  const CIRC = 2 * Math.PI * R;

  return (
    <div className="screen">
      {/* Encabezado + anillo */}
      <motion.div
        className="row space-between mt-md mb-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="section-label mb-sm">Guías educativas</div>
          <h1 className="title">Autochequeo rápido</h1>
          <p className="muted" style={{ fontSize: "0.84rem", marginTop: 6, maxWidth: 240 }}>
            Revisa tú misma los niveles básicos de tu auto con estos pasos simples. 💜
          </p>
        </div>
        <div style={{ position: "relative", width: 84, height: 84, flexShrink: 0 }}>
          <svg width="84" height="84" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r={R} fill="none" stroke="var(--purple-100)" strokeWidth="8" />
            <motion.circle
              cx="42"
              cy="42"
              r={R}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC}
              initial={false}
              animate={{ strokeDashoffset: CIRC * (1 - pct / 100) }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
              transform="rotate(-90 42 42)"
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#4c1d95" />
              </linearGradient>
            </defs>
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              fontSize: "1.05rem",
            }}
          >
            {pct}%
          </div>
        </div>
      </motion.div>

      {/* Progreso general */}
      <motion.div
        className="card-flat row space-between mb-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="row">
          <IconSparkles width={20} height={20} style={{ color: "var(--purple-600)" }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>
              {doneSteps} de {totalSteps} pasos completados
            </div>
            <div className="muted" style={{ fontSize: "0.78rem" }}>
              ¡Sigue así, tu auto te lo agradecerá!
            </div>
          </div>
        </div>
      </motion.div>

      {/* Acordeones */}
      <div className="stack">
        {CHECK_MODULES.map((m, idx) => {
          const Icon = MODULE_ICONS[m.icon];
          const expanded = open === m.id;
          const done = isModuleDone(m);
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, type: "spring", stiffness: 240, damping: 24 }}
            >
              <motion.button
                className="acc-btn"
                onClick={() => setOpen(expanded ? null : m.id)}
                whileTap={{ scale: 0.985 }}
                aria-expanded={expanded}
              >
                <span className="acc-icon" style={{ background: "var(--purple-100)", color: MODULE_COLORS[m.icon] }}>
                  <Icon width={22} height={22} />
                </span>
                <span style={{ flex: 1 }}>
                  <span className="acc-title">{m.title}</span>
                  <span className="acc-sub">{m.subtitle}</span>
                </span>
                {done && (
                  <span className="badge badge-green" style={{ fontSize: "0.68rem" }}>
                    <IconCheck width={12} height={12} /> Listo
                  </span>
                )}
                <motion.span
                  className="acc-chevron"
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                >
                  <IconChevronDown width={20} height={20} />
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    className="acc-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 32 }}
                  >
                    <div className="acc-steps">
                      {m.steps.map((s, si) => {
                        const on = !!checked[s.id];
                        return (
                          <motion.button
                            key={s.id}
                            className="check-row"
                            onClick={() => toggle(s.id)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: si * 0.04 }}
                            style={{
                              borderColor: on ? "var(--purple-400)" : undefined,
                              background: on ? "var(--purple-50)" : undefined,
                            }}
                          >
                            <motion.span
                              style={{
                                width: 22,
                                height: 22,
                                borderRadius: 7,
                                border: "2px solid var(--purple-300)",
                                display: "grid",
                                placeItems: "center",
                                flexShrink: 0,
                                marginTop: 2,
                                color: "#fff",
                                background: "transparent",
                              }}
                              animate={{
                                background: on ? "var(--purple-600)" : "transparent",
                                borderColor: on ? "var(--purple-600)" : "var(--purple-300)",
                                scale: on ? 1 : 0.95,
                              }}
                              transition={{ type: "spring", stiffness: 420, damping: 22 }}
                            >
                              <AnimatePresence>
                                {on && (
                                  <motion.span
                                    initial={{ scale: 0, rotate: -30 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 24 }}
                                    style={{ display: "grid" }}
                                  >
                                    <IconCheck width={13} height={13} strokeWidth={3.5} />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.span>
                            <span style={{ flex: 1 }}>{s.text}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Consejo de seguridad */}
      <motion.div
        className="card-flat mt-lg"
        style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="row">
          <span style={{ fontSize: "1.4rem" }}>⚠️</span>
          <div style={{ fontSize: "0.84rem", lineHeight: 1.45 }}>
            <strong>Seguridad ante todo:</strong> si algo no se ve bien o no estás segura, no lo dudes: agenda una
            revisión con nuestras mecánicas.
          </div>
        </div>
      </motion.div>
    </div>
  );
}