import { motion } from "motion/react";
import { NAV_ITEMS, type TabId } from "../data";
import { IconCalendar, IconCar, IconChecklist, IconHome } from "./icons";

const ICONS: Record<TabId, typeof IconHome> = {
  home: IconHome,
  tracking: IconCar,
  checkup: IconChecklist,
  booking: IconCalendar,
};

interface Props {
  tab: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ tab, onChange }: Props) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.id];
        const active = tab === item.id;
        return (
          <motion.button
            key={item.id}
            className={`nav-item${active ? " nav-item-active" : ""}`}
            onClick={() => onChange(item.id)}
            whileTap={{ scale: 0.9 }}
            aria-current={active ? "page" : undefined}
          >
            {active && (
              <motion.span
                className="nav-pill"
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="nav-icon">
              <Icon width={22} height={22} />
            </span>
            <span className="nav-label">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}