// 2026 NHL Free Agent Pool
// Players available when free agency opens July 1, 2026
// Sources: Daily Faceoff, theScore, Spotrac, PuckPedia, Pro Hockey Rumors
// Research verified via web searches March 8, 2026
// Note: Many top UFAs (McDavid, Eichel, Kaprizov, Kyle Connor, Kempe, Ekholm,
// Fowler, Gustavsson) already re-signed. Panarin traded to LAK and extended.

export const UFA_POOL = [
  // ===== TIER 1: FRANCHISE / TOP-LINE IMPACT =====
  { id: 'ufa-tuch', name: 'Alex Tuch', position: 'RW', age: 30, prevTeam: 'BUF', prevCapHit: 4_750_000, projectedAAV: 10_500_000, overall: 85, potential: 84, note: 'Best UFA available. Two 36-goal seasons. Gap between ask ($10.5M) and Sabres offer ($8.5M).' },
  { id: 'ufa-andersson', name: 'Rasmus Andersson', position: 'D', age: 29, prevTeam: 'VGK', prevCapHit: 4_550_000, projectedAAV: 7_750_000, overall: 83, potential: 82, note: 'Top UFA defenseman. RHD. Traded from CGY to VGK in January 2026.' },
  { id: 'ufa-schmaltz', name: 'Nick Schmaltz', position: 'C', age: 30, prevTeam: 'UTA', prevCapHit: 5_850_000, projectedAAV: 8_000_000, overall: 82, potential: 80, note: 'Consistent 60-pt center. Extension talks with Utah quiet.' },
  { id: 'ufa-laine', name: 'Patrik Laine', position: 'RW', age: 28, prevTeam: 'MTL', prevCapHit: 8_700_000, projectedAAV: 7_000_000, overall: 82, potential: 83, note: 'Elite shot but only 5 games in 2025-26 (core muscle injury). High risk/reward.' },

  // ===== TIER 2: STRONG TOP-6 / TOP-4 =====
  { id: 'ufa-carlson', name: 'John Carlson', position: 'D', age: 36, prevTeam: 'ANA', prevCapHit: 8_000_000, projectedAAV: 5_500_000, overall: 80, potential: 76, note: 'Elite PP QB. 46 pts in 55 games. Traded WSH→ANA at deadline.' },
  { id: 'ufa-bunting', name: 'Michael Bunting', position: 'LW', age: 31, prevTeam: 'MTL', prevCapHit: 4_500_000, projectedAAV: 4_500_000, overall: 78, potential: 76, note: 'Physical winger, 20+ goal upside.' },
  { id: 'ufa-kuzmenko', name: 'Andrei Kuzmenko', position: 'LW', age: 30, prevTeam: 'LAK', prevCapHit: 5_500_000, projectedAAV: 4_750_000, overall: 78, potential: 76, note: 'Skilled winger, inconsistent but upside remains.' },
  { id: 'ufa-tolvanen', name: 'Eeli Tolvanen', position: 'RW', age: 26, prevTeam: 'SEA', prevCapHit: 1_450_000, projectedAAV: 3_750_000, overall: 77, potential: 78, note: 'Young, cheap scoring winger. Only 26 — good fit for rebuild.' },
  { id: 'ufa-faulk', name: 'Justin Faulk', position: 'D', age: 34, prevTeam: 'STL', prevCapHit: 6_500_000, projectedAAV: 4_500_000, overall: 77, potential: 74, note: 'Offensive RHD, PP weapon. Traded at deadline.' },
  { id: 'ufa-matheson', name: 'Mike Matheson', position: 'D', age: 32, prevTeam: 'MTL', prevCapHit: 4_875_000, projectedAAV: 4_500_000, overall: 77, potential: 75, note: 'Skating D with offensive upside.' },

  // ===== TIER 3: MIDDLE-SIX / DEPTH =====
  { id: 'ufa-schwartz', name: 'Jaden Schwartz', position: 'LW', age: 34, prevTeam: 'SEA', prevCapHit: 5_500_000, projectedAAV: 3_500_000, overall: 74, potential: 72, note: 'Cup-winning veteran. Two-way play, leadership.' },
  { id: 'ufa-schenn', name: 'Brayden Schenn', position: 'C', age: 35, prevTeam: 'STL', prevCapHit: 5_125_000, projectedAAV: 3_500_000, overall: 75, potential: 72, note: 'Veteran center. Physical, leadership. Traded at deadline.' },
  { id: 'ufa-murphy', name: 'Connor Murphy', position: 'D', age: 33, prevTeam: 'EDM', prevCapHit: 4_400_000, projectedAAV: 3_500_000, overall: 75, potential: 73, note: 'Shutdown D. Traded CHI→EDM at deadline.' },
  { id: 'ufa-kulak', name: 'Brett Kulak', position: 'D', age: 32, prevTeam: 'COL', prevCapHit: 2_750_000, projectedAAV: 3_500_000, overall: 75, potential: 73, note: 'Underrated defensive D. Top-50 even-strength D. Traded PIT→COL at deadline.' },
  { id: 'ufa-eberle', name: 'Jordan Eberle', position: 'RW', age: 36, prevTeam: 'SEA', prevCapHit: 5_500_000, projectedAAV: 2_500_000, overall: 73, potential: 70, note: 'Veteran scorer, declining. Depth with experience.' },
  { id: 'ufa-lee', name: 'Anders Lee', position: 'LW', age: 36, prevTeam: 'NYI', prevCapHit: 7_000_000, projectedAAV: 2_500_000, overall: 73, potential: 70, note: 'Captain, net-front power forward. Leadership for rebuild.' },
  { id: 'ufa-mcdonagh', name: 'Ryan McDonagh', position: 'D', age: 37, prevTeam: 'NSH', prevCapHit: 6_750_000, projectedAAV: 2_500_000, overall: 73, potential: 70, note: 'Veteran stabilizer. 20 min/night. Mentorship value.' },
  { id: 'ufa-kane', name: 'Patrick Kane', position: 'RW', age: 37, prevTeam: 'DET', prevCapHit: 2_750_000, projectedAAV: 2_500_000, overall: 74, potential: 71, note: 'Future HOF. Skills fading but still has vision.' },
  { id: 'ufa-malkin', name: 'Evgeni Malkin', position: 'C', age: 40, prevTeam: 'PIT', prevCapHit: 6_100_000, projectedAAV: 3_500_000, overall: 75, potential: 72, note: 'May retire. Fiercely loyal to PIT. Fourth Cup chase possible.' },
  { id: 'ufa-malinski', name: 'Sam Malinski', position: 'D', age: 24, prevTeam: 'COL', prevCapHit: 925_000, projectedAAV: 2_500_000, overall: 74, potential: 78, note: 'Breakout season with Avs. Strong analytics. Young UFA — rare find.' },

  // ===== GOALTENDERS =====
  { id: 'ufa-bobrovsky', name: 'Sergei Bobrovsky', position: 'G', age: 38, prevTeam: 'FLA', prevCapHit: 10_000_000, projectedAAV: 6_000_000, overall: 83, potential: 78, note: '2x Cup champ, HOF-caliber. Short-term deal only at his age.' },
  { id: 'ufa-skinner-s', name: 'Stuart Skinner', position: 'G', age: 27, prevTeam: 'PIT', prevCapHit: 2_600_000, projectedAAV: 4_750_000, overall: 79, potential: 80, note: 'Youngest quality UFA goalie. Traded EDM→PIT. Best value in net.' },
  { id: 'ufa-andersen', name: 'Frederik Andersen', position: 'G', age: 37, prevTeam: 'CAR', prevCapHit: 2_750_000, projectedAAV: 2_750_000, overall: 76, potential: 73, note: 'Playoff-trusted veteran. Injury concerns.' },
  { id: 'ufa-kuemper', name: 'Darcy Kuemper', position: 'G', age: 36, prevTeam: 'LAK', prevCapHit: 5_500_000, projectedAAV: 2_500_000, overall: 74, potential: 71, note: 'Former Cup winner. Declining. Budget starter or quality backup.' },
  { id: 'ufa-talbot', name: 'Cam Talbot', position: 'G', age: 39, prevTeam: 'DET', prevCapHit: 2_500_000, projectedAAV: 1_750_000, overall: 72, potential: 68, note: 'Veteran backup. Reliable, cheap.' },
];

