import { useMemo } from 'react';
import { formatCap } from '../../data/cba';
import { gradeOffseason, gradeColor } from '../../data/scoring';
import CapProjection from '../CapProjection';

const POS_ORDER = { C: 0, LW: 1, RW: 2, D: 3, G: 4 };

function buildProjectedLines(finalRoster) {
  const centers = finalRoster.filter(p => p.position === 'C').sort((a, b) => b.overall - a.overall);
  const lw = finalRoster.filter(p => p.position === 'LW').sort((a, b) => b.overall - a.overall);
  const rw = finalRoster.filter(p => p.position === 'RW').sort((a, b) => b.overall - a.overall);
  const dmen = finalRoster.filter(p => p.position === 'D').sort((a, b) => b.overall - a.overall);
  const goalies = finalRoster.filter(p => p.position === 'G').sort((a, b) => b.overall - a.overall);

  // Build 4 forward lines — fill with best available if short at a position
  const forwards = [];
  for (let i = 0; i < 4; i++) {
    forwards.push({
      lw: lw[i] || null,
      c: centers[i] || null,
      rw: rw[i] || null,
    });
  }

  // 3 D pairings
  const dPairs = [];
  for (let i = 0; i < 3; i++) {
    dPairs.push({
      ld: dmen[i * 2] || null,
      rd: dmen[i * 2 + 1] || null,
    });
  }

  return { forwards, dPairs, goalies: goalies.slice(0, 2) };
}

function projectPlayoffs(finalRoster, grades) {
  // Avg overall of top-18 skaters + starter goalie
  const skaters = finalRoster.filter(p => p.position !== 'G').sort((a, b) => b.overall - a.overall);
  const goalies = finalRoster.filter(p => p.position === 'G').sort((a, b) => b.overall - a.overall);
  const top18 = skaters.slice(0, 18);
  const starter = goalies[0];

  const avgSkaterOvr = top18.length > 0
    ? top18.reduce((s, p) => s + p.overall, 0) / top18.length
    : 0;
  const starterOvr = starter?.overall || 0;

  // Weighted team strength: skaters 70%, goalie 30%
  const teamStrength = avgSkaterOvr * 0.7 + starterOvr * 0.3;

  // Young talent bonus (potential upside during season)
  const youngStars = finalRoster.filter(p => p.age <= 23 && (p.potential || 0) >= 85).length;
  const potentialBonus = youngStars * 0.5;

  // Depth penalty — need at least 20 players
  const rosterSize = finalRoster.length;
  const depthPenalty = rosterSize < 20 ? (20 - rosterSize) * 1.5 : 0;

  const score = teamStrength + potentialBonus - depthPenalty;

  // Thresholds based on typical NHL competitive levels
  // 82+ = strong playoff, 79-82 = bubble, 76-79 = fringe, <76 = lottery
  let verdict, detail, confidence;
  if (score >= 83) {
    verdict = 'PLAYOFF LOCK';
    detail = 'This roster is deep and talented enough to compete for a division title.';
    confidence = 'high';
  } else if (score >= 81) {
    verdict = 'PLAYOFF TEAM';
    detail = 'Solid roster that should make the postseason. Depth and goaltending look good.';
    confidence = 'medium-high';
  } else if (score >= 79) {
    verdict = 'BUBBLE TEAM';
    detail = 'Right on the playoff cut line. A hot streak or breakout from a young player could push them in.';
    confidence = 'medium';
  } else if (score >= 77) {
    verdict = 'FRINGE CONTENDER';
    detail = 'Needs some things to go right — a Celebrini leap, Askarov standing on his head, or a trade deadline addition.';
    confidence = 'medium-low';
  } else {
    verdict = 'REBUILDING';
    detail = 'Not enough firepower yet. The future is bright with the prospect pipeline, but this isn\'t a playoff roster.';
    confidence = 'low';
  }

  return { verdict, detail, confidence, score: Math.round(score * 10) / 10, avgSkaterOvr: Math.round(avgSkaterOvr * 10) / 10, starterOvr, rosterSize };
}

