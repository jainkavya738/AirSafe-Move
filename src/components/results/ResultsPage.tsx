import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, Wind, TrendingDown, Shield, Heart, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MigrationReport } from '@/types/migration';
import { CityCard } from './CityCard';

interface ResultsPageProps {
  report: MigrationReport;
  onBack: () => void;
  onStartOver: () => void;
}

export function ResultsPage({ report, onBack, onStartOver }: ResultsPageProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="clean" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="clean" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Migration Readiness Report
            </h1>
            <p className="text-muted-foreground">
              For {report.userProfile.name} • Generated on {formatDate(report.generatedAt)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            <div className="glass-card rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 aqi-unhealthy rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <div className="font-display text-xl font-bold text-foreground">
                {report.currentCityAQI}
              </div>
              <div className="text-xs text-muted-foreground">Current AQI</div>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-accent/20 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div className="font-display text-xl font-bold text-accent">
                {report.targetAQI.min} - {report.targetAQI.max}
              </div>
              <div className="text-xs text-muted-foreground">Target AQI Range</div>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-primary/20 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display text-xl font-bold text-foreground">
                {report.aqiRiskReduction}%
              </div>
              <div className="text-xs text-muted-foreground">AQI Reduction</div>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-aqi-good/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-aqi-good" />
              </div>
              <div className="font-display text-xl font-bold text-aqi-good">
                +{report.estimatedLifeYearsGain}
              </div>
              <div className="text-xs text-muted-foreground">Life Years</div>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-primary/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display text-xl font-bold text-foreground">
                {report.overallReadinessScore}
              </div>
              <div className="text-xs text-muted-foreground">Readiness</div>
            </div>

            <div className="glass-card rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-display text-xl font-bold text-foreground">
                {report.recommendations.length}
              </div>
              <div className="text-xs text-muted-foreground">Cities</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-12">
        {report.recommendations.length > 0 ? (
          <>
            {/* AI Verdict */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 gradient-sky rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    AI Migration Advisory
                  </h2>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-foreground/90 bg-transparent p-0 border-0">
                    {report.aiVerdict}
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* City Cards */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Top {report.recommendations.length} Recommended Cities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {report.recommendations.map((city, index) => (
                  <CityCard
                    key={city.id}
                    city={city}
                    rank={index + 1}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Wind className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              No Cities Found
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn't find cities with better air quality within your specified distance.
              Try increasing your maximum migration distance.
            </p>
            <Button variant="hero" onClick={onStartOver}>
              Try Different Criteria
            </Button>
          </motion.div>
        )}

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="bg-muted/50 rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Your Profile Summary
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Current City:</span>
                <span className="ml-2 font-medium text-foreground">{report.userProfile.currentCity}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Profession:</span>
                <span className="ml-2 font-medium text-foreground">{report.userProfile.profession}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Max Distance:</span>
                <span className="ml-2 font-medium text-foreground">{report.userProfile.maxDistance} km</span>
              </div>
              <div>
                <span className="text-muted-foreground">Family Type:</span>
                <span className="ml-2 font-medium text-foreground capitalize">{report.userProfile.familyDetails.familyType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Family Members:</span>
                <span className="ml-2 font-medium text-foreground">
                  {report.userProfile.familyDetails.totalMembers} 
                  {report.userProfile.familyDetails.children > 0 && ` (${report.userProfile.familyDetails.children} children)`}
                  {report.userProfile.familyDetails.elderly > 0 && ` (${report.userProfile.familyDetails.elderly} elderly)`}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Health Concerns:</span>
                <span className="ml-2 font-medium text-foreground">
                  {report.userProfile.familyDetails.healthConditions.length > 0
                    ? `${report.userProfile.familyDetails.healthConditions.length} condition(s)`
                    : 'None reported'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="xl" onClick={onStartOver}>
            Start New Search
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
