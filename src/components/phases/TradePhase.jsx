import { useState } from 'react';
import { formatCap } from '../../data/cba';
import { TRADE_SCENARIOS } from '../../data/trades';

export default function TradePhase({ roster, draftPicks, capSpace, onExecuteTrade, onAdvance }) {
  const [completedTrades, setCompletedTrades] = useState({});
  const [expandedTrade, setExpandedTrade] = useState(null);

  // Filter out trades where the player has already been traded/bought out
  const rosterIds = new Set(roster.map(p => p.id));
  const pickSources = new Set(draftPicks.map(p => p.source));

  const availableTrades = TRADE_SCENARIOS.filter(trade => {
    // Check if sending players are still on roster
    const hasPlayers = trade.sending.players.every(p => rosterIds.has(p.id));
    // Check if sending picks are available
    const hasPicks = !trade.sending.picks || trade.sending.picks.every(p => pickSources.has(p.source));
    return hasPlayers && hasPicks && !completedTrades[trade.id];
  });

  const handleAccept = (trade) => {
    onExecuteTrade(trade);
    setCompletedTrades(prev => ({ ...prev, [trade.id]: 'accepted' }));
    setExpandedTrade(null);
  };

  const handleDecline = (tradeId) => {
    setCompletedTrades(prev => ({ ...prev, [tradeId]: 'declined' }));
    setExpandedTrade(null);
  };

  const tierColor = (tier) => {
    if (tier === 'blockbuster') return '#ff4444';
    if (tier === 'major') return '#ffc107';
    return '#00a3ad';
  };

  return (
    <div className="phase-content trade-phase">
      <div className="phase-header-info">
        <p>
          The phone is ringing. Other GMs are calling with trade offers. Review each proposal
          carefully — consider cap impact, roster fit, and your timeline. You don't have to accept any trades.
        </p>
        <p>Available Cap Space: <strong className={capSpace < 0 ? 'over' : 'green'}>{formatCap(capSpace)}</strong></p>
      </div>

      {availableTrades.length > 0 ? (
        <div className="trade-board">
          {availableTrades.map(trade => (
            <div key={trade.id} className={`trade-card ${expandedTrade === trade.id ? 'expanded' : ''}`}>
              <div className="trade-card-header" onClick={() => setExpandedTrade(expandedTrade === trade.id ? null : trade.id)}>
                <div className="trade-title-row">
                  <span className="trade-tier" style={{ background: tierColor(trade.tier) }}>{trade.tier}</span>
                  <h4>{trade.title}</h4>
                </div>
                <span className="trade-partner">{trade.partnerName}</span>
              </div>

              {expandedTrade === trade.id && (
                <div className="trade-details">
                  <p className="trade-description">{trade.description}</p>

                  <div className="trade-breakdown">
                    <div className="trade-side sending">
                      <h5>You Send</h5>
                      {trade.sending.players.map(p => (
                        <div key={p.id} className="trade-item">
                          <span className={`pos-badge ${p.position}`}>{p.position}</span>
                          <span>{p.name}</span>
                          <span className="cap-hit">{formatCap(p.capHit)}</span>
                        </div>
                      ))}
                      {trade.sending.picks?.map((p, i) => (
                        <div key={i} className="trade-item pick-item">
                          <span className="pick-badge">R{p.round}</span>
                          <span>{p.note}</span>
                        </div>
                      ))}
                    </div>
                    <div className="trade-arrow">&#8644;</div>
                    <div className="trade-side receiving">
                      <h5>You Receive</h5>
                      {trade.receiving.players.map(p => (
                        <div key={p.id} className="trade-item">
                          <span className={`pos-badge ${p.position}`}>{p.position}</span>
                          <span>{p.name} <small>({p.age}, OVR {p.overall})</small></span>
                          <span className="cap-hit">{formatCap(p.capHit)}</span>
                        </div>
                      ))}
                      {trade.receiving.picks?.map((p, i) => (
                        <div key={i} className="trade-item pick-item">
                          <span className="pick-badge">R{p.round}</span>
                          <span>{p.note}</span>
                        </div>
                      ))}
                      {trade.receiving.players.length === 0 && (!trade.receiving.picks || trade.receiving.picks.length === 0) && (
                        <div className="trade-item"><span className="trade-nothing">Nothing (cap dump)</span></div>
                      )}
                    </div>
                  </div>

                  <p className="trade-impact">{trade.impact}</p>

                  <div className="trade-actions">
                    <button className="btn btn-primary" onClick={() => handleAccept(trade)}>
                      Accept Trade
                    </button>
                    <button className="btn btn-ghost" onClick={() => handleDecline(trade.id)}>
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="all-decided">
          <p>All trade proposals have been addressed.</p>
        </div>
      )}

      {/* Show completed trades */}
      {Object.keys(completedTrades).length > 0 && (
        <div className="completed-trades">
          <h3>Trade Decisions</h3>
          {TRADE_SCENARIOS.filter(t => completedTrades[t.id]).map(trade => (
            <div key={trade.id} className={`trade-result ${completedTrades[trade.id]}`}>
              <span className={`trade-result-badge ${completedTrades[trade.id]}`}>
                {completedTrades[trade.id] === 'accepted' ? 'ACCEPTED' : 'DECLINED'}
              </span>
              <span>{trade.title}</span>
            </div>
          ))}
        </div>
      )}

      <div className="phase-actions">
        <button className="btn btn-primary" onClick={onAdvance}>
          Proceed to NHL Draft
        </button>
      </div>
    </div>
  );
}
