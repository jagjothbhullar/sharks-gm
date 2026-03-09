// NHL CBA Rules for 2026 Offseason GM Mode
// Sources: NHL.com, PuckPedia, CapWages, ESPN

export const CBA = {
  // Salary Cap
  cap: {
    current: 95_500_000,        // 2025-26 upper limit
    projected: 104_000_000,     // 2026-27 upper limit (projected)
    floor: 76_900_000,          // 2026-27 lower limit (projected)
    midpoint: 90_450_000,       // midpoint for cap benefit calculations
  },

  // Contract Rules
  contracts: {
    maxTerm: 8,                 // max years (own team can sign)
    maxTermOther: 7,            // max years (signing with new team as UFA)
    maxSalaryPct: 0.20,         // max 20% of cap for any single player
    minSalary: 775_000,         // NHL minimum salary (2025-26)
    elcMaxSalary: 975_000,      // ELC max for 2024-25 draft class
    elcMaxSalary2026: 1_000_000,// ELC max for 2026 draft class
    elcTerm: 3,                 // ELC always 3 years
    slideRule: 9,               // games before ELC year "burns"
  },

  // Free Agency
  freeAgency: {
    ufaAge: 27,                 // age OR 7 accrued seasons
    ufaSeasons: 7,              // 7 accrued NHL seasons = UFA regardless of age
    rfaAge: 0,                  // any age under 27 with <7 seasons
    qualifyingOfferDeadline: 'June 25, 5:00 PM ET',
    freeAgencyOpens: 'July 1, 12:00 PM ET',
    offerSheetWindow: { start: 'July 1', end: 'December 1' },
    offerSheetMatchDays: 7,     // original team has 7 days to match
  },

  // Offer Sheet Compensation Tiers (2025 values, ~scaled for 2026)
  // These get adjusted annually based on cap; using projected 2026 values
  offerSheetTiers: [
    { maxAAV: 1_680_000, compensation: [] },
    { maxAAV: 2_550_000, compensation: ['3rd'] },
    { maxAAV: 5_100_000, compensation: ['2nd'] },
    { maxAAV: 7_650_000, compensation: ['1st', '3rd'] },
    { maxAAV: 10_200_000, compensation: ['1st', '2nd', '3rd'] },
    { maxAAV: 12_750_000, compensation: ['1st', '1st', '2nd', '3rd'] },
    { maxAAV: Infinity, compensation: ['1st', '1st', '1st', '1st'] },
  ],

  // Buyout Rules
  buyouts: {
    capHitMultiplier: 2 / 3,    // 2/3 of remaining salary
    spreadMultiplier: 2,        // spread over 2x remaining years
    // players under 26: 1/3 of remaining salary spread over 2x years
    youngPlayerAge: 26,
    youngCapHitMultiplier: 1 / 3,
    window: 'June 15 - June 30 (after Cup Finals)',
  },

  // Trade Rules
  trades: {
    maxRetainedPct: 0.50,       // max 50% salary retained
    maxRetentionsPerPlayer: 3,  // max 3 teams can retain on same player
    retentionCooldown: 75,      // 75 regular-season days between retentions (new CBA)
    deadlineApprox: 'March 7',  // trade deadline (approximate)
  },

  // Draft
  draft: {
    rounds: 7,
    picksPerRound: 32,          // 32 teams
    lotteryTeams: 16,           // non-playoff teams
    lotteryDraws: 2,            // picks 1 and 2 drawn
    maxJump: 10,                // max 10 spots a team can move up
    maxWinsIn5Years: 2,         // can't win lottery more than 2x in 5 years
    date: 'June 26-27, 2026',
    location: 'Buffalo, NY (KeyBank Center)',
  },

  // Roster Rules
  roster: {
    maxActive: 23,              // max active roster
    maxContracts: 50,           // max NHL contracts per team
    minPlayers: 20,             // min dressed for game
    irSlots: Infinity,          // no limit on IR
    ltirThreshold: 24,          // 24+ days = LTIR eligible
  },

  // Waivers
  waivers: {
    exemptSeasons: 2,           // first 2 NHL seasons or <11 NHL games in each
    exemptAge: 25,              // players on ELC under age 25 exempt
    // Re-entry waivers eliminated in 2013 CBA
  },
};

// Helper: calculate max salary for a given cap year
export function maxPlayerSalary(capAmount = CBA.cap.projected) {
  return Math.floor(capAmount * CBA.contracts.maxSalaryPct);
}

// Helper: get offer sheet compensation for a given AAV
export function getOfferSheetCompensation(aav) {
  for (const tier of CBA.offerSheetTiers) {
    if (aav <= tier.maxAAV) return tier.compensation;
  }
  return ['1st', '1st', '1st', '1st'];
}

// Helper: calculate buyout cap hit
export function calculateBuyout(remainingSalary, remainingYears, playerAge) {
  const multiplier = playerAge < CBA.buyouts.youngPlayerAge
    ? CBA.buyouts.youngCapHitMultiplier
    : CBA.buyouts.capHitMultiplier;
  const totalCost = remainingSalary * multiplier;
  const spreadYears = remainingYears * CBA.buyouts.spreadMultiplier;
  return {
    totalCost,
    annualCapHit: Math.round(totalCost / spreadYears),
    years: spreadYears,
  };
}

// Helper: format money
export function formatMoney(amount) {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2)}M`;
  }
  return `$${(amount / 1_000).toFixed(0)}K`;
}

// Helper: format cap hit (shorter)
export function formatCap(amount) {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(amount / 1_000).toFixed(0)}K`;
}
