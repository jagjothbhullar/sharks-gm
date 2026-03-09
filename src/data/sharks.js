// San Jose Sharks 2025-26 Roster & Contract Data
// Sources: PuckPedia, Spotrac, CapWages — cross-checked March 8, 2026
// Ages reflect 2026-27 season (when GM decisions take effect)
// Overalls from EA NHL 25 ratings where available, estimated for non-NHL25 players

export const SHARKS_ROSTER = [
  // ============ FORWARDS ============
  // Centers
  { id: 'celebrini', name: 'Macklin Celebrini', position: 'C', age: 20, capHit: 975_000, contractEnd: 2027, type: 'ELC', clause: null, potential: 95, overall: 82, note: '#1 pick 2024. Extension eligible July 1, 2026. $3.5M perf bonuses.' },
  { id: 'smith-w', name: 'Will Smith', position: 'C', age: 21, capHit: 950_000, contractEnd: 2027, type: 'ELC', clause: null, potential: 88, overall: 78, note: '#4 pick 2023. $3.2M perf bonuses.' },
  { id: 'misa', name: 'Michael Misa', position: 'C', age: 19, capHit: 975_000, contractEnd: 2028, type: 'ELC', clause: null, potential: 92, overall: 74, note: '#2 pick 2025. Rookie season. $3.25M perf bonuses.' },
  { id: 'wennberg', name: 'Alexander Wennberg', position: 'C', age: 32, capHit: 5_000_000, contractEnd: 2026, type: 'UFA', clause: 'M-NTC', potential: 80, overall: 84, note: 'Extension signed: $6M×3 starting 2026-27. Full NTC yrs 1-2, 12-team NTL yr 3.' },
  { id: 'gaudette', name: 'Adam Gaudette', position: 'C', age: 30, capHit: 2_000_000, contractEnd: 2027, type: 'UFA', clause: null, potential: 76, overall: 81 },
  { id: 'lund', name: 'Cameron Lund', position: 'C', age: 23, capHit: 942_000, contractEnd: 2028, type: 'ELC', clause: null, potential: 74, overall: 70 },

  // Left Wing
  { id: 'eklund', name: 'William Eklund', position: 'LW', age: 23, capHit: 925_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 85, overall: 80, note: 'Extension signed: $5.6M×3 starting 2026-27' },
  { id: 'goodrow', name: 'Barclay Goodrow', position: 'LW', age: 34, capHit: 3_641_667, contractEnd: 2027, type: 'UFA', clause: 'M-NTC', potential: 74, overall: 80, note: '15-team NTL. Claimed off waivers from NYR.' },
  { id: 'toffoli', name: 'Tyler Toffoli', position: 'LW', age: 34, capHit: 6_000_000, contractEnd: 2028, type: 'UFA', clause: 'NMC', potential: 80, overall: 86, note: 'Alt captain. 4yr/$24M. Full NMC.' },
  { id: 'kurashev', name: 'Philipp Kurashev', position: 'LW', age: 27, capHit: 1_200_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 76, overall: 80 },

  // Right Wing
  { id: 'sherwood', name: 'Kiefer Sherwood', position: 'RW', age: 30, capHit: 1_500_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 82, overall: 83, note: 'Acquired from VAN for 2nd + 2nd + Clayton. Extension: $5.75M×5 starting 2026-27.' },
  { id: 'dellandrea', name: 'Ty Dellandrea', position: 'RW', age: 26, capHit: 1_300_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 76, overall: 79, note: 'Acquired from DAL' },
  { id: 'reaves', name: 'Ryan Reaves', position: 'RW', age: 39, capHit: 1_350_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 64, overall: 75, note: 'Acquired from TOR for Thrun' },
  { id: 'graf', name: 'Collin Graf', position: 'RW', age: 24, capHit: 942_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 76, overall: 75, note: 'ELC expiring.' },

  // ============ DEFENSEMEN ============
  { id: 'dickinson-s', name: 'Sam Dickinson', position: 'D', age: 20, capHit: 975_000, contractEnd: 2028, type: 'ELC', clause: null, potential: 88, overall: 76, note: '#11 pick 2024. Breakout rookie season.' },
  { id: 'orlov', name: 'Dmitry Orlov', position: 'D', age: 35, capHit: 6_500_000, contractEnd: 2027, type: 'UFA', clause: 'NTC', potential: 80, overall: 86, note: '2yr/$13M. Full NTC 25-26, 15-team NTL 26-27.' },
  { id: 'ferraro', name: 'Mario Ferraro', position: 'D', age: 27, capHit: 3_250_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 84, overall: 83, note: 'Priority re-sign. Kept at deadline. Wants to stay.' },
  { id: 'klingberg', name: 'John Klingberg', position: 'D', age: 34, capHit: 4_000_000, contractEnd: 2026, type: 'UFA', clause: 'NTC', potential: 74, overall: 78, note: '1-year comeback deal. NTC waived at deadline.' },
  { id: 'desharnais', name: 'Vincent Desharnais', position: 'D', age: 30, capHit: 2_000_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 76, overall: 79, note: '2yr/$4M' },
  { id: 'leddy', name: 'Nick Leddy', position: 'D', age: 35, capHit: 4_000_000, contractEnd: 2026, type: 'UFA', clause: 'M-NTC', potential: 70, overall: 76, note: 'Placed on waivers Jan 2026, cleared. 16-team NTL.' },
  { id: 'mukhamadullin', name: 'Shakir Mukhamadullin', position: 'D', age: 25, capHit: 1_000_000, contractEnd: 2026, type: 'RFA', clause: null, potential: 78, overall: 77 },

  // ============ GOALTENDERS ============
  { id: 'askarov', name: 'Yaroslav Askarov', position: 'G', age: 24, capHit: 2_000_000, contractEnd: 2027, type: 'RFA', clause: null, potential: 90, overall: 80, note: 'Franchise goalie of the future. 2yr/$4M. Acquired from NSH.' },
  { id: 'nedeljkovic', name: 'Alex Nedeljkovic', position: 'G', age: 31, capHit: 2_500_000, contractEnd: 2026, type: 'UFA', clause: null, potential: 78, overall: 81, note: 'Extension signed: $3M×2 starting 2026-27' },
];

