import './Footer.css';

const Footer = ({ onNavigate }) => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo-lockup">
              {/*<div className="logo-mark">
                <svg width="38" height="38" viewBox="0 0 44 44" fill="none">
                  <rect x="0.5" y="0.5" width="43" height="43" stroke="var(--logo-mark-stroke)" strokeWidth="1" fill="none" />
                  <circle cx="20" cy="20" r="13.5" fill="var(--logo-mark-body)" />
                  <circle cx="20" cy="20" r="7.5" fill="var(--logo-mark-core)" />
                  <rect x="24" y="26" width="12" height="10" fill="var(--logo-mark-core)" />
                  <line x1="27" y1="29" x2="37" y2="39" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="37" cy="39" r="2.2" fill="#C9A84C" />
                </svg>
              </div>*/}
              <div className="logo-text">
                <div className="logo-name">QUANT <span className="logo-x">X</span></div>
                <div className="logo-sub">Financial Intelligence</div>
              </div>
            </div>
            <div className="footer-brand-body">
              Financial Intelligence &amp; Transformation Consultancy. Built for SMEs and growth-stage businesses that demand more than compliance.
            </div>
            <div className="footer-tagline-pill">Mastery of Finance, Data &amp; Analytics</div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><a href="#">FinanceClear</a></li>
              <li><a href="#">OperaFlow</a></li>
              <li><a href="#">AuditShield</a></li>
              <li><a href="#">CloudStack</a></li>
              <li><a href="#">Automate</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><button type="button" className="footer-link-btn" onClick={() => onNavigate('/blog')}>Blog</button></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-contact">
              <a href="mailto:quantx.jm@gmail.com">quantx.jm@gmail.com</a><br />
              {/*+44 (0)20 0000 0000<br /><br />*/}
              <button type="button" className="footer-link-btn footer-contact-btn" onClick={() => onNavigate('/#contact')}>Book a Discovery Session {'->'}</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">Copyright 2026 Quant X Financial Intelligence. All rights reserved.</div>
          <div className="footer-copy">Privacy Policy · Cookie Policy</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
