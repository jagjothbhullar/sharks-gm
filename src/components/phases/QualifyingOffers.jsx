import { formatCap } from '../../data/cba';

export default function QualifyingOffers({ pendingFAs, qoDecisions, onDecision, onConfirm }) {
  const rfas = pendingFAs.filter(p => p.type === 'RFA');
  const allDecided = rfas.every(p => qoDecisions[p.id]);

  return (
    <div className="phase-content qo-phase">
      <div className="phase-header-info">
        <p>
          By <strong>June 25 at 5:00 PM ET</strong>, you must issue a Qualifying Offer to any RFA
          you want to retain rights to. If you don't issue a QO, the player becomes an unrestricted
          free agent and can sign with any team. A QO is a 1-year deal at 100% of the player's
          previous salary.
        </p>
      </div>

      {rfas.length === 0 ? (
        <div className="no-candidates">
          <p>No RFAs requiring qualifying offers. All pending free agents are UFAs.</p>
          <div className="phase-actions">
            <button className="btn btn-primary" onClick={onConfirm}>Proceed to NHL Draft</button>
          </div>
        </div>
      ) : (
        <>
          <div className="qo-grid">
            {rfas.map(player => {
              const decision = qoDecisions[player.id];
              return (
                <div key={player.id} className={`qo-card ${decision || ''}`}>
                  <div className="qo-card-header">
                    <span className={`pos-badge ${player.position}`}>{player.position}</span>
                    <span className={`overall-badge ovr-${Math.floor(player.overall / 10) * 10}`}>{player.overall}</span>
                  </div>
                  <h4>{player.name}</h4>
                  <div className="qo-details">
                    <div className="qo-row">
                      <span>Previous Salary</span>
                      <span>{formatCap(player.capHit)}</span>
                    </div>
                    <div className="qo-row">
                      <span>QO Cost (1yr)</span>
                      <span className="cap-hit">{formatCap(player.capHit)}</span>
                    </div>
                    <div className="qo-row">
                      <span>Age</span>
                      <span>{player.age}</span>
                    </div>
                    <div className="qo-row">
                      <span>Potential</span>
                      <span>{player.potential}</span>
                    </div>
                  </div>
                  {player.note && <p className="qo-note">{player.note}</p>}
                  <div className="qo-buttons">
                    <button
                      className={`btn ${decision === 'qualify' ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => onDecision(player.id, 'qualify')}
                    >
                      Qualify
                    </button>
                    <button
                      className={`btn ${decision === 'let_walk' ? 'btn-danger' : 'btn-ghost'}`}
                      onClick={() => onDecision(player.id, 'let_walk')}
                    >
                      Let Walk
                    </button>
                  </div>
                  {decision && (
                    <div className={`qo-decision ${decision}`}>
                      {decision === 'qualify' ? 'QUALIFIED — Rights Retained' : 'LETTING WALK — Becomes UFA'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="phase-actions">
            <button className="btn btn-primary" disabled={!allDecided} onClick={onConfirm}>
              {allDecided ? 'Confirm & Proceed to NHL Draft' : `Decide on all ${rfas.length} RFAs to continue`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
