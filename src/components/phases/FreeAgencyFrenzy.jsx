import { useState, useMemo } from 'react';
import { formatCap, getOfferSheetCompensation } from '../../data/cba';

export default function FreeAgencyFrenzy({ availableUFAs, capSpace, faRound, aiSignings, userPassed, onSignUFA, onRunRound, onPass, onAdvance }) {
  const [signModal, setSignModal] = useState(null);
  const [term, setTerm] = useState(4);
  const [aav, setAAV] = useState('');
  const [roundAiSignings, setRoundAiSignings] = useState([]); // AI signings from current round
  const [showingNews, setShowingNews] = useState(false);
  const [hasSignedThisRound, setHasSignedThisRound] = useState(false);

  // Filter out AI-signed players
  const aiSignedIds = new Set(aiSignings.map(s => s.player.id));
  const available = availableUFAs.filter(p => !aiSignedIds.has(p.id));

  const sortedAvailable = useMemo(() =>
    [...available].sort((a, b) => b.overall - a.overall),
    [available]
  );

  const handleSign = () => {
    if (!signModal) return;
    const aavNum = parseFloat(aav) * 1_000_000;
    const result = onSignUFA(signModal, term, aavNum);
    if (result.error) {
      alert(result.error);
      return;
    }
    setSignModal(null);
    setAAV('');
    setHasSignedThisRound(true);

    // After user signs, AI takes their turns
    const newAi = onRunRound();
    setRoundAiSignings(newAi);
    setShowingNews(true);
    setTimeout(() => setShowingNews(false), 4000);
  };

  const handlePass = () => {
    const newAi = onRunRound();
    setRoundAiSignings(newAi);
    setShowingNews(true);
    setHasSignedThisRound(true);
    setTimeout(() => setShowingNews(false), 4000);
  };

  const handleNextRound = () => {
    setHasSignedThisRound(false);
    setRoundAiSignings([]);
  };

  const handleDone = () => {
    onPass();
    onAdvance();
  };

  return (
    <div className="phase-content fa-frenzy">
      <div className="phase-header-info">
        <p>
          Free agency is OPEN! You're competing with 31 other teams for the best available players.
          Each round, sign one player (or pass), then other teams make their moves. Act fast —
          the top targets won't last long.
        </p>
      </div>

      <div className="fa-status-bar">
        <span className="fa-round-label">Round {faRound + 1}</span>
        <span>Available Cap Space: <strong className={capSpace < 0 ? 'over' : 'green'}>{formatCap(capSpace)}</strong></span>
        <span>{sortedAvailable.length} players remaining</span>
      </div>

      {/* Breaking News Ticker */}
      {showingNews && roundAiSignings.length > 0 && (
        <div className="breaking-news">
          <span className="breaking-label">BREAKING</span>
          <div className="news-ticker">
            {roundAiSignings.map((s, i) => (
              <span key={i} className="news-item">
                {s.team.name} signs {s.player.name} — {s.term}yr × {formatCap(s.aav)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Signings History */}
      {aiSignings.length > 0 && (
        <div className="ai-signings-log">
          <h4>Signed by Other Teams ({aiSignings.length})</h4>
          <div className="ai-log-scroll">
            {aiSignings.map((s, i) => (
              <span key={i} className="ai-signing-chip">
                {s.player.name} → {s.team.abbr}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Available Players */}
      {sortedAvailable.length > 0 ? (
        <div className="fa-grid">
          {sortedAvailable.map(player => (
            <div key={player.id} className="fa-card">
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
                Market: <strong>{formatCap(player.projectedAAV)}</strong>
              </div>
              {player.note && <p className="fa-note">{player.note}</p>}
              <div className="fa-card-bars">
                <div className="stat-bar">
                  <span>OVR</span>
                  <div className="bar"><div className="bar-fill" style={{ width: `${player.overall}%` }} /></div>
                </div>
                <div className="stat-bar">
                  <span>POT</span>
                  <div className="bar"><div className="bar-fill pot" style={{ width: `${player.potential}%` }} /></div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-block"
                disabled={hasSignedThisRound}
                onClick={() => {
                  setSignModal(player);
                  setAAV((player.projectedAAV / 1e6).toFixed(2));
                  setTerm(player.age >= 35 ? 2 : 4);
                }}
              >
                Sign
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No more free agents available.</p>
      )}

      <div className="phase-actions fa-phase-actions">
        {!hasSignedThisRound && sortedAvailable.length > 0 ? (
          <>
            <button className="btn btn-ghost" onClick={handlePass}>
              Pass This Round
            </button>
            <button className="btn btn-ghost" onClick={handleDone}>
              Done Signing UFAs
            </button>
          </>
        ) : hasSignedThisRound && sortedAvailable.length > 0 ? (
          <>
            <button className="btn btn-primary" onClick={handleNextRound}>
              Next Round
            </button>
            <button className="btn btn-ghost" onClick={handleDone}>
              Done Signing UFAs
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onAdvance}>
            Proceed to Re-Sign Your Players
          </button>
        )}
      </div>

      {/* Sign Modal */}
      {signModal && (
        <div className="modal-overlay" onClick={() => setSignModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Sign {signModal.name}</h3>
            <p className="modal-subtitle">
              {signModal.position} · Age {signModal.age} · {signModal.prevTeam} ·
              OVR {signModal.overall} / POT {signModal.potential}
            </p>
            <p className="modal-subtitle">Market Value: {formatCap(signModal.projectedAAV)}</p>

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
              <p className="total-value">
                Total: ${(parseFloat(aav || 0) * term).toFixed(2)}M over {term} yr
              </p>
              {parseFloat(aav) * 1_000_000 > capSpace && (
                <p className="warning">This signing would put you over the cap!</p>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleSign}>Sign Contract</button>
              <button className="btn btn-ghost" onClick={() => setSignModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
