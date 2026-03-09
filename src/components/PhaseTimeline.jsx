export default function PhaseTimeline({ phases, currentIndex }) {
  return (
    <div className="phase-timeline">
      {phases.map((phase, i) => (
        <div key={phase.id} className={`phase-step ${i < currentIndex ? 'done' : ''} ${i === currentIndex ? 'active' : ''} ${i > currentIndex ? 'upcoming' : ''}`}>
          <div className="step-dot">
            {i < currentIndex ? '✓' : i + 1}
          </div>
          <div className="step-label">{phase.label}</div>
          {i < phases.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
}
