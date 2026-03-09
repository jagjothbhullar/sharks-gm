// Offseason Report Card Grading System

export function gradeOffseason({ initialRoster, finalRoster, signings, buyouts, draftSelections, capInfo, keptFerraro, qualifiedRFAs, totalQualifiable, extensionDecisions = {} }) {
  const categories = [];

  // 1. Roster Improvement (30%)
  const initialOVR = initialRoster.reduce((sum, p) => sum + (p.overall || 0), 0);
  const finalOVR = finalRoster.reduce((sum, p) => sum + (p.overall || 0), 0);
  const ovrDiff = finalOVR - initialOVR;
  const rosterScore = Math.min(100, Math.max(0, 50 + ovrDiff * 2));
  categories.push({
    name: 'Roster Improvement',
    score: rosterScore,
    weight: 0.3,
    detail: ovrDiff >= 0 ? `+${ovrDiff} total OVR` : `${ovrDiff} total OVR`,
  });

  // 2. Cap Management (20%)
  let capScore;
  if (capInfo.isOverCap) {
    capScore = 0;
  } else {
    const spacePct = capInfo.capSpace / capInfo.ceiling;
    if (spacePct >= 0.03 && spacePct <= 0.12) capScore = 100; // sweet spot
    else if (spacePct > 0.12 && spacePct <= 0.25) capScore = 80;
    else if (spacePct > 0.25) capScore = 60; // too much unused space
    else capScore = 70; // tight but compliant
  }
  categories.push({
    name: 'Cap Management',
    score: capScore,
    weight: 0.2,
    detail: capInfo.isOverCap ? 'OVER THE CAP!' : `${(capInfo.capSpace / 1e6).toFixed(1)}M in space`,
  });

  // 3. Draft Haul (20%)
  let draftScore = 50; // baseline if no picks used
  if (draftSelections.length > 0) {
    const avgPotential = draftSelections.reduce((sum, d) => sum + d.prospect.potential, 0) / draftSelections.length;
    draftScore = Math.min(100, Math.max(0, (avgPotential - 70) * 3.33));
  }
  categories.push({
    name: 'Draft Haul',
    score: Math.round(draftScore),
    weight: 0.2,
    detail: draftSelections.length > 0
      ? `${draftSelections.length} picks, avg potential ${(draftSelections.reduce((s, d) => s + d.prospect.potential, 0) / draftSelections.length).toFixed(0)}`
      : 'No picks made',
  });

  // 4. Core Retention (15%)
  let coreScore = 30;
  const extendedCelebrini = extensionDecisions?.celebrini === 'extended';
  if (extendedCelebrini) coreScore += 35;
  if (keptFerraro) coreScore += 20;
  if (totalQualifiable > 0) {
    coreScore += (qualifiedRFAs / totalQualifiable) * 15;
  } else {
    coreScore += 15;
  }
  coreScore = Math.min(100, coreScore);
  const coreDetails = [];
  coreDetails.push(extendedCelebrini ? 'Extended Celebrini' : 'Skipped Celebrini extension');
  coreDetails.push(keptFerraro ? 'Kept Ferraro' : 'Lost Ferraro');
  categories.push({
    name: 'Core Retention',
    score: Math.round(coreScore),
    weight: 0.15,
    detail: coreDetails.join(' · '),
  });

  // 5. Future Outlook (15%)
  const youngPlayers = finalRoster.filter(p => p.age <= 25).length;
  const highPotential = finalRoster.filter(p => (p.potential || 0) >= 85).length;
  let futureScore = Math.min(100, youngPlayers * 8 + highPotential * 12);
  categories.push({
    name: 'Future Outlook',
    score: Math.round(futureScore),
    weight: 0.15,
    detail: `${youngPlayers} players ≤25, ${highPotential} with 85+ potential`,
  });

  // Overall
  const weightedScore = categories.reduce((sum, c) => sum + c.score * c.weight, 0);
  const overallGrade = scoreToGrade(weightedScore);

  return { categories, weightedScore: Math.round(weightedScore), overallGrade };
}

function scoreToGrade(score) {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 85) return 'A-';
  if (score >= 80) return 'B+';
  if (score >= 75) return 'B';
  if (score >= 70) return 'B-';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 55) return 'C-';
  if (score >= 50) return 'D+';
  if (score >= 45) return 'D';
  if (score >= 40) return 'D-';
  return 'F';
}

export function gradeColor(grade) {
  if (grade.startsWith('A')) return '#00c853';
  if (grade.startsWith('B')) return '#00a3ad';
  if (grade.startsWith('C')) return '#ffc107';
  if (grade.startsWith('D')) return '#ff9800';
  return '#ff4444';
}
