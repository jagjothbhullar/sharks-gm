import { useMemo } from 'react';
import { formatCap } from '../../data/cba';
import { gradeOffseason, gradeColor } from '../../data/scoring';
import CapProjection from '../CapProjection';

const POS_ORDER = { C: 0, LW: 1, RW: 2, D: 3, G: 4 };

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