// Players with extensions already signed (kick in 2026-27)
export const SHARKS_EXTENSIONS = [
  { name: 'Alexander Wennberg', newCapHit: 6_000_000, newTerm: 3, newEnd: 2029, clause: 'Full NTC yrs 1-2, 12-team NTL yr 3' },
  { name: 'William Eklund', newCapHit: 5_600_000, newTerm: 3, newEnd: 2029, clause: null },
  { name: 'Kiefer Sherwood', newCapHit: 5_750_000, newTerm: 5, newEnd: 2031, clause: 'Full NTC yr 1, M-NTC yrs 2-5' },
  { name: 'Alex Nedeljkovic', newCapHit: 3_000_000, newTerm: 2, newEnd: 2028, clause: '3-team trade list yr 1' },
];

// Extension-eligible players (already under contract, can sign extension early)
export const EXTENSION_ELIGIBLE = [
  {
    id: 'celebrini',
    name: 'Macklin Celebrini',
    position: 'C',
    age: 20,
    currentCapHit: 975_000,
    currentEnd: 2027,
    overall: 82,
    potential: 95,
    projectedAAV: 12_500_000,
    suggestedTerm: 8,
    minAAV: 10_000_000,
    note: '#1 pick 2024. Franchise center. Think Bedard/McDavid-tier deal. Max 8yr extension with own team.',
    priority: true,
  },
  {
    id: 'smith-w',
    name: 'Will Smith',
    position: 'C',
    age: 21,
    currentCapHit: 950_000,
    currentEnd: 2027,
    overall: 78,
    potential: 88,
    projectedAAV: 5_000_000,
    suggestedTerm: 4,
    minAAV: 3_000_000,
    note: '#4 pick 2023. Could take a bridge deal or bet on himself. High ceiling but still developing.',
    priority: false,
  },
  {
    id: 'askarov',
    name: 'Yaroslav Askarov',
    position: 'G',
    age: 24,
    currentCapHit: 2_000_000,
    currentEnd: 2027,
    overall: 80,
    potential: 90,
    projectedAAV: 5_500_000,
    suggestedTerm: 5,
    minAAV: 3_500_000,
    note: 'Franchise goalie. Extension locks him in before he hits RFA. Smart investment.',
    priority: false,
  },
];

// Dead cap for 2026-27 season
// Sources: PuckPedia, CapWages — verified March 2026
// Ellis traded to CHI Jan 2026 (OFF BOOKS). Karlsson retention = $1.5M (13%), not $3.5M.
// Skinner contract terminated Feb 2026 ($2.08M dead cap 25-26 only, gone by 26-27)
export const SHARKS_DEAD_CAP = [
  { name: 'Logan Couture', reason: 'IR (Retired)', capHit: 8_000_000, contractEnd: 2027, note: 'Retired April 2025. $8M AAV still on books through 2026-27.' },
  { name: 'Erik Karlsson', reason: 'Retained Salary', capHit: 1_500_000, contractEnd: 2027, note: 'Traded to PIT 2023. SJS retaining 13% ($1.5M of $11.5M AAV).' },
  { name: 'Marc-Edouard Vlasic', reason: 'Buyout', capHit: 1_166_667, contractEnd: 2027, note: 'Bought out 2024. $1.17M dead cap in 2026-27.' },
  { name: 'Martin Jones', reason: 'Buyout', capHit: 1_666_667, contractEnd: 2027, note: 'Bought out. $1.67M dead cap in 2026-27.' },
  { name: 'Tomas Hertl', reason: 'Retained Salary', capHit: 1_390_000, contractEnd: 2029, note: 'Traded to VGK. SJS retaining 17% ($1.39M of $8.14M AAV).' },
];
// Total dead cap 2026-27: ~$13.72M

