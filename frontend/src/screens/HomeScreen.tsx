import { motion, type Variants } from "motion/react";
import type { TabId } from "../data";
import { LottieCar } from "../components/LottieCar";
import {
  IconArrowRight,
  IconCalendar,
  IconCar,
  IconCheck,
  IconChecklist,
  IconClock,
  IconHeart,
  IconShield,
  IconUser,
  IconWrench,
} from "../components/icons";

interface Props {
  onNavigate: (tab: TabId) => void;
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 24 },
  },
};

const CAR_STAGES = ["Ingreso", "Diagnóstico", "Reparación", "Retiro"];

export function HomeScreen({ onNavigate }: Props) {
  return (
    <motion.div
      className="screen"
      variants={list}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -14, transition: { duration: 0.18 } }}
    >
      {/* Hero */}
      <motion.section className="hero" variants={item}>
        <div className="hero-hi">Lunes 21 de septiembre ~ 09:24</div>
        <h1 className="hero-title">
          Hola 👋 <br>
          </br>Tu auto está en buenas manos
        </h1>
        <div className="hero-actions">
          <motion.button
            className="btn hero-cta-back"
            onClick={() => onNavigate("booking")}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
          >
            <IconCalendar width={18} height={18} /> Reservar hora
          </motion.button>
        </div>
      </motion.section>

      {/* Mi auto: tarjeta blanca con el vehículo animado */}
      <motion.section className="car-card" variants={item}>
        <div className="row space-between">
          <div>
            <div className="section-label">Mi vehículo</div>
            <h2 className="title" style={{ fontSize: "1.08rem", marginTop: 4 }}>
              Toyota Yaris 2021
            </h2>
            <p className="muted" style={{ fontSize: "0.8rem", marginTop: 3 }}>
              Patente WB·KL·42 · Blanco
            </p>
          </div>
          <div className="badge badge-purple">
            <IconWrench width={14} height={14} /> En taller
          </div>
        </div>

        <div className="car-box">
          <LottieCar className="car-lottie" />
        </div>

        {/* Etapas del servicio */}
        <div className="car-stages" role="list" aria-label="Etapas del servicio">
          {CAR_STAGES.map((s, i) => {
            const done = i <= 1;
            const current = i === 1;
            return (
              <div className="car-stage" key={s} role="listitem">
                {done ? (
                  <span className="car-dot done">
                    <IconCheck width={10} height={10} strokeWidth={3.5} />
                  </span>
                ) : (
                  <span className={`car-dot${current ? " current" : ""}`} />
                )}
                <span className="car-stage-label">{s}</span>
              </div>
            );
          })}
        </div>

        <div className="row space-between mt-sm mb-sm">
          <span className="muted" style={{ fontSize: "0.8rem" }}>Etapa 2 de 4 · En diagnóstico</span>
          <span style={{ fontWeight: 800, fontSize: "0.85rem" }}>50%</span>
        </div>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            whileInView={{ width: "50%" }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.1 }}
          />
        </div>

        <motion.button
          className="btn btn-primary car-card-cta"
          onClick={() => onNavigate("tracking")}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
        >
          <IconCar width={18} height={18} /> Ver seguimiento en tiempo real
          <IconArrowRight width={18} height={18} />
        </motion.button>
      </motion.section>

      {/* Accesos rápidos */}
      <motion.div className="grid-3 mt-lg" variants={item}>
        {[
          { icon: IconCar, cls: "quick-icon-purple", label: "Seguimiento", tab: "tracking" as TabId },
          { icon: IconChecklist, cls: "quick-icon-ink", label: "Autochequeo", tab: "checkup" as TabId },
          { icon: IconWrench, cls: "quick-icon-red", label: "Reservar", tab: "booking" as TabId },
        ].map((q) => (
          <motion.button
            key={q.label}
            className="quick"
            onClick={() => onNavigate(q.tab)}
            whileTap={{ scale: 0.94 }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <span className={`quick-icon ${q.cls}`}>
              <q.icon width={22} height={22} />
            </span>
            {q.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Próxima cita */}
      <motion.section className="card mt-lg" variants={item}>
        <div className="row space-between mb-md">
          <div>
            <div className="section-label">Próxima cita</div>
            <h3 className="title" style={{ fontSize: "1.05rem", marginTop: 4 }}>
              Cambio de aceite
            </h3>
          </div>
          <div className="badge badge-red">
            <IconClock width={14} height={14} /> Pasada
          </div>
        </div>
        <div className="row" style={{ color: "var(--ink-2)", fontSize: "0.86rem" }}>
          <IconCalendar width={18} height={18} />
          <span>Viernes 25 sep · 10:30 hrs</span>
        </div>
        <div className="row mt-sm" style={{ color: "var(--ink-2)", fontSize: "0.86rem" }}>
          <IconUser width={18} height={18} />
          <span>Mecánica: Carolina Rojas</span>
        </div>
      </motion.section>

      {/* Valores */}
      <motion.div className="grid-3 mt-lg" variants={item}>
        <div className="card-flat" style={{ minHeight: 96 }}>
          <IconShield width={24} height={24} style={{ color: "var(--purple-600)" }} />
          <p className="mt-sm" style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.35 }}>
            Mecánicas certificadas
          </p>
        </div>
        <div className="card-flat" style={{ minHeight: 96 }}>
          <IconHeart width={24} height={24} style={{ color: "var(--red-500)" }} />
          <p className="mt-sm" style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.35 }}>
            Espacio 100% femenino
          </p>
        </div>
        <div className="card-flat" style={{ minHeight: 96 }}>
          <IconChecklist width={24} height={24} style={{ color: "var(--purple-600)" }} />
          <p className="mt-sm" style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.35 }}>
            Guías de autochequeo
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}