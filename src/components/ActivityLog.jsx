export default function ActivityLog({ log, deadCap, prospects }) {
  return (
    <div className="activity-section">
      {/* Transaction Log */}
      <div className="activity-log">
        <h2>Transaction Log</h2>
        {log.length === 0 ? (
          <p className="empty">No transactions yet. Start building your team!</p>
        ) : (
          <div className="log-list">
            {log.map((entry, i) => (
              <div key={i} className={`log-entry log-${entry.action.toLowerCase().replace(/\s/g, '-')}`}>
                <span className="log-badge">{entry.action}</span>
                <span className="log-detail">{entry.detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dead Cap */}
      <div className="dead-cap-section">
        <h3>Dead Cap / Retained Salary</h3>
        <table className="roster-table">
          <thead>
            <tr><th>Player</th><th>Reason</th><th>Cap Hit</th><th>Note</th></tr>
          </thead>
          <tbody>
            {deadCap.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td><span className="fa-badge dead">{d.reason}</span></td>
                <td className="cap-hit">${(d.capHit / 1e6).toFixed(2)}M</td>
                <td className="note-cell">{d.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prospect Pipeline */}
      <div className="prospects-section">
        <h3>Prospect Pipeline</h3>
        <div className="prospect-pipeline">
          {prospects.map((p, i) => (
            <div key={i} className="pipeline-card">
              <span className={`pos-badge ${p.position}`}>{p.position}</span>
              <div>
                <strong>{p.name}</strong>
                <span className="prospect-league">{p.league} · Age {p.age}</span>
                <p className="prospect-note">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
