// San Jose Sharks 2025-26 Roster & Contract Data
// Sources: PuckPedia, Spotrac, CapWages, Daily Faceoff (as of March 2026)
// Research verified via web searches March 8, 2026

export const SHARKS_ROSTER = [
  // ============ FORWARDS ============
  // Centers
  { id: 'celebrini', name: 'Macklin Celebrini', position: 'C', age: 19, capHit: 975_000, contractEnd: 2027, type: 'ELC', clause: null, potential: 95, overall: 82, note: '#1 pick 2024. Extension eligible July 1, 2026. $3.5M perf bonuses.' },
  { id: 'smith-w', name: 'Will Smith', position: 'C', age: 20, capHit: 950_000, contractEnd: 2027, type: 'ELC', clause: null, potential: 88, overall: 74, note: '#4 pick 2023' },
  { id: 'misa', name: 'Michael Misa', position: 'C', age: 18, capHit: 975_000, contractEnd: 2028, type: 'ELC', clause: null, potential: 92, overall: 72, note: '#2 pick 2025. $3.25M perf bonuses.' },
  { id: 'wennberg', name: 'Alexander Wennberg', position: 'C', age: 31, capHit: 5_000_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 76, overall: 76, note: 'Extension signed: $6M×3 starting 2026-27. Full NTC until June 2028.' },
  { id: 'gaudette', name: 'Adam Gaudette', position: 'C', age: 28, capHit: 2_000_000, contractEnd: 2027, type: 'UFA', clause: null, potential: 72, overall: 72 },
  { id: 'lund', name: 'Cameron Lund', position: 'C', age: 22, capHit: 942_000, contractEnd: 2028, type: 'ELC', clause: null, potential: 74, overall: 66 },

  // Left Wing
  { id: 'eklund', name: 'William Eklund', position: 'LW', age: 23, capHit: 863_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 85, overall: 77, note: 'Extension signed: $5.6M×3 starting 2026-27' },
  { id: 'goodrow', name: 'Barclay Goodrow', position: 'LW', age: 31, capHit: 3_641_667, contractEnd: 2027, type: 'UFA', clause: null, potential: 68, overall: 68 },
  { id: 'toffoli', name: 'Tyler Toffoli', position: 'LW', age: 33, capHit: 6_000_000, contractEnd: 2028, type: 'UFA', clause: null, potential: 76, overall: 76, note: 'Alt captain. 4yr/$24M' },
  { id: 'skinner', name: 'Jeff Skinner', position: 'LW', age: 33, capHit: 3_000_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 70, overall: 70, note: '1-year deal. Placed on waivers during Olympics.' },
  { id: 'kurashev', name: 'Philipp Kurashev', position: 'LW', age: 25, capHit: 1_200_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 70, overall: 68 },

  // Right Wing
  { id: 'sherwood', name: 'Kiefer Sherwood', position: 'RW', age: 29, capHit: 2_750_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 78, overall: 78, note: 'Acquired from VAN. Extension: $5.75M×5 starting 2026-27. Full NTC yr 1, M-NTC yrs 2-5.' },
  { id: 'dellandrea', name: 'Ty Dellandrea', position: 'RW', age: 24, capHit: 1_300_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 72, overall: 67, note: 'Acquired from DAL' },
  { id: 'reaves', name: 'Ryan Reaves', position: 'RW', age: 38, capHit: 1_350_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 58, overall: 58, note: 'Acquired from TOR for Thrun' },
  { id: 'graf', name: 'Collin Graf', position: 'RW', age: 23, capHit: 942_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 76, overall: 68, note: 'NCAA free agent signing' },

  // ============ DEFENSEMEN ============
  { id: 'dickinson-s', name: 'Sam Dickinson', position: 'D', age: 20, capHit: 975_000, contractEnd: 2028, type: 'ELC', clause: null, potential: 88, overall: 74, note: '#11 pick 2024. Max Kaminsky Trophy winner.' },
  { id: 'orlov', name: 'Dmitry Orlov', position: 'D', age: 34, capHit: 6_500_000, contractEnd: 2027, type: 'UFA', clause: 'NTC', potential: 76, overall: 76, note: '2yr/$13M. Full NTC 25-26, 15-team NTL 26-27.' },
  { id: 'ferraro', name: 'Mario Ferraro', position: 'D', age: 26, capHit: 3_250_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 82, overall: 79, note: 'Priority re-sign. Kept at deadline. Wants to stay.' },
  { id: 'klingberg', name: 'John Klingberg', position: 'D', age: 33, capHit: 4_000_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 70, overall: 70, note: '1-year comeback deal' },
  { id: 'desharnais', name: 'Vincent Desharnais', position: 'D', age: 29, capHit: 2_000_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 70, overall: 70, note: '2yr/$4M' },
  { id: 'leddy', name: 'Nick Leddy', position: 'D', age: 34, capHit: 4_000_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 64, overall: 64, note: 'Placed on waivers Jan 2026' },
  { id: 'mukhamadullin', name: 'Shakir Mukhamadullin', position: 'D', age: 24, capHit: 1_000_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 75, overall: 66 },

  // ============ GOALTENDERS ============
  { id: 'askarov', name: 'Yaroslav Askarov', position: 'G', age: 22, capHit: 2_000_000, contractEnd: 2027, type: 'RFA', clause: null, potential: 90, overall: 78, note: 'Franchise goalie of the future. 2yr/$4M.' },
  { id: 'nedeljkovic', name: 'Alex Nedeljkovic', position: 'G', age: 30, capHit: 2_500_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 74, overall: 74, note: 'Extension signed: $3M×2 starting 2026-27' },
];

