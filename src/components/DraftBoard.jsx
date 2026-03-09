import { useState } from 'react';
import { formatCap } from '../data/cba';

export default function DraftBoard({ draftPicks, draftProspects, draftSelections, onDraft }) {
  const [selectedPick, setSelectedPick] = useState(0);
  const draftedNames = draftSelections.map(s => s.prospect.name);

  const availableProspects = draftProspects.filter(p => !draftedNames.includes(p.name));

  return (
    <div className="draft-board">
      <h2>2026 NHL Draft</h2>
      <p className="draft-info">June 26-27, 2026 · KeyBank Center, Buffalo, NY</p>

      {/* Your Picks */}
      <div className="your-picks">
        <h3>Your Draft Picks</h3>
        {draftPicks.length === 0 ? (
          <p className="empty">No picks remaining — all traded or used as offer sheet compensation.</p>
        ) : (
          <div className="picks-grid">
            {draftPicks.map((pick, i) => (
              <div key={i} className={`pick-card ${selectedPick === i ? 'selected' : ''}`}
                onClick={() => setSelectedPick(i)}>
                <span className="pick-round">R{pick.round}</span>
                <span className="pick-source">{pick.source}</span>
                <span className="pick-note">{pick.note}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Already Drafted */}
      {draftSelections.length > 0 && (
        <div className="drafted-section">
          <h3>Your Selections</h3>
          <table className="roster-table">
            <thead>
              <tr><th>Round</th><th>Player</th><th>Pos</th><th>Potential</th></tr>
            </thead>
            <tbody>
              {draftSelections.map((sel, i) => (
                <tr key={i}>
                  <td>R{sel.pick.round}</td>
                  <td>{sel.prospect.name}</td>
                  <td><span className={`pos-badge ${sel.prospect.position}`}>{sel.prospect.position}</span></td>
                  <td><span className={`overall-badge ovr-${Math.floor(sel.prospect.potential / 10) * 10}`}>{sel.prospect.potential}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Available Prospects */}
      <div className="prospects-board">
        <h3>Top Prospects Available</h3>
        <div className="prospect-list">
          {availableProspects.map((prospect) => (
            <div key={prospect.rank} className="prospect-card">
              <div className="prospect-rank">#{prospect.rank}</div>
              <div className="prospect-info">
                <h4>{prospect.name}</h4>
                <div className="prospect-meta">
                  <span className={`pos-badge ${prospect.position}`}>{prospect.position}</span>
                  <span>{prospect.team}</span>
                  <span>Age {prospect.age}</span>
                </div>
                <p className="prospect-note">{prospect.note}</p>
                <div className="stat-bar">
                  <span>POT</span>
                  <div className="bar"><div className="bar-fill pot" style={{ width: `${prospect.potential}%` }} /></div>
                  <span>{prospect.potential}</span>
                </div>
              </div>
              {draftPicks.length > 0 && (
                <button className="btn btn-primary btn-sm"
                  onClick={() => onDraft(prospect, selectedPick)}>
                  Draft (R{draftPicks[selectedPick]?.round})
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lottery Explainer */}
      <div className="cba-explainer">
        <h3>How the Draft Lottery Works</h3>
        <ul>
          <li>Only 2 picks are determined by lottery (1st and 2nd overall)</li>
          <li>A team can move up max 10 spots — only bottom 11 teams eligible for #1</li>
          <li>Can't win the lottery more than 2x in 5 years</li>
          <li>Remaining picks follow reverse standings</li>
          <li>7 rounds, 32 picks per round (224 total selections)</li>
          <li>ELC for 2026 draftees: 3 years, max $1.0M AAV</li>
        </ul>
      </div>
    </div>
  );
}
