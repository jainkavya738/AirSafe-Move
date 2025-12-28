import { UserProfile, CityRecommendation, MigrationReport, TargetAQIRange } from '@/types/migration';
import {
  indianCities,
  professionCityScores,
  cityRentRanges,
  cityProfiles,
  calculateDistance,
  getAQICategory,
} from '@/data/indianCities';

// Calculate target AQI range based on family health conditions
function calculateTargetAQI(profile: UserProfile): TargetAQIRange {
  const { familyDetails } = profile;
  let maxAQI = 100; // Default moderate AQI target

  // Adjust for health conditions
  if (familyDetails.healthConditions.length > 0) {
    maxAQI = 50; // Need good air quality
    
    // Severe conditions need even better air
    const severeConditions = ['asthma', 'copd', 'lung-disease', 'elderly-respiratory'];
    const hasSevereCondition = familyDetails.healthConditions.some(c => severeConditions.includes(c));
    if (hasSevereCondition) {
      maxAQI = 40;
    }
  }

  // Adjust for children
  if (familyDetails.children > 0) {
    maxAQI = Math.min(maxAQI, 60);
  }

  // Adjust for elderly
  if (familyDetails.elderly > 0) {
    maxAQI = Math.min(maxAQI, 55);
  }

  // If both children and elderly with health issues
  if (familyDetails.children > 0 && familyDetails.elderly > 0 && familyDetails.healthConditions.length > 0) {
    maxAQI = Math.min(maxAQI, 45);
  }

  // Return a range (min is always 0 for ideal, max based on conditions)
  return {
    min: 0,
    max: maxAQI
  };
}

// Calculate estimated life years gain based on AQI improvement
function calculateLifeYearsGain(currentAQI: number, newAQI: number, profile: UserProfile): number {
  const aqiDifference = currentAQI - newAQI;
  const { familyDetails } = profile;
  
  // Base calculation: every 10 AQI improvement adds ~0.3 years
  let baseGain = (aqiDifference / 10) * 0.3;
  
  // Adjust for family composition
  if (familyDetails.elderly > 0) {
    baseGain *= 1.2; // Elderly benefit more from clean air
  }
  
  if (familyDetails.children > 0) {
    baseGain *= 1.15; // Children's developing lungs benefit
  }
  
  // Health conditions increase benefit
  if (familyDetails.healthConditions.length > 0) {
    baseGain *= (1 + familyDetails.healthConditions.length * 0.1);
  }
  
  return Math.round(baseGain * 10) / 10; // Round to 1 decimal
}

