import { formatCap } from '../../data/cba';

export default function SeasonRecap({ capInfo, roster, pendingFAs, prospects, deadCap, onBegin }) {
  const forwards = roster.filter(p => ['C', 'LW', 'RW'].includes(p.position));
  const defense = roster.filter(p => p.position === 'D');
  const goalies = roster.filter(p => p.position === 'G');

  return (
    <div className="phase-content season-recap">
      {/* Hero banner */}
      <div className="recap-hero">
        <h2>Welcome to the Front Office, GM.</h2>
        <p className="recap-tagline">
          The Sharks were in the playoff hunt until the final weeks. Now it's time to push them over the edge.
        </p>
      </div>

      {/* Two-column layout: storylines + snapshot */}
      <div className="recap-two-col">
        <div className="recap-storylines">
          <h3>2025-26 Season in Review</h3>
          <div className="storyline">
            <span className="storyline-icon">&#9733;</span>
            <div>
              <strong>Celebrini arrives.</strong> Point-per-game sophomore season. The franchise center is the real deal — and his extension is the biggest decision of the summer.
            </div>
          </div>
          <div className="storyline">
            <span className="storyline-icon">&#9650;</span>
            <div>
              <strong>Young core took leaps.</strong> Smith, Eklund, and Dickinson all had breakout years. Misa held his own as a rookie.
            </div>
          </div>
          <div className="storyline">
            <span className="storyline-icon">&#9654;</span>
            <div>
              <strong>Deadline moves.</strong> Acquired Sherwood from Vancouver. Locked up extensions: Wennberg ($6M×3), Eklund ($5.6M×3), Sherwood ($5.75M×5), Nedeljkovic ($3M×2).
            </div>
          </div>
          <div className="storyline">
            <span className="storyline-icon">&#9679;</span>
            <div>
              <strong>Just missed.</strong> Finished one spot outside the wild card. The gap is small — the right moves this summer close it.
            </div>
          </div>
        </div>

        <div className="recap-snapshot">
          <h3>Your Assets</h3>
          <div className="snapshot-item">
            <span className="snapshot-label">Cap Space</span>
            <span className="snapshot-value green">{formatCap(capInfo.capSpace)}</span>
          </div>
          <div className="snapshot-item">
            <span className="snapshot-label">Cap Ceiling</span>
            <span className="snapshot-value">{formatCap(capInfo.ceiling)}</span>
          </div>
          <div className="snapshot-item">
            <span className="snapshot-label">Dead Cap</span>
            <span className="snapshot-value red">{formatCap(capInfo.deadCap)}</span>
          </div>
          <div className="snapshot-item">
            <span className="snapshot-label">Draft Picks</span>
            <span className="snapshot-value">Two 1sts (#15, #19)</span>
          </div>
          <div className="snapshot-item">
            <span className="snapshot-label">Roster</span>
            <span className="snapshot-value">{roster.length} ({forwards.length}F · {defense.length}D · {goalies.length}G)</span>
          </div>
          <div className="snapshot-item">
            <span className="snapshot-label">Pending FAs</span>
            <span className="snapshot-value">{pendingFAs.length} players</span>
          </div>
          <div className="snapshot-item">
            <span className="snapshot-label">Prospect Pool</span>
            <span className="snapshot-value">#1 in NHL</span>
          </div>
        </div>
      </div>

      {/* Bottom stat cards */}
      <div className="recap-grid">
        <div className="recap-card">
          <h4>Pending Free Agents</h4>
          <div className="recap-list">
            {pendingFAs.map(p => (
              <span key={p.id} className="recap-tag">{p.name} <small>({p.type})</small></span>
            ))}
          </div>
        </div>
        <div className="recap-card">
          <h4>Dead Cap Breakdown</h4>
          <div className="recap-list">
            {deadCap.map((d, i) => (
              <span key={i} className="recap-tag dead">{d.name} <small>{formatCap(d.capHit)}</small></span>
            ))}
          </div>
        </div>
        <div className="recap-card">
          <h4>Key Dates</h4>
          <div className="recap-dates">
            <div><strong>Jun 15-30</strong> Buyout Window</div>
            <div><strong>Jun 25</strong> QO Deadline</div>
            <div><strong>Jun 26-27</strong> NHL Draft</div>
            <div><strong>Jul 1</strong> Free Agency Opens</div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary btn-large begin-btn" onClick={onBegin}>
        Begin the Offseason
      </button>
    </div>
  );
}
