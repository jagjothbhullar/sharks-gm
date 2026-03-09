import { useState } from 'react';
import { formatCap, calculateBuyout } from '../../data/cba';

export default function BuyoutWindow({ roster, onBuyout, onAdvance, onSkip }) {
  const [confirmPlayer, setConfirmPlayer] = useState(null);
  const [boughtOut, setBoughtOut] = useState([]);

  // Only show players who could realistically be bought out
  const buyoutCandidates = roster.filter(p =>
    p.contractEnd > 2027 && p.type !== 'ELC' && p.overall < 78
  );

  const handleBuyout = (player) => {
    const result = onBuyout(player);
    setBoughtOut(prev => [...prev, { ...player, ...result }]);
    setConfirmPlayer(null);
  };

  const previewBuyout = (player) => {
    const remainingSalary = player.capHit * (player.contractEnd - 2026);
    const remainingYears = player.contractEnd - 2026;
    return calculateBuyout(remainingSalary, remainingYears, player.age);
  };

  return (
    <div className="phase-content buyout-window">
      <div className="phase-header-info">
        <p>
          The buyout window is open. You can buy out players to clear cap space — but the
          remaining salary (at 2/3 rate for players 26+) gets spread over double the remaining
          contract years as dead cap.
        </p>
      </div>

      {buyoutCandidates.length === 0 && boughtOut.length === 0 ? (
        <div className="no-candidates">
          <p>No obvious buyout candidates on the roster.</p>
        </div>
      ) : (
        <div className="buyout-candidates">
          <h3>Buyout Candidates</h3>
          <div className="buyout-grid">
            {buyoutCandidates.filter(p => !boughtOut.find(b => b.id === p.id)).map(player => {
              const preview = previewBuyout(player);
              return (
                <div key={player.id} className="buyout-card">
                  <div className="buyout-card-header">
                    <span className={`pos-badge ${player.position}`}>{player.position}</span>
                    <span className={`overall-badge ovr-${Math.floor(player.overall / 10) * 10}`}>{player.overall}</span>
                  </div>
                  <h4>{player.name}</h4>
                  <div className="buyout-details">
                    <div className="buyout-row">
                      <span>Current Cap Hit</span>
                      <span className="cap-hit">{formatCap(player.capHit)}</span>
                    </div>
                    <div className="buyout-row">
                      <span>Years Remaining</span>
                      <span>{player.contractEnd - 2026}</span>
                    </div>
                    <div className="buyout-row">
                      <span>Clause</span>
                      <span>{player.clause || 'None'}</span>
                    </div>
                    <hr />
                    <div className="buyout-row highlight">
                      <span>Buyout Cap Hit</span>
                      <span className="red">{formatCap(preview.annualCapHit)}/yr</span>
                    </div>
                    <div className="buyout-row highlight">
                      <span>Buyout Duration</span>
                      <span>{preview.years} years</span>
                    </div>
                    <div className="buyout-row">
                      <span>Cap Savings</span>
                      <span className="green">{formatCap(player.capHit - preview.annualCapHit)}/yr</span>
                    </div>
                  </div>
                  <button className="btn btn-danger btn-block" onClick={() => setConfirmPlayer(player)}>
                    Buy Out
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {boughtOut.length > 0 && (
        <div className="buyout-completed">
          <h3>Completed Buyouts</h3>
          {boughtOut.map(p => (
            <div key={p.id} className="log-entry log-buyout">
              <span className="log-badge">BUYOUT</span>
              <span>Bought out {p.name} — {formatCap(p.annualCapHit)}/yr for {p.years} years dead cap</span>
            </div>
          ))}
        </div>
      )}

      <div className="phase-actions">
        <button className="btn btn-primary" onClick={onAdvance}>
          {boughtOut.length > 0 ? 'Proceed to Qualifying Offers' : 'Skip — No Buyouts'}
        </button>
      </div>

      {/* Confirm Modal */}
      {confirmPlayer && (
        <div className="modal-overlay" onClick={() => setConfirmPlayer(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Confirm Buyout: {confirmPlayer.name}</h3>
            <p>This action cannot be undone. Are you sure?</p>
            <p>Dead cap: <strong className="red">{formatCap(previewBuyout(confirmPlayer).annualCapHit)}/yr for {previewBuyout(confirmPlayer).years} years</strong></p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={() => handleBuyout(confirmPlayer)}>Confirm Buyout</button>
              <button className="btn btn-ghost" onClick={() => setConfirmPlayer(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
