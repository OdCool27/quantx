import './AIIntelligence.css';

const AIIntelligence = () => {
  return (
    <section className="section section-dark" id="intelligence">
      <div className="container">
        <div className="ai-split">
          <div>
            <div className="tag tag-dark">AI Intelligence</div>
            <h2 className="sh-title dark" style={{ marginTop: '16px' }}>
              Powered by Data.<br />
              <em style={{ color: 'var(--inverse-soft)' }}>Built for Growth.</em>
            </h2>
            <p className="sh-body dark" style={{ marginTop: '20px' }}>
              We do not merely use AI, we embed it into every engagement. The result is a finance function that operates faster, smarter, and with complete transparency, backed by real market intelligence.
            </p>

            <div className="ai-features">
              <div className="ai-feat">
                <div className="ai-feat-num">01</div>
                <div>
                  <div className="ai-feat-title">AI-Driven Reconciliation</div>
                  <div className="ai-feat-body">Automated matching that eliminates hours of manual work and near-eliminates error rates across your accounts.</div>
                </div>
              </div>
              <div className="ai-feat">
                <div className="ai-feat-num">02</div>
                <div>
                  <div className="ai-feat-title">Intelligent Reporting Pipelines</div>
                  <div className="ai-feat-body">Real-time dashboards and automated report generation for boards, investors, and senior leadership.</div>
                </div>
              </div>
              <div className="ai-feat">
                <div className="ai-feat-num">03</div>
                <div>
                  <div className="ai-feat-title">Predictive Cash Flow</div>
                  <div className="ai-feat-body">Forward-looking intelligence so you never face a cash crisis unprepared, anticipate before you react.</div>
                </div>
              </div>
              <div className="ai-feat">
                <div className="ai-feat-num">04</div>
                <div>
                  <div className="ai-feat-title">Continuous Controls Monitoring</div>
                  <div className="ai-feat-body">Always-on internal control surveillance with instant anomaly detection and alert escalation.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard">
            <div className="db-topbar">
              <div className="db-title-text">Quant X · SME Intelligence</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.16em', textTransform: 'uppercase', background: 'rgba(201, 168, 76, 0.15)', color: '#C9A84C', border: '1px solid rgba(201, 168, 76, 0.25)', padding: '3px 9px' }}>MSME 2023-24</span>
              </div>
            </div>

            <div className="db-metrics">
              <div className="db-metric">
                <div className="db-metric-val gold">J$207B</div>
                <div className="db-metric-lbl">MSME Sector Sales</div>
              </div>
              <div className="db-metric">
                <div className="db-metric-val up">+5.1%</div>
                <div className="db-metric-lbl">GDP Growth Q3</div>
              </div>
              <div className="db-metric">
                <div className="db-metric-val">90%<span style={{ fontSize: '11px', color: 'var(--inverse-dim)' }}>+</span></div>
                <div className="db-metric-lbl">Of All Businesses</div>
              </div>
            </div>

            <div className="db-body">
              <div className="db-chart-lbl">MSME Monthly Revenue Index (Jamaica 2023)</div>
              <div className="db-bars">
                <div className="bar"><div className="bar-fill" style={{ height: '58%' }}></div></div>
                <div className="bar"><div className="bar-fill" style={{ height: '52%' }}></div></div>
                <div className="bar"><div className="bar-fill" style={{ height: '63%' }}></div></div>
                <div className="bar"><div className="bar-fill" style={{ height: '70%' }}></div></div>
                <div className="bar"><div className="bar-fill bar-up" style={{ height: '76%' }}></div></div>
                <div className="bar"><div className="bar-fill bar-up" style={{ height: '82%' }}></div></div>
                <div className="bar"><div className="bar-fill bar-up" style={{ height: '100%' }}></div></div>
                <div className="bar"><div className="bar-fill" style={{ height: '94%' }}></div></div>
                <div className="bar"><div className="bar-fill" style={{ height: '78%' }}></div></div>
                <div className="bar"><div className="bar-fill" style={{ height: '71%' }}></div></div>
                <div className="bar"><div className="bar-fill bar-up" style={{ height: '88%' }}></div></div>
                <div className="bar"><div className="bar-fill bar-up" style={{ height: '97%' }}></div></div>
              </div>
            </div>

            <div style={{ padding: '12px 18px 14px', borderTop: '1px solid var(--inverse-border)' }}>
              <div style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--inverse-dim)', marginBottom: '12px' }}>MSME Sector Distribution</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--inverse-faint)', width: '80px', letterSpacing: '0.08em' }}>Services</div>
                  <div style={{ flex: 1, height: '4px', background: 'var(--inverse-grid)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '100%', width: '68%', background: '#C9A84C', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: 'var(--inverse-soft)', width: '28px', textAlign: 'right' }}>68%</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--inverse-faint)', width: '80px', letterSpacing: '0.08em' }}>Trade</div>
                  <div style={{ flex: 1, height: '4px', background: 'var(--inverse-grid)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '100%', width: '19%', background: '#C9A84C', borderRadius: '2px', opacity: '0.6' }}></div></div>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: 'var(--inverse-soft)', width: '28px', textAlign: 'right' }}>19%</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--inverse-faint)', width: '80px', letterSpacing: '0.08em' }}>Manufacturing</div>
                  <div style={{ flex: 1, height: '4px', background: 'var(--inverse-grid)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '100%', width: '9%', background: 'var(--inverse-border-ghost)', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: 'var(--inverse-soft)', width: '28px', textAlign: 'right' }}>9%</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--inverse-faint)', width: '80px', letterSpacing: '0.08em' }}>Tourism</div>
                  <div style={{ flex: 1, height: '4px', background: 'var(--inverse-grid)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '100%', width: '4%', background: 'var(--inverse-border-strong)', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '9px', fontWeight: '700', color: 'var(--inverse-soft)', width: '28px', textAlign: 'right' }}>4%</div>
                </div>
              </div>
            </div>

            <div className="db-row">
              <div className="db-row-label">SMEs Lacking Investor-Ready Financials</div>
              <div className="db-row-val" style={{ color: '#FF6B6B' }}>~78%</div>
            </div>
            <div className="db-row">
              <div className="db-row-label">DBJ / JDB Financing Disbursed (2023)</div>
              <div className="db-row-val gold">J$335M+</div>
            </div>
            <div className="db-row">
              <div className="db-row-label">BoJ Policy Rate (2024)</div>
              <div className="db-row-val">6.00%</div>
            </div>
            <div className="db-row" style={{ background: 'rgba(201, 168, 76, 0.05)', borderTop: '1px solid rgba(201, 168, 76, 0.12)' }}>
              <div className="db-row-label" style={{ color: 'rgba(201, 168, 76, 0.7)' }}>Quant X Clients - Avg Revenue Growth</div>
              <div className="db-row-val gold">+23.4%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIIntelligence;
