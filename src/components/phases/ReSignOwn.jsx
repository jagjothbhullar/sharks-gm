import { useState } from 'react';
import { formatCap } from '../../data/cba';

export default function ReSignOwn({ pendingFAs, capSpace, onReSign, onLetWalk, onAdvance, onTrackFerraro }) {
  const [signModal, setSignModal] = useState(null);
  const [signTerm, setSignTerm] = useState(4);
  const [signAAV, setSignAAV] = useState('');
  const [decided, setDecided] = useState({});

  const remaining = pendingFAs.filter(p => !decided[p.id]);

  const handleReSign = () => {
    if (!signModal) return;
    const aavNum = parseFloat(signAAV) * 1_000_000;
    const result = onReSign(signModal, signTerm, aavNum);
    if (result.error) {
      alert(result.error);
      return;
    }
    if (signModal.id === 'ferraro') onTrackFerraro(true);
    setDecided(prev => ({ ...prev, [signModal.id]: 'signed' }));
    setSignModal(null);
    setSignAAV('');
  };

  const handleLetWalk = (player) => {
    onLetWalk(player);
    if (player.id === 'ferraro') onTrackFerraro(false);
    setDecided(prev => ({ ...prev, [player.id]: 'walked' }));
  };

  return (
    <div className="phase-content resign-phase">
      <div className="phase-header-info">
        <p>
          Time to take care of your own. These players' contracts have expired — decide whether
          to re-sign them or let them walk. <strong>Mario Ferraro</strong> is your top priority —
          he wants to stay and is your best defenseman.
        </p>
        <p>Available Cap Space: <strong className={capSpace < 0 ? 'over' : 'green'}>{formatCap(capSpace)}</strong></p>
      </div>

      {remaining.length > 0 ? (
        <div className="resign-grid">
          {remaining.map(player => {
            const isFerraro = player.id === 'ferraro';
            return (
              <div key={player.id} className={`resign-card ${isFerraro ? 'priority' : ''}`}>
                {isFerraro && <div className="priority-banner">PRIORITY</div>}
                <div className="fa-card-header">
                  <span className={`pos-badge ${player.position}`}>{player.position}</span>
                  <span className={`overall-badge ovr-${Math.floor(player.overall / 10) * 10}`}>{player.overall}</span>
                </div>
                <h4>{player.name}</h4>
                <div className="fa-card-details">
                  <span>Age {player.age}</span>
                  <span>{player.type}</span>
                  <span>Last: {formatCap(player.capHit)}</span>
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
                <div className="resign-actions">
                  <button className="btn btn-primary" onClick={() => {
                    setSignModal(player);
                    setSignAAV(isFerraro ? '6.50' : (player.capHit / 1e6).toFixed(2));
                    setSignTerm(isFerraro ? 6 : 2);
                  }}>
                    Re-Sign
                  </button>
                  <button className="btn btn-ghost" onClick={() => handleLetWalk(player)}>
                    Let Walk
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="all-decided">
          <p>All pending free agents have been addressed.</p>
        </div>
      )}

      <div className="phase-actions">
        <button className="btn btn-primary" onClick={onAdvance}>
          {remaining.length === 0 ? 'Proceed to Extensions' : 'Skip Remaining & Continue'}
        </button>
      </div>

      {/* Sign Modal */}
      {signModal && (
        <div className="modal-overlay" onClick={() => setSignModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Re-Sign {signModal.name}</h3>
            <p className="modal-subtitle">
              {signModal.position} · Age {signModal.age} · OVR {signModal.overall}
            </p>

            <div className="sign-form">
              <label>
                Term (years)
                <input type="range" min="1" max="8" value={signTerm}
                  onChange={e => setSignTerm(parseInt(e.target.value))} />
                <span className="term-display">{signTerm} yr</span>
              </label>
              <label>
                AAV ($M)
                <input type="number" step="0.25" min="0.775" max="20.8" value={signAAV}
                  onChange={e => setSignAAV(e.target.value)} />
              </label>
              <p className="total-value">
                Total: ${(parseFloat(signAAV || 0) * signTerm).toFixed(2)}M over {signTerm} yr
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleReSign}>Sign Contract</button>
              <button className="btn btn-ghost" onClick={() => setSignModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
