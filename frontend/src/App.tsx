import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TabId } from "./data";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./screens/HomeScreen";
import { TrackingScreen } from "./screens/TrackingScreen";
import { CheckupScreen } from "./screens/CheckupScreen";
import { BookingScreen } from "./screens/BookingScreen";

export default function App() {
  const [tab, setTab] = useState<TabId>("home");

  return (
    <div className="app-shell">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={tab}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {tab === "home" && <HomeScreen onNavigate={setTab} />}
          {tab === "tracking" && <TrackingScreen />}
          {tab === "checkup" && <CheckupScreen />}
          {tab === "booking" && <BookingScreen />}
        </motion.main>
      </AnimatePresence>

      <BottomNav tab={tab} onChange={setTab} />
    </div>
  );
}