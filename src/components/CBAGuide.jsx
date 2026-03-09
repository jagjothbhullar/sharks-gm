import { CBA, formatCap, maxPlayerSalary } from '../data/cba';

export default function CBAGuide() {
  return (
    <div className="cba-guide">
      <h2>NHL CBA Cheat Sheet</h2>
      <p className="subtitle">Everything you need to know to run the Sharks — 2026 offseason edition</p>

      <div className="cba-grid">
        <Section title="Salary Cap">
          <Item label="2025-26 Cap" value={formatCap(CBA.cap.current)} />
          <Item label="2026-27 Cap (projected)" value={formatCap(CBA.cap.projected)} />
          <Item label="2026-27 Floor" value={formatCap(CBA.cap.floor)} />
          <Item label="Max Player Salary" value={formatCap(maxPlayerSalary())} />
          <p className="note">Cap = total cap hits of all players on your roster. Calculated as AAV (Average Annual Value) of each contract. Must be under the ceiling and above the floor at all times during the season.</p>
        </Section>

        <Section title="Contract Types">
          <Item label="Max Term (own team)" value={`${CBA.contracts.maxTerm} years`} />
          <Item label="Max Term (new team UFA)" value={`${CBA.contracts.maxTermOther} years`} />
          <Item label="Minimum Salary" value={formatCap(CBA.contracts.minSalary)} />
          <Item label="ELC Term" value={`${CBA.contracts.elcTerm} years (always)`} />
          <Item label="ELC Max (2026 draft)" value={formatCap(CBA.contracts.elcMaxSalary2026)} />
          <p className="note">
            <strong>NMC</strong> (No-Movement Clause): Player can't be traded, waived, or sent down without consent.<br/>
            <strong>NTC</strong> (No-Trade Clause): Player can't be traded without consent. Modified NTC (M-NTC) = player submits a limited list of teams they'd accept a trade to.<br/>
            <strong>ELC</strong>: Entry-Level Contract. All drafted players must sign one. Always 3 years.
          </p>
        </Section>

        <Section title="Free Agency">
          <Item label="UFA Eligibility" value="Age 27+ OR 7 accrued NHL seasons" />
          <Item label="RFA Eligibility" value="Under 27 with fewer than 7 seasons" />
          <Item label="FA Opens" value={CBA.freeAgency.freeAgencyOpens} />
          <Item label="QO Deadline" value={CBA.freeAgency.qualifyingOfferDeadline} />
          <p className="note">
            <strong>UFA</strong>: Unrestricted. Can sign with any team. No compensation to old team.<br/>
            <strong>RFA</strong>: Restricted. Old team can match any offer. Must receive a Qualifying Offer (QO) by June 25 or becomes UFA.<br/>
            <strong>Qualifying Offer</strong>: 1-year deal at 100% of previous salary. If team doesn't extend one, player becomes UFA.<br/>
            <strong>Arbitration</strong>: RFAs with 4+ years of service can file for salary arbitration — an independent arbiter sets the salary.
          </p>
        </Section>

        <Section title="Offer Sheets">
          <p className="note">Any team can sign another team's RFA to an offer sheet. The original team has 7 days to match. If they don't match, they receive draft pick compensation based on the AAV:</p>
          <table className="mini-table">
            <thead><tr><th>AAV Range</th><th>Compensation</th></tr></thead>
            <tbody>
              {CBA.offerSheetTiers.map((tier, i) => {
                const prev = i > 0 ? CBA.offerSheetTiers[i-1].maxAAV : 0;
                return (
                  <tr key={i}>
                    <td>{formatCap(prev)} – {tier.maxAAV === Infinity ? '∞' : formatCap(tier.maxAAV)}</td>
                    <td>{tier.compensation.length === 0 ? 'None' : tier.compensation.join(' + ')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="note">Offer sheets can only be extended July 1 – December 1.</p>
        </Section>

        <Section title="Buyouts">
          <Item label="Window" value={CBA.buyouts.window} />
          <Item label="Cap Hit (age 26+)" value="2/3 remaining salary ÷ 2× remaining years" />
          <Item label="Cap Hit (under 26)" value="1/3 remaining salary ÷ 2× remaining years" />
          <p className="note">Buyouts remove the player from your roster but create dead cap space spread over double the remaining contract years. Use strategically to clear bad contracts.</p>
        </Section>

        <Section title="Trades">
          <Item label="Max Salary Retained" value="50% of cap hit" />
          <Item label="Max Retentions per Player" value="3 teams total" />
          <Item label="Retention Cooldown (NEW)" value="75 regular-season days between retentions" />
          <p className="note">
            The new 75-day rule prevents "double retention" trades where multiple teams would retain salary on the same deal in quick succession. This was a major change in the 2025 CBA update.<br/><br/>
            <strong>Playoff cap compliance (NEW)</strong>: Teams must now submit a 20-player game-day lineup under the cap for playoff games. No more LTIR-fueled super-teams.
          </p>
        </Section>

        <Section title="The Draft">
          <Item label="Rounds" value={CBA.draft.rounds} />
          <Item label="2026 Date" value={CBA.draft.date} />
          <Item label="Location" value={CBA.draft.location} />
          <Item label="Lottery Draws" value={`${CBA.draft.lotteryDraws} (picks 1 and 2)`} />
          <Item label="Max Lottery Jump" value={`${CBA.draft.maxJump} spots`} />
          <p className="note">Draft picks can be traded up to 3 years in advance. Teams must always have at least one pick in each of the first 3 rounds (can't trade all picks away).</p>
        </Section>

        <Section title="Roster & Waivers">
          <Item label="Active Roster Max" value={CBA.roster.maxActive} />
          <Item label="Max Contracts" value={CBA.roster.maxContracts} />
          <Item label="Waiver Exempt" value="First 2 NHL seasons or <11 games each season" />
          <p className="note">Players must clear waivers to be sent to the AHL (unless exempt). If claimed, the claiming team takes on the full contract. LTIR (Long-Term Injured Reserve) allows teams to exceed the cap by the injured player's cap hit, but with restrictions.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="cba-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div className="cba-item">
      <span className="cba-label">{label}</span>
      <span className="cba-value">{value}</span>
    </div>
  );
}
