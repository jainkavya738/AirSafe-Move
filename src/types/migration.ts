export interface UserProfile {
  name: string;
  age: number;
  currentCity: string;
  profession: string;
  maxDistance: number;
  monthlyRentBudget?: number;
  foodPreference?: 'veg' | 'non-veg' | 'jain' | 'any';
}

export interface CityRecommendation {
  id: string;
  name: string;
  state: string;
  currentAQI: number;
  averageAQI: number;
  distance: number;
  rentRange: {
    min: number;
    max: number;
  };
  suitabilityScore: number;
  professionScore: number;
  culturalScore: number;
  communityProfile: string;
  foodCompatibility: number;
  highlights: string[];
  risks: string[];
  aqiCategory: 'good' | 'moderate' | 'poor' | 'unhealthy' | 'hazardous';
}

export interface MigrationReport {
  userProfile: UserProfile;
  currentCityAQI: number;
  recommendations: CityRecommendation[];
  aqiRiskReduction: number;
  overallReadinessScore: number;
  aiVerdict: string;
  generatedAt: Date;
}

export type FormStep = 'personal' | 'location' | 'preferences' | 'results';