// Players with extensions already signed (kick in 2026-27)
// These are in the roster above at their current cap hits, but their new deals are:
export const SHARKS_EXTENSIONS = [
  { name: 'Alexander Wennberg', newCapHit: 6_000_000, newTerm: 3, newEnd: 2029, clause: 'Full NTC until June 2028' },
  { name: 'William Eklund', newCapHit: 5_600_000, newTerm: 3, newEnd: 2029, clause: null },
  { name: 'Kiefer Sherwood', newCapHit: 5_750_000, newTerm: 5, newEnd: 2031, clause: 'Full NTC yr 1, M-NTC yrs 2-5' },
  { name: 'Alex Nedeljkovic', newCapHit: 3_000_000, newTerm: 2, newEnd: 2028, clause: null },
];

// Dead cap / buyouts / LTIR
export const SHARKS_DEAD_CAP = [
  { name: 'Logan Couture', reason: 'IR (Retired)', capHit: 8_000_000, contractEnd: 2027, note: 'Retired April 2025. $8M AAV still on books. Former captain.' },
  { name: 'Ryan Ellis', reason: 'LTIR', capHit: 6_250_000, contractEnd: 2027, note: 'Has not played since 2021-22. Cap dump from PHI.' },
  { name: 'Erik Karlsson', reason: 'Retained Salary', capHit: 3_500_000, contractEnd: 2027, note: 'Traded to PIT, SJS retaining 50%' },
];

// 2026-27 Cap Projection
export const SHARKS_CAP_SITUATION = {
  capCeiling: 104_000_000,
  deadCap: 17_750_000,          // Couture $8M + Ellis $6.25M + Karlsson $3.5M
  projectedCapSpace: 46_000_000, // ~$46M to work with after extensions kick in
};

// Draft Picks (2026 Draft)
export const SHARKS_DRAFT_PICKS = [
  { round: 1, pick: null, note: 'Own pick (lottery eligible — projected top 5)', source: 'OWN' },
  { round: 1, pick: null, note: 'From Edmonton (via Walman trade) — unprotected', source: 'EDM' },
  { round: 2, pick: null, note: 'From Colorado (via Blackwood trade)', source: 'COL' },
  { round: 4, pick: null, note: 'From Vegas via Washington (Liljegren trade)', source: 'VGK' },
  { round: 4, pick: null, note: 'From Florida (via Sturm trade)', source: 'FLA' },
  { round: 5, pick: null, note: 'Own pick', source: 'OWN' },
  { round: 6, pick: null, note: 'From Philadelphia, conditional (Ellis trade)', source: 'PHI' },
  { round: 7, pick: null, note: 'Own pick', source: 'OWN' },
];
// Picks traded away: 2nd (own → VAN for Sherwood), 3rd (own → STL for Faulk), 4th (own → CAR)

