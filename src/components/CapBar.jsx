import { formatCap } from '../data/cba';

export default function CapBar({ capInfo }) {
  const pct = Math.min(100, (capInfo.totalCommitted / capInfo.ceiling) * 100);
  const rosterPct = (capInfo.rosterCap / capInfo.ceiling) * 100;
  const signingsPct = (capInfo.signingsCap / capInfo.ceiling) * 100;
  const deadPct = ((capInfo.deadCap + capInfo.buyoutCap) / capInfo.ceiling) * 100;

  return (
    <div className="cap-bar-container">
      <div className="cap-header">
        <h3>2026-27 Salary Cap</h3>
        <div className="cap-numbers">
          <span className={`cap-space ${capInfo.isOverCap ? 'over' : ''}`}>
            {capInfo.isOverCap ? 'OVER CAP: ' : 'Cap Space: '}
            {formatCap(Math.abs(capInfo.capSpace))}
          </span>
          <span className="cap-total">
            {formatCap(capInfo.totalCommitted)} / {formatCap(capInfo.ceiling)}
          </span>
        </div>
      </div>

      <div className="cap-bar">
        <div className="cap-segment roster" style={{ width: `${rosterPct}%` }}
          title={`Roster: ${formatCap(capInfo.rosterCap)}`} />
        <div className="cap-segment signings" style={{ width: `${signingsPct}%` }}
          title={`New Signings: ${formatCap(capInfo.signingsCap)}`} />
        <div className="cap-segment dead" style={{ width: `${deadPct}%` }}
          title={`Dead Cap: ${formatCap(capInfo.deadCap + capInfo.buyoutCap)}`} />
      </div>

      <div className="cap-legend">
        <span><i className="dot roster" /> Roster ({formatCap(capInfo.rosterCap)})</span>
        <span><i className="dot signings" /> New Signings ({formatCap(capInfo.signingsCap)})</span>
        <span><i className="dot dead" /> Dead Cap ({formatCap(capInfo.deadCap + capInfo.buyoutCap)})</span>
        <span>Players: {capInfo.rosterSize}/23</span>
      </div>
    </div>
  );
}
