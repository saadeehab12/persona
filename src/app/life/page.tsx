import type { Metadata } from "next";
import LifeSimGame from "@/components/life/LifeSimGame";

export const metadata: Metadata = {
  title: "Life Simulator",
  description: "Live a whole life in 7 choices. See where your decisions take you.",
  openGraph: {
    title: "Life Simulator — Persona",
    description: "Live a whole life in 7 choices. See where your decisions take you.",
  },
};

export default function LifePage() {
  return (
    <div className="py-8">
      <LifeSimGame />
    </div>
  );
}
