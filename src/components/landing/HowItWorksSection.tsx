import { motion } from 'framer-motion';
import { UserCircle, Settings, Sparkles, FileCheck } from 'lucide-react';

const steps = [
  {
    icon: UserCircle,
    step: '01',
    title: 'Enter Your Profile',
    description: 'Tell us about yourself - your current city, profession, age, and migration preferences.',
  },
  {
    icon: Settings,
    step: '02',
    title: 'Set Constraints',
    description: 'Define your maximum distance, budget, and food preferences for personalized filtering.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'AI Analysis',
    description: 'Our ML model analyzes AQI data, costs, and career opportunities to score cities.',
  },
  {
    icon: FileCheck,
    step: '04',
    title: 'Get Report',
    description: 'Receive top 5 city recommendations with detailed migration readiness report.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 gradient-clean">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How AirSafe Move Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to find your ideal clean-air destination
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-medium relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6 px-3 py-1 gradient-sky rounded-full">
                    <span className="text-sm font-bold text-primary-foreground">{step.step}</span>
                  </div>

                  <div className="mt-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Dot */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 gradient-sky rounded-full -translate-y-1/2 z-20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
