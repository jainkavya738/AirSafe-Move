import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { MigrationForm } from '@/components/form/MigrationForm';
import { ResultsPage } from '@/components/results/ResultsPage';
import { UserProfile, MigrationReport } from '@/types/migration';
import { generateRecommendations } from '@/utils/migrationEngine';

type AppView = 'landing' | 'form' | 'results';

const Index = () => {
  const [view, setView] = useState<AppView>('landing');
  const [report, setReport] = useState<MigrationReport | null>(null);

  const handleGetStarted = () => {
    setView('form');
  };

  const handleFormSubmit = (profile: UserProfile) => {
    try {
      const generatedReport = generateRecommendations(profile);
      setReport(generatedReport);
      setView('results');
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  };

  const handleBackToLanding = () => {
    setView('landing');
  };

  const handleBackToForm = () => {
    setView('form');
  };

  const handleStartOver = () => {
    setReport(null);
    setView('form');
  };

  return (
    <>
      <Helmet>
        <title>AirSafe Move - AI-Powered AQI Migration Advisor for India</title>
        <meta
          name="description"
          content="Make data-driven relocation decisions with AI. Find cities with better air quality, affordable living, and career opportunities tailored to your profile."
        />
        <meta name="keywords" content="AQI, air quality, migration, India, relocation, clean air, pollution, health" />
      </Helmet>

      {view === 'landing' && (
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <HowItWorksSection />
          <FeaturesSection />
          
          {/* Footer */}
          <footer className="bg-card border-t border-border py-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground text-sm">
                © 2024 AirSafe Move. An AI-powered solution for healthier migration decisions.
              </p>
              <p className="text-muted-foreground/60 text-xs mt-2">
                Data is indicative and based on historical averages. Always verify before making decisions.
              </p>
            </div>
          </footer>
        </>
      )}

      {view === 'form' && (
        <MigrationForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
      )}

      {view === 'results' && report && (
        <ResultsPage
          report={report}
          onBack={handleBackToForm}
          onStartOver={handleStartOver}
        />
      )}
    </>
  );
};

export default Index;
