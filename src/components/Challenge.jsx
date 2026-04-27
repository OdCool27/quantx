import './Challenge.css';

const Challenge = () => {
  return (
    <section className="section section-white" id="challenge">
      <div className="container">
        <div className="challenge-grid">
          <div className="challenge-left">
            <div className="section-header">
              <div className="tag tag-light">The Challenge</div>
              <h2 className="sh-title">
                Financial Complexity<br />is Slowing<br /><em>You Down.</em>
              </h2>
              <p className="sh-body">
                Most businesses hold an abundance of financial data and a scarcity of financial insight. Quant X bridges that gap permanently and measurably.
              </p>
            </div>
            <button className="btn-primary-dark" style={{ background: 'var(--page-text)', color: 'var(--page-bg)', borderColor: 'var(--page-text)' }} onClick={()=> window.location.hash = "intelligence"}>See How We Solve It {'->'}</button>
          </div>
          <div className="challenge-right">
            <div className="challenge-cards">
              <div className="challenge-card">
                <div className="cc-num">01</div>
                <div>
                  <div className="cc-title">No Real-Time Financial Visibility</div>
                  <div className="cc-body">Outdated reports and disconnected systems leave leadership making high-stakes decisions on stale information. We build always-on financial intelligence.</div>
                </div>
              </div>
              <div className="challenge-card">
                <div className="cc-num">02</div>
                <div>
                  <div className="cc-title">Manual, Fragmented Processes</div>
                  <div className="cc-body">Hours disappear into reconciliation and spreadsheet chaos. We automate every financial workflow and eliminate the manual burden entirely.</div>
                </div>
              </div>
              <div className="challenge-card">
                <div className="cc-num">03</div>
                <div>
                  <div className="cc-title">Not Investor or Audit Ready</div>
                  <div className="cc-body">Weak financial presentation costs funding and credibility. We build the reporting infrastructure and narratives that open boardrooms and close rounds.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
