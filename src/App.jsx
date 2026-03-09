import { useState } from 'react';
import { useGMState } from './hooks/useGMState';
import CapBar from './components/CapBar';
import RosterView from './components/RosterView';
import FreeAgency from './components/FreeAgency';
import DraftBoard from './components/DraftBoard';
import CBAGuide from './components/CBAGuide';
import CapProjection from './components/CapProjection';
import ActivityLog from './components/ActivityLog';
import './App.css';

const TABS = [
  { id: 'roster', label: 'Roster' },
  { id: 'cap', label: 'Cap by Year' },
  { id: 'freeagency', label: 'Free Agency' },
  { id: 'draft', label: 'Draft' },
  { id: 'log', label: 'Transactions' },
  { id: 'cba', label: 'CBA Guide' },
];

function App() {
  const [activeTab, setActiveTab] = useState('roster');
  const gm = useGMState();

  return (
    <div className="app">
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
          <span className="season-badge">2026-27 Season</span>
        </div>
      </header>

      <CapBar capInfo={gm.capInfo} />

      <nav className="tab-nav">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-label">{tab.label}</span>
            {tab.id === 'roster' && gm.pendingFAs.length > 0 && (
              <span className="badge">{gm.pendingFAs.length}</span>
            )}
            {tab.id === 'log' && gm.log.length > 0 && (
              <span className="badge">{gm.log.length}</span>
            )}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'roster' && (
          <RosterView
            roster={gm.roster}
            signings={gm.signings}
            pendingFAs={gm.pendingFAs}
            onBuyout={gm.buyoutPlayer}
            onReSign={gm.reSign}
            onLetWalk={gm.letWalk}
          />
        )}
        {activeTab === 'cap' && (
          <CapProjection
            roster={gm.roster}
            signings={gm.signings}
          />
        )}
        {activeTab === 'freeagency' && (
          <FreeAgency
            availableUFAs={gm.availableUFAs}
            availableRFAs={gm.availableRFAs}
            capSpace={gm.capInfo.capSpace}
            onSignUFA={gm.signUFA}
            onOfferSheet={gm.offerSheet}
          />
        )}
        {activeTab === 'draft' && (
          <DraftBoard
            draftPicks={gm.draftPicks}
            draftProspects={gm.draftProspects}
            draftSelections={gm.draftSelections}
            onDraft={gm.draftProspect}
          />
        )}
        {activeTab === 'log' && (
          <ActivityLog
            log={gm.log}
            deadCap={gm.deadCap}
            prospects={gm.prospects}
          />
        )}
        {activeTab === 'cba' && <CBAGuide />}
      </main>

      <footer className="app-footer">
        <p>Sharks GM Mode — Learn the NHL CBA through the lens of the San Jose Sharks</p>
        <p className="sources">Data: PuckPedia, Spotrac, CapWages, NHL.com. Projected values are estimates.</p>
      </footer>
    </div>
  );
}

export default App;
