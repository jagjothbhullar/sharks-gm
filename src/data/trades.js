// Pre-built trade scenarios for the Sharks' 2026 offseason
// CONTEXT: The Sharks just missed the playoffs and are pushing to make the jump.
// They're BUYERS, not sellers. Trades should reflect a team adding pieces
// to compete NOW while staying smart about the cap and future.

export const TRADE_SCENARIOS = [
  // ===== BLOCKBUSTER — WIN-NOW ACQUISITIONS =====
  {
    id: 'trade-picks-for-ehlers',
    title: 'Acquire Nikolaj Ehlers from Winnipeg',
    description: 'Ehlers wants out of Winnipeg after years of trade rumors. He\'s 30 with a $6M cap hit expiring next year — elite speed, 30-goal scorer. The Jets want your EDM 1st + COL 2nd to make it happen.',
    partner: 'WPG',
    partnerName: 'Winnipeg Jets',
    sending: {
      players: [],
      picks: [
        { round: 1, note: 'EDM 2026 1st (pick #19)', source: 'EDM' },
        { round: 2, note: 'COL 2026 2nd', source: 'COL' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-ehlers', name: 'Nikolaj Ehlers', position: 'LW', age: 30, capHit: 6_000_000, contractEnd: 2027, type: 'UFA', overall: 86, potential: 82, note: 'Elite speed winger. 30-goal scorer. 1 year left — extend or flip at deadline.' },
      ],
      picks: [],
    },
    impact: 'Immediately upgrades your top-6. Costs two picks but Ehlers could be the difference-maker that gets you to the playoffs.',
    tier: 'blockbuster',
  },
  {
    id: 'trade-for-lindholm',
    title: 'Acquire Elias Lindholm from Boston',
    description: 'Boston is retooling after a disappointing season. Lindholm ($7.75M×7) hasn\'t lived up to his deal but he\'s a legit top-6 two-way center. Boston will retain 25% to move him, dropping his cap hit to $5.8M. They want Goodrow\'s cheaper deal back + a 2nd.',
    partner: 'BOS',
    partnerName: 'Boston Bruins',
    sending: {
      players: [{ id: 'goodrow', name: 'Barclay Goodrow', position: 'LW', capHit: 3_641_667 }],
      picks: [
        { round: 2, note: 'COL 2026 2nd', source: 'COL' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-lindholm', name: 'Elias Lindholm', position: 'C', age: 31, capHit: 5_812_500, contractEnd: 2031, type: 'UFA', overall: 84, potential: 82, note: 'Two-way center. $7.75M AAV but BOS retains 25%. Selke-caliber play.' },
      ],
      picks: [],
    },
    impact: 'Dump Goodrow\'s overpay AND get a legitimate 2C. Long-term commitment but fills your biggest need behind Celebrini.',
    tier: 'blockbuster',
  },

  // ===== MAJOR — ROSTER UPGRADES =====
  {
    id: 'trade-for-perfetti',
    title: 'Pry Cole Perfetti from Winnipeg',
    description: 'The Jets are cap-crunched and Perfetti has fallen out of favor despite his talent. They want a veteran they can plug in plus a mid-round pick. Goodrow\'s deal works salary-wise.',
    partner: 'WPG',
    partnerName: 'Winnipeg Jets',
    sending: {
      players: [{ id: 'goodrow', name: 'Barclay Goodrow', position: 'LW', capHit: 3_641_667 }],
      picks: [
        { round: 4, note: 'FLA 2026 4th-round pick', source: 'FLA' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-perfetti', name: 'Cole Perfetti', position: 'LW', age: 24, capHit: 3_250_000, contractEnd: 2027, type: 'RFA', overall: 85, potential: 84, note: 'Young playmaker. On his bridge deal. Buy-low opportunity.' },
      ],
      picks: [],
    },
    impact: 'Swap Goodrow\'s dead-weight contract for a 24-year-old with upside. Slight cap savings and a much better fit for your window.',
    tier: 'major',
  },
  {
    id: 'trade-for-kleven',
    title: 'Add a young physical defenseman from Ottawa',
    description: 'Ottawa has a logjam on their blue line. Tyler Kleven (6\'4, 220) needs more ice time than they can give him. They want Gaudette as depth center insurance.',
    partner: 'OTT',
    partnerName: 'Ottawa Senators',
    sending: {
      players: [{ id: 'gaudette', name: 'Adam Gaudette', position: 'C', capHit: 2_000_000 }],
    },
    receiving: {
      players: [
        { id: 'trade-kleven', name: 'Tyler Kleven', position: 'D', age: 23, capHit: 863_000, contractEnd: 2027, type: 'RFA', overall: 76, potential: 80, note: 'Big physical D (6\'4). Cheap, young, and needs a bigger role.' },
      ],
      picks: [],
    },
    impact: 'Trade a replaceable depth center for a young D who fills your need for size and physicality on the blue line. Saves cap space too.',
    tier: 'major',
  },
  {
    id: 'trade-for-dvorak',
    title: 'Buy low on Christian Dvorak from Montreal',
    description: 'Montreal is selling again. Dvorak ($4.45M) has been buried on their depth chart but he\'s a reliable two-way 3C. They\'ll eat half his salary to move him, dropping the cap hit to $2.225M. Costs only a 4th-rounder.',
    partner: 'MTL',
    partnerName: 'Montreal Canadiens',
    sending: {
      players: [],
      picks: [
        { round: 4, note: 'FLA 2026 4th-round pick', source: 'FLA' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-dvorak', name: 'Christian Dvorak', position: 'C', age: 30, capHit: 2_225_000, contractEnd: 2027, type: 'UFA', overall: 78, potential: 76, note: 'Two-way 3C. $4.45M AAV but MTL retains 50%. Low-risk depth.' },
      ],
      picks: [],
    },
    impact: 'Add a reliable third-line center for a low-round pick. Cheap depth that helps you compete.',
    tier: 'minor',
  },

  // ===== MINOR — CAP MANAGEMENT / CLEANUP =====
  {
    id: 'trade-goodrow-dump',
    title: 'Dump Barclay Goodrow\'s contract',
    description: 'Nashville needs to hit the cap floor. They\'ll absorb Goodrow\'s $3.64M for a year but you need to add a sweetener pick.',
    partner: 'NSH',
    partnerName: 'Nashville Predators',
    sending: {
      players: [{ id: 'goodrow', name: 'Barclay Goodrow', position: 'LW', capHit: 3_641_667 }],
      picks: [{ round: 5, note: 'MTL 2026 5th-round pick', source: 'MTL' }],
    },
    receiving: {
      players: [],
      picks: [],
    },
    impact: 'Free up $3.64M in cap space to spend on free agents. Costs a 5th-rounder. Worth it if you need the room.',
    tier: 'minor',
  },
  {
    id: 'trade-leddy',
    title: 'Send Nick Leddy to Detroit',
    description: 'Detroit will take Leddy back — he wants to be closer to home and they need a veteran presence. His $4M comes off the books after this season anyway. Clears cap space for your summer moves.',
    partner: 'DET',
    partnerName: 'Detroit Red Wings',
    sending: {
      players: [{ id: 'leddy', name: 'Nick Leddy', position: 'D', capHit: 4_000_000 }],
    },
    receiving: {
      players: [],
      picks: [
        { round: 7, note: 'Detroit 2027 7th-round pick', source: 'DET' },
      ],
    },
    impact: 'Free cap dump. Get rid of $4M for a token pick. Leddy was on waivers anyway — no loss to the lineup.',
    tier: 'minor',
  },
  {
    id: 'trade-klingberg',
    title: 'Flip Klingberg to a contender',
    description: 'Carolina needs a puck-moving D for their playoff run. Klingberg\'s $4M deal expires this summer — classic rental. He\'d waive his NTC for a shot at the Cup.',
    partner: 'CAR',
    partnerName: 'Carolina Hurricanes',
    sending: {
      players: [{ id: 'klingberg', name: 'John Klingberg', position: 'D', capHit: 4_000_000 }],
    },
    receiving: {
      players: [],
      picks: [
        { round: 2, note: 'Carolina 2027 2nd-round pick', source: 'CAR' },
        { round: 5, note: 'Carolina 2027 5th-round pick', source: 'CAR' },
      ],
    },
    impact: 'Turn an expiring UFA into a 2nd + 5th. Klingberg was a 1-year deal — cash in before he walks for nothing. Use the cap space to upgrade.',
    tier: 'minor',
  },
  {
    id: 'trade-reaves',
    title: 'Send Ryan Reaves to a contender',
    description: 'Vegas wants Reaves back for one more Cup run. The fans love him. They\'ll give you a late pick for the old enforcer. Pure nostalgia trade.',
    partner: 'VGK',
    partnerName: 'Vegas Golden Knights',
    sending: {
      players: [{ id: 'reaves', name: 'Ryan Reaves', position: 'RW', capHit: 1_350_000 }],
    },
    receiving: {
      players: [],
      picks: [
        { round: 6, note: 'Vegas 2027 6th-round pick', source: 'VGK' },
      ],
    },
    impact: 'Minor cap savings and a late pick. Reaves is 39 — he\'s not in your future. Let him chase one more Cup.',
    tier: 'minor',
  },
  {
    id: 'trade-for-bratt',
    title: 'Go big: acquire Jesper Bratt from New Jersey',
    description: 'New Jersey is imploding. Bratt ($7.35M×7) is their best player but they\'re rebuilding around Hughes and Hischier. They want your OWN 1st + Lund + a 4th for a legitimate top-line winger. This is a franchise-altering move.',
    partner: 'NJD',
    partnerName: 'New Jersey Devils',
    sending: {
      players: [{ id: 'lund', name: 'Cameron Lund', position: 'C', capHit: 942_000 }],
      picks: [
        { round: 1, note: 'SJS 2026 1st (pick #15)', source: 'OWN' },
        { round: 4, note: 'VGK 2026 4th-round pick', source: 'VGK' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-bratt', name: 'Jesper Bratt', position: 'RW', age: 27, capHit: 7_350_000, contractEnd: 2031, type: 'UFA', overall: 88, potential: 88, note: 'Elite two-way winger. 80+ pt player. Locked up through 2031. Immediate impact.' },
      ],
      picks: [],
    },
    impact: 'Give up your own 1st, a prospect, and a 4th to land an 80-point winger in his prime. Expensive, but Bratt next to Celebrini could be a franchise-defining pair.',
    tier: 'blockbuster',
  },

  // ===== ADDITIONAL BLOCKBUSTER =====
  {
    id: 'trade-for-svechnikov',
    title: 'Acquire Andrei Svechnikov from Carolina',
    description: 'Carolina is retooling and Svechnikov\'s $7.75M cap hit is expendable as they get younger. He\'s a power winger with 30+ goal upside. They want the EDM 1st + a prospect (Lund) to accelerate their retool.',
    partner: 'CAR',
    partnerName: 'Carolina Hurricanes',
    sending: {
      players: [{ id: 'lund', name: 'Cameron Lund', position: 'C', capHit: 942_000 }],
      picks: [
        { round: 1, note: 'EDM 2026 1st (pick #19)', source: 'EDM' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-svechnikov', name: 'Andrei Svechnikov', position: 'RW', age: 26, capHit: 7_750_000, contractEnd: 2029, type: 'UFA', overall: 87, potential: 88, note: 'Power winger. 30-goal scorer. Physical. 3 years of control.' },
      ],
      picks: [],
    },
    impact: 'Land a top-line winger in his prime with 3 years left. Expensive price but Svechnikov + Celebrini is a terrifying combo.',
    tier: 'blockbuster',
  },

  // ===== ADDITIONAL MAJOR =====
  {
    id: 'trade-for-chychrun',
    title: 'Acquire Jakob Chychrun from Washington',
    description: 'Washington is aging out of contention. Chychrun ($4.6M×2) is a top-4 offensive defenseman who can quarterback a power play. They want a roster player (Goodrow) plus a mid-round pick.',
    partner: 'WSH',
    partnerName: 'Washington Capitals',
    sending: {
      players: [{ id: 'goodrow', name: 'Barclay Goodrow', position: 'LW', capHit: 3_641_667 }],
      picks: [
        { round: 4, note: 'FLA 2026 4th-round pick', source: 'FLA' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-chychrun', name: 'Jakob Chychrun', position: 'D', age: 28, capHit: 4_600_000, contractEnd: 2028, type: 'UFA', overall: 84, potential: 84, note: 'Top-4 puck-mover. PP QB. Slight cap increase but massive D upgrade.' },
      ],
      picks: [],
    },
    impact: 'Swap Goodrow for a legitimate top-4 D. Chychrun fills the offensive defenseman hole next to Dickinson. 2 years of control.',
    tier: 'major',
  },
  {
    id: 'trade-for-broberg',
    title: 'Poach Philip Broberg from St. Louis',
    description: 'The Blues signed Broberg to an offer sheet last year but he hasn\'t fit into their system. He\'s a mobile, skating left-D who could thrive with more ice time. They\'ll take a mid-round pick to move on.',
    partner: 'STL',
    partnerName: 'St. Louis Blues',
    sending: {
      players: [],
      picks: [
        { round: 4, note: 'VGK 2026 4th-round pick', source: 'VGK' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-broberg', name: 'Philip Broberg', position: 'D', age: 25, capHit: 4_580_000, contractEnd: 2027, type: 'RFA', overall: 79, potential: 82, note: 'Mobile skating D. 25 years old. Needs a bigger role to unlock his ceiling.' },
      ],
      picks: [],
    },
    impact: 'Add a young, mobile defenseman for just a 4th-rounder. If Broberg develops he\'s a steal. Some risk he doesn\'t hit his ceiling.',
    tier: 'major',
  },
  {
    id: 'trade-orlov-for-assets',
    title: 'Move Dmitry Orlov to Colorado',
    description: 'Colorado needs a veteran D for one more Cup run with Mackinnon. Orlov has a 15-team NTL in 26-27 but would waive for a contender. His $6.5M comes off the books after this year. They\'ll send a 2nd and a depth forward back.',
    partner: 'COL',
    partnerName: 'Colorado Avalanche',
    sending: {
      players: [{ id: 'orlov', name: 'Dmitry Orlov', position: 'D', capHit: 6_500_000 }],
    },
    receiving: {
      players: [
        { id: 'trade-col-fwd', name: 'Mikko Rantanen', position: 'RW', age: 29, capHit: 9_250_000, contractEnd: 2029, type: 'UFA', overall: 89, potential: 87, note: 'Wait — Colorado is including Rantanen? He wants out too. They retain $2M.' },
      ],
      picks: [],
    },
    impact: 'Swap an aging D for a top-line winger. Rantanen at $7.25M (after retention) next to Celebrini is elite. Lose D depth but gain a franchise winger.',
    tier: 'blockbuster',
  },
  {
    id: 'trade-for-compher',
    title: 'Add J.T. Compher from Detroit',
    description: 'Detroit is clearing cap. Compher ($5.1M) is a reliable middle-six forward who can play center or wing. They\'ll retain 40% to move him, dropping his hit to $3.06M. Just costs a late pick.',
    partner: 'DET',
    partnerName: 'Detroit Red Wings',
    sending: {
      players: [],
      picks: [
        { round: 5, note: 'MTL 2026 5th-round pick', source: 'MTL' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-compher', name: 'J.T. Compher', position: 'C', age: 31, capHit: 3_060_000, contractEnd: 2028, type: 'UFA', overall: 80, potential: 78, note: 'Versatile middle-six. Can play C or W. Cup winner with COL. DET retains 40%.' },
      ],
      picks: [],
    },
    impact: 'Add a versatile depth forward with Cup experience at a discount cap hit. Low-risk move that adds depth for a playoff push.',
    tier: 'minor',
  },
  {
    id: 'trade-toffoli-for-package',
    title: 'Move Tyler Toffoli to Tampa Bay',
    description: 'Tampa needs scoring wingers for their playoff window. Toffoli has a full NMC but he\'d waive for a Cup contender. His $6M hit is steep but Tampa\'s all-in. They\'ll send back a 1st + conditional 3rd.',
    partner: 'TBL',
    partnerName: 'Tampa Bay Lightning',
    sending: {
      players: [{ id: 'toffoli', name: 'Tyler Toffoli', position: 'LW', capHit: 6_000_000 }],
    },
    receiving: {
      players: [],
      picks: [
        { round: 1, note: 'Tampa 2027 1st-round pick', source: 'TBL' },
        { round: 3, note: 'Tampa 2027 3rd (conditional)', source: 'TBL' },
      ],
    },
    impact: 'Cash in Toffoli\'s value for a future 1st + 3rd. Frees $6M in cap space but you lose a proven top-6 winger. Only makes sense if you\'re adding elsewhere.',
    tier: 'major',
  },
  {
    id: 'trade-picks-for-tierney',
    title: 'Acquire Sean Couturier from Philadelphia',
    description: 'Philadelphia is in a full rebuild. Couturier ($7.75M) is a shell of his Selke-winning self but still a legitimate 3C. Philly will retain 50%, dropping the hit to $3.875M. They just want a pick to move on.',
    partner: 'PHI',
    partnerName: 'Philadelphia Flyers',
    sending: {
      players: [],
      picks: [
        { round: 6, note: 'PHI 2026 6th-round pick', source: 'PHI' },
      ],
    },
    receiving: {
      players: [
        { id: 'trade-couturier', name: 'Sean Couturier', position: 'C', age: 34, capHit: 3_875_000, contractEnd: 2030, type: 'UFA', overall: 80, potential: 76, note: 'Former Selke winner. PHI retains 50%. Low cap hit for a veteran two-way C.' },
      ],
      picks: [],
    },
    impact: 'Add a former Selke winner at half price. Couturier is past his prime but still a solid 3C. Long-term commitment (through 2030) is the risk.',
    tier: 'minor',
  },
];
