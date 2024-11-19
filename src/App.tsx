import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FuneralSearch from './components/FuneralSearch';
import DonationPage from './pages/DonationPage';
import { Language, Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('tr');
  const [authModal, setAuthModal] = useState<{ isOpen: boolean }>({
    isOpen: false,
  });
  const [showDonationPage, setShowDonationPage] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const mainContent = (
    <>
      <Hero language={language} />
      <AboutSection language={language} />
      <FuneralSearch language={language} />
      <EventsSection language={language} />
      <NewsSection language={language} />
      <ContactSection language={language} />
      <Footer language={language} />
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false })}
        language={language}
      />
    </>
  );

  const donationContent = (
    <>
      <DonationPage language={language} />
      <Footer language={language} />
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false })}
        language={language}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar
        theme={theme}
        language={language}
        onThemeChange={setTheme}
        onLanguageChange={setLanguage}
        onAuth={() => setAuthModal({ isOpen: true })}
        onDonate={() => setShowDonationPage(true)}
        onHome={() => setShowDonationPage(false)}
      />
      {showDonationPage ? donationContent : mainContent}
    </div>
  );
}

export default App;