export type FamilyType = 'nuclear' | 'joint' | 'single' | 'couple';

export type HealthCondition = 
  | 'asthma'
  | 'copd'
  | 'bronchitis'
  | 'allergies'
  | 'lung-disease'
  | 'heart-disease'
  | 'elderly-respiratory'
  | 'other'
  | 'none';

export interface FamilyDetails {
  familyType: FamilyType;
  totalMembers: number;
  children: number;
  elderly: number;
  healthConditions: HealthCondition[];
  otherHealthCondition?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  currentCity: string;
  profession: string;
  maxDistance: number;
  monthlyRentBudget?: number;
  familyDetails: FamilyDetails;
}

export interface CityRecommendation {
  id: string;
  name: string;
  state: string;
  moderateAQI: number;
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
  healthScore: number;
}

export interface TargetAQIRange {
  min: number;
  max: number;
}

export interface MigrationReport {
  userProfile: UserProfile;
  currentCityAQI: number;
  recommendations: CityRecommendation[];
  aqiRiskReduction: number;
  overallReadinessScore: number;
  aiVerdict: string;
  targetAQI: TargetAQIRange;
  estimatedLifeYearsGain: number;
  generatedAt: Date;
}

export type FormStep = 'personal' | 'location' | 'family';
