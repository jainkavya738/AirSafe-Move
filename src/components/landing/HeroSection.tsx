import { motion } from 'framer-motion';
import { Wind, Shield, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen gradient-hero overflow-x-hidden">

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative container mx-auto px-4 pt-20 pb-12">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-sky rounded-xl flex items-center justify-center shadow-medium">
              <Wind className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">AirSafe Move</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <Button variant="clean" size="sm" onClick={onGetStarted}>
              Start Planning
            </Button>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Migration Advisor</span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Migrate to{' '}
              <span className="text-gradient">Cleaner Air</span>
              <br />
              Live Healthier
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Make data-driven relocation decisions with AI. Find cities with better air quality, 
              affordable living, and career opportunities tailored to your profile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" onClick={onGetStarted}>
                Find Your City
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-12 p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm max-w-xl"
            >
              <div className="text-center flex-1 min-w-[80px]">
                <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground whitespace-nowrap">25+</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 whitespace-nowrap">Cities Analyzed</div>
              </div>
              <div className="text-center flex-1 min-w-[80px] border-x border-border/50 px-4">
                <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground whitespace-nowrap">5 Year</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 whitespace-nowrap">AQI Data</div>
              </div>
              <div className="text-center flex-1 min-w-[80px]">
                <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-accent whitespace-nowrap">100%</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 whitespace-nowrap">Free to Use</div>
              </div>
            </motion.div>
          </motion.div>

          {/* AQI Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                className="glass-card rounded-3xl p-8 shadow-large"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 aqi-hazardous rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold">285</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Delhi</div>
                    <div className="text-sm text-muted-foreground">Current AQI - Hazardous</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-sky"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 aqi-good rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold">48</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Shimla</div>
                    <div className="text-sm text-muted-foreground">Target AQI - Good</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                  <div className="flex items-center gap-2 text-accent">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">83% AQI Improvement</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Significant health benefits expected
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 gradient-sky rounded-full shadow-glow"
                animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-sm font-semibold text-primary-foreground">AI Recommended</span>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">320 km</div>
                    <div className="text-xs text-muted-foreground">Distance</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
