import { useState, useMemo } from 'react';
import { formatCap, getOfferSheetCompensation } from '../data/cba';

export default function FreeAgency({ availableUFAs, availableRFAs, capSpace, onSignUFA, onOfferSheet }) {
  const [tab, setTab] = useState('ufa');
  const [posFilter, setPosFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('overall');
  const [signModal, setSignModal] = useState(null);
  const [term, setTerm] = useState(4);
  const [aav, setAAV] = useState('');

  const players = tab === 'ufa' ? availableUFAs : availableRFAs;

  const filtered = useMemo(() => {
    let list = posFilter === 'ALL' ? players :
      posFilter === 'F' ? players.filter(p => ['C', 'LW', 'RW'].includes(p.position)) :
      posFilter === 'D' ? players.filter(p => p.position === 'D') :
      players.filter(p => p.position === 'G');

    return list.sort((a, b) => {
      if (sortBy === 'overall') return b.overall - a.overall;
      if (sortBy === 'aav') return b.projectedAAV - a.projectedAAV;
      if (sortBy === 'age') return a.age - b.age;
      if (sortBy === 'potential') return b.potential - a.potential;
      return 0;
    });
  }, [players, posFilter, sortBy]);

  const handleSign = () => {
    if (!signModal) return;
    const aavNum = parseFloat(aav) * 1_000_000;
    const result = tab === 'ufa'
      ? onSignUFA(signModal, term, aavNum)
      : onOfferSheet(signModal, term, aavNum);

    if (result.error) {
      alert(result.error);
    } else {
      setSignModal(null);
      setAAV('');
    }
  };

  const offerSheetComp = signModal && tab === 'rfa' && aav
    ? getOfferSheetCompensation(parseFloat(aav) * 1_000_000)
    : null;

  return (
    <div className="free-agency">
      <h2>Free Agency</h2>

      <div className="fa-controls">
        <div className="tab-bar">
          <button className={`tab ${tab === 'ufa' ? 'active' : ''}`} onClick={() => setTab('ufa')}>
            UFAs ({availableUFAs.length})
          </button>
          <button className={`tab ${tab === 'rfa' ? 'active' : ''}`} onClick={() => setTab('rfa')}>
            RFAs ({availableRFAs.length})
          </button>
        </div>

        <div className="filters">
          {['ALL', 'F', 'D', 'G'].map(f => (
            <button key={f} className={`filter-btn ${posFilter === f ? 'active' : ''}`}
              onClick={() => setPosFilter(f)}>{f}</button>
          ))}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="overall">Sort: Overall</option>
            <option value="potential">Sort: Potential</option>
            <option value="aav">Sort: Projected AAV</option>
            <option value="age">Sort: Age (youngest)</option>
          </select>
        </div>
      </div>

      <div className="cap-space-indicator">
        Available Cap Space: <strong className={capSpace < 0 ? 'over' : ''}>{formatCap(capSpace)}</strong>
      </div>

      <div className="fa-grid">
        {filtered.map(player => (
          <div key={player.id} className="fa-card">
            <div className="fa-card-header">
              <span className={`pos-badge ${player.position}`}>{player.position}</span>
              <span className={`overall-badge ovr-${Math.floor(player.overall / 10) * 10}`}>{player.overall}</span>
            </div>
            <h4>{player.name}</h4>
            <div className="fa-card-details">
              <span>Age {player.age}</span>
              <span>{player.prevTeam}</span>
              <span>Prev: {formatCap(player.prevCapHit)}</span>
            </div>
            <div className="fa-card-projected">
              Projected: <strong>{formatCap(player.projectedAAV)}</strong>
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
            <button className="btn btn-primary btn-block" onClick={() => {
              setSignModal(player);
              setAAV((player.projectedAAV / 1e6).toFixed(2));
              setTerm(tab === 'ufa' ? 4 : 3);
            }}>
              {tab === 'ufa' ? 'Sign' : 'Offer Sheet'}
            </button>
          </div>
        ))}
      </div>

      {/* Sign/Offer Sheet Modal */}
      {signModal && (
        <div className="modal-overlay" onClick={() => setSignModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{tab === 'ufa' ? 'Sign' : 'Offer Sheet'} {signModal.name}</h3>
            <p className="modal-subtitle">
              {signModal.position} · Age {signModal.age} · {signModal.prevTeam} ·
              OVR {signModal.overall} / POT {signModal.potential}
            </p>

            <div className="sign-form">
              <label>
                Term (years)
                <input type="range" min="1" max={tab === 'ufa' ? 7 : 7} value={term}
                  onChange={e => setTerm(parseInt(e.target.value))} />
                <span className="term-display">{term} yr</span>
              </label>
              <label>
                AAV ($M)
                <input type="number" step="0.25" min="0.775" max="20.8" value={aav}
                  onChange={e => setAAV(e.target.value)} />
              </label>
              <p className="total-value">
                Total Value: ${(parseFloat(aav || 0) * term).toFixed(2)}M over {term} yr
              </p>
              {tab === 'rfa' && offerSheetComp && (
                <div className="offer-sheet-comp">
                  <p><strong>Draft Pick Compensation:</strong></p>
                  {offerSheetComp.length === 0 ? (
                    <p className="comp-none">No compensation required</p>
                  ) : (
                    <p className="comp-picks">{offerSheetComp.join(' + ')}</p>
                  )}
                  <p className="comp-warning">If {signModal.prevTeam} does NOT match within 7 days, you get the player but lose these picks.</p>
                </div>
              )}
              {parseFloat(aav) * 1_000_000 > capSpace && (
                <p className="warning">⚠ This signing would put you over the cap!</p>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleSign}>
                {tab === 'ufa' ? 'Sign Contract' : 'Submit Offer Sheet'}
              </button>
              <button className="btn btn-ghost" onClick={() => setSignModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
