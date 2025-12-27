import { CityRecommendation } from '@/types/migration';

// Simulated city data for Indian cities
export const indianCities = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090, avgAQI: 285 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, avgAQI: 145 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946, avgAQI: 85 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, avgAQI: 78 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, avgAQI: 165 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, avgAQI: 95 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, avgAQI: 88 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, avgAQI: 135 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, avgAQI: 175 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, avgAQI: 225 },
  { name: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lng: 76.7794, avgAQI: 125 },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lng: 74.1240, avgAQI: 45 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673, avgAQI: 52 },
  { name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lng: 76.9366, avgAQI: 48 },
  { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lng: 76.6394, avgAQI: 55 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, avgAQI: 62 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734, avgAQI: 42 },
  { name: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lng: 78.0322, avgAQI: 95 },
  { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lng: 73.7125, avgAQI: 68 },
  { name: 'Pondicherry', state: 'Puducherry', lat: 11.9416, lng: 79.8083, avgAQI: 55 },
  { name: 'Mangalore', state: 'Karnataka', lat: 12.9141, lng: 74.8560, avgAQI: 58 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185, avgAQI: 72 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126, avgAQI: 145 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577, avgAQI: 115 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882, avgAQI: 105 },
];

export const professionCityScores: Record<string, Record<string, number>> = {
  'IT/Software': {
    'Bangalore': 95, 'Hyderabad': 90, 'Pune': 85, 'Chennai': 82, 'Mumbai': 80,
    'Delhi': 75, 'Kochi': 70, 'Goa': 65, 'Chandigarh': 60, 'Coimbatore': 58,
  },
  'Healthcare': {
    'Chennai': 90, 'Mumbai': 88, 'Delhi': 85, 'Bangalore': 82, 'Hyderabad': 80,
    'Pune': 78, 'Kolkata': 75, 'Kochi': 72, 'Lucknow': 70, 'Chandigarh': 68,
  },
  'Education': {
    'Delhi': 92, 'Bangalore': 88, 'Pune': 85, 'Chennai': 82, 'Hyderabad': 80,
    'Mumbai': 78, 'Kolkata': 75, 'Chandigarh': 72, 'Kochi': 70, 'Mysore': 68,
  },
  'Finance/Banking': {
    'Mumbai': 95, 'Delhi': 88, 'Bangalore': 82, 'Chennai': 78, 'Hyderabad': 75,
    'Pune': 72, 'Kolkata': 70, 'Ahmedabad': 68, 'Chandigarh': 65, 'Kochi': 60,
  },
  'Manufacturing': {
    'Pune': 90, 'Chennai': 88, 'Ahmedabad': 85, 'Mumbai': 80, 'Bangalore': 78,
    'Coimbatore': 75, 'Indore': 72, 'Nagpur': 70, 'Hyderabad': 68, 'Delhi': 65,
  },
  'Remote Work': {
    'Goa': 95, 'Shimla': 92, 'Kochi': 88, 'Udaipur': 85, 'Pondicherry': 82,
    'Mysore': 80, 'Dehradun': 78, 'Coimbatore': 75, 'Mangalore': 72, 'Pune': 70,
  },
  'Business/Entrepreneur': {
    'Mumbai': 92, 'Delhi': 88, 'Bangalore': 85, 'Hyderabad': 80, 'Pune': 78,
    'Chennai': 75, 'Ahmedabad': 72, 'Kolkata': 70, 'Kochi': 65, 'Indore': 62,
  },
  'Other': {
    'Bangalore': 75, 'Pune': 72, 'Chennai': 70, 'Hyderabad': 68, 'Kochi': 65,
    'Mysore': 62, 'Coimbatore': 60, 'Mangalore': 58, 'Goa': 55, 'Udaipur': 52,
  },
};

