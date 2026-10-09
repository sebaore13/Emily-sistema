# Women Taller · Mockup UI/UX Mobile-First

Sistema Web de Acompañamiento Vehicular para **Taller Mecánico Femenino**.
Prototipo interactivo (Mockup UX/UI) desarrollado para el proyecto de titulación
definido en el *Acta de Constitución de Proyecto*.

## 🎨 Stack

- **React 19 + TypeScript + Vite** — aplicación liviana, sin backend
- **Motion** (antes Framer Motion) — animaciones declarativas:
  springs físicas, gestos táctiles, layout/shared transitions y `AnimatePresence`
- **lottie-react** — animación Lottie del auto de marca (bounce + sombra viva)

## 🚀 Puesta en marcha

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo (http://localhost:5173)
npm run build   # build de producción (carpeta dist/)
npm run lint    # oxlint
```

> En Windows, si `npm` falla por la política de ejecución de PowerShell,
> usa `npm.cmd`.

## 📱 Módulos implementados

| Módulo | Pantalla | Descripción |
| --- | --- | --- |
| **Inicio** | `HomeScreen` | Hero con auto Lottie, accesos rápidos, estado del vehículo, próxima cita |
| **Seguimiento** | `TrackingScreen` | Stepper animado (Ingreso → Diagnóstico → Reparación → Listo para retiro), alerta de retiro, controles de demo |
| **Autochequeo** | `CheckupScreen` | Guías desplegables (aceite, refrigerante, neumáticos) con checklist y anillo de progreso |
| **Reserva** | `BookingScreen` | Wizard de 3 pasos (servicio → fecha/hora → confirmación) con pantalla de éxito y confeti |

## 🎬 Animaciones destacadas (Motion)

- Transiciones entre pantallas y pasos del wizard con `AnimatePresence` (slide direccional)
- Píldora activa de la bottom nav con `layoutId` (shared layout transition)
- Barra y stepper de progreso del vehículo con springs físicas
- Gestos `whileTap` / `whileHover` en botones y chips (táctil)
- Anillo de progreso del autochequeo animado por SVG `strokeDashoffset`
- Estrellas de confeti en la confirmación de cita
- Entradas escalonadas (`staggerChildren`) en las tarjetas del inicio

## 🎨 Identidad gráfica

Paleta del acta: **morado** (marca), **negro** (tinta) y **rojo** (solo acento/alertas).
Definida como variables CSS en `src/index.css`. Fuente del sistema (sin dependencias externas).

## 📁 Estructura

```
frontend/
├─ public/animations/car.json   # animación Lottie del auto
├─ src/
│  ├─ components/               # Header, BottomNav, LottieCar, VehicleProgress, icons
│  ├─ screens/                  # Home, Tracking, Checkup, Booking
│  ├─ data.ts                   # servicios, guías, etapas, utilidades de fecha
│  ├─ App.tsx                   # shell móvil + navegación
│  └─ index.css                 # design system (paleta, botones, tarjetas)
```