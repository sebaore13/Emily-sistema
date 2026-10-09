import { motion, AnimatePresence } from "motion/react";
import { STAGES } from "../data";
import { IconCheck } from "./icons";

interface Props {
  /** Índice de la etapa actual (0..3). */
  stage: number;
}

const spring = { type: "spring", stiffness: 320, damping: 28 } as const;

export function VehicleProgress({ stage }: Props) {
  const pct = Math.round((Math.min(stage, STAGES.length) / STAGES.length) * 100);

  return (
    <div>
      {/* Barra principal */}
      <div className="row space-between mb-sm">
        <span className="section-label">Avance del servicio</span>
        <motion.span
          key={pct}
          initial={{ scale: 1.25, color: "#7c3aed" }}
          animate={{ scale: 1, color: "#171220" }}
          style={{ fontWeight: 800, fontSize: "0.95rem" }}
        >
          {pct}%
        </motion.span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        />
      </div>

      {/* Stepper */}
      <div className="stepper mt-lg" role="list" aria-label="Etapas del servicio">
        {STAGES.map((s, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <div className="step-node" key={s.label} role="listitem">
              <div className="step-dot-wrap">
                <motion.div
                  className="step-dot"
                  initial={false}
                  animate={{
                    scale: current ? 1.12 : 1,
                    backgroundColor: done ? "#7c3aed" : current ? "#6d28d9" : "#eee8f8",
                    color: done || current ? "#ffffff" : "#837c99",
                  }}
                  whileHover={{ scale: 1.08 }}
                  style={{ boxShadow: current ? "0 0 0 6px rgba(124,58,237,.18)" : undefined }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {done ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -40 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={spring}
                        style={{ display: "grid", placeItems: "center" }}
                      >
                        <IconCheck width={18} height={18} strokeWidth={3} />
                      </motion.span>
                    ) : (
                      <motion.span key="num" initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={spring}>
                        {i + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
                {i < STAGES.length - 1 && (
                  <div className="step-line">
                    <motion.div
                      className="step-line-fill"
                      initial={false}
                      animate={{ scaleX: done ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 140, damping: 24 }}
                    />
                  </div>
                )}
              </div>
              <div className="step-label">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}