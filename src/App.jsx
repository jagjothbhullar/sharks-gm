import { useState } from 'react';
import { useGMState } from './hooks/useGMState';
import { useGameFlow } from './hooks/useGameFlow';
import CapBar from './components/CapBar';
import PhaseTimeline from './components/PhaseTimeline';
import CBAGuide from './components/CBAGuide';

// Phase components
import SeasonRecap from './components/phases/SeasonRecap';
import BuyoutWindow from './components/phases/BuyoutWindow';
import QualifyingOffers from './components/phases/QualifyingOffers';
import TradePhase from './components/phases/TradePhase';
import DraftPhase from './components/phases/DraftPhase';
import FreeAgencyFrenzy from './components/phases/FreeAgencyFrenzy';
import ReSignOwn from './components/phases/ReSignOwn';
import ExtensionPhase from './components/phases/ExtensionPhase';
import OfferSheetPhase from './components/phases/OfferSheetPhase';
import TrainingCamp from './components/phases/TrainingCamp';

// Sandbox components
import RosterView from './components/RosterView';
import FreeAgency from './components/FreeAgency';
import DraftBoard from './components/DraftBoard';
import CapProjection from './components/CapProjection';
import ActivityLog from './components/ActivityLog';

import './App.css';

const SANDBOX_TABS = [
  { id: 'roster', label: 'Roster' },
  { id: 'cap', label: 'Cap by Year' },
  { id: 'freeagency', label: 'Free Agency' },
  { id: 'draft', label: 'Draft' },
  { id: 'log', label: 'Transactions' },
  { id: 'cba', label: 'CBA Guide' },
];

