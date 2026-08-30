"use client";

import { useState, useCallback } from "react";
import type { Character } from "@/lib/tournament/combat";
import {
  generateOpponent,
  resolveCombat,
  type CombatResult,
} from "@/lib/tournament/combat";
import {
  generateBracket,
  advanceBracket,
  getCurrentMatch,
  getBracketStatusText,
  type TournamentBracket,
} from "@/lib/tournament/bracket";
import DraftFlow from "@/components/tournament/DraftFlow";
import CharacterCard from "@/components/tournament/CharacterCard";
import BracketView from "@/components/tournament/BracketView";
import BattleScreen from "@/components/tournament/BattleScreen";
import ResultsScreen from "@/components/tournament/ResultsScreen";

type GamePhase = "draft" | "bracket" | "battle" | "results";

export default function TournamentClient() {
  const [phase, setPhase] = useState<GamePhase>("draft");
  const [character, setCharacter] = useState<Character | null>(null);
  const [draftPicks, setDraftPicks] = useState<Record<string, string>>({});
  const [bracket, setBracket] = useState<TournamentBracket | null>(null);
  const [currentOpponent, setCurrentOpponent] = useState<Character | null>(null);
  const [combatResult, setCombatResult] = useState<CombatResult | null>(null);
  const [finalResult, setFinalResult] = useState<"champion" | "eliminated">("eliminated");
  const [eliminatedRound, setEliminatedRound] = useState<number | undefined>();
  const [history, setHistory] = useState<Array<{ round: number; result: "win" | "loss" }>>([]);

  // Handle draft completion
  const handleDraftComplete = useCallback((char: Character, picks: Record<string, string>) => {
    setCharacter(char);
    setDraftPicks(picks);
    const newBracket = generateBracket();
    setBracket(newBracket);
    setPhase("bracket");
  }, []);

  // Handle starting a battle
  const handleStartBattle = useCallback(() => {
    if (!bracket || !character) return;

    const match = getCurrentMatch(bracket);
    if (!match) return;

    const roundNumber = bracket.currentRound;
    const opponent = generateOpponent(roundNumber, match.slotIndex, character.stats);
    const result = resolveCombat(character, opponent, roundNumber);

    setCurrentOpponent(opponent);
    setCombatResult(result);
    setPhase("battle");
  }, [bracket, character]);

  // Handle battle completion
  const handleBattleComplete = useCallback(() => {
    if (!bracket || !combatResult) return;

    const result = combatResult.winner === "player" ? "win" : "loss";
    const newBracket = advanceBracket(bracket, result);

    setBracket(newBracket);
    setHistory((prev) => [
      ...prev,
      { round: bracket.currentRound, result },
    ]);

    if (result === "loss" || newBracket.complete) {
      setFinalResult(newBracket.finalResult ?? "eliminated");
      setEliminatedRound(newBracket.eliminatedRound);
      setPhase("results");
    } else {
      setPhase("bracket");
    }
  }, [bracket, combatResult]);

  // Handle restart
  const handleRestart = useCallback(() => {
    setPhase("draft");
    setCharacter(null);
    setDraftPicks({});
    setBracket(null);
    setCurrentOpponent(null);
    setCombatResult(null);
    setHistory([]);
    setFinalResult("eliminated");
    setEliminatedRound(undefined);
  }, []);

  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--theme-text)",
          }}
        >
          ⚔️ Tournament Arena
        </h1>
        <p
          className="text-sm"
          style={{ color: "var(--theme-muted)" }}
        >
          Draft your champion. Enter the bracket. Become legendary.
        </p>
      </div>

      {/* Phase indicator */}
      {phase !== "draft" && (
        <div className="flex justify-center gap-2 mb-8">
          {(["draft", "bracket", "battle", "results"] as GamePhase[]).map((p) => (
            <div
              key={p}
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor:
                  p === phase
                    ? "var(--theme-accent)"
                    : "var(--theme-surface-raised)",
                color:
                  p === phase ? "white" : "var(--theme-muted)",
              }}
            >
              {p === "draft" ? "Draft" : p === "bracket" ? "Bracket" : p === "battle" ? "Battle" : "Results"}
            </div>
          ))}
        </div>
      )}

      {/* Draft Phase */}
      {phase === "draft" && <DraftFlow onComplete={handleDraftComplete} />}

      {/* Bracket Phase */}
      {phase === "bracket" && bracket && character && (
        <div className="max-w-4xl mx-auto">
          {/* Current character status */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--theme-text)",
                }}
              >
                {getBracketStatusText(bracket)}
              </h2>
            </div>

            {/* Compact character card */}
            <div className="max-w-xs mx-auto">
              <CharacterCard character={character} isPlayer compact />
            </div>
          </div>

          {/* Bracket visualization */}
          <div
            className="p-4 rounded-xl border mb-6"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <BracketView bracket={bracket} playerName="You" />
          </div>

          {/* Start next battle */}
          {!bracket.complete && (
            <div className="text-center">
              <button
                onClick={handleStartBattle}
                className="py-3 px-8 rounded-xl font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                ⚔️ Start Battle
              </button>
            </div>
          )}
        </div>
      )}

      {/* Battle Phase */}
      {phase === "battle" && character && currentOpponent && combatResult && (
        <BattleScreen
          player={character}
          opponent={currentOpponent}
          result={combatResult}
          onContinue={handleBattleComplete}
        />
      )}

      {/* Results Phase */}
      {phase === "results" && character && (
        <ResultsScreen
          character={character}
          draftPicks={draftPicks}
          finalResult={finalResult}
          eliminatedRound={eliminatedRound}
          roundsWon={history.filter((h) => h.result === "win").length}
          history={history}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
