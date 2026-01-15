import { motion } from 'framer-motion';
import { Wind, MapPin, Briefcase, IndianRupee, Users, Brain } from 'lucide-react';

const features = [
  {
    icon: Wind,
    title: 'Real-time AQI Data',
    description: 'Access 5-year historical and current air quality data for 25+ Indian cities.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: MapPin,
    title: 'Distance Optimization',
    description: 'Find the best cities within your preferred migration distance using Haversine formula.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: Briefcase,
    title: 'Profession Matching',
    description: 'Get recommendations based on job opportunities in your field across cities.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: IndianRupee,
    title: 'Cost Analysis',
    description: 'Compare housing costs and find cities that match your budget requirements.',
    color: 'bg-aqi-moderate/20 text-aqi-moderate',
  },
  {
    icon: Users,
    title: 'Community Insights',
    description: 'Understand cultural compatibility and community profiles of recommended cities.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Brain,
    title: 'AI Advisory',
    description: 'Receive personalized migration advice with explainable AI recommendations.',
    color: 'bg-secondary/10 text-secondary',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Migration Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes multiple factors to give you the most suitable city recommendations 
            for a healthier, happier life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
