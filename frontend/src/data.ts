/* ============================================================
   Datos del mockup · Women Taller
   ============================================================ */

export type TabId = "home" | "tracking" | "checkup" | "booking";

export interface NavItem {
  id: TabId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Inicio" },
  { id: "tracking", label: "Mi Auto" },
  { id: "checkup", label: "Autochequeo" },
  { id: "booking", label: "Reservar" },
];

/* ---------- Seguimiento ---------- */

export interface Stage {
  label: string;
  detail: string;
}

export const STAGES: Stage[] = [
  { label: "Ingreso", detail: "Recepción del vehículo" },
  { label: "Diagnóstico", detail: "Inspección técnica" },
  { label: "Reparación", detail: "Trabajo en taller" },
  { label: "Listo para retiro", detail: "Puedes pasar a buscarlo" },
];

export interface WorkItem {
  id: string;
  name: string;
  garage: string;
  done: boolean;
  time: string;
}

export const WORK_ITEMS: WorkItem[] = [
  { id: "w1", name: "Cambio de aceite y filtros", garage: "Incluido en plan", done: false, time: "40 min" },
  { id: "w2", name: "Revisión de frenos", garage: "Incluido en plan", done: true, time: "25 min" },
  { id: "w3", name: "Revisión general de niveles", garage: "Incluido en plan", done: true, time: "15 min" },
  { id: "w4", name: "Batería y sistema eléctrico", garage: "Diagnóstico", done: false, time: "30 min" },
];

/* ---------- Autochequeo ---------- */

export interface CheckStep {
  id: string;
  text: string;
}

export interface CheckModule {
  id: string;
  title: string;
  subtitle: string;
  icon: "oil" | "coolant" | "tires";
  steps: CheckStep[];
}

export const CHECK_MODULES: CheckModule[] = [
  {
    id: "oil",
    title: "Nivel de aceite",
    subtitle: "Revisa cada 2 semanas · 2 min",
    icon: "oil",
    steps: [
      { id: "o1", text: "Estaciona en una superficie plana y apaga el motor. Espera 5 minutos." },
      { id: "o2", text: "Abre el capó y localiza la varilla de medición (mango de color)." },
      { id: "o3", text: "Retírala, límpiala con un paño y vuelve a insertarla hasta el fondo." },
      { id: "o4", text: "Sácala de nuevo y verifica que el nivel esté entre las marcas MIN y MAX." },
      { id: "o5", text: "El aceite debe verse ámbar o café. Si está negro o lechoso, agenda una cita." },
    ],
  },
  {
    id: "coolant",
    title: "Refrigerante",
    subtitle: "Revisa 1 vez al mes · 1 min",
    icon: "coolant",
    steps: [
      { id: "c1", text: "Nunca abras la tapa del radiador con el motor caliente: puede quemarte." },
      { id: "c2", text: "Con el motor frío, ubica el depósito de plástico traslúcido." },
      { id: "c3", text: "El nivel debe estar entre las marcas MIN y MAX del depósito." },
      { id: "c4", text: "Verifica el color (verde, rosa o naranja según tu auto). Si está turbio, consulta al taller." },
      { id: "c5", text: "Completa solo con el tipo de refrigerante indicado en el manual." },
    ],
  },
  {
    id: "tires",
    title: "Presión de neumáticos",
    subtitle: "Cada 15 días o antes de viajar · 3 min",
    icon: "tires",
    steps: [
      { id: "t1", text: "Revisa la presión recomendada (PSI) en la etiqueta de la puerta del conductor." },
      { id: "t2", text: "Mide con un manómetro cuando los neumáticos estén fríos." },
      { id: "t3", text: "Infla hasta el PSI recomendado si está bajo (generalmente 30–35 PSI)." },
      { id: "t4", text: "Revisa el dibujo: inserta una moneda; si ves la corona, es hora de cambiarlos." },
      { id: "t5", text: "Inspecciona visualmente cortes, abultamientos o clavos en la superficie." },
    ],
  },
];

/* ---------- Reserva ---------- */

export interface Service {
  id: string;
  name: string;
  desc: string;
  time: string;
  price: string;
}

export const SERVICES: Service[] = [
  { id: "s1", name: "Mantención preventiva", desc: "Revisión general de 21 puntos", time: "60 min", price: "$25.000" },
  { id: "s2", name: "Cambio de aceite", desc: "Aceite + filtro incluidos", time: "40 min", price: "$35.000" },
  { id: "s3", name: "Frenos", desc: "Pastillas y discos", time: "90 min", price: "$55.000" },
  { id: "s4", name: "Alineación y balanceo", desc: "Dirección y ruedas", time: "50 min", price: "$30.000" },
  { id: "s5", name: "Suspensión", desc: "Amortiguadores y bujes", time: "120 min", price: "$80.000" },
];

export const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "15:00", "15:30", "16:00", "16:30", "17:00",
] as const;

export const MECHANICS = [
  "Carolina Rojas",
  "Valentina Soto",
  "Francisca Ibáñez",
  "Antonia Lagos",
] as const;

/* ---------- Utilidades de fecha ---------- */

export interface DayOption {
  key: string;
  weekday: string;
  day: number;
  month: string;
  full: string;
}

export function nextSevenDays(): DayOption[] {
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const weekdays = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const out: DayOption[] = [];
  const now = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      weekday: i === 1 ? "Mañana" : weekdays[d.getDay()],
      day: d.getDate(),
      month: months[d.getMonth()],
      full: `${weekdays[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return out;
}