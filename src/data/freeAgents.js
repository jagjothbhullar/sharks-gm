// 2026 NHL Free Agent Pool
// Players available when free agency opens July 1, 2026
// Sources: Spotrac, PuckPedia, CapWages — cross-checked March 2026
// Only includes CONFIRMED 2026 UFAs and RFAs

export const UFA_POOL = [
  // ===== TIER 1: TOP-LINE IMPACT =====
  { id: 'ufa-tuch', name: 'Alex Tuch', position: 'RW', age: 30, prevTeam: 'BUF', prevCapHit: 4_750_000, projectedAAV: 8_500_000, overall: 87, potential: 86, note: 'Best UFA winger. Two 36-goal seasons. Was making $4.75M — massive raise incoming. Gap between his ask ($10.5M) and market ($8.5M).' },
  { id: 'ufa-andersson', name: 'Rasmus Andersson', position: 'D', age: 29, prevTeam: 'VGK', prevCapHit: 4_550_000, projectedAAV: 7_250_000, overall: 88, potential: 86, note: 'Top UFA defenseman. RHD with 100mph shot. Traded CGY→VGK at deadline.' },
  { id: 'ufa-schmaltz', name: 'Nick Schmaltz', position: 'C', age: 30, prevTeam: 'UTA', prevCapHit: 5_850_000, projectedAAV: 7_250_000, overall: 86, potential: 84, note: 'Consistent 60-pt center. Two-way game. Extension talks with Utah stalled.' },
  { id: 'ufa-laine', name: 'Patrik Laine', position: 'RW', age: 28, prevTeam: 'MTL', prevCapHit: 8_700_000, projectedAAV: 5_500_000, overall: 85, potential: 85, note: 'Elite shot but chronic injuries. Taking huge pay cut from $8.7M. Prove-it deal likely.' },

  // ===== TIER 2: STRONG TOP-6 / TOP-4 =====
  { id: 'ufa-carlson', name: 'John Carlson', position: 'D', age: 36, prevTeam: 'ANA', prevCapHit: 8_000_000, projectedAAV: 4_500_000, overall: 84, potential: 78, note: 'Elite PP QB. 46 pts in 55 games. 36 years old — short-term deal. Traded WSH→ANA.' },
  { id: 'ufa-bunting', name: 'Michael Bunting', position: 'LW', age: 31, prevTeam: 'DAL', prevCapHit: 4_500_000, projectedAAV: 4_000_000, overall: 82, potential: 80, note: 'Physical net-front winger. 20-goal upside. Traded NSH→DAL at deadline.' },
  { id: 'ufa-tolvanen', name: 'Eeli Tolvanen', position: 'RW', age: 27, prevTeam: 'SEA', prevCapHit: 3_475_000, projectedAAV: 4_000_000, overall: 84, potential: 82, note: 'Young PP specialist. Only 27 — still has upside. Good value.' },
  { id: 'ufa-faulk', name: 'Justin Faulk', position: 'D', age: 34, prevTeam: 'STL', prevCapHit: 6_500_000, projectedAAV: 4_000_000, overall: 82, potential: 78, note: 'Offensive RHD, PP weapon. Big pay cut from $6.5M.' },
  { id: 'ufa-matheson', name: 'Mike Matheson', position: 'D', age: 32, prevTeam: 'MTL', prevCapHit: 4_875_000, projectedAAV: 4_500_000, overall: 82, potential: 80, note: 'Skating D with offensive upside. Minutes-eater.' },

  // ===== TIER 3: MIDDLE-SIX / DEPTH =====
  { id: 'ufa-schwartz', name: 'Jaden Schwartz', position: 'LW', age: 34, prevTeam: 'SEA', prevCapHit: 5_500_000, projectedAAV: 3_000_000, overall: 78, potential: 75, note: 'Cup-winning veteran. Two-way play, leadership.' },
  { id: 'ufa-schenn', name: 'Brayden Schenn', position: 'C', age: 35, prevTeam: 'STL', prevCapHit: 5_125_000, projectedAAV: 3_000_000, overall: 80, potential: 76, note: 'Veteran center. Physical, leadership. Pay cut at 35.' },
  { id: 'ufa-murphy', name: 'Connor Murphy', position: 'D', age: 33, prevTeam: 'EDM', prevCapHit: 4_400_000, projectedAAV: 3_500_000, overall: 80, potential: 76, note: 'Shutdown D. Traded CHI→EDM at deadline.' },
  { id: 'ufa-kulak', name: 'Brett Kulak', position: 'D', age: 32, prevTeam: 'COL', prevCapHit: 2_750_000, projectedAAV: 3_500_000, overall: 80, potential: 78, note: 'Underrated defensive D. Top-50 even-strength D.' },
  { id: 'ufa-eberle', name: 'Jordan Eberle', position: 'RW', age: 36, prevTeam: 'SEA', prevCapHit: 5_500_000, projectedAAV: 2_000_000, overall: 78, potential: 74, note: 'Veteran scorer. Declining but still produces.' },
  { id: 'ufa-lee', name: 'Anders Lee', position: 'LW', age: 36, prevTeam: 'NYI', prevCapHit: 7_000_000, projectedAAV: 2_500_000, overall: 79, potential: 74, note: 'Captain. Net-front power forward. Leadership value.' },
  { id: 'ufa-kane', name: 'Patrick Kane', position: 'RW', age: 37, prevTeam: 'DET', prevCapHit: 2_750_000, projectedAAV: 2_000_000, overall: 82, potential: 76, note: 'Future HOF. Skills fading but elite vision remains.' },
  { id: 'ufa-mcdonagh', name: 'Ryan McDonagh', position: 'D', age: 37, prevTeam: 'NSH', prevCapHit: 6_750_000, projectedAAV: 2_000_000, overall: 79, potential: 74, note: 'Veteran stabilizer. Mentorship value.' },
  { id: 'ufa-schenn-l', name: 'Luke Schenn', position: 'D', age: 36, prevTeam: 'BUF', prevCapHit: 2_750_000, projectedAAV: 1_250_000, overall: 78, potential: 74, note: 'Physical stay-at-home D. Third-pair role at 36.' },

  // ===== GOALTENDERS =====
  { id: 'ufa-bobrovsky', name: 'Sergei Bobrovsky', position: 'G', age: 37, prevTeam: 'FLA', prevCapHit: 10_000_000, projectedAAV: 3_500_000, overall: 85, potential: 78, note: '2x Vezina, 2x Cup champ. Massive pay cut from $10M. Short-term only at 37.' },
  { id: 'ufa-andersen', name: 'Frederik Andersen', position: 'G', age: 36, prevTeam: 'CAR', prevCapHit: 2_750_000, projectedAAV: 2_000_000, overall: 82, potential: 76, note: 'Sub-.880 SV% this year. Injury-prone. Backup money.' },
  { id: 'ufa-talbot', name: 'Cam Talbot', position: 'G', age: 38, prevTeam: 'DET', prevCapHit: 2_500_000, projectedAAV: 1_250_000, overall: 80, potential: 74, note: 'Veteran backup at 38. .890 SV%. Near league minimum.' },
];