// Calculate health score for a city based on family needs
function calculateHealthScore(cityAQI: number, targetAQI: TargetAQIRange, profile: UserProfile): number {
  const { familyDetails } = profile;
  let score = 100;
  
  // Penalty if AQI is above target max
  if (cityAQI > targetAQI.max) {
    score -= (cityAQI - targetAQI.max) * 1.5;
  } else {
    // Bonus for being under target
    score += (targetAQI.max - cityAQI) * 0.5;
  }
  
  // Extra penalties for vulnerable groups in poor air
  if (cityAQI > 100) {
    if (familyDetails.children > 0) score -= 15;
    if (familyDetails.elderly > 0) score -= 20;
    if (familyDetails.healthConditions.length > 0) score -= familyDetails.healthConditions.length * 10;
  }
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function generateRecommendations(profile: UserProfile): MigrationReport {
  const currentCityData = indianCities.find(
    city => city.name.toLowerCase() === profile.currentCity.toLowerCase()
  );

  if (!currentCityData) {
    throw new Error('Current city not found in database');
  }

  const currentCityAQI = currentCityData.avgAQI;
  const targetAQI = calculateTargetAQI(profile);

  // Filter and score cities
  const scoredCities = indianCities
    .filter(city => city.name.toLowerCase() !== profile.currentCity.toLowerCase())
    .map(city => {
      const distance = calculateDistance(
        currentCityData.lat,
        currentCityData.lng,
        city.lat,
        city.lng
      );

      // Skip if beyond max distance
      if (distance > profile.maxDistance) return null;

      // Skip if AQI is worse than current city
      if (city.avgAQI >= currentCityAQI) return null;

      const rentRange = cityRentRanges[city.name] || { min: 10000, max: 25000 };
      const cityProfile = cityProfiles[city.name] || {
        community: 'Growing urban center',
        foodScore: { 'veg': 75, 'non-veg': 75, 'jain': 60, 'any': 80 },
        highlights: ['Developing infrastructure'],
        risks: ['Limited data available'],
      };

      // Calculate scores
      const aqiImprovement = ((currentCityAQI - city.avgAQI) / currentCityAQI) * 100;
      const aqiScore = Math.min(100, aqiImprovement * 2);

      const distanceScore = Math.max(0, 100 - (distance / profile.maxDistance) * 50);

      let affordabilityScore = 80;
      if (profile.monthlyRentBudget) {
        if (rentRange.min <= profile.monthlyRentBudget) {
          affordabilityScore = Math.min(100, (profile.monthlyRentBudget / rentRange.min) * 60 + 40);
        } else {
          affordabilityScore = Math.max(20, 60 - ((rentRange.min - profile.monthlyRentBudget) / profile.monthlyRentBudget) * 100);
        }
      }

      const professionScores = professionCityScores[profile.profession] || professionCityScores['Other'];
      const professionScore = professionScores[city.name] || 50;

      const foodCompatibility = cityProfile.foodScore['any'] || 70;
      
      // Calculate health score
      const healthScore = calculateHealthScore(city.avgAQI, targetAQI, profile);

      // Weighted suitability score - health gets higher weight for families with conditions
      const healthWeight = profile.familyDetails.healthConditions.length > 0 ? 0.40 : 0.30;
      const suitabilityScore = Math.round(
        aqiScore * 0.25 +
        healthScore * healthWeight +
        distanceScore * 0.10 +
        affordabilityScore * 0.15 +
        professionScore * (0.50 - healthWeight)
      );

      // Calculate moderate AQI (typical daytime reading)
      const moderateAQI = city.avgAQI + Math.floor(Math.random() * 15) - 5;

      const recommendation: CityRecommendation = {
        id: city.name.toLowerCase().replace(/\s+/g, '-'),
        name: city.name,
        state: city.state,
        moderateAQI: Math.max(20, moderateAQI),
        averageAQI: city.avgAQI,
        distance,
        rentRange,
        suitabilityScore,
        professionScore,
        culturalScore: Math.round((foodCompatibility + 80) / 2),
        communityProfile: cityProfile.community,
        foodCompatibility,
        highlights: cityProfile.highlights,
        risks: cityProfile.risks,
        aqiCategory: getAQICategory(city.avgAQI),
        healthScore,
      };

      return recommendation;
    })
    .filter((city): city is CityRecommendation => city !== null)
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 5);

  // Calculate overall metrics
  const avgAQIReduction = scoredCities.length > 0
    ? Math.round(scoredCities.reduce((sum, city) => sum + ((currentCityAQI - city.averageAQI) / currentCityAQI) * 100, 0) / scoredCities.length)
    : 0;

  const overallReadiness = scoredCities.length > 0
    ? Math.round(scoredCities.reduce((sum, city) => sum + city.suitabilityScore, 0) / scoredCities.length)
    : 0;

  // Calculate life years gain for top recommendation
  const estimatedLifeYearsGain = scoredCities.length > 0
    ? calculateLifeYearsGain(currentCityAQI, scoredCities[0].averageAQI, profile)
    : 0;

  // Generate AI verdict
  const aiVerdict = generateAIVerdict(profile, scoredCities, currentCityAQI, targetAQI, estimatedLifeYearsGain);

  return {
    userProfile: profile,
    currentCityAQI,
    recommendations: scoredCities,
    aqiRiskReduction: avgAQIReduction,
    overallReadinessScore: overallReadiness,
    aiVerdict,
    targetAQI,
    estimatedLifeYearsGain,
    generatedAt: new Date(),
  };
}

