import { motion } from 'framer-motion';
import { MapPin, Home, Heart, TrendingUp, AlertTriangle } from 'lucide-react';
import { CityRecommendation } from '@/types/migration';
import { getAQICategoryLabel } from '@/data/indianCities';

interface CityCardProps {
  city: CityRecommendation;
  rank: number;
  index: number;
}

export function CityCard({ city, rank, index }: CityCardProps) {
  const aqiColorClass = {
    good: 'aqi-good',
    moderate: 'aqi-moderate',
    poor: 'aqi-poor',
    unhealthy: 'aqi-unhealthy',
    hazardous: 'aqi-hazardous',
  }[city.aqiCategory];

  const aqiBorderClass = {
    good: 'border-aqi-good/30',
    moderate: 'border-aqi-moderate/30',
    poor: 'border-aqi-poor/30',
    unhealthy: 'border-aqi-unhealthy/30',
    hazardous: 'border-aqi-hazardous/30',
  }[city.aqiCategory];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-card rounded-2xl border-2 ${aqiBorderClass} overflow-hidden hover:shadow-large transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Rank Badge */}
      <div className="absolute top-4 right-4 w-10 h-10 gradient-sky rounded-full flex items-center justify-center shadow-medium">
        <span className="text-lg font-bold text-primary-foreground">#{rank}</span>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 ${aqiColorClass} rounded-xl flex flex-col items-center justify-center`}>
            <span className="text-lg font-bold leading-none">{city.moderateAQI}</span>
            <span className="text-[10px] opacity-80">AQI</span>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold text-foreground">{city.name}</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {city.state} - {city.distance} km away
            </p>
          </div>
        </div>

        {/* Suitability Score Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Suitability Score</span>
            <span className="font-semibold text-foreground">{city.suitabilityScore}/100</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${city.suitabilityScore}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="h-full gradient-sky"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <Home className="w-4 h-4 text-primary" />
            <div className="text-xs">
              <div className="text-muted-foreground">Rent</div>
              <div className="font-semibold text-foreground">
                {(city.rentRange.min / 1000).toFixed(0)}k - {(city.rentRange.max / 1000).toFixed(0)}k
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <Heart className="w-4 h-4 text-primary" />
            <div className="text-xs">
              <div className="text-muted-foreground">Health</div>
              <div className="font-semibold text-foreground">{city.healthScore}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-accent" />
            <div className="text-xs">
              <div className="text-muted-foreground">AQI Level</div>
              <div className="font-semibold text-foreground">{getAQICategoryLabel(city.aqiCategory)}</div>
            </div>
          </div>
        </div>

        {/* Community Profile */}
        <div className="text-sm text-muted-foreground mb-4">
          {city.communityProfile}
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {city.highlights.slice(0, 3).map((highlight, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-full text-xs"
              >
                <TrendingUp className="w-3 h-3" />
                {highlight}
              </span>
            ))}
          </div>
          {city.risks.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-aqi-moderate">
              <AlertTriangle className="w-3 h-3" />
              <span>{city.risks[0]}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
