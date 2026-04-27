import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="section section-white" id="how">
      <div className="container">
        <div className="section-header">
          <div className="tag tag-light">Our Process</div>
          <h2 className="sh-title">From Complexity to <em>Clarity</em><br/>in Four Steps.</h2>
        </div>
        <div className="steps-row">
          <div className="step-card">
            <div className="step-num">01</div>
            <div className="step-title">Discovery</div>
            <div className="step-body">A thorough diagnostic of your finance function, systems, pain points, and growth ambitions. We understand before we prescribe.</div>
            <div className="step-connector"></div>
          </div>
          <div className="step-card">
            <div className="step-num">02</div>
            <div className="step-title">Architecture</div>
            <div className="step-body">We design a bespoke financial intelligence blueprint — the systems, processes, and structures your business needs to operate and scale.</div>
            <div className="step-connector"></div>
          </div>
          <div className="step-card">
            <div className="step-num">03</div>
            <div className="step-title">Deployment</div>
            <div className="step-body">Rapid, expert implementation of automation, cloud systems, reporting frameworks, and controls. Zero disruption, maximum impact.</div>
            <div className="step-connector"></div>
          </div>
          <div className="step-card">
            <div className="step-num">04</div>
            <div className="step-title">Mastery</div>
            <div className="step-body">Ongoing advisory, optimisation, and strategic partnership. We remain embedded so your financial intelligence compounds over time.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;