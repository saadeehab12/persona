import type { Metadata } from "next";
import TournamentClient from "./TournamentClient";

export const metadata: Metadata = {
  title: "Tournament Arena",
  description:
    "Build your superhuman champion and compete in a bracket tournament. Draft your character, battle AI opponents, and become the tournament champion!",
  openGraph: {
    title: "Tournament Arena | Persona",
    description:
      "Build your superhuman champion and compete in a bracket tournament. Can you become the champion?",
    type: "website",
  },
};

export default function TournamentPage() {
  return <TournamentClient />;
}
