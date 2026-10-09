import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { STAGES, WORK_ITEMS } from "../data";
import { VehicleProgress } from "../components/VehicleProgress";
import { IconAlert, IconCar, IconCheck, IconChevronLeft, IconClock, IconWrench } from "../components/icons";

export function TrackingScreen() {
  const [stage, setStage] = useState(1); // 0..4, 4 = terminado

  const ready = stage >= 3;
  const complete = stage >= 4;

  const advance = () => setStage((s) => Math.min(s + 1, 4));
  const reset = () => setStage(1);
  const current = STAGES[Math.min(stage, STAGES.length - 1)];

  return (
    <div className="screen">
      {/* Encabezado */}
      <motion.div
        className="row space-between mt-md mb-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="section-label mb-sm">Seguimiento en tiempo real</div>
          <h1 className="title">Toyota Yaris 2021</h1>
          <p className="muted" style={{ fontSize: "0.82rem", marginTop: 4 }}>
            Ingresó hoy · 08:45 · Patente WB·KL·42
          </p>
        </div>
        <div
          className="badge badge-purple"
          style={{ background: "var(--purple-600)", color: "#fff", alignSelf: "center" }}
        >
          <IconWrench width={14} height={14} /> En taller
        </div>
      </motion.div>

      {/* Tarjeta de progreso */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.05 }}
      >
        <VehicleProgress stage={stage} />

        {/* Estado actual */}
        <motion.div
          key={Math.min(stage, 3)}
          className="card-flat mt-lg"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <div className="row space-between">
            <div>
              <div className="section-label">Estado actual</div>
              <div style={{ fontWeight: 800, fontSize: "1.02rem", marginTop: 4 }}>{current.label}</div>
              <div className="muted" style={{ fontSize: "0.8rem", marginTop: 2 }}>
                {current.detail}
              </div>
            </div>
            <motion.div
              animate={{ rotate: ready ? 360 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: ready ? "var(--grad-red)" : "var(--purple-100)",
                color: ready ? "#fff" : "var(--purple-800)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <IconCar width={22} height={22} />
            </motion.div>
          </div>
        </motion.div>

        {/* Controles de demo */}
        <div className="row mt-lg" style={{ gap: 10 }}>
          <motion.button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={advance}
            disabled={complete}
            whileTap={{ scale: 0.96 }}
          >
            {complete ? "Servicio terminado ✓" : "Avanzar etapa →"}
          </motion.button>
          <motion.button
            className="btn btn-ghost"
            onClick={reset}
            whileTap={{ scale: 0.94 }}
            aria-label="Reiniciar demo"
          >
            <IconChevronLeft width={18} height={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Alerta: listo para retiro */}
      <AnimatePresence>
        {ready && (
          <motion.div
            className="card mt-lg"
            style={{ borderColor: "var(--red-500)", background: "#fff5f6" }}
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="row">
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: "var(--grad-red)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <IconAlert width={24} height={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: "var(--red-600)" }}>¡Listo para retiro!</div>
                <div className="muted" style={{ fontSize: "0.84rem", marginTop: 2 }}>
                  Tu auto está terminado. Pasa por el taller entre 08:30 y 19:00 hrs.
                </div>
              </div>
              <a
                style={{ color: "var(--red-600)", fontWeight: 800, fontSize: "0.85rem", whiteSpace: "nowrap" }}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Ver más →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trabajos del servicio */}
      <div className="section-label mt-lg mb-sm">Trabajos del servicio</div>
      <motion.div
        className="card-flat"
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {WORK_ITEMS.map((w, i) => {
          const done = i < stage;
          return (
            <motion.div
              key={w.id}
              className="row"
              style={{ padding: "4px 2px" }}
              initial={false}
              animate={{ opacity: done ? 0.75 : 1 }}
            >
              <motion.span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 9,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  background: done ? "var(--purple-600)" : "var(--line)",
                  color: done ? "#fff" : "transparent",
                }}
                animate={{ scale: done ? 1 : 0.85, rotate: done ? 0 : -20 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <IconCheck width={15} height={15} strokeWidth={3} />
              </motion.span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    textDecoration: done ? "line-through" : "none",
                  }}
                >
                  {w.name}
                </div>
                <div className="muted" style={{ fontSize: "0.76rem" }}>{w.garage}</div>
              </div>
              <span
                className="muted"
                style={{ fontSize: "0.78rem", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                <IconClock width={13} height={13} style={{ verticalAlign: "-2px", marginRight: 3 }} />
                {w.time}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Toast de avance */}
      <AnimatePresence>
        {stage > 1 && stage <= 3 && (
          <motion.div
            key={`toast-${stage}`}
            style={{
              position: "fixed",
              bottom: "calc(var(--nav-h) + 18px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--ink)",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: 999,
              fontSize: "0.85rem",
              fontWeight: 700,
              zIndex: 60,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 12px 30px rgba(23,18,32,.35)",
            }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <IconCheck width={16} height={16} style={{ color: "#a3e635" }} />
            Etapa actualizada: {current.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}