import { Lottie } from "lottie-react";

interface Props {
  className?: string;
}

/** Animación Lottie del auto de marca (rebote + sombra viva). */
export function LottieCar({ className }: Props) {
  return (
    <Lottie
      className={className}
      src="/animations/car.json"
      autoplay
      loop
      style={{ pointerEvents: "none" }}
      aria-label="Auto animado"
      role="img"
    />
  );
}