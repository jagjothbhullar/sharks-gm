import { useState } from 'react';
import { formatCap } from '../../data/cba';

export default function ExtensionPhase({ extensionEligible, roster, capSpace, onExtend, extensionDecisions, setExtensionDecisions, onAdvance }) {
  const [extModal, setExtModal] = useState(null);
  const [extTerm, setExtTerm] = useState(8);
  const [extAAV, setExtAAV] = useState('');

  const remaining = extensionEligible.filter(p => !extensionDecisions[p.id]);

  const handleExtend = () => {
    if (!extModal) return;
    const aavNum = parseFloat(extAAV) * 1_000_000;
    const result = onExtend(extModal, extTerm, aavNum);
    if (result.error) {
      alert(result.error);
      return;
    }
    setExtensionDecisions(prev => ({ ...prev, [extModal.id]: 'extended' }));
    setExtModal(null);
    setExtAAV('');
  };

  const handleSkip = (player) => {
    setExtensionDecisions(prev => ({ ...prev, [player.id]: 'skipped' }));
  };

  // Find the roster version to show current cap hit
  const getPlayerFromRoster = (id) => roster.find(p => p.id === id);

  return (
    <div className="phase-content extension-phase">
      <div className="phase-header-info">
        <p>
          These players are under contract but <strong>eligible for extensions</strong>. Signing them now
          locks in term and AAV before they hit free agency — smart GMs extend their stars early.
          Extensions kick in after the current contract expires.
        </p>
        <p>
          <strong>Macklin Celebrini</strong> is the key decision here. As your franchise center,
          locking him up now avoids the risk and leverage he'd have as an RFA.
          Think $12M+ AAV for a max 8-year deal.
        </p>
        <p>Available Cap Space (current): <strong className={capSpace < 0 ? 'over' : 'green'}>{formatCap(capSpace)}</strong></p>
      </div>

      {remaining.length > 0 ? (
        <div className="extension-grid">
          {remaining.map(player => {
            const rosterPlayer = getPlayerFromRoster(player.id);
            return (
              <div key={player.id} className={`extension-card ${player.priority ? 'priority' : ''}`}>
                {player.priority && <div className="priority-banner">FRANCHISE PRIORITY</div>}
                <div className="fa-card-header">
                  <span className={`pos-badge ${player.position}`}>{player.position}</span>
                  <span className={`overall-badge ovr-${Math.floor(player.overall / 10) * 10}`}>{player.overall}</span>
                </div>
                <h4>{player.name}</h4>
                <div className="fa-card-details">
                  <span>Age {player.age}</span>
                  <span>Current: {formatCap(player.currentCapHit)}</span>
                  <span>Exp: {player.currentEnd}</span>
                </div>
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
                <div className="ext-projected">
                  Projected Market Value: <strong>{formatCap(player.projectedAAV)}</strong>
                </div>
                {player.note && <p className="fa-note">{player.note}</p>}
                <div className="resign-actions">
                  <button className="btn btn-primary" onClick={() => {
                    setExtModal(player);
                    setExtAAV((player.projectedAAV / 1e6).toFixed(2));
                    setExtTerm(player.suggestedTerm);
                  }}>
                    Extend
                  </button>
                  <button className="btn btn-ghost" onClick={() => handleSkip(player)}>
                    Wait / Skip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="all-decided">
          <p>All extension-eligible players have been addressed.</p>
        </div>
      )}

      <div className="phase-actions">
        <button className="btn btn-primary" onClick={onAdvance}>
          {remaining.length === 0 ? 'Proceed to Trades' : 'Skip Remaining & Continue'}
        </button>
      </div>

      {/* Extension Modal */}
      {extModal && (
        <div className="modal-overlay" onClick={() => setExtModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Extend {extModal.name}</h3>
            <p className="modal-subtitle">
              {extModal.position} · Age {extModal.age} · OVR {extModal.overall} · POT {extModal.potential}
            </p>
            <div className="ext-current-deal">
              Current deal: {formatCap(extModal.currentCapHit)} through {extModal.currentEnd}
            </div>

            <div className="sign-form">
              <label>
                Extension Term (years)
                <input type="range" min="1" max="8" value={extTerm}
                  onChange={e => setExtTerm(parseInt(e.target.value))} />
                <span className="term-display">{extTerm} yr</span>
              </label>
              <label>
                AAV ($M)
                <input type="number" step="0.25" min="0.775" max="20.8" value={extAAV}
                  onChange={e => setExtAAV(e.target.value)} />
              </label>
              <p className="total-value">
                Total: ${(parseFloat(extAAV || 0) * extTerm).toFixed(2)}M over {extTerm} yr
              </p>
              <p className="total-value">
                Kicks in: {extModal.currentEnd}-{extModal.currentEnd + 1} season
              </p>
              {parseFloat(extAAV) * 1e6 < extModal.minAAV && (
                <p className="warning">
                  {extModal.name} won't accept less than {formatCap(extModal.minAAV)} AAV
                </p>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleExtend}>Sign Extension</button>
              <button className="btn btn-ghost" onClick={() => setExtModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
