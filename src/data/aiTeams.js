// 31 other NHL teams for AI simulation
export const NHL_TEAMS = [
  { abbr: 'ANA', name: 'Anaheim Ducks', tier: 'rebuild' },
  { abbr: 'BOS', name: 'Boston Bruins', tier: 'contender' },
  { abbr: 'BUF', name: 'Buffalo Sabres', tier: 'bubble' },
  { abbr: 'CGY', name: 'Calgary Flames', tier: 'bubble' },
  { abbr: 'CAR', name: 'Carolina Hurricanes', tier: 'contender' },
  { abbr: 'CHI', name: 'Chicago Blackhawks', tier: 'rebuild' },
  { abbr: 'COL', name: 'Colorado Avalanche', tier: 'contender' },
  { abbr: 'CBJ', name: 'Columbus Blue Jackets', tier: 'rebuild' },
  { abbr: 'DAL', name: 'Dallas Stars', tier: 'contender' },
  { abbr: 'DET', name: 'Detroit Red Wings', tier: 'bubble' },
  { abbr: 'EDM', name: 'Edmonton Oilers', tier: 'contender' },
  { abbr: 'FLA', name: 'Florida Panthers', tier: 'contender' },
  { abbr: 'LAK', name: 'Los Angeles Kings', tier: 'contender' },
  { abbr: 'MIN', name: 'Minnesota Wild', tier: 'bubble' },
  { abbr: 'MTL', name: 'Montreal Canadiens', tier: 'rebuild' },
  { abbr: 'NSH', name: 'Nashville Predators', tier: 'bubble' },
  { abbr: 'NJD', name: 'New Jersey Devils', tier: 'bubble' },
  { abbr: 'NYI', name: 'New York Islanders', tier: 'bubble' },
  { abbr: 'NYR', name: 'New York Rangers', tier: 'contender' },
  { abbr: 'OTT', name: 'Ottawa Senators', tier: 'bubble' },
  { abbr: 'PHI', name: 'Philadelphia Flyers', tier: 'rebuild' },
  { abbr: 'PIT', name: 'Pittsburgh Penguins', tier: 'bubble' },
  { abbr: 'SEA', name: 'Seattle Kraken', tier: 'bubble' },
  { abbr: 'STL', name: 'St. Louis Blues', tier: 'rebuild' },
  { abbr: 'TBL', name: 'Tampa Bay Lightning', tier: 'contender' },
  { abbr: 'TOR', name: 'Toronto Maple Leafs', tier: 'contender' },
  { abbr: 'UTA', name: 'Utah Hockey Club', tier: 'bubble' },
  { abbr: 'VAN', name: 'Vancouver Canucks', tier: 'contender' },
  { abbr: 'VGK', name: 'Vegas Golden Knights', tier: 'contender' },
  { abbr: 'WAS', name: 'Washington Capitals', tier: 'bubble' },
  { abbr: 'WPG', name: 'Winnipeg Jets', tier: 'contender' },
];

// Projected 2026 draft order (1st round) — based on standings as of March 2026
// Sharks just missed playoffs → own pick ~#15. EDM pick at #19.
export const DRAFT_ORDER_2026 = [
  { pick: 1, team: 'CHI', note: 'Lottery winner' },
  { pick: 2, team: 'CBJ', note: '' },
  { pick: 3, team: 'MTL', note: '' },
  { pick: 4, team: 'ANA', note: '' },
  { pick: 5, team: 'PHI', note: '' },
  { pick: 6, team: 'STL', note: '' },
  { pick: 7, team: 'BUF', note: '' },
  { pick: 8, team: 'OTT', note: '' },
  { pick: 9, team: 'DET', note: '' },
  { pick: 10, team: 'PIT', note: '' },
  { pick: 11, team: 'NSH', note: '' },
  { pick: 12, team: 'SEA', note: '' },
  { pick: 13, team: 'NYI', note: '' },
  { pick: 14, team: 'CGY', note: '' },
  { pick: 15, team: 'SJS', note: 'Sharks own pick — just missed playoffs' },
  { pick: 16, team: 'UTA', note: '' },
  { pick: 17, team: 'NJD', note: '' },
  { pick: 18, team: 'MIN', note: '' },
  { pick: 19, team: 'SJS', note: 'From Edmonton (Walman trade)' },
  { pick: 20, team: 'NYR', note: '' },
  { pick: 21, team: 'TBL', note: '' },
  { pick: 22, team: 'VAN', note: '' },
  { pick: 23, team: 'BOS', note: '' },
  { pick: 24, team: 'LAK', note: '' },
  { pick: 25, team: 'CAR', note: '' },
  { pick: 26, team: 'DAL', note: '' },
  { pick: 27, team: 'COL', note: '' },
  { pick: 28, team: 'TOR', note: '' },
  { pick: 29, team: 'WPG', note: '' },
  { pick: 30, team: 'VGK', note: '' },
  { pick: 31, team: 'FLA', note: '' },
  { pick: 32, team: 'EDM', note: '' },
];

// Pick a random team from a tier preference
export function randomTeamForSigning(preferContender = true) {
  const pool = preferContender
    ? NHL_TEAMS.filter(t => t.tier === 'contender')
    : NHL_TEAMS;
  return pool[Math.floor(Math.random() * pool.length)];
}
