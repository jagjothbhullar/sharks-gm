import { useState } from 'react';
import { formatCap } from '../data/cba';

const POS_ORDER = { C: 0, LW: 1, RW: 2, D: 3, G: 4 };

export default function RosterView({ roster, signings, pendingFAs, onBuyout, onReSign, onLetWalk }) {
  const [showBuyoutConfirm, setShowBuyoutConfirm] = useState(null);
  const [signModal, setSignModal] = useState(null);
  const [signTerm, setSignTerm] = useState(3);
  const [signAAV, setSignAAV] = useState('');

  const allPlayers = [
    ...roster.map(p => ({ ...p, status: p.type === 'Extended' ? 'extended' : 'roster' })),
    ...signings.map(p => ({ ...p, status: 'new' })),
  ].sort((a, b) => (POS_ORDER[a.position] ?? 5) - (POS_ORDER[b.position] ?? 5));

  const forwards = allPlayers.filter(p => ['C', 'LW', 'RW'].includes(p.position));
  const defense = allPlayers.filter(p => p.position === 'D');
  const goalies = allPlayers.filter(p => p.position === 'G');

  const handleBuyout = (player) => {
    onBuyout(player);
    setShowBuyoutConfirm(null);
  };

  const handleReSign = () => {
    if (!signModal) return;
    const aav = parseFloat(signAAV) * 1_000_000;
    const result = onReSign(signModal, signTerm, aav);
    if (result.error) {
      alert(result.error);
    } else {
      setSignModal(null);
      setSignAAV('');
    }
  };

  const PlayerRow = ({ player }) => (
    <tr className={player.status === 'new' ? 'new-signing' : player.status === 'extended' ? 'extended-signing' : ''}>
      <td className="pos-badge-cell"><span className={`pos-badge ${player.position}`}>{player.position}</span></td>
      <td className="player-name">
        {player.name}
        {player.status === 'new' && <span className="new-tag">NEW</span>}
        {player.status === 'extended' && <span className="ext-tag">EXT</span>}
      </td>
      <td className="cap-hit">{formatCap(player.capHit)}</td>
      <td>{player.contractEnd}</td>
      <td>{player.clause || '—'}</td>
      <td className="overall-cell">
        <span className={`overall-badge ovr-${Math.floor(player.overall / 10) * 10}`}>
          {player.overall}
        </span>
      </td>
      <td>
        {player.status === 'roster' && player.contractEnd > 2027 && (
          <button className="btn-sm btn-danger" onClick={() => setShowBuyoutConfirm(player)}>
            Buyout
          </button>
        )}
      </td>
    </tr>
  );

  const Section = ({ title, players }) => (
    <>
      <tr className="section-header"><td colSpan="7">{title} ({players.length})</td></tr>
      {players.map(p => <PlayerRow key={p.id} player={p} />)}
    </>
  );

  return (
    <div className="roster-view">
      <h2>Roster</h2>

      <table className="roster-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Player</th>
            <th>Cap Hit</th>
            <th>Expires</th>
            <th>Clause</th>
            <th>OVR</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Section title="Forwards" players={forwards} />
          <Section title="Defense" players={defense} />
          <Section title="Goaltenders" players={goalies} />
        </tbody>
      </table>

      {/* Pending Free Agents */}
      {pendingFAs.length > 0 && (
        <div className="pending-fas">
          <h3>Pending Free Agents (Decision Required)</h3>
          <table className="roster-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Player</th>
                <th>Last Cap Hit</th>
                <th>Status</th>
                <th>OVR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pendingFAs.sort((a, b) => (POS_ORDER[a.position] ?? 5) - (POS_ORDER[b.position] ?? 5)).map(p => (
                <tr key={p.id}>
                  <td><span className={`pos-badge ${p.position}`}>{p.position}</span></td>
                  <td className="player-name">{p.name}</td>
                  <td className="cap-hit">{formatCap(p.capHit)}</td>
                  <td><span className={`fa-badge ${p.type.toLowerCase()}`}>{p.type}</span></td>
                  <td><span className={`overall-badge ovr-${Math.floor(p.overall / 10) * 10}`}>{p.overall}</span></td>
                  <td className="action-cell">
                    <button className="btn-sm btn-primary" onClick={() => { setSignModal(p); setSignAAV((p.capHit / 1e6).toFixed(2)); }}>
                      Re-sign
                    </button>
                    <button className="btn-sm btn-ghost" onClick={() => onLetWalk(p)}>
                      Let Walk
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Buyout Confirmation Modal */}
      {showBuyoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowBuyoutConfirm(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Confirm Buyout</h3>
            <p>Buy out <strong>{showBuyoutConfirm.name}</strong>?</p>
            <p>Remaining: {showBuyoutConfirm.contractEnd - 2026} yr × {formatCap(showBuyoutConfirm.capHit)}</p>
            <p>Buyout cap hit will be spread over {(showBuyoutConfirm.contractEnd - 2026) * 2} years.</p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={() => handleBuyout(showBuyoutConfirm)}>Confirm Buyout</button>
              <button className="btn btn-ghost" onClick={() => setShowBuyoutConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Re-sign Modal */}
      {signModal && (
        <div className="modal-overlay" onClick={() => setSignModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Re-sign {signModal.name}</h3>
            <p className="modal-subtitle">{signModal.position} · Last Cap Hit: {formatCap(signModal.capHit)} · OVR {signModal.overall}</p>
            <div className="sign-form">
              <label>
                Term (years)
                <input type="range" min="1" max="8" value={signTerm} onChange={e => setSignTerm(parseInt(e.target.value))} />
                <span className="term-display">{signTerm} yr</span>
              </label>
              <label>
                AAV ($M)
                <input type="number" step="0.25" min="0.775" max="20.8" value={signAAV}
                  onChange={e => setSignAAV(e.target.value)} placeholder="e.g. 5.50" />
              </label>
              <p className="total-value">Total Value: ${(parseFloat(signAAV || 0) * signTerm).toFixed(2)}M over {signTerm} yr</p>
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