export const RFA_POOL = [
  // The 2026 RFA class is STACKED. These are players from other teams who could
  // theoretically be offer-sheeted, though most will be re-signed by their teams.
  // Offer sheets are rare but the Sharks have the cap space and draft capital to try.

  { id: 'rfa-bedard', name: 'Connor Bedard', position: 'C', age: 20, prevTeam: 'CHI', prevCapHit: 950_000, projectedAAV: 13_500_000, overall: 89, potential: 97, note: 'Generational talent. Top-10 scorer. Will reset RFA market. CHI will 100% match.' },
  { id: 'rfa-fantilli', name: 'Adam Fantilli', position: 'C', age: 22, prevTeam: 'CBJ', prevCapHit: 950_000, projectedAAV: 8_500_000, overall: 83, potential: 90, note: 'Breakout 31G/54P in 2024-25. Building block center.' },
  { id: 'rfa-carlsson', name: 'Leo Carlsson', position: 'C', age: 21, prevTeam: 'ANA', prevCapHit: 950_000, projectedAAV: 8_500_000, overall: 83, potential: 90, note: '2nd overall (2023). Top-10 scorer pace. Ducks cornerstone.' },
  { id: 'rfa-hughes-l', name: 'Luke Hughes', position: 'D', age: 22, prevTeam: 'NJD', prevCapHit: 950_000, projectedAAV: 8_000_000, overall: 82, potential: 89, note: 'Offensive dynamo on D. Part of Devils core with brother Jack.' },
  { id: 'rfa-faber', name: 'Brock Faber', position: 'D', age: 23, prevTeam: 'MIN', prevCapHit: 950_000, projectedAAV: 8_000_000, overall: 82, potential: 89, note: 'Calder finalist. Already top-pair D. Elite skating.' },
  { id: 'rfa-zegras', name: 'Trevor Zegras', position: 'C', age: 25, prevTeam: 'PHI', prevCapHit: 5_800_000, projectedAAV: 8_000_000, overall: 80, potential: 84, note: 'Creative playmaker. Has arbitration rights. Change-of-scenery candidate.' },
  { id: 'rfa-gauthier', name: 'Cutter Gauthier', position: 'LW', age: 22, prevTeam: 'ANA', prevCapHit: 950_000, projectedAAV: 7_000_000, overall: 80, potential: 86, note: 'Power forward. ANA has Carlsson + Zegras to pay too — possible offer sheet target.' },
  { id: 'rfa-knies', name: 'Matthew Knies', position: 'LW', age: 23, prevTeam: 'TOR', prevCapHit: 950_000, projectedAAV: 6_000_000, overall: 81, potential: 86, note: 'Power forward, net-front beast. Key Leafs piece.' },
  { id: 'rfa-edvinsson', name: 'Simon Edvinsson', position: 'D', age: 23, prevTeam: 'DET', prevCapHit: 950_000, projectedAAV: 6_000_000, overall: 79, potential: 85, note: 'Big, mobile Swedish D. Wings cornerstone.' },
  { id: 'rfa-stankoven', name: 'Logan Stankoven', position: 'RW', age: 22, prevTeam: 'DAL', prevCapHit: 950_000, projectedAAV: 6_000_000, overall: 80, potential: 86, note: 'Dynamic, undersized scorer. Electric offensive talent.' },
  { id: 'rfa-wright', name: 'Shane Wright', position: 'C', age: 22, prevTeam: 'SEA', prevCapHit: 950_000, projectedAAV: 5_000_000, overall: 78, potential: 84, note: '4th overall (2022). Developing steadily. Seattle may struggle to retain all young players.' },
  { id: 'rfa-rossi', name: 'Marco Rossi', position: 'C', age: 24, prevTeam: 'MIN', prevCapHit: 950_000, projectedAAV: 5_000_000, overall: 77, potential: 83, note: 'Skilled two-way center.' },
  { id: 'rfa-reinbacher', name: 'David Reinbacher', position: 'D', age: 22, prevTeam: 'MTL', prevCapHit: 950_000, projectedAAV: 4_000_000, overall: 75, potential: 82, note: 'Physical two-way D. 5th overall (2023).' },
  { id: 'rfa-perfetti', name: 'Cole Perfetti', position: 'LW', age: 24, prevTeam: 'WPG', prevCapHit: 950_000, projectedAAV: 5_000_000, overall: 77, potential: 82, note: 'Playmaking forward with offensive upside.' },
];

export function getAllFreeAgents() {
  return [...UFA_POOL, ...RFA_POOL];
}
