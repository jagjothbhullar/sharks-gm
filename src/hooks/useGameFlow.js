import { useState, useCallback, useMemo } from 'react';
import { DRAFT_ORDER_2026, randomTeamForSigning } from '../data/aiTeams';

const PHASES = [
  { id: 'SEASON_RECAP', label: 'Season Recap', date: 'End of 2025-26 Season', canSkip: false },
  { id: 'BUYOUT_WINDOW', label: 'Buyouts', date: 'June 15-30, 2026', canSkip: true },
  { id: 'QUALIFYING_OFFERS', label: 'QOs', date: 'June 25, 2026', canSkip: false },
  { id: 'TRADES', label: 'Trades', date: 'Draft Week, June 2026', canSkip: true },
  { id: 'NHL_DRAFT', label: 'Draft', date: 'June 26-27, 2026', canSkip: false },
  { id: 'FREE_AGENCY', label: 'Free Agency', date: 'July 1, 2026 — 12:00 PM ET', canSkip: false },
  { id: 'RESIGN_OWN', label: 'Re-Sign', date: 'July - August 2026', canSkip: true },
  { id: 'EXTENSIONS', label: 'Extensions', date: 'July 2026', canSkip: true },
  { id: 'OFFER_SHEETS', label: 'Offer Sheets', date: 'July - December', canSkip: true },
  { id: 'TRAINING_CAMP', label: 'Camp', date: 'September 2026', canSkip: false },
];

