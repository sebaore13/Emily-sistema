import { motion } from "motion/react";
import { IconBell } from "./icons";

export function Header() {
  return (
    <motion.header
      className="app-header"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="brand">
        <div className="brand-mark" aria-label="Logo EMI">
          <img
            src="/icono%20emi.jpg"
            alt="Logo EMI"
            className="brand-logo"
          />
        </div>
        <div>
          <div className="brand-name">Torque Femenino</div>
          <div className="brand-tag">Taller mecánico femenino</div>
        </div>
      </div>
      <motion.button
        className="icon-btn"
        aria-label="Notificaciones"
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.06 }}
      >
        <IconBell width={21} height={21} />
        <span className="notif-dot" />
      </motion.button>
    </motion.header>
  );
}