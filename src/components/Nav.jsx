import { useEffect, useState } from 'react';
import './Nav.css';

const themeOptions = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

const Nav = ({ theme, resolvedTheme, onThemeChange, currentPath, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (targetPath) => {
    handleMenuClose();
    onNavigate(targetPath);
  };

  const isHomePage = currentPath === '/';

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button type="button" className="nav-logo-btn" onClick={() => handleNavigate('/')}>
          <div className="logo-mark">
            {/*<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="43" height="43" stroke="var(--logo-mark-stroke)" strokeWidth="1" fill="none" />
              <circle cx="20" cy="20" r="13.5" fill="var(--logo-mark-body)" />
              <circle cx="20" cy="20" r="7.5" fill="var(--logo-mark-core)" />
              <rect x="24" y="26" width="12" height="10" fill="var(--logo-mark-core)" />
              <line x1="27" y1="29" x2="37" y2="39" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="37" cy="39" r="2.2" fill="#C9A84C" />
            </svg>*/}
          </div>
          <div className="logo-text">
            <div className="logo-name">QUANT <span className="logo-x">X</span></div>
            <div className="logo-sub">Financial Intelligence</div>
          </div>
        </button>

        <button
          type="button"
          className={`nav-toggle${isMenuOpen ? ' open' : ''}`}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={handleMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu${isMenuOpen ? ' open' : ''}`} id="mobile-navigation">
          <ul className="nav-links">
            <li><button type="button" className="nav-link-btn" onClick={() => handleNavigate('/#services')}>Services</button></li>
            <li><button type="button" className="nav-link-btn" onClick={() => handleNavigate('/#how')}>How It Works</button></li>
            <li><button type="button" className="nav-link-btn" onClick={() => handleNavigate('/#intelligence')}>AI Intelligence</button></li>
            <li><button type="button" className="nav-link-btn" onClick={() => handleNavigate('/blog')}>Blog</button></li>
            {isHomePage ? null : <li><button type="button" className="nav-link-btn" onClick={() => handleNavigate('/')}>Home</button></li>}
          </ul>

          <div className="nav-actions">
            <div className="theme-toggle" role="group" aria-label="Theme switcher">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`theme-toggle-btn${theme === option.value ? ' active' : ''}`}
                  aria-pressed={theme === option.value}
                  onClick={() => onThemeChange(option.value)}
                  title={option.value === 'system' ? `System theme (${resolvedTheme})` : `${option.label} theme`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button className="nav-cta" onClick={() => handleNavigate('/#contact')}>Book a Call</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
