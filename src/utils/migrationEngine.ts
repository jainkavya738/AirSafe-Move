import { UserProfile, CityRecommendation, MigrationReport } from '@/types/migration';
import {
  indianCities,
  professionCityScores,
  cityRentRanges,
  cityProfiles,
  calculateDistance,
  getAQICategory,
} from '@/data/indianCities';

export function generateRecommendations(profile: UserProfile): MigrationReport {
  const currentCityData = indianCities.find(
    city => city.name.toLowerCase() === profile.currentCity.toLowerCase()
  );

  if (!currentCityData) {
    throw new Error('Current city not found in database');
  }

  const currentCityAQI = currentCityData.avgAQI;

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

      const foodPref = profile.foodPreference || 'any';
      const foodCompatibility = cityProfile.foodScore[foodPref] || 70;

      // Weighted suitability score
      const suitabilityScore = Math.round(
        aqiScore * 0.35 +
        distanceScore * 0.15 +
        affordabilityScore * 0.20 +
        professionScore * 0.20 +
        foodCompatibility * 0.10
      );

      // Add some variation based on current AQI (simulating real-time data)
      const currentAQI = city.avgAQI + Math.floor(Math.random() * 30) - 15;

      const recommendation: CityRecommendation = {
        id: city.name.toLowerCase().replace(/\s+/g, '-'),
        name: city.name,
        state: city.state,
        currentAQI: Math.max(20, currentAQI),
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

  // Generate AI verdict
  const aiVerdict = generateAIVerdict(profile, scoredCities, currentCityAQI);

  return {
    userProfile: profile,
    currentCityAQI,
    recommendations: scoredCities,
    aqiRiskReduction: avgAQIReduction,
    overallReadinessScore: overallReadiness,
    aiVerdict,
    generatedAt: new Date(),
  };
}

function generateAIVerdict(
  profile: UserProfile,
  recommendations: CityRecommendation[],
  currentAQI: number
): string {
  if (recommendations.length === 0) {
    return `Based on your criteria, we couldn't find cities with better air quality within ${profile.maxDistance}km of ${profile.currentCity}. Consider expanding your search radius or exploring remote work options in cleaner regions.`;
  }

  const topCity = recommendations[0];
  const aqiImprovement = Math.round(((currentAQI - topCity.averageAQI) / currentAQI) * 100);

  let verdict = `Top Recommendation: ${topCity.name}, ${topCity.state}\n\n`;
  verdict += `Moving from ${profile.currentCity} to ${topCity.name} could reduce your AQI exposure by ${aqiImprovement}%. `;
  verdict += `This city scores ${topCity.suitabilityScore}/100 in overall suitability for your profile.\n\n`;
  
  verdict += `Key Benefits:\n`;
  verdict += `- ${topCity.highlights[0]}\n`;
  verdict += `- ${topCity.highlights[1] || 'Growing opportunities'}\n`;
  verdict += `- AQI improvement from ${currentAQI} to ${topCity.averageAQI}\n\n`;

  if (profile.profession === 'Remote Work') {
    verdict += `As a remote worker, ${topCity.name} offers excellent work-life balance with clean air and good connectivity.\n\n`;
  } else {
    verdict += `For ${profile.profession} professionals, this city has good opportunities in the region.\n\n`;
  }

  verdict += `Consider: ${topCity.risks[0] || 'Research local specifics before relocating'}.\n\n`;
  verdict += `This migration could significantly improve your quality of life and long-term health outcomes. We recommend visiting ${topCity.name} before making your final decision.`;

  return verdict;
}
