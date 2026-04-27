import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Challenge from './components/Challenge';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import AIIntelligence from './components/AIIntelligence';
import Testimonial from './components/Testimonial';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import BlogStudio from './components/BlogStudio';

const THEME_STORAGE_KEY = 'quantx-theme';
const BLOG_PATH = '/blog';
const BLOG_STUDIO_PATH = '/owner/blog';

const getSystemTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return ['dark', 'light', 'system'].includes(savedTheme) ? savedTheme : 'system';
};

const getCurrentLocation = () => ({
  pathname: window.location.pathname || '/',
  hash: window.location.hash || '',
});

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const [locationState, setLocationState] = useState(getCurrentLocation);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const currentPath = locationState.pathname || '/';

  const navigate = (targetPath) => {
    const nextUrl = new URL(targetPath, window.location.origin);
    const nextPathname = nextUrl.pathname || '/';
    const nextHash = nextUrl.hash || '';
    const currentUrl = `${window.location.pathname}${window.location.hash}`;
    const nextUrlString = `${nextPathname}${nextHash}`;

    if (nextUrlString !== currentUrl) {
      window.history.pushState({}, '', nextUrlString);
    }

    setLocationState({
      pathname: nextPathname,
      hash: nextHash,
    });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themePreference = theme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, theme]);

  useEffect(() => {
    const handlePopState = () => {
      setLocationState(getCurrentLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === '/' && locationState.hash) {
      window.requestAnimationFrame(() => {
        const targetElement = document.querySelector(locationState.hash);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPath, locationState.hash]);

  const renderPage = () => {
    if (currentPath === BLOG_PATH) {
      return <BlogPage onNavigateHome={(hash = '') => navigate(`/${hash}`)} />;
    }

    if (currentPath === BLOG_STUDIO_PATH) {
      return <BlogStudio />;
    }

    return (
      <>
        <Hero onNavigate={navigate} />
        <Ticker />
        <Challenge />
        <Services />
        <HowItWorks />
        <AIIntelligence />
        <Testimonial />
        <CTA />
      </>
    );
  };

  return (
    <>
      <Nav
        theme={theme}
        resolvedTheme={resolvedTheme}
        onThemeChange={setTheme}
        currentPath={currentPath}
        onNavigate={navigate}
      />
      {renderPage()}
      {currentPath !== BLOG_STUDIO_PATH ? <Footer onNavigate={navigate} /> : null}
    </>
  );
}

export default App;