export const cityRentRanges: Record<string, { min: number; max: number }> = {
  'Delhi': { min: 18000, max: 45000 },
  'Mumbai': { min: 25000, max: 70000 },
  'Bangalore': { min: 15000, max: 40000 },
  'Chennai': { min: 12000, max: 30000 },
  'Kolkata': { min: 10000, max: 25000 },
  'Hyderabad': { min: 12000, max: 32000 },
  'Pune': { min: 12000, max: 35000 },
  'Ahmedabad': { min: 10000, max: 25000 },
  'Jaipur': { min: 8000, max: 22000 },
  'Lucknow': { min: 8000, max: 20000 },
  'Chandigarh': { min: 12000, max: 30000 },
  'Goa': { min: 15000, max: 40000 },
  'Kochi': { min: 10000, max: 28000 },
  'Thiruvananthapuram': { min: 8000, max: 22000 },
  'Mysore': { min: 8000, max: 20000 },
  'Coimbatore': { min: 8000, max: 22000 },
  'Shimla': { min: 10000, max: 25000 },
  'Dehradun': { min: 10000, max: 25000 },
  'Udaipur': { min: 8000, max: 20000 },
  'Pondicherry': { min: 8000, max: 22000 },
  'Mangalore': { min: 8000, max: 20000 },
  'Visakhapatnam': { min: 8000, max: 20000 },
  'Bhopal': { min: 8000, max: 20000 },
  'Indore': { min: 8000, max: 22000 },
  'Nagpur': { min: 8000, max: 20000 },
};

