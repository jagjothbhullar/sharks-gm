import { useState, useEffect } from 'react';
import { DRAFT_ORDER_2026 } from '../../data/aiTeams';

export default function DraftPhase({ draftProspects, draftPicks, draftSimState, onAdvanceDraft, onUserPick, onAdvancePhase }) {
  const [selectedProspect, setSelectedProspect] = useState(null);

  const { aiPicks, userPicks, isUserTurn, draftComplete, currentPick } = draftSimState;

  // All picked names
  const pickedNames = new Set([
    ...aiPicks.map(p => p.prospect.name),
    ...userPicks.map(p => p.prospect.name),
  ]);

  const availableProspects = draftProspects.filter(p => !pickedNames.has(p.name));

  // Build the full pick history for display
  const allPicks = [...aiPicks, ...userPicks].sort((a, b) => a.pick - b.pick);

  // How many user picks remain
  const sharksPicks = DRAFT_ORDER_2026.filter(p => p.team === 'SJS');
  const userPicksMade = userPicks.length;
  const userPicksRemaining = sharksPicks.length - userPicksMade;

  const handleDraft = () => {
    if (!selectedProspect) return;
    // Find the first available draft pick slot for the user
    const pickIdx = 0; // use first available pick from gm's draftPicks
    const result = onUserPick(selectedProspect, pickIdx);
    if (result.success) {
      setSelectedProspect(null);
    }
  };

  return (
    <div className="phase-content draft-phase">
      <div className="phase-header-info">
        <p>
          The 2026 NHL Draft is live from KeyBank Center in Buffalo. The Sharks hold
          <strong> {sharksPicks.length} first-round picks</strong> — #{sharksPicks.map(p => p.pick).join(' and #')}.
          Watch as the draft unfolds and make your selections when it's your turn.
        </p>
      </div>

      {/* Draft Board - Picks Made */}
      <div className="draft-board-live">
        <h3>Draft Board</h3>
        <div className="draft-picks-scroll">
          {DRAFT_ORDER_2026.map((slot) => {
            const aiPick = aiPicks.find(p => p.pick === slot.pick);
            const userPick = userPicks.find(p => p.pick === slot.pick);
            const isCurrent = slot.pick === currentPick + 1 && !draftComplete;
            const isPending = !aiPick && !userPick && !isCurrent;
            const isSharks = slot.team === 'SJS';

            return (
              <div
                key={slot.pick}
                className={`draft-slot ${aiPick ? 'picked' : ''} ${userPick ? 'picked user-pick' : ''} ${isCurrent ? 'current' : ''} ${isPending ? 'pending' : ''} ${isSharks && !userPick ? 'sharks-slot' : ''}`}
              >
                <span className="draft-pick-num">#{slot.pick}</span>
                <span className="draft-team">{slot.team}</span>
                {(aiPick || userPick) && (
                  <span className="draft-selection">
                    {(aiPick?.prospect || userPick?.prospect)?.name}
                    <small> ({(aiPick?.prospect || userPick?.prospect)?.position})</small>
                  </span>
                )}
                {isCurrent && isUserTurn && <span className="draft-your-turn">YOUR PICK</span>}
                {isPending && <span className="draft-pending">—</span>}
                {slot.note && <span className="draft-slot-note">{slot.note}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      {!draftComplete && !isUserTurn && (
        <div className="draft-controls">
          <button className="btn btn-primary btn-large" onClick={() => onAdvanceDraft(draftProspects)}>
            {currentPick === 0 ? 'Start the Draft' : 'Continue Draft'}
          </button>
          <p className="draft-hint">Advance through picks until your next selection.</p>
        </div>
      )}

      {/* User's Turn to Pick */}
      {isUserTurn && (
        <div className="draft-user-turn">
          <h3 className="your-turn-header">
            ON THE CLOCK: San Jose Sharks — Pick #{DRAFT_ORDER_2026[currentPick]?.pick}
          </h3>
          <div className="draft-prospect-grid">
            {availableProspects.map(prospect => (
              <div
                key={prospect.rank}
                className={`prospect-card selectable ${selectedProspect?.name === prospect.name ? 'selected' : ''}`}
                onClick={() => setSelectedProspect(prospect)}
              >
                <div className="prospect-rank">#{prospect.rank}</div>
                <div className="prospect-info">
                  <h4>{prospect.name}</h4>
                  <div className="prospect-meta">
                    <span className={`pos-badge ${prospect.position}`}>{prospect.position}</span>
                    <span>{prospect.team}</span>
                  </div>
                  <p className="prospect-note">{prospect.note}</p>
                  <div className="stat-bar">
                    <span>POT</span>
                    <div className="bar"><div className="bar-fill pot" style={{ width: `${prospect.potential}%` }} /></div>
                    <span>{prospect.potential}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedProspect && (
            <div className="draft-confirm">
              <button className="btn btn-primary btn-large" onClick={handleDraft}>
                Select {selectedProspect.name} ({selectedProspect.position})
              </button>
            </div>
          )}
        </div>
      )}

      {/* Draft Complete */}
      {draftComplete && (
        <div className="draft-complete">
          <h3>Draft Complete!</h3>
          <p>Your selections:</p>
          {userPicks.map((up, i) => (
            <div key={i} className="log-entry log-draft">
              <span className="log-badge">PICK #{up.pick}</span>
              <span>{up.prospect.name} ({up.prospect.position}) — Potential: {up.prospect.potential}</span>
            </div>
          ))}
          <div className="phase-actions">
            <button className="btn btn-primary" onClick={onAdvancePhase}>
              Proceed to Free Agency
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