export const SHARKS_CAP_SITUATION = {
  capCeiling: 104_000_000,
  deadCap: 13_723_334,     // Couture $8M + Karlsson $1.5M + Vlasic $1.17M + Jones $1.67M + Hertl $1.39M
  projectedCapSpace: 40_900_000, // ~$40.9M after extensions kick in (per PuckPedia projections)
};

// Draft Picks (2026 Draft)
export const SHARKS_DRAFT_PICKS = [
  { round: 1, pick: null, note: 'Own pick — just missed playoffs (#15)', source: 'OWN' },
  { round: 1, pick: null, note: 'From Edmonton (via Walman trade) — unprotected', source: 'EDM' },
  { round: 2, pick: null, note: 'From Colorado (via Blackwood trade)', source: 'COL' },
  { round: 4, pick: null, note: 'From Vegas via Washington (Liljegren trade)', source: 'VGK' },
  { round: 4, pick: null, note: 'From Florida (via Sturm trade)', source: 'FLA' },
  { round: 5, pick: null, note: 'From Montreal (via Price trade)', source: 'MTL' },
  { round: 6, pick: null, note: 'From Philadelphia, conditional (Ellis trade)', source: 'PHI' },
  { round: 7, pick: null, note: 'Own pick', source: 'OWN' },
];
// Picks traded away: 2nd (own → VAN for Sherwood), 3rd (own → STL), 5th (own → MIN)

// Top Prospects in Pipeline (not on NHL roster)
// ESPN ranks Sharks prospect pipeline #1 in the NHL for 2025-26
export const SHARKS_PROSPECTS = [
  { name: 'Quentin Musty', position: 'LW', age: 20, league: 'AHL (Barracuda)', note: '2023 1st (#26) — dominating AHL. Power forward with skill. NHL-ready soon.' },
  { name: 'Igor Chernyshov', position: 'LW', age: 20, league: 'AHL (Barracuda)', note: '2023 3rd — dynamic winger. Had 3 NHL games with points in each.' },
  { name: 'Kasper Halttunen', position: 'RW', age: 20, league: 'AHL (Barracuda)', note: '2023 1st (#18) — big power forward, heavy shot.' },
  { name: 'Luca Cagnoni', position: 'D', age: 21, league: 'AHL (Barracuda)', note: '2023 6th — offensive D, among AHL D leaders in points.' },
  { name: 'Filip Bystedt', position: 'C', age: 22, league: 'AHL (Barracuda)', note: '2022 1st (#27) — middle-six C upside.' },
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
  { rank: 16, name: 'Iikka Manner', position: 'C', team: 'TPS (Liiga)', age: 18, note: 'Finnish two-way forward', potential: 82 },
  { rank: 17, name: 'Brady Berard', position: 'D', team: 'US NTDP (USHL)', age: 17, note: 'Strong skating defenseman', potential: 82 },
  { rank: 18, name: 'Jack Parsons', position: 'RW', team: 'Saginaw (OHL)', age: 17, note: 'Net-front presence, power play QB', potential: 81 },
  { rank: 19, name: 'Dmitri Kuzmin', position: 'D', team: 'Dynamo Minsk (KHL)', age: 18, note: 'Puck-mover, high IQ', potential: 81 },
  { rank: 20, name: 'Tomas Galvas', position: 'D', team: 'Brno (Czech)', age: 17, note: 'Physical two-way D', potential: 80 },
  { rank: 21, name: 'Matvei Shuravin', position: 'LW', team: 'CSKA (MHL)', age: 17, note: 'Russian sniper, quick release', potential: 80 },
  { rank: 22, name: 'Linus Eriksson', position: 'G', team: 'Frölunda (J20)', age: 17, note: 'Athletic goalie prospect', potential: 79 },
  { rank: 23, name: 'Ryan Lin', position: 'C', team: 'Saskatoon (WHL)', age: 17, note: 'Speedy center with vision', potential: 79 },
  { rank: 24, name: 'Caden Price', position: 'D', team: 'Kelowna (WHL)', age: 18, note: 'Well-rounded blueliner', potential: 78 },
];