export const cityProfiles: Record<string, { community: string; foodScore: Record<string, number>; highlights: string[]; risks: string[] }> = {
  'Bangalore': {
    community: 'Cosmopolitan tech hub with diverse population from across India',
    foodScore: { 'veg': 85, 'non-veg': 90, 'jain': 70, 'any': 95 },
    highlights: ['IT Capital of India', 'Pleasant weather year-round', 'Excellent healthcare', 'Vibrant startup ecosystem'],
    risks: ['Traffic congestion', 'Rising property prices', 'Water scarcity issues'],
  },
  'Pune': {
    community: 'Educational and cultural hub with large student population',
    foodScore: { 'veg': 80, 'non-veg': 85, 'jain': 75, 'any': 90 },
    highlights: ['Educational institutions', 'Growing IT sector', 'Cultural heritage', 'Proximity to Mumbai'],
    risks: ['Monsoon flooding', 'Increasing traffic', 'Urban sprawl'],
  },
  'Chennai': {
    community: 'Traditional South Indian culture with strong industrial base',
    foodScore: { 'veg': 75, 'non-veg': 95, 'jain': 60, 'any': 90 },
    highlights: ['Rich cultural heritage', 'Strong healthcare sector', 'Beach city', 'Automotive hub'],
    risks: ['Extreme summer heat', 'Water shortage', 'Occasional cyclones'],
  },
  'Kochi': {
    community: 'Coastal city with blend of traditional and modern lifestyle',
    foodScore: { 'veg': 70, 'non-veg': 95, 'jain': 55, 'any': 90 },
    highlights: ['Beautiful backwaters', 'Growing IT sector', 'High literacy rate', 'Tourist destination'],
    risks: ['Monsoon flooding', 'Limited job diversity', 'Humidity'],
  },
  'Goa': {
    community: 'Relaxed beach lifestyle with international community',
    foodScore: { 'veg': 70, 'non-veg': 95, 'jain': 50, 'any': 95 },
    highlights: ['Best beaches', 'Excellent work-life balance', 'Tourism infrastructure', 'Clean air'],
    risks: ['Seasonal tourism dependence', 'Limited career options', 'Monsoon disruptions'],
  },
  'Shimla': {
    community: 'Hill station with peaceful mountain lifestyle',
    foodScore: { 'veg': 75, 'non-veg': 85, 'jain': 60, 'any': 85 },
    highlights: ['Cleanest air in India', 'Beautiful mountain views', 'Cool climate', 'Low pollution'],
    risks: ['Limited job market', 'Winter accessibility', 'Higher living costs'],
  },
  'Mysore': {
    community: 'Heritage city with royal cultural heritage',
    foodScore: { 'veg': 85, 'non-veg': 80, 'jain': 70, 'any': 85 },
    highlights: ['Rich heritage', 'Clean and green', 'Yoga capital', 'Affordable living'],
    risks: ['Limited IT jobs', 'Slower pace of life', 'Fewer entertainment options'],
  },
  'Hyderabad': {
    community: 'Blend of Nizami culture with modern tech industry',
    foodScore: { 'veg': 70, 'non-veg': 95, 'jain': 60, 'any': 90 },
    highlights: ['IT hub', 'Affordable compared to peers', 'Rich food culture', 'Historical monuments'],
    risks: ['Summer heat', 'Traffic issues', 'Water quality'],
  },
  'Mumbai': {
    community: 'Financial capital with fast-paced cosmopolitan lifestyle',
    foodScore: { 'veg': 85, 'non-veg': 95, 'jain': 90, 'any': 95 },
    highlights: ['Financial hub', 'Best entertainment industry', 'Diverse culture', 'Strong job market'],
    risks: ['High cost of living', 'Traffic and commute', 'Space constraints', 'Monsoon flooding'],
  },
  'Delhi': {
    community: 'National capital with diverse population and political importance',
    foodScore: { 'veg': 90, 'non-veg': 90, 'jain': 85, 'any': 95 },
    highlights: ['Political capital', 'Rich history', 'Educational hub', 'Metro connectivity'],
    risks: ['Severe air pollution', 'Extreme weather', 'Traffic congestion', 'Safety concerns'],
  },
  'Coimbatore': {
    community: 'Industrial city with traditional Tamil culture',
    foodScore: { 'veg': 80, 'non-veg': 85, 'jain': 65, 'any': 85 },
    highlights: ['Textile hub', 'Pleasant climate', 'Affordable living', 'Growing IT'],
    risks: ['Limited nightlife', 'Slower growth', 'Water issues'],
  },
  'Thiruvananthapuram': {
    community: 'Kerala\'s capital with high quality of life',
    foodScore: { 'veg': 65, 'non-veg': 95, 'jain': 50, 'any': 85 },
    highlights: ['High HDI', 'Beach city', 'IT parks', 'Clean environment'],
    risks: ['Limited job diversity', 'Monsoon disruptions', 'Conservative culture'],
  },
  'Pondicherry': {
    community: 'French colonial heritage with spiritual centers',
    foodScore: { 'veg': 75, 'non-veg': 90, 'jain': 60, 'any': 90 },
    highlights: ['Beach town', 'French architecture', 'Auroville nearby', 'Clean air'],
    risks: ['Limited jobs', 'Cyclone risk', 'Small city limitations'],
  },
  'Udaipur': {
    community: 'Royal heritage city with tourism focus',
    foodScore: { 'veg': 90, 'non-veg': 70, 'jain': 85, 'any': 80 },
    highlights: ['Lake city beauty', 'Rich culture', 'Low pollution', 'Tourism jobs'],
    risks: ['Water scarcity', 'Limited career options', 'Summer heat'],
  },
  'Dehradun': {
    community: 'Gateway to Himalayas with educational institutions',
    foodScore: { 'veg': 80, 'non-veg': 85, 'jain': 65, 'any': 85 },
    highlights: ['Clean air', 'Educational hub', 'Hill station access', 'Pleasant climate'],
    risks: ['Urban expansion issues', 'Traffic growth', 'Limited IT jobs'],
  },
  'Mangalore': {
    community: 'Coastal Karnataka city with diverse culture',
    foodScore: { 'veg': 70, 'non-veg': 95, 'jain': 55, 'any': 90 },
    highlights: ['Beach city', 'Good healthcare', 'Educational institutions', 'Low pollution'],
    risks: ['Heavy monsoons', 'Limited job variety', 'Humidity'],
  },
  'Visakhapatnam': {
    community: 'Port city with industrial and IT growth',
    foodScore: { 'veg': 70, 'non-veg': 95, 'jain': 55, 'any': 90 },
    highlights: ['Beach city', 'Growing IT', 'Naval base', 'Clean air'],
    risks: ['Cyclone prone', 'Industrial pollution pockets', 'Limited entertainment'],
  },
  'Chandigarh': {
    community: 'Planned city with high quality of life',
    foodScore: { 'veg': 80, 'non-veg': 85, 'jain': 70, 'any': 85 },
    highlights: ['Best planned city', 'High living standards', 'Green spaces', 'Low crime'],
    risks: ['Winter smog', 'Limited job diversity', 'High property costs'],
  },
  'Indore': {
    community: 'Cleanest city with growing business hub',
    foodScore: { 'veg': 90, 'non-veg': 80, 'jain': 85, 'any': 85 },
    highlights: ['Cleanest city award', 'Food capital of MP', 'Growing IT', 'Affordable'],
    risks: ['Summer heat', 'Limited metro jobs', 'Water issues'],
  },
  'Nagpur': {
    community: 'Central India hub with orange orchards',
    foodScore: { 'veg': 80, 'non-veg': 85, 'jain': 70, 'any': 85 },
    highlights: ['Geographic center', 'Clean city', 'Affordable', 'Metro connectivity'],
    risks: ['Extreme weather', 'Limited IT sector', 'Slower growth'],
  },
  'Kolkata': {
    community: 'Cultural capital with intellectual heritage',
    foodScore: { 'veg': 70, 'non-veg': 95, 'jain': 55, 'any': 90 },
    highlights: ['Cultural heritage', 'Affordable', 'Rich food culture', 'Intellectual hub'],
    risks: ['Air pollution', 'Infrastructure issues', 'Humidity'],
  },
  'Ahmedabad': {
    community: 'Textile and business hub with Gujarati culture',
    foodScore: { 'veg': 95, 'non-veg': 60, 'jain': 95, 'any': 80 },
    highlights: ['Business hub', 'Affordable', 'Growing metro', 'Entrepreneurial culture'],
    risks: ['Summer heat', 'Air quality issues', 'Limited nightlife'],
  },
  'Jaipur': {
    community: 'Pink City with royal heritage and tourism',
    foodScore: { 'veg': 90, 'non-veg': 75, 'jain': 85, 'any': 85 },
    highlights: ['Heritage tourism', 'Handicrafts hub', 'Growing IT', 'Culture rich'],
    risks: ['Air pollution', 'Summer heat', 'Water scarcity'],
  },
  'Lucknow': {
    community: 'City of Nawabs with rich cultural heritage',
    foodScore: { 'veg': 75, 'non-veg': 95, 'jain': 60, 'any': 90 },
    highlights: ['Cultural heritage', 'Affordable living', 'Growing IT', 'Food capital'],
    risks: ['Air pollution', 'Summer heat', 'Infrastructure gaps'],
  },
  'Bhopal': {
    community: 'City of lakes with blend of culture',
    foodScore: { 'veg': 80, 'non-veg': 85, 'jain': 70, 'any': 85 },
    highlights: ['Lake city', 'Clean and green', 'Affordable', 'Growing education hub'],
    risks: ['Industrial legacy', 'Limited IT jobs', 'Summer heat'],
  },
};

// Haversine formula to calculate distance
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function getAQICategory(aqi: number): CityRecommendation['aqiCategory'] {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'poor';
  if (aqi <= 200) return 'unhealthy';
  return 'hazardous';
}

export function getAQICategoryLabel(category: CityRecommendation['aqiCategory']): string {
  const labels = {
    good: 'Good',
    moderate: 'Moderate',
    poor: 'Poor',
    unhealthy: 'Unhealthy',
    hazardous: 'Hazardous',
  };
  return labels[category];
}
