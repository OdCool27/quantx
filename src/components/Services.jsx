import './Services.css';

const Services = () => {
  return (
    <section className="section section-dark" id="services">
      <div className="container">
        <div className="section-header centered">
          <div className="tag tag-dark" style={{ justifyContent: 'center' }}>Our Services</div>
          <h2 className="sh-title dark" style={{ textAlign: 'center' }}>Five Flagship Offerings.</h2>
          <p className="sh-body dark centered">One firm. Five complete financial transformations. Built for ambition.</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="sc-index">01</div>
            <div className="sc-icon-wrap">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M3 17l4-6 4 4 4-8 4 5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 20h18" stroke="var(--inverse-dim)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="sc-name">FinanceClear</div>
            <div className="sc-badge">Reporting &amp; Investor Readiness</div>
            <div className="sc-desc">Board-level reporting packs, investor-ready statements, and strategic financial narratives. We transform raw figures into compelling stories that open doors, from lenders to Series A investors.</div>
            {/*<div className="sc-arrow">{'->'}</div>*/}
          </div>

          <div className="service-card">
            <div className="sc-index">02</div>
            <div className="sc-icon-wrap">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="sc-name">OperaFlow</div>
            <div className="sc-badge">Process Optimisation</div>
            <div className="sc-desc">End-to-end process mapping, bottleneck elimination, and operational efficiency design. We rebuild your finance function for speed, accuracy, and scale.</div>
            {/*<div className="sc-arrow">{'->'}</div>*/}
          </div>

          <div className="service-card">
            <div className="sc-index">03</div>
            <div className="sc-icon-wrap">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="sc-name">AuditShield</div>
            <div className="sc-badge">Audit Preparation &amp; Controls</div>
            <div className="sc-desc">Comprehensive audit readiness and internal control strengthening. We get your organisation audit-ready before the auditors arrive, eliminating surprises and reducing costs.</div>
            {/*<div className="sc-arrow">{'->'}</div>*/}
          </div>

          <div className="service-card">
            <div className="sc-index">04</div>
            <div className="sc-icon-wrap">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12h6v10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="sc-name">CloudStack</div>
            <div className="sc-badge">Cloud Accounting &amp; Systems</div>
            <div className="sc-desc">Expert implementation of cloud accounting ecosystems, Xero, QuickBooks, Sage, and NetSuite, built for intelligence and automation from the ground up.</div>
            {/*<div className="sc-arrow">{'->'}</div>*/}
          </div>

          <div className="service-card">
            <div className="sc-index">05</div>
            <div className="sc-icon-wrap">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 015 5v2H7V7a5 5 0 015-5z" stroke="#C9A84C" strokeWidth="1.5" />
                <path d="M3 9h18l-2 11H5L3 9z" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="sc-name">Automate</div>
            <div className="sc-badge">AI &amp; Digital Transformation</div>
            <div className="sc-desc">AI-driven reconciliation, intelligent reporting pipelines, and full automation roadmaps. Your team focuses on strategic insight, not manual input.</div>
            {/*<div className="sc-arrow">{'->'}</div>*/}
          </div>

          <div className="service-card" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: '1px dashed var(--inverse-border-strong)', background: 'transparent' }}>
            <div style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: '18px', color: 'var(--inverse-muted)', marginBottom: '20px', lineHeight: '1.5' }}>"Not sure which service fits your needs?"</div>
            <button className="btn-primary-dark" onClick={()=> window.location.hash = "contact"}>Book a Free Discovery Call</button>
          </div>

          <div className="services-cta-card">
            <div className="scc-text">Trusted by ambitious SMEs and growth-stage businesses.<br /><span>Senior expertise, intelligently delivered.</span></div>
            <button className="btn-navy">Explore All Services {'->'}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