export const RFA_POOL = [
  // The 2026 RFA class — confirmed via PuckPedia contract pages
  // Only includes players whose contracts actually expire after 2025-26
  // Removed: Luke Hughes ($9M×7 ext), Brock Faber ($8.5M×8 ext), Stankoven ($6M×8 ext),
  //          Knies ($7.75M×6 ext), Rossi ($5M×3 deal), Wright (ELC expires 2027),
  //          Reinbacher (ELC expires 2028)

  { id: 'rfa-bedard', name: 'Connor Bedard', position: 'C', age: 21, prevTeam: 'CHI', prevCapHit: 950_000, projectedAAV: 13_500_000, overall: 87, potential: 97, note: 'Generational. Top-5 scorer. Will command $12M-$15M+. Chicago will 100% match any offer sheet.' },
  { id: 'rfa-fantilli', name: 'Adam Fantilli', position: 'C', age: 21, prevTeam: 'CBJ', prevCapHit: 950_000, projectedAAV: 9_500_000, overall: 84, potential: 90, note: 'Breakout season in Columbus. Building block center. ~$9.5M×7 projected.' },
  { id: 'rfa-carlsson', name: 'Leo Carlsson', position: 'C', age: 21, prevTeam: 'ANA', prevCapHit: 950_000, projectedAAV: 10_000_000, overall: 83, potential: 90, note: '2nd overall (2023). Top-line center pace. Ducks have Gauthier to pay too.' },
  { id: 'rfa-zegras', name: 'Trevor Zegras', position: 'C', age: 25, prevTeam: 'PHI', prevCapHit: 5_750_000, projectedAAV: 8_500_000, overall: 82, potential: 84, note: 'Creative playmaker. Traded ANA→PHI. Near PPG in Philly. Has arb rights.' },
  { id: 'rfa-gauthier', name: 'Cutter Gauthier', position: 'LW', age: 22, prevTeam: 'ANA', prevCapHit: 950_000, projectedAAV: 7_500_000, overall: 82, potential: 86, note: '40-goal pace. ANA has Carlsson to pay too — possible offer sheet target.' },
  { id: 'rfa-edvinsson', name: 'Simon Edvinsson', position: 'D', age: 23, prevTeam: 'DET', prevCapHit: 894_000, projectedAAV: 8_000_000, overall: 83, potential: 88, note: 'Big mobile Swedish D. Comps: K\'Andre Miller ($8.5M), Seider ($8.55M).' },
  { id: 'rfa-perfetti', name: 'Cole Perfetti', position: 'LW', age: 24, prevTeam: 'WPG', prevCapHit: 3_250_000, projectedAAV: 5_000_000, overall: 85, potential: 84, note: 'On 2nd RFA deal ($3.25M bridge). Could be trade block candidate.' },
];

export function getAllFreeAgents() {
  return [...UFA_POOL, ...RFA_POOL];
}