export function useGameFlow(gm) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [gameMode, setGameMode] = useState(null); // null = landing, 'game' = guided, 'sandbox' = sandbox

  // QO decisions: { playerId: 'qualify' | 'let_walk' }
  const [qoDecisions, setQoDecisions] = useState({});

  // Draft simulation state
  const [draftSimState, setDraftSimState] = useState({
    currentPick: 0,       // index into DRAFT_ORDER_2026
    aiPicks: [],          // [{ pick, team, prospect }]
    userPicks: [],        // same format
    isUserTurn: false,
    draftComplete: false,
  });

  // Free agency simulation state
  const [faRound, setFaRound] = useState(0);
  const [aiSignings, setAiSignings] = useState([]);
  const [userPassed, setUserPassed] = useState(false);

  // Offer sheet result
  const [offerSheetResult, setOfferSheetResult] = useState(null);

  // Extension decisions tracking
  const [extensionDecisions, setExtensionDecisions] = useState({});

  // Track if Ferraro was kept
  const [keptFerraro, setKeptFerraro] = useState(false);

  // Snapshot of initial roster for scoring
  const [initialRoster] = useState(() => [...gm.roster]);

  const currentPhase = PHASES[phaseIndex];

  const startGame = useCallback(() => {
    setGameMode('game');
    setPhaseIndex(0);
  }, []);

  const enterSandbox = useCallback(() => {
    setGameMode('sandbox');
  }, []);

  const advancePhase = useCallback(() => {
    if (phaseIndex < PHASES.length - 1) {
      setPhaseIndex(prev => prev + 1);
    }
  }, [phaseIndex]);

  // ========== QUALIFYING OFFERS ==========
  const makeQoDecision = useCallback((playerId, decision) => {
    setQoDecisions(prev => ({ ...prev, [playerId]: decision }));
  }, []);

  const confirmQualifyingOffers = useCallback(() => {
    // Players who are "let_walk" get removed from pendingFAs
    Object.entries(qoDecisions).forEach(([playerId, decision]) => {
      if (decision === 'let_walk') {
        const player = gm.pendingFAs.find(p => p.id === playerId);
        if (player) gm.letWalk(player);
      }
    });
    advancePhase();
  }, [qoDecisions, gm, advancePhase]);

  // ========== DRAFT SIMULATION ==========
  // Count how many SJS picks exist in the draft order
  const totalSharksPicks = DRAFT_ORDER_2026.filter(p => p.team === 'SJS').length;

  const advanceDraft = useCallback((draftProspects) => {
    setDraftSimState(prev => {
      const next = { ...prev, aiPicks: [...prev.aiPicks], currentPick: prev.currentPick };
      const available = draftProspects.filter(p =>
        !prev.aiPicks.some(ap => ap.prospect.name === p.name) &&
        !prev.userPicks.some(up => up.prospect.name === p.name)
      );

      // If user already made all their picks, draft is done
      if (prev.userPicks.length >= totalSharksPicks) {
        return { ...next, isUserTurn: false, draftComplete: true };
      }

      // Advance through picks until we hit a Sharks pick or run out
      while (next.currentPick < DRAFT_ORDER_2026.length) {
        const pickInfo = DRAFT_ORDER_2026[next.currentPick];

        if (pickInfo.team === 'SJS') {
          // It's the Sharks' turn
          return { ...next, isUserTurn: true };
        }

        // AI picks the best available
        if (available.length > 0) {
          const bestAvail = available.shift();
          next.aiPicks.push({
            pick: pickInfo.pick,
            team: pickInfo.team,
            prospect: bestAvail,
          });
        }
        next.currentPick++;
      }

      // Draft is complete
      return { ...next, isUserTurn: false, draftComplete: true };
    });
  }, [totalSharksPicks]);

  const userDraftPick = useCallback((prospect, pickIndex) => {
    const pickInfo = DRAFT_ORDER_2026[draftSimState.currentPick];
    const result = gm.draftProspect(prospect, pickIndex);

    if (result.success) {
      setDraftSimState(prev => {
        const newUserPicks = [...prev.userPicks, { pick: pickInfo.pick, team: 'SJS', prospect }];
        const allSharksDone = newUserPicks.length >= totalSharksPicks;
        return {
          ...prev,
          userPicks: newUserPicks,
          currentPick: prev.currentPick + 1,
          isUserTurn: false,
          draftComplete: allSharksDone,
        };
      });
    }
    return result;
  }, [draftSimState.currentPick, gm, totalSharksPicks]);

  // ========== FREE AGENCY SIMULATION ==========
  const runFaRound = useCallback(() => {
    // AI signs some top remaining UFAs
    const numAiSigns = faRound === 0 ? 3 : faRound === 1 ? 2 : 1;
    const remaining = gm.availableUFAs.slice(); // already sorted by overall in component
    const newAiSignings = [];

    for (let i = 0; i < numAiSigns && remaining.length > 0; i++) {
      const player = remaining.shift();
      const team = randomTeamForSigning(player.overall >= 80);
      const term = player.age >= 35 ? 1 : player.age >= 32 ? 2 : Math.min(5, Math.floor(Math.random() * 3) + 3);
      const aav = Math.round(player.projectedAAV * (0.9 + Math.random() * 0.2));
      newAiSignings.push({ player, team, term, aav });
    }

    // Remove AI-signed players from available pool
    // We need to update gm.availableUFAs by filtering out AI-signed players
    setAiSignings(prev => [...prev, ...newAiSignings]);
    setFaRound(prev => prev + 1);

    return newAiSignings;
  }, [faRound, gm.availableUFAs]);

  const passFaRound = useCallback(() => {
    setUserPassed(true);
  }, []);

  // ========== OFFER SHEET ==========
  const simulateOfferSheetMatch = useCallback((player, aav) => {
    // Determine if the team matches
    let matchChance;
    if (aav >= 10_000_000) matchChance = 0.95;
    else if (aav >= 7_000_000) matchChance = 0.80;
    else if (aav >= 5_000_000) matchChance = 0.60;
    else matchChance = 0.40;

    const matched = Math.random() < matchChance;
    const result = { player, aav, matched, team: player.prevTeam };
    setOfferSheetResult(result);
    return result;
  }, []);

  // ========== RE-SIGN TRACKING ==========
  const trackFerraro = useCallback((signed) => {
    setKeptFerraro(signed);
  }, []);

  // ========== RESET ==========
  const resetGame = useCallback(() => {
    setPhaseIndex(0);
    setQoDecisions({});
    setDraftSimState({
      currentPick: 0,
      aiPicks: [],
      userPicks: [],
      isUserTurn: false,
      draftComplete: false,
    });
    setFaRound(0);
    setAiSignings([]);
    setUserPassed(false);
    setOfferSheetResult(null);
    setExtensionDecisions({});
    setKeptFerraro(false);
    // Note: gm state reset would need to be handled by reloading the page
    window.location.reload();
  }, []);

  return {
    // Phase management
    phases: PHASES,
    currentPhase,
    phaseIndex,
    gameMode,
    startGame,
    enterSandbox,
    advancePhase,

    // QO
    qoDecisions,
    makeQoDecision,
    confirmQualifyingOffers,

    // Draft
    draftSimState,
    advanceDraft,
    userDraftPick,

    // Free Agency
    faRound,
    aiSignings,
    userPassed,
    runFaRound,
    passFaRound,

    // Offer Sheets
    offerSheetResult,
    simulateOfferSheetMatch,

    // Extensions
    extensionDecisions,
    setExtensionDecisions,

    // Scoring
    initialRoster,
    keptFerraro,
    trackFerraro,

    // Reset
    resetGame,
  };
}
