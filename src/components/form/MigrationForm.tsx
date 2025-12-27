import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, MapPin, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { UserProfile, FormStep } from '@/types/migration';
import { indianCities } from '@/data/indianCities';

interface MigrationFormProps {
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const professions = [
  'IT/Software',
  'Healthcare',
  'Education',
  'Finance/Banking',
  'Manufacturing',
  'Remote Work',
  'Business/Entrepreneur',
  'Other',
];

const foodPreferences = [
  { value: 'veg', label: 'Vegetarian' },
  { value: 'non-veg', label: 'Non-Vegetarian' },
  { value: 'jain', label: 'Jain' },
  { value: 'any', label: 'No Preference' },
];

export function MigrationForm({ onSubmit, onBack }: MigrationFormProps) {
  const [step, setStep] = useState<FormStep>('personal');
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    age: 30,
    currentCity: '',
    profession: '',
    maxDistance: 500,
    monthlyRentBudget: undefined,
    foodPreference: 'any',
  });

  const steps: { id: FormStep; label: string; icon: typeof User }[] = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1].id);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1].id);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData as UserProfile);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.age &&
      formData.currentCity &&
      formData.profession &&
      formData.maxDistance
    );
  };

  const isStepValid = () => {
    switch (step) {
      case 'personal':
        return formData.name && formData.age && formData.profession;
      case 'location':
        return formData.currentCity && formData.maxDistance;
      case 'preferences':
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 shadow-large"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStepIndex
                      ? 'gradient-sky text-primary-foreground shadow-medium'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    index <= currentStepIndex ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-0.5 w-8 sm:w-16 transition-colors duration-300 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {step === 'personal' && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Tell us about yourself
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      We'll use this to personalize your recommendations
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="age" className="text-foreground">Age: {formData.age}</Label>
                      <Slider
                        id="age"
                        value={[formData.age || 30]}
                        onValueChange={([value]) => setFormData({ ...formData, age: value })}
                        min={18}
                        max={80}
                        step={1}
                        className="mt-3"
                      />
                    </div>

                    <div>
                      <Label htmlFor="profession" className="text-foreground">Profession</Label>
                      <Select
                        value={formData.profession}
                        onValueChange={(value) => setFormData({ ...formData, profession: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your profession" />
                        </SelectTrigger>
                        <SelectContent>
                          {professions.map((prof) => (
                            <SelectItem key={prof} value={prof}>
                              {prof}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {step === 'location' && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Current Location
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Help us understand where you're migrating from
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentCity" className="text-foreground">Current City</Label>
                      <Select
                        value={formData.currentCity}
                        onValueChange={(value) => setFormData({ ...formData, currentCity: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select your current city" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianCities.map((city) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}, {city.state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="maxDistance" className="text-foreground">
                        Maximum Migration Distance: {formData.maxDistance} km
                      </Label>
                      <Slider
                        id="maxDistance"
                        value={[formData.maxDistance || 500]}
                        onValueChange={([value]) => setFormData({ ...formData, maxDistance: value })}
                        min={100}
                        max={2500}
                        step={50}
                        className="mt-3"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>100 km</span>
                        <span>2500 km</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 'preferences' && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Lifestyle Preferences
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Optional details for better recommendations
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rentBudget" className="text-foreground">
                        Monthly Rent Budget (₹)
                      </Label>
                      <Input
                        id="rentBudget"
                        type="number"
                        value={formData.monthlyRentBudget || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            monthlyRentBudget: e.target.value ? parseInt(e.target.value) : undefined,
                          })
                        }
                        placeholder="e.g., 20000"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="foodPreference" className="text-foreground">Food Preference</Label>
                      <Select
                        value={formData.foodPreference}
                        onValueChange={(value: UserProfile['foodPreference']) =>
                          setFormData({ ...formData, foodPreference: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select food preference" />
                        </SelectTrigger>
                        <SelectContent>
                          {foodPreferences.map((pref) => (
                            <SelectItem key={pref.value} value={pref.value}>
                              {pref.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="ghost" onClick={handlePrev}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStepIndex === 0 ? 'Back to Home' : 'Previous'}
            </Button>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {currentStepIndex === steps.length - 1 ? 'Get Recommendations' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
