import './Hero.css';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero">
      {/* Decorative circles */}
      <div className="hero-circle-1"></div>
      <div className="hero-circle-2"></div>
      <div className="hero-circle-3"></div>
      <div className="hero-ring">
        {/* Dots on ring */}
        <div className="hero-dot" style={{ top: '4%', left: '50%', transform: 'translateX(-50%)' }}></div>
        <div className="hero-dot" style={{ top: '50%', right: 0, transform: 'translateY(-50%)' }}></div>
        <div className="hero-dot" style={{ bottom: '8%', left: '18%' }}></div>
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">Financial Intelligence & Transformation</div>
          <h1 className="hero-h1">
            Mastery of Finance,
            <br />
            <em>Data &amp; Analytics.</em>
          </h1>
          <p className="hero-body">
            We combine senior financial expertise with intelligent automation, giving growth-stage businesses the clarity, structure, and strategic insight to scale with confidence.
          </p>
          <div className="hero-actions">
            <button className="btn-primary-dark" onClick={() => onNavigate('/#contact')}>Book a Strategy Call</button>
            <button className="btn-outline-dark" onClick={() => onNavigate('/#services')}>Explore Services</button>
            <button className="btn-outline-dark" onClick={() => onNavigate('/blog')}>Read the Blog</button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-card">
            <div className="stat-num">Less</div>
            <div className="stat-label">Manual Entry</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-num">Faster</div>
            <div className="stat-label">Reporting</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-num">Greater</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-num">Live</div>
            <div className="stat-label">Financial Insights</div>
          </div>
          <div className="hero-stat-card featured">
            <div>
              <div className="stat-num" style={{ fontSize: '28px' }}>Technology-Enhanced Accounting</div>
              <div className="stat-label">Modern Accounting, Powered by Intelligence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
