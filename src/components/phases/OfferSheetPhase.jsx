import { useState } from 'react';
import { formatCap, getOfferSheetCompensation } from '../../data/cba';

export default function OfferSheetPhase({ availableRFAs, capSpace, draftPicks, onOfferSheet, simulateMatch, offerSheetResult, onAdvance }) {
  const [selectedRFA, setSelectedRFA] = useState(null);
  const [term, setTerm] = useState(5);
  const [aav, setAAV] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const handleSubmit = () => {
    if (!selectedRFA || !aav) return;
    const aavNum = parseFloat(aav) * 1_000_000;
    const comp = getOfferSheetCompensation(aavNum);

    // Check draft pick availability
    const picksNeeded = {};
    comp.forEach(r => {
      const round = r === '1st' ? 1 : r === '2nd' ? 2 : 3;
      picksNeeded[round] = (picksNeeded[round] || 0) + 1;
    });

    const pickCounts = {};
    draftPicks.forEach(p => {
      pickCounts[p.round] = (pickCounts[p.round] || 0) + 1;
    });

    for (const [round, needed] of Object.entries(picksNeeded)) {
      if ((pickCounts[round] || 0) < needed) {
        alert(`Not enough Round ${round} picks! Need ${needed}, have ${pickCounts[round] || 0}.`);
        return;
      }
    }

    // Simulate the 7-day match period
    const result = simulateMatch(selectedRFA, aavNum);
    setMatchResult(result);

    if (!result.matched) {
      // Team didn't match — we get the player!
      onOfferSheet(selectedRFA, term, aavNum);
    }
    setSubmitted(true);
  };

  const compensation = selectedRFA && aav
    ? getOfferSheetCompensation(parseFloat(aav) * 1_000_000)
    : [];

  return (
    <div className="phase-content offer-sheet-phase">
      <div className="phase-header-info">
        <p>
          Want to make a bold move? You can submit an <strong>offer sheet</strong> to another team's
          restricted free agent. They have 7 days to match — if they don't, you get the player
          but surrender draft picks as compensation. This is rare but powerful with your cap space.
        </p>
      </div>

      {!submitted ? (
        <>
          <div className="rfa-targets">
            <h3>RFA Targets</h3>
            <div className="fa-grid">
              {availableRFAs.map(player => (
                <div
                  key={player.id}
                  className={`fa-card selectable ${selectedRFA?.id === player.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedRFA(player);
                    setAAV((player.projectedAAV / 1e6).toFixed(2));
                  }}
                >
                  <div className="fa-card-header">
                    <span className={`pos-badge ${player.position}`}>{player.position}</span>
                    <span className={`overall-badge ovr-${Math.floor(player.overall / 10) * 10}`}>{player.overall}</span>
                  </div>
                  <h4>{player.name}</h4>
                  <div className="fa-card-details">
                    <span>Age {player.age}</span>
                    <span>{player.prevTeam}</span>
                  </div>
                  <div className="fa-card-projected">
                    Projected: <strong>{formatCap(player.projectedAAV)}</strong>
                  </div>
                  {player.note && <p className="fa-note">{player.note}</p>}
                </div>
              ))}
            </div>
          </div>

          {selectedRFA && (
            <div className="offer-sheet-builder">
              <h3>Build Offer Sheet: {selectedRFA.name}</h3>
              <div className="sign-form">
                <label>
                  Term (years)
                  <input type="range" min="1" max="7" value={term}
                    onChange={e => setTerm(parseInt(e.target.value))} />
                  <span className="term-display">{term} yr</span>
                </label>
                <label>
                  AAV ($M)
                  <input type="number" step="0.25" min="0.775" max="20.8" value={aav}
                    onChange={e => setAAV(e.target.value)} />
                </label>

                {compensation.length > 0 && (
                  <div className="offer-sheet-comp">
                    <p><strong>Draft Pick Compensation:</strong></p>
                    <p className="comp-picks">{compensation.join(' + ')}</p>
                    <p className="comp-warning">
                      If {selectedRFA.prevTeam} doesn't match, you lose these picks but gain {selectedRFA.name}.
                    </p>
                  </div>
                )}
              </div>
              <div className="phase-actions">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit Offer Sheet
                </button>
              </div>
            </div>
          )}

          <div className="phase-actions">
            <button className="btn btn-ghost" onClick={onAdvance}>
              Skip — No Offer Sheets
            </button>
          </div>
        </>
      ) : (
        <div className="offer-sheet-result">
          {matchResult?.matched ? (
            <div className="os-matched">
              <h3>{matchResult.team} MATCHED the Offer Sheet</h3>
              <p>
                {matchResult.player.name} stays with {matchResult.team}. They matched your offer
                of {formatCap(matchResult.aav)} AAV. You keep your draft picks.
              </p>
              <p className="os-flavor">Better luck next time. Offer sheets are risky business.</p>
            </div>
          ) : (
            <div className="os-success">
              <h3>OFFER SHEET ACCEPTED!</h3>
              <p>
                {matchResult.team} did <strong>NOT</strong> match! <strong>{matchResult.player.name}</strong> is
                now a San Jose Shark!
              </p>
              <p>Draft pick compensation sent to {matchResult.team}: {compensation.join(' + ')}</p>
            </div>
          )}
          <div className="phase-actions">
            <button className="btn btn-primary" onClick={onAdvance}>
              Proceed to Training Camp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