// Top Prospects in Pipeline (not on NHL roster)
// ESPN ranks Sharks prospect pipeline #1 in the NHL for 2025-26
export const SHARKS_PROSPECTS = [
  { name: 'Quentin Musty', position: 'LW', age: 20, league: 'AHL (Barracuda)', note: '2023 1st (#26) — dominating AHL. Power forward with skill. NHL-ready soon.' },
  { name: 'Igor Chernyshov', position: 'LW', age: 20, league: 'AHL (Barracuda)', note: '2023 3rd — 2.39 PPG in OHL. Had 3 NHL games with points in each. Dynamic.' },
  { name: 'Kasper Halttunen', position: 'RW', age: 20, league: 'AHL (Barracuda)', note: '2023 1st (#18) — big power forward, heavy shot. First full pro season.' },
  { name: 'Luca Cagnoni', position: 'D', age: 21, league: 'AHL (Barracuda)', note: '2023 6th — offensive D, among AHL D leaders in points. Breakout season.' },
  { name: 'Filip Bystedt', position: 'C', age: 22, league: 'AHL (Barracuda)', note: '2022 1st (#27) — middle-six C upside. Needs consistency.' },
  { name: 'Nolan Burke', position: 'C', age: 20, league: 'AHL', note: 'Came in Askarov trade from Nashville.' },
  { name: 'Georgi Romanov', position: 'G', age: 21, league: 'AHL (Barracuda)', note: 'Young goalie depth.' },
];

// 2026 Draft Top Prospects
export const DRAFT_PROSPECTS_2026 = [
  { rank: 1, name: 'Gavin McKenna', position: 'C', team: 'Medicine Hat (WHL)', age: 17, note: 'Generational talent — McDavid comps', potential: 97 },
  { rank: 2, name: 'Porter Martone', position: 'RW', team: 'Brampton (OHL)', age: 17, note: 'Power forward with elite shot', potential: 93 },
  { rank: 3, name: 'Lucas Pettersson', position: 'C', team: 'Luleå (SHL)', age: 18, note: 'Swedish playmaker, two-way game', potential: 90 },
  { rank: 4, name: 'Mathieu St-Cyr', position: 'G', team: 'Moncton (QMJHL)', age: 17, note: 'Franchise goalie potential', potential: 88 },
  { rank: 5, name: 'Cameron Whitehead', position: 'D', team: 'Penticton (BCHL)', age: 17, note: 'Smooth skating defender', potential: 88 },
  { rank: 6, name: 'Cole Reschny', position: 'C', team: 'Victoria (WHL)', age: 18, note: 'Dynamic offensive center', potential: 87 },
  { rank: 7, name: 'Roger McQueen', position: 'C', team: 'Brandon (WHL)', age: 17, note: 'Big center with skill', potential: 87 },
  { rank: 8, name: 'Dominik Badinka', position: 'D', team: 'Trnava (Slovak-XHL)', age: 18, note: 'Physical D-man, good skater', potential: 86 },
  { rank: 9, name: 'Alex Hage', position: 'D', team: 'Chicago (USHL)', age: 17, note: 'Offensive defenseman', potential: 86 },
  { rank: 10, name: 'Jackson Smith', position: 'D', team: 'Tri-City (WHL)', age: 17, note: 'Two-way D, high IQ', potential: 85 },
  { rank: 11, name: 'Veeti Vaisanen', position: 'D', team: 'TPS (Liiga)', age: 18, note: 'Finnish blueliner', potential: 85 },
  { rank: 12, name: 'Blake Fiddler', position: 'D', team: 'US NTDP (USHL)', age: 17, note: 'Puck-moving D', potential: 84 },
  { rank: 13, name: 'Viktor Klingsell', position: 'RW', team: 'Djurgårdens (J20)', age: 17, note: 'Swedish sniper', potential: 84 },
  { rank: 14, name: 'Hudson Corey', position: 'C', team: 'Ottawa (OHL)', age: 17, note: 'Speed and skill', potential: 83 },
  { rank: 15, name: 'Charlie Trethewey', position: 'LW', team: 'Kelowna (WHL)', age: 17, note: 'High-motor winger', potential: 83 },
];