function App() {
  const gm = useGMState();
  const game = useGameFlow(gm);
  const [sandboxTab, setSandboxTab] = useState('roster');
  const [showCBA, setShowCBA] = useState(false);

  const exitToMenu = () => {
    if (window.confirm('Exit to main menu? All progress will be lost.')) {
      game.resetGame();
    }
  };

  // Landing screen — choose mode
  if (game.gameMode === null) {
    return (
      <div className="app">
        <Header />
        <main className="main-content landing-screen">
          <div className="landing-hero">
            <svg viewBox="0 0 80 80" className="landing-shark">
              <path d="M10 40 Q20 15 40 20 Q60 15 70 40 Q60 65 40 60 Q20 65 10 40Z" fill="#006D75" />
              <path d="M40 20 L40 8 L50 20" fill="#006D75" />
              <circle cx="28" cy="36" r="3" fill="white" />
              <circle cx="28" cy="36" r="1.5" fill="#111" />
            </svg>
            <h2>SHARKS GM MODE</h2>
            <p>The Sharks are on the rise — take the reins and push them into the playoffs</p>
          </div>
          <div className="mode-select">
            <button className="mode-card" onClick={game.startGame}>
              <h3>Play Offseason</h3>
              <p>
                Step through the offseason chronologically — buyouts, draft, free agency, extensions, and more.
                Compete against other teams for talent. Get graded at the end.
              </p>
              <span className="mode-tag">Recommended</span>
            </button>
            <button className="mode-card sandbox" onClick={game.enterSandbox}>
              <h3>Sandbox Mode</h3>
              <p>
                Full access to all tools — roster, cap projections, free agents, draft board.
                No structure, no AI competition. Explore freely.
              </p>
              <span className="mode-tag">Freeform</span>
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sandbox mode
  if (game.gameMode === 'sandbox') {
    return (
      <div className="app">
        <Header onExit={exitToMenu} onToggleCBA={() => setShowCBA(!showCBA)} showExitBtn showCBABtn />
        <CapBar capInfo={gm.capInfo} />
        <nav className="tab-nav">
          {SANDBOX_TABS.map(tab => (
            <button key={tab.id} className={`nav-tab ${sandboxTab === tab.id ? 'active' : ''}`} onClick={() => setSandboxTab(tab.id)}>
              <span className="tab-label">{tab.label}</span>
              {tab.id === 'roster' && gm.pendingFAs.length > 0 && <span className="badge">{gm.pendingFAs.length}</span>}
              {tab.id === 'log' && gm.log.length > 0 && <span className="badge">{gm.log.length}</span>}
            </button>
          ))}
        </nav>
        <main className="main-content">
          {sandboxTab === 'roster' && <RosterView roster={gm.roster} signings={gm.signings} pendingFAs={gm.pendingFAs} onBuyout={gm.buyoutPlayer} onReSign={gm.reSign} onLetWalk={gm.letWalk} />}
          {sandboxTab === 'cap' && <CapProjection roster={gm.roster} signings={gm.signings} />}
          {sandboxTab === 'freeagency' && <FreeAgency availableUFAs={gm.availableUFAs} availableRFAs={gm.availableRFAs} capSpace={gm.capInfo.capSpace} onSignUFA={gm.signUFA} onOfferSheet={gm.offerSheet} />}
          {sandboxTab === 'draft' && <DraftBoard draftPicks={gm.draftPicks} draftProspects={gm.draftProspects} draftSelections={gm.draftSelections} onDraft={gm.draftProspect} />}
          {sandboxTab === 'log' && <ActivityLog log={gm.log} deadCap={gm.deadCap} prospects={gm.prospects} />}
          {sandboxTab === 'cba' && <CBAGuide />}
        </main>
        {showCBA && (
          <div className="cba-drawer-overlay" onClick={() => setShowCBA(false)}>
            <div className="cba-drawer" onClick={e => e.stopPropagation()}>
              <button className="drawer-close" onClick={() => setShowCBA(false)}>×</button>
              <CBAGuide />
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }

  // ===== GAME MODE =====
  const phase = game.currentPhase;

  return (
    <div className="app">
      <Header onExit={exitToMenu} onToggleCBA={() => setShowCBA(!showCBA)} showExitBtn showCBABtn />
      <CapBar capInfo={gm.capInfo} />
      <PhaseTimeline phases={game.phases} currentIndex={game.phaseIndex} />

      {/* Phase Date Header */}
      <div className="phase-date-header">
        <span className="phase-date">{phase.date}</span>
        <span className="phase-title">{phase.label}</span>
      </div>

      <main className="main-content">
        {phase.id === 'SEASON_RECAP' && (
          <SeasonRecap
            capInfo={gm.capInfo}
            roster={gm.roster}
            pendingFAs={gm.pendingFAs}
            prospects={gm.prospects}
            deadCap={gm.deadCap}
            onBegin={game.advancePhase}
          />
        )}
        {phase.id === 'BUYOUT_WINDOW' && (
          <BuyoutWindow
            roster={gm.roster}
            onBuyout={gm.buyoutPlayer}
            onAdvance={game.advancePhase}
          />
        )}
        {phase.id === 'QUALIFYING_OFFERS' && (
          <QualifyingOffers
            pendingFAs={gm.pendingFAs}
            qoDecisions={game.qoDecisions}
            onDecision={game.makeQoDecision}
            onConfirm={game.confirmQualifyingOffers}
          />
        )}
        {phase.id === 'TRADES' && (
          <TradePhase
            roster={gm.roster}
            draftPicks={gm.draftPicks}
            capSpace={gm.capInfo.capSpace}
            onExecuteTrade={gm.executeTrade}
            onAdvance={game.advancePhase}
          />
        )}
        {phase.id === 'NHL_DRAFT' && (
          <DraftPhase
            draftProspects={gm.draftProspects}
            draftPicks={gm.draftPicks}
            draftSimState={game.draftSimState}
            onAdvanceDraft={game.advanceDraft}
            onUserPick={game.userDraftPick}
            onAdvancePhase={game.advancePhase}
          />
        )}
        {phase.id === 'FREE_AGENCY' && (
          <FreeAgencyFrenzy
            availableUFAs={gm.availableUFAs}
            capSpace={gm.capInfo.capSpace}
            faRound={game.faRound}
            aiSignings={game.aiSignings}
            userPassed={game.userPassed}
            onSignUFA={gm.signUFA}
            onRunRound={game.runFaRound}
            onPass={game.passFaRound}
            onAdvance={game.advancePhase}
          />
        )}
        {phase.id === 'RESIGN_OWN' && (
          <ReSignOwn
            pendingFAs={gm.pendingFAs}
            capSpace={gm.capInfo.capSpace}
            onReSign={gm.reSign}
            onLetWalk={gm.letWalk}
            onAdvance={game.advancePhase}
            onTrackFerraro={game.trackFerraro}
          />
        )}
        {phase.id === 'EXTENSIONS' && (
          <ExtensionPhase
            extensionEligible={gm.extensionEligible}
            roster={gm.roster}
            capSpace={gm.capInfo.capSpace}
            onExtend={gm.extendPlayer}
            extensionDecisions={game.extensionDecisions}
            setExtensionDecisions={game.setExtensionDecisions}
            onAdvance={game.advancePhase}
          />
        )}
        {phase.id === 'OFFER_SHEETS' && (
          <OfferSheetPhase
            availableRFAs={gm.availableRFAs}
            capSpace={gm.capInfo.capSpace}
            draftPicks={gm.draftPicks}
            onOfferSheet={gm.offerSheet}
            simulateMatch={game.simulateOfferSheetMatch}
            offerSheetResult={game.offerSheetResult}
            onAdvance={game.advancePhase}
          />
        )}
        {phase.id === 'TRAINING_CAMP' && (
          <TrainingCamp
            roster={gm.roster}
            signings={gm.signings}
            capInfo={gm.capInfo}
            log={gm.log}
            draftSelections={gm.draftSelections}
            initialRoster={game.initialRoster}
            keptFerraro={game.keptFerraro}
            qoDecisions={game.qoDecisions}
            pendingFAs={gm.pendingFAs}
            extensionDecisions={game.extensionDecisions}
            onReset={game.resetGame}
          />
        )}
      </main>

      {/* CBA Drawer */}
      {showCBA && (
        <div className="cba-drawer-overlay" onClick={() => setShowCBA(false)}>
          <div className="cba-drawer" onClick={e => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setShowCBA(false)}>×</button>
            <CBAGuide />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function Header({ onExit, onToggleCBA, showExitBtn, showCBABtn }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <svg viewBox="0 0 40 40" className="shark-icon">
            <path d="M5 20 Q10 8 20 10 Q30 8 35 20 Q30 32 20 30 Q10 32 5 20Z" fill="#006D75" />
            <path d="M20 10 L20 4 L25 10" fill="#006D75" />
            <circle cx="14" cy="18" r="2" fill="white" />
            <circle cx="14" cy="18" r="1" fill="#111" />
          </svg>
        </div>
        <div>
          <h1>SHARKS GM MODE</h1>
          <p className="subtitle">2026 Offseason Simulator</p>
        </div>
      </div>
      <div className="header-right">
        {showCBABtn && (
          <button className="btn btn-header" onClick={onToggleCBA} title="CBA Guide">
            CBA Guide
          </button>
        )}
        <span className="season-badge">2026-27 Season</span>
        {showExitBtn && (
          <button className="btn btn-header btn-exit" onClick={onExit} title="Exit to Main Menu">
            Exit
          </button>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <p>Sharks GM Mode — Build a playoff roster for the San Jose Sharks</p>
      <p className="sources">Data: PuckPedia, Spotrac, CapWages, NHL.com. Projected values are estimates.</p>
    </footer>
  );
}

export default App;