export default function TrainingCamp({ roster, signings, capInfo, log, draftSelections, initialRoster, keptFerraro, qoDecisions, pendingFAs, extensionDecisions, onReset }) {
  const finalRoster = [...roster, ...signings].sort(
    (a, b) => (POS_ORDER[a.position] ?? 5) - (POS_ORDER[b.position] ?? 5) || b.capHit - a.capHit
  );

  const qualifiedRFAs = Object.values(qoDecisions).filter(d => d === 'qualify').length;
  const totalQualifiable = Object.keys(qoDecisions).length;

  const grades = useMemo(() =>
    gradeOffseason({
      initialRoster,
      finalRoster,
      signings,
      buyouts: [],
      draftSelections,
      capInfo,
      keptFerraro,
      qualifiedRFAs,
      totalQualifiable,
      extensionDecisions,
    }),
    [initialRoster, finalRoster, signings, draftSelections, capInfo, keptFerraro, qualifiedRFAs, totalQualifiable, extensionDecisions]
  );

  const lines = useMemo(() => buildProjectedLines(finalRoster), [finalRoster]);
  const playoffProj = useMemo(() => projectPlayoffs(finalRoster, grades), [finalRoster, grades]);

  return (
    <div className="phase-content training-camp">
      <div className="report-card">
        <h2>Offseason Report Card</h2>
        <div className="overall-grade" style={{ borderColor: gradeColor(grades.overallGrade) }}>
          <span className="grade-letter" style={{ color: gradeColor(grades.overallGrade) }}>
            {grades.overallGrade}
          </span>
          <span className="grade-score">{grades.weightedScore}/100</span>
        </div>

        <div className="grade-categories">
          {grades.categories.map(cat => (
            <div key={cat.name} className="grade-category">
              <div className="grade-cat-header">
                <span>{cat.name}</span>
                <span className="grade-cat-score">{cat.score}</span>
              </div>
              <div className="grade-bar">
                <div
                  className="grade-bar-fill"
                  style={{
                    width: `${cat.score}%`,
                    background: cat.score >= 80 ? '#00c853' : cat.score >= 60 ? '#00a3ad' : cat.score >= 40 ? '#ffc107' : '#ff4444',
                  }}
                />
              </div>
              <span className="grade-detail">{cat.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projected Lines */}
      <div className="projected-lines">
        <h3>Projected Lines</h3>
        <div className="lines-grid">
          <div className="lines-section">
            <h4>Forwards</h4>
            {lines.forwards.map((line, i) => (
              <div key={i} className="line-row">
                <span className="line-label">{['1st', '2nd', '3rd', '4th'][i]} Line</span>
                <div className="line-players">
                  <span className={`line-player ${line.lw ? '' : 'empty'}`}>
                    {line.lw ? `${line.lw.name}` : 'TBD'}
                    {line.lw && <span className="line-ovr">{line.lw.overall}</span>}
                  </span>
                  <span className={`line-player ${line.c ? '' : 'empty'}`}>
                    {line.c ? `${line.c.name}` : 'TBD'}
                    {line.c && <span className="line-ovr">{line.c.overall}</span>}
                  </span>
                  <span className={`line-player ${line.rw ? '' : 'empty'}`}>
                    {line.rw ? `${line.rw.name}` : 'TBD'}
                    {line.rw && <span className="line-ovr">{line.rw.overall}</span>}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="lines-section">
            <h4>Defense</h4>
            {lines.dPairs.map((pair, i) => (
              <div key={i} className="line-row">
                <span className="line-label">{['1st', '2nd', '3rd'][i]} Pair</span>
                <div className="line-players d-pair">
                  <span className={`line-player ${pair.ld ? '' : 'empty'}`}>
                    {pair.ld ? `${pair.ld.name}` : 'TBD'}
                    {pair.ld && <span className="line-ovr">{pair.ld.overall}</span>}
                  </span>
                  <span className={`line-player ${pair.rd ? '' : 'empty'}`}>
                    {pair.rd ? `${pair.rd.name}` : 'TBD'}
                    {pair.rd && <span className="line-ovr">{pair.rd.overall}</span>}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="lines-section">
            <h4>Goaltenders</h4>
            <div className="line-row">
              <span className="line-label">Starter</span>
              <div className="line-players">
                <span className={`line-player ${lines.goalies[0] ? '' : 'empty'}`}>
                  {lines.goalies[0] ? lines.goalies[0].name : 'TBD'}
                  {lines.goalies[0] && <span className="line-ovr">{lines.goalies[0].overall}</span>}
                </span>
              </div>
            </div>
            {lines.goalies[1] && (
              <div className="line-row">
                <span className="line-label">Backup</span>
                <div className="line-players">
                  <span className="line-player">
                    {lines.goalies[1].name}
                    <span className="line-ovr">{lines.goalies[1].overall}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Playoff Projection */}
      <div className={`playoff-projection verdict-${playoffProj.confidence}`}>
        <h3>2026-27 Season Projection</h3>
        <div className="projection-verdict">
          <span className="verdict-label">{playoffProj.verdict}</span>
          <p className="verdict-detail">{playoffProj.detail}</p>
        </div>
        <div className="projection-stats">
          <div className="proj-stat">
            <span className="proj-stat-value">{playoffProj.avgSkaterOvr}</span>
            <span className="proj-stat-label">Avg Skater OVR (Top 18)</span>
          </div>
          <div className="proj-stat">
            <span className="proj-stat-value">{playoffProj.starterOvr}</span>
            <span className="proj-stat-label">Starting Goalie OVR</span>
          </div>
          <div className="proj-stat">
            <span className="proj-stat-value">{playoffProj.rosterSize}</span>
            <span className="proj-stat-label">Roster Size</span>
          </div>
        </div>
      </div>

      {/* Final Roster */}
      <div className="final-roster">
        <h3>Final Roster ({finalRoster.length} players)</h3>
        <table className="roster-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Player</th>
              <th>Cap Hit</th>
              <th>Expires</th>
              <th>OVR</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {finalRoster.map(p => (
              <tr key={p.id} className={p.type === 'Signed' || p.type === 'Re-signed' || p.type === 'Offer Sheet' ? 'new-signing' : ''}>
                <td><span className={`pos-badge ${p.position}`}>{p.position}</span></td>
                <td className="player-name">
                  {p.name}
                  {p.type === 'Signed' && <span className="new-tag">NEW</span>}
                  {p.type === 'Re-signed' && <span className="ext-tag">RE-SIGNED</span>}
                  {p.type === 'ELC' && <span className="elc-tag">ELC</span>}
                  {p.type === 'Extended' && <span className="ext-tag">EXT</span>}
                  {p.type === 'Offer Sheet' && <span className="os-tag">OS</span>}
                </td>
                <td className="cap-hit">{formatCap(p.capHit)}</td>
                <td>{p.contractEnd}</td>
                <td><span className={`overall-badge ovr-${Math.floor(p.overall / 10) * 10}`}>{p.overall}</span></td>
                <td className="type-cell">{p.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cap Projection */}
      <CapProjection roster={roster} signings={signings} />

      {/* Transaction Log */}
      <div className="camp-log">
        <h3>Transaction History</h3>
        <div className="log-list">
          {log.map((entry, i) => (
            <div key={i} className={`log-entry log-${entry.action.toLowerCase().replace(/\s/g, '-')}`}>
              <span className="log-badge">{entry.action}</span>
              <span className="log-detail">{entry.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="phase-actions">
        <button className="btn btn-primary btn-large" onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
}
