import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps): IconProps {
  return {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };
}

export const IconHome = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
);

export const IconCar = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
    <path d="M4 11h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1" />
    <path d="M3 16v-4a1 1 0 0 1 1 1v4h16v-4" />
    <circle cx="7.5" cy="17.5" r="1.8" />
    <circle cx="16.5" cy="17.5" r="1.8" />
  </svg>
);

export const IconWrench = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L3 17.6V21h3.4l5.7-5.7a4.5 4.5 0 0 0 5.6-6L14 12.6l-2.6-2.6 3.3-3.7Z" />
  </svg>
);

export const IconChecklist = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="m3.5 5.5 1 1 2-2" />
    <path d="m3.5 11.5 1 1 2-2" />
    <path d="m3.5 17.5 1 1 2-2" />
  </svg>
);

export const IconCalendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconChevronLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m14 6-6 6 6 6" />
  </svg>
);

export const IconChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m10 6 6 6-6 6" />
  </svg>
);

export const IconAlert = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 9.5v4.5" />
    <path d="M12 17.5h.01" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.2 7.8 7.5 9.5 4.3-1.7 7.5-5 7.5-9.5V6L12 3Z" />
    <path d="m9 11.5 2 2 4-4.5" />
  </svg>
);

export const IconOil = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 2h6v4a6 6 0 0 1-6 6v0a6 6 0 0 0-6 6V21h12v-3a6 6 0 0 0-4-5.7V8" />
    <path d="M9 2v4M6 21h9" />
  </svg>
);

export const IconDroplet = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s6 6.3 6 10.5a6 6 0 0 1-12 0C6 9.3 12 3 12 3Z" />
  </svg>
);

export const IconGauge = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21a9 9 0 1 1 9-9" />
    <path d="m12 12 4.5-4.5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const IconBell = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9" />
    <path d="M10.2 19a2 2 0 0 0 3.6 0" />
  </svg>
);

export const IconUser = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </svg>
);

export const IconSparkles = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    <path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15Z" />
  </svg>
);

export const IconHeart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20.5S3.5 15 3.5 8.9A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.5 2.3c0 6.1-8.5 11.6-8.5 11.6Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);