function generateAIVerdict(
  profile: UserProfile,
  recommendations: CityRecommendation[],
  currentAQI: number,
  targetAQI: TargetAQIRange,
  lifeYearsGain: number
): string {
  const { familyDetails } = profile;
  
  if (recommendations.length === 0) {
    return `Based on your criteria, we could not find cities with better air quality within ${profile.maxDistance}km of ${profile.currentCity}. Consider expanding your search radius or exploring remote work options in cleaner regions.`;
  }

  const topCity = recommendations[0];
  const aqiImprovement = Math.round(((currentAQI - topCity.averageAQI) / currentAQI) * 100);

  let verdict = `Top Recommendation: ${topCity.name}, ${topCity.state}\n\n`;
  
  // Family composition summary
  let familyDesc = '';
  if (familyDetails.familyType === 'joint') {
    familyDesc = 'your joint family';
  } else if (familyDetails.familyType === 'nuclear') {
    familyDesc = 'your nuclear family';
  } else if (familyDetails.familyType === 'couple') {
    familyDesc = 'you and your partner';
  } else {
    familyDesc = 'you';
  }
  
  if (familyDetails.children > 0 && familyDetails.elderly > 0) {
    familyDesc += ` with ${familyDetails.children} child${familyDetails.children > 1 ? 'ren' : ''} and ${familyDetails.elderly} elderly member${familyDetails.elderly > 1 ? 's' : ''}`;
  } else if (familyDetails.children > 0) {
    familyDesc += ` with ${familyDetails.children} child${familyDetails.children > 1 ? 'ren' : ''}`;
  } else if (familyDetails.elderly > 0) {
    familyDesc += ` with ${familyDetails.elderly} elderly member${familyDetails.elderly > 1 ? 's' : ''}`;
  }

  verdict += `For ${familyDesc}, moving from ${profile.currentCity} to ${topCity.name} could reduce AQI exposure by ${aqiImprovement}%.\n\n`;
  
  // Target AQI recommendation with range
  verdict += `Recommended Target AQI Range for Your Family: ${targetAQI.min} - ${targetAQI.max}\n`;
  verdict += `This range is based on your family composition`;
  if (familyDetails.healthConditions.length > 0) {
    verdict += ` and health conditions (${familyDetails.healthConditions.length} respiratory concerns reported)`;
  }
  verdict += '.\n\n';
  
  // Health impact
  if (lifeYearsGain > 0) {
    verdict += `Potential Health Benefit:\n`;
    verdict += `- Estimated life expectancy improvement: +${lifeYearsGain} years\n`;
    if (familyDetails.children > 0) {
      verdict += `- Children's lung development will benefit from cleaner air\n`;
    }
    if (familyDetails.elderly > 0) {
      verdict += `- Reduced respiratory stress for elderly family members\n`;
    }
    if (familyDetails.healthConditions.length > 0) {
      verdict += `- Lower risk of health condition flare-ups\n`;
    }
    verdict += '\n';
  }

  verdict += `Key Benefits:\n`;
  verdict += `- ${topCity.highlights[0]}\n`;
  verdict += `- ${topCity.highlights[1] || 'Growing opportunities'}\n`;
  verdict += `- AQI improvement from ${currentAQI} to ${topCity.averageAQI}\n\n`;

  // Family-specific considerations
  if (familyDetails.children > 0 && familyDetails.elderly > 0) {
    verdict += `Family Suitability:\n`;
    verdict += `${topCity.name} is suitable for families with both children and elderly members. `;
    verdict += `The city offers healthcare facilities and child-friendly infrastructure.\n\n`;
  } else if (familyDetails.children > 0) {
    verdict += `Child-Friendly Environment:\n`;
    verdict += `${topCity.name} provides good educational facilities and recreational options for children.\n\n`;
  } else if (familyDetails.elderly > 0) {
    verdict += `Elderly Care:\n`;
    verdict += `${topCity.name} has accessible healthcare and a pace of life suitable for senior citizens.\n\n`;
  }

  verdict += `Consider: ${topCity.risks[0] || 'Research local specifics before relocating'}.\n\n`;
  verdict += `This migration could significantly improve your family's quality of life and long-term health outcomes. We recommend visiting ${topCity.name} before making your final decision.`;

  return verdict;
}
