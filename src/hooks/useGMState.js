import { useState, useCallback, useMemo } from 'react';
import { SHARKS_ROSTER, SHARKS_DEAD_CAP, SHARKS_DRAFT_PICKS, SHARKS_PROSPECTS, DRAFT_PROSPECTS_2026, SHARKS_EXTENSIONS, EXTENSION_ELIGIBLE } from '../data/sharks';
import { UFA_POOL, RFA_POOL } from '../data/freeAgents';
import { CBA, calculateBuyout, getOfferSheetCompensation } from '../data/cba';

const PROJECTED_CAP = CBA.cap.projected; // 2026-27: $104M

// Players who already signed extensions get moved to roster at their new cap hits
const EXTENDED_NAMES = new Set(SHARKS_EXTENSIONS.map(e => e.name));

function buildInitialRoster() {
  const roster = [];

  for (const player of SHARKS_ROSTER) {
    const ext = SHARKS_EXTENSIONS.find(e => e.name === player.name);
    if (ext) {
      // Player signed extension — they're locked in for 2026-27 at the new cap hit
      roster.push({
        ...player,
        capHit: ext.newCapHit,
        contractEnd: ext.newEnd,
        clause: ext.clause,
        type: 'Extended',
      });
    } else if (player.contractEnd > 2026) {
      // Still under contract
      roster.push(player);
    }
    // contractEnd === 2026 and no extension → pending FA (handled below)
  }
  return roster;
}

function buildPendingFAs() {
  return SHARKS_ROSTER.filter(p =>
    p.contractEnd === 2026 && !EXTENDED_NAMES.has(p.name)
  );
}

