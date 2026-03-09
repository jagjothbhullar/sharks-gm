import { useMemo } from 'react';
import { formatCap } from '../data/cba';
import { SHARKS_DEAD_CAP } from '../data/sharks';

const YEARS = [2027, 2028, 2029, 2030, 2031];
const YEAR_LABELS = ['2026-27', '2027-28', '2028-29', '2029-30', '2030-31'];
const CAP_PROJECTIONS = {
  2027: 104_000_000,
  2028: 112_500_000, // +$8.5M
  2029: 122_000_000, // +$9.5M
  2030: 128_000_000, // est.
  2031: 134_000_000, // est.
};

const POS_ORDER = { C: 0, LW: 1, RW: 2, D: 3, G: 4 };

export default function CapProjection({ roster, signings }) {
  const allPlayers = useMemo(() => {
    return [...roster, ...signings]
      .sort((a, b) => (POS_ORDER[a.position] ?? 5) - (POS_ORDER[b.position] ?? 5) || b.capHit - a.capHit);
  }, [roster, signings]);

  const yearData = useMemo(() => {
    return YEARS.map((year, i) => {
      const activePlayers = allPlayers.filter(p => p.contractEnd >= year);
      const playerCap = activePlayers.reduce((sum, p) => sum + p.capHit, 0);
      const deadCap = SHARKS_DEAD_CAP
        .filter(d => d.contractEnd && d.contractEnd >= year)
        .reduce((sum, d) => sum + d.capHit, 0);
      const totalCommitted = playerCap + deadCap;
      const projected = CAP_PROJECTIONS[year] || 134_000_000;
      const capSpace = projected - totalCommitted;

      return {
        year,
        label: YEAR_LABELS[i],
        activePlayers,
        playerCount: activePlayers.length,
        playerCap,
        deadCap,
        totalCommitted,
        projected,
        capSpace,
      };
    });
  }, [allPlayers]);

  // Find max committed for bar scaling
  const maxCommitted = Math.max(...yearData.map(y => y.totalCommitted), ...yearData.map(y => y.projected));

  return (
    <div className="cap-projection">
      <h2>Cap Projection by Year</h2>
      <p className="projection-note">
        Shows committed salary through each season. Cap projections for 2028+ are estimates based on CBA growth schedule.
      </p>

      {/* Summary bars */}
      <div className="projection-bars">
        {yearData.map(yd => {
          const committedPct = (yd.totalCommitted / maxCommitted) * 100;
          const capLinePct = (yd.projected / maxCommitted) * 100;
          return (
            <div key={yd.year} className="projection-year">
              <div className="projection-label">
                <span className="year-label">{yd.label}</span>
                <span className="year-players">{yd.playerCount} players</span>
              </div>
              <div className="projection-bar-container">
                <div className="projection-bar-bg">
                  <div
                    className={`projection-bar-fill ${yd.capSpace < 0 ? 'over' : ''}`}
                    style={{ width: `${committedPct}%` }}
                  />
                  <div className="cap-line" style={{ left: `${capLinePct}%` }} title={`Cap: ${formatCap(yd.projected)}`} />
                </div>
                <div className="projection-numbers">
                  <span className="committed">{formatCap(yd.totalCommitted)}</span>
                  <span className={`space ${yd.capSpace < 0 ? 'over' : ''}`}>
                    {yd.capSpace >= 0 ? `${formatCap(yd.capSpace)} free` : `${formatCap(Math.abs(yd.capSpace))} over`}
                  </span>
                  <span className="cap-ceiling">Cap: {formatCap(yd.projected)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed table */}
      <div className="projection-table-wrapper">
        <table className="projection-table">
          <thead>
            <tr>
              <th className="sticky-col">Player</th>
              <th className="sticky-col-2">Pos</th>
              {YEAR_LABELS.map(label => (
                <th key={label} className="year-col">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPlayers.map(player => (
              <tr key={player.id}>
                <td className="sticky-col player-name-cell">
                  {player.name}
                  {player.type === 'Extended' && <span className="ext-tag">EXT</span>}
                  {player.type === 'Signed' && <span className="new-tag">NEW</span>}
                  {player.type === 'Offer Sheet' && <span className="os-tag">OS</span>}
                  {player.type === 'ELC' && <span className="elc-tag">ELC</span>}
                </td>
                <td className="sticky-col-2">
                  <span className={`pos-badge ${player.position}`}>{player.position}</span>
                </td>
                {YEARS.map(year => {
                  const active = player.contractEnd >= year;
                  const isLastYear = player.contractEnd === year;
                  return (
                    <td key={year} className={`year-cell ${active ? 'active' : 'empty'} ${isLastYear ? 'last-year' : ''}`}>
                      {active ? formatCap(player.capHit) : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Dead cap rows */}
            <tr className="section-header">
              <td className="sticky-col" colSpan={2}>Dead Cap</td>
              {YEAR_LABELS.map(l => <td key={l} className="year-col"></td>)}
            </tr>
            {SHARKS_DEAD_CAP.map((d, i) => (
              <tr key={`dead-${i}`} className="dead-row">
                <td className="sticky-col player-name-cell dead-name">{d.name}</td>
                <td className="sticky-col-2"><span className="fa-badge dead">{d.reason.split(' ')[0]}</span></td>
                {YEARS.map(year => (
                  <td key={year} className={`year-cell ${d.contractEnd && d.contractEnd >= year ? 'dead-active' : 'empty'}`}>
                    {d.contractEnd && d.contractEnd >= year ? formatCap(d.capHit) : '—'}
                  </td>
                ))}
              </tr>
            ))}

            {/* Totals row */}
            <tr className="totals-row">
              <td className="sticky-col"><strong>TOTAL COMMITTED</strong></td>
              <td className="sticky-col-2"></td>
              {yearData.map(yd => (
                <td key={yd.year} className="year-cell total-cell">
                  <strong>{formatCap(yd.totalCommitted)}</strong>
                </td>
              ))}
            </tr>
            <tr className="totals-row cap-row">
              <td className="sticky-col">Cap Ceiling</td>
              <td className="sticky-col-2"></td>
              {yearData.map(yd => (
                <td key={yd.year} className="year-cell">{formatCap(yd.projected)}</td>
              ))}
            </tr>
            <tr className="totals-row space-row">
              <td className="sticky-col"><strong>CAP SPACE</strong></td>
              <td className="sticky-col-2"></td>
              {yearData.map(yd => (
                <td key={yd.year} className={`year-cell space-cell ${yd.capSpace < 0 ? 'over' : ''}`}>
                  <strong>{yd.capSpace >= 0 ? formatCap(yd.capSpace) : `-${formatCap(Math.abs(yd.capSpace))}`}</strong>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