export function useGMState() {
  const [roster, setRoster] = useState(buildInitialRoster);
  const [pendingFAs, setPendingFAs] = useState(buildPendingFAs);
  const [signings, setSignings] = useState([]);
  const [trades, setTrades] = useState([]);
  const [buyouts, setBuyouts] = useState([]);
  const [draftPicks, setDraftPicks] = useState(SHARKS_DRAFT_PICKS);
  const [draftSelections, setDraftSelections] = useState([]);
  const [availableUFAs, setAvailableUFAs] = useState(UFA_POOL);
  const [availableRFAs, setAvailableRFAs] = useState(RFA_POOL);
  const [log, setLog] = useState([]);

  const addLog = useCallback((action, detail) => {
    setLog(prev => [{ action, detail, timestamp: Date.now() }, ...prev]);
  }, []);

  // ========== CAP CALCULATIONS ==========
  const capInfo = useMemo(() => {
    const rosterCap = roster.reduce((sum, p) => sum + p.capHit, 0);
    const signingsCap = signings.reduce((sum, s) => sum + s.capHit, 0);
    const deadCap = SHARKS_DEAD_CAP.reduce((sum, d) => sum + d.capHit, 0);
    const buyoutCap = buyouts.reduce((sum, b) => sum + b.annualCapHit, 0);
    const totalCommitted = rosterCap + signingsCap + deadCap + buyoutCap;
    const capSpace = PROJECTED_CAP - totalCommitted;
    const rosterSize = roster.length + signings.length;

    return {
      ceiling: PROJECTED_CAP,
      rosterCap,
      signingsCap,
      deadCap,
      buyoutCap,
      totalCommitted,
      capSpace,
      rosterSize,
      isOverCap: capSpace < 0,
      isUnderFloor: totalCommitted < CBA.cap.floor,
    };
  }, [roster, signings, buyouts]);

  // ========== ACTIONS ==========

  const signUFA = useCallback((player, term, aav) => {
    if (term > CBA.contracts.maxTermOther) {
      return { error: `Max term for UFA signing is ${CBA.contracts.maxTermOther} years` };
    }
    if (aav > PROJECTED_CAP * CBA.contracts.maxSalaryPct) {
      return { error: `Max salary is 20% of cap ($${(PROJECTED_CAP * 0.2 / 1e6).toFixed(1)}M)` };
    }
    if (aav < CBA.contracts.minSalary) {
      return { error: `Minimum salary is $${(CBA.contracts.minSalary / 1e3).toFixed(0)}K` };
    }

    const signing = {
      ...player,
      capHit: aav,
      contractEnd: 2027 + term - 1,
      type: 'Signed',
      term,
    };
    setSignings(prev => [...prev, signing]);
    setAvailableUFAs(prev => prev.filter(p => p.id !== player.id));
    addLog('SIGNING', `Signed ${player.name} (${player.position}) — ${term}yr × $${(aav / 1e6).toFixed(2)}M`);
    return { success: true };
  }, [addLog]);

  const reSign = useCallback((player, term, aav) => {
    const maxTerm = CBA.contracts.maxTerm;
    if (term > maxTerm) {
      return { error: `Max term is ${maxTerm} years` };
    }

    const signing = {
      ...player,
      capHit: aav,
      contractEnd: 2027 + term - 1,
      type: 'Re-signed',
      term,
    };
    setSignings(prev => [...prev, signing]);
    setPendingFAs(prev => prev.filter(p => p.id !== player.id));
    addLog('RE-SIGN', `Re-signed ${player.name} (${player.position}) — ${term}yr × $${(aav / 1e6).toFixed(2)}M`);
    return { success: true };
  }, [addLog]);

  const letWalk = useCallback((player) => {
    setPendingFAs(prev => prev.filter(p => p.id !== player.id));
    addLog('LET WALK', `${player.name} (${player.position}) walks in free agency`);
  }, [addLog]);

  const offerSheet = useCallback((player, term, aav) => {
    const compensation = getOfferSheetCompensation(aav);
    if (term > 7) {
      return { error: 'Offer sheets max 7 years' };
    }

    const signing = {
      ...player,
      capHit: aav,
      contractEnd: 2027 + term - 1,
      type: 'Offer Sheet',
      term,
      compensation,
    };
    setSignings(prev => [...prev, signing]);
    setAvailableRFAs(prev => prev.filter(p => p.id !== player.id));

    const picksUsed = [...compensation];
    setDraftPicks(prev => {
      const remaining = [...prev];
      for (const round of picksUsed) {
        const roundNum = round === '1st' ? 1 : round === '2nd' ? 2 : round === '3rd' ? 3 : parseInt(round);
        const idx = remaining.findIndex(p => p.round === roundNum);
        if (idx >= 0) remaining.splice(idx, 1);
      }
      return remaining;
    });

    addLog('OFFER SHEET', `Offer sheet ${player.name} from ${player.prevTeam} — ${term}yr × $${(aav / 1e6).toFixed(2)}M (compensation: ${compensation.join(', ')})`);
    return { success: true, compensation };
  }, [addLog]);

  const buyoutPlayer = useCallback((player) => {
    const remainingSalary = player.capHit * (player.contractEnd - 2026);
    const remainingYears = player.contractEnd - 2026;
    const buyoutInfo = calculateBuyout(remainingSalary, remainingYears, player.age);

    setBuyouts(prev => [...prev, { ...player, ...buyoutInfo }]);
    setRoster(prev => prev.filter(p => p.id !== player.id));
    addLog('BUYOUT', `Bought out ${player.name} — $${(buyoutInfo.annualCapHit / 1e6).toFixed(2)}M/yr for ${buyoutInfo.years} years`);
    return buyoutInfo;
  }, [addLog]);

  const makeTrade = useCallback((outgoing, incoming, otherTeam) => {
    const outIds = outgoing.players?.map(p => p.id) || [];
    setRoster(prev => prev.filter(p => !outIds.includes(p.id)));
    setSignings(prev => prev.filter(p => !outIds.includes(p.id)));

    if (incoming.players) {
      setRoster(prev => [...prev, ...incoming.players]);
    }
    if (incoming.picks) {
      setDraftPicks(prev => [...prev, ...incoming.picks]);
    }
    if (outgoing.picks) {
      const outPickIds = outgoing.picks.map(p => `${p.round}-${p.source}`);
      setDraftPicks(prev => prev.filter(p => !outPickIds.includes(`${p.round}-${p.source}`)));
    }

    const tradeDetail = { outgoing, incoming, otherTeam, timestamp: Date.now() };
    setTrades(prev => [...prev, tradeDetail]);

    const outNames = outgoing.players?.map(p => p.name).join(', ') || '';
    const outPicksStr = outgoing.picks?.map(p => `R${p.round}`).join(', ') || '';
    const inNames = incoming.players?.map(p => p.name).join(', ') || '';
    const inPicksStr = incoming.picks?.map(p => `R${p.round}`).join(', ') || '';
    addLog('TRADE', `Trade with ${otherTeam}: Sent ${[outNames, outPicksStr].filter(Boolean).join(', ')} → Received ${[inNames, inPicksStr].filter(Boolean).join(', ')}`);
    return tradeDetail;
  }, [addLog]);

  const executeTrade = useCallback((tradeScenario) => {
    // Remove players we're sending
    const sendingIds = tradeScenario.sending.players.map(p => p.id);
    setRoster(prev => prev.filter(p => !sendingIds.includes(p.id)));

    // Remove picks we're sending
    if (tradeScenario.sending.picks) {
      const sendSources = tradeScenario.sending.picks.map(p => p.source);
      setDraftPicks(prev => {
        const remaining = [...prev];
        for (const source of sendSources) {
          const idx = remaining.findIndex(p => p.source === source);
          if (idx >= 0) remaining.splice(idx, 1);
        }
        return remaining;
      });
    }

    // Add players we're receiving
    if (tradeScenario.receiving.players.length > 0) {
      setRoster(prev => [...prev, ...tradeScenario.receiving.players]);
    }

    // Add picks we're receiving
    if (tradeScenario.receiving.picks && tradeScenario.receiving.picks.length > 0) {
      setDraftPicks(prev => [...prev, ...tradeScenario.receiving.picks]);
    }

    const sentNames = tradeScenario.sending.players.map(p => p.name).join(', ');
    const sentPicks = tradeScenario.sending.picks?.map(p => `R${p.round}`).join(', ') || '';
    const gotNames = tradeScenario.receiving.players.map(p => p.name).join(', ');
    const gotPicks = tradeScenario.receiving.picks?.map(p => `R${p.round}`).join(', ') || '';
    const sent = [sentNames, sentPicks].filter(Boolean).join(', ');
    const got = [gotNames, gotPicks].filter(Boolean).join(', ') || 'cap space';
    addLog('TRADE', `Trade with ${tradeScenario.partnerName}: Sent ${sent} → Received ${got}`);
  }, [addLog]);

  const extendPlayer = useCallback((extensionPlayer, term, aav) => {
    const maxTerm = CBA.contracts.maxTerm; // 8 years for own team
    if (term > maxTerm) {
      return { error: `Max extension term is ${maxTerm} years` };
    }
    if (aav > PROJECTED_CAP * CBA.contracts.maxSalaryPct) {
      return { error: `Max salary is 20% of cap ($${(PROJECTED_CAP * 0.2 / 1e6).toFixed(1)}M)` };
    }
    if (aav < extensionPlayer.minAAV) {
      return { error: `${extensionPlayer.name} won't sign for less than $${(extensionPlayer.minAAV / 1e6).toFixed(1)}M` };
    }

    // Update the roster player's contract — extension kicks in after current deal
    setRoster(prev => prev.map(p => {
      if (p.id === extensionPlayer.id) {
        return {
          ...p,
          capHit: aav,
          contractEnd: 2027 + term, // starts after current deal ends in 2027
          type: 'Extended',
          clause: term >= 5 ? 'M-NTC' : null,
        };
      }
      return p;
    }));

    addLog('EXTENSION', `Extended ${extensionPlayer.name} (${extensionPlayer.position}) — ${term}yr × $${(aav / 1e6).toFixed(2)}M (kicks in 2027-28)`);
    return { success: true };
  }, [addLog]);

  const draftProspect = useCallback((prospect, pickIndex) => {
    const pick = draftPicks[pickIndex];
    if (!pick) return { error: 'No pick available' };

    const drafted = {
      id: `draft-${prospect.name.toLowerCase().replace(/\s/g, '-')}`,
      name: prospect.name,
      position: prospect.position,
      age: prospect.age + 1,
      capHit: CBA.contracts.elcMaxSalary2026,
      contractEnd: 2030,
      type: 'ELC',
      clause: null,
      potential: prospect.potential,
      overall: Math.max(60, prospect.potential - 20),
    };

    setDraftSelections(prev => [...prev, { pick, prospect: drafted }]);
    setRoster(prev => [...prev, drafted]);
    setDraftPicks(prev => prev.filter((_, i) => i !== pickIndex));
    addLog('DRAFT', `Selected ${prospect.name} (${prospect.position}) with Round ${pick.round} pick`);
    return { success: true };
  }, [draftPicks, addLog]);

  return {
    roster,
    pendingFAs,
    signings,
    trades,
    buyouts,
    draftPicks,
    draftSelections,
    availableUFAs,
    availableRFAs,
    capInfo,
    log,
    prospects: SHARKS_PROSPECTS,
    draftProspects: DRAFT_PROSPECTS_2026,
    deadCap: SHARKS_DEAD_CAP,

    extensionEligible: EXTENSION_ELIGIBLE,

    signUFA,
    reSign,
    letWalk,
    offerSheet,
    buyoutPlayer,
    makeTrade,
    executeTrade,
    draftProspect,
    extendPlayer,
  };
}
