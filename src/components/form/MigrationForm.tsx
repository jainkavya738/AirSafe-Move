import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile, FormStep, FamilyType, HealthCondition } from '@/types/migration';
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

const familyTypes: { value: FamilyType; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'couple', label: 'Couple' },
  { value: 'nuclear', label: 'Nuclear Family' },
  { value: 'joint', label: 'Joint Family' },
];

const healthConditions: { value: HealthCondition; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: 'No health conditions in family' },
  { value: 'asthma', label: 'Asthma', description: 'Chronic respiratory condition' },
  { value: 'copd', label: 'COPD', description: 'Chronic obstructive pulmonary disease' },
  { value: 'bronchitis', label: 'Bronchitis', description: 'Inflammation of bronchial tubes' },
  { value: 'allergies', label: 'Respiratory Allergies', description: 'Dust, pollen, or air allergies' },
  { value: 'lung-disease', label: 'Lung Disease', description: 'Other lung-related conditions' },
  { value: 'heart-disease', label: 'Heart Disease', description: 'Cardiovascular conditions' },
  { value: 'elderly-respiratory', label: 'Elderly Respiratory Issues', description: 'Age-related breathing problems' },
  { value: 'other', label: 'Other', description: 'Specify other health conditions' },
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
    familyDetails: {
      familyType: 'nuclear',
      totalMembers: 4,
      children: 1,
      elderly: 0,
      healthConditions: [],
    },
  });

  const steps: { id: FormStep; label: string; icon: typeof User }[] = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'family', label: 'Family & Health', icon: Users },
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
      formData.maxDistance &&
      formData.familyDetails
    );
  };

  const isStepValid = () => {
    switch (step) {
      case 'personal':
        return formData.name && formData.age && formData.profession;
      case 'location':
        return formData.currentCity && formData.maxDistance;
      case 'family':
        return formData.familyDetails?.familyType && formData.familyDetails?.totalMembers;
      default:
        return false;
    }
  };

  const handleHealthConditionToggle = (condition: HealthCondition) => {
    const currentConditions = formData.familyDetails?.healthConditions || [];
    
    // If selecting "none", clear all other conditions
    if (condition === 'none') {
      setFormData({
        ...formData,
        familyDetails: {
          ...formData.familyDetails!,
          healthConditions: currentConditions.includes('none') ? [] : ['none'],
          otherHealthCondition: '',
        },
      });
      return;
    }
    
    // If selecting any other condition, remove "none" if present
    let newConditions = currentConditions.filter(c => c !== 'none');
    
    if (newConditions.includes(condition)) {
      newConditions = newConditions.filter(c => c !== condition);
      // Clear other condition text if unchecking "other"
      if (condition === 'other') {
        setFormData({
          ...formData,
          familyDetails: {
            ...formData.familyDetails!,
            healthConditions: newConditions,
            otherHealthCondition: '',
          },
        });
        return;
      }
    } else {
      newConditions = [...newConditions, condition];
    }
    
    setFormData({
      ...formData,
      familyDetails: {
        ...formData.familyDetails!,
        healthConditions: newConditions,
      },
    });
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

                    <div>
                      <Label htmlFor="rentBudget" className="text-foreground">
                        Monthly Rent Budget (Optional)
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
                  </div>
                </>
              )}

              {step === 'family' && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Family & Health Details
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Help us find the best city for your family's health
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="familyType" className="text-foreground">Family Type</Label>
                      <Select
                        value={formData.familyDetails?.familyType}
                        onValueChange={(value: FamilyType) => {
                          let newTotalMembers = formData.familyDetails?.totalMembers || 4;
                          let newChildren = formData.familyDetails?.children || 0;
                          let newElderly = formData.familyDetails?.elderly || 0;
                          
                          if (value === 'single') {
                            newTotalMembers = 1;
                            newChildren = 0;
                            newElderly = 0;
                          } else if (value === 'couple') {
                            newTotalMembers = 2;
                            newChildren = 0;
                            newElderly = Math.min(newElderly, 2);
                          }
                          
                          setFormData({
                            ...formData,
                            familyDetails: {
                              ...formData.familyDetails!,
                              familyType: value,
                              totalMembers: newTotalMembers,
                              children: newChildren,
                              elderly: newElderly,
                            },
                          });
                        }}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select family type" />
                        </SelectTrigger>
                        <SelectContent>
                          {familyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="totalMembers" className="text-foreground text-sm">
                          Total Members
                        </Label>
                        <Input
                          id="totalMembers"
                          type="number"
                          min={formData.familyDetails?.familyType === 'single' ? 1 : formData.familyDetails?.familyType === 'couple' ? 2 : 1}
                          max={formData.familyDetails?.familyType === 'single' ? 1 : formData.familyDetails?.familyType === 'couple' ? 2 : 20}
                          value={formData.familyDetails?.totalMembers || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              familyDetails: {
                                ...formData.familyDetails!,
                                totalMembers: parseInt(e.target.value) || 1,
                              },
                            })
                          }
                          disabled={formData.familyDetails?.familyType === 'single' || formData.familyDetails?.familyType === 'couple'}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="children" className="text-foreground text-sm">
                          Children
                        </Label>
                        <Input
                          id="children"
                          type="number"
                          min={0}
                          max={formData.familyDetails?.familyType === 'single' || formData.familyDetails?.familyType === 'couple' ? 0 : 10}
                          value={formData.familyDetails?.children ?? ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              familyDetails: {
                                ...formData.familyDetails!,
                                children: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                          disabled={formData.familyDetails?.familyType === 'single' || formData.familyDetails?.familyType === 'couple'}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="elderly" className="text-foreground text-sm">
                          Elderly (60+)
                        </Label>
                        <Input
                          id="elderly"
                          type="number"
                          min={0}
                          max={formData.familyDetails?.familyType === 'single' ? 0 : formData.familyDetails?.familyType === 'couple' ? 2 : 10}
                          value={formData.familyDetails?.elderly ?? ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              familyDetails: {
                                ...formData.familyDetails!,
                                elderly: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                          disabled={formData.familyDetails?.familyType === 'single'}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-foreground mb-3 block">
                        Health Conditions in Family (Select all that apply)
                      </Label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {healthConditions.map((condition) => (
                          <div
                            key={condition.value}
                            className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                              formData.familyDetails?.healthConditions?.includes(condition.value)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => handleHealthConditionToggle(condition.value)}
                          >
                            <Checkbox
                              id={condition.value}
                              checked={formData.familyDetails?.healthConditions?.includes(condition.value)}
                              onCheckedChange={() => handleHealthConditionToggle(condition.value)}
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={condition.value}
                                className="text-sm font-medium text-foreground cursor-pointer"
                              >
                                {condition.label}
                              </label>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {condition.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Other condition text input */}
                      {formData.familyDetails?.healthConditions?.includes('other') && (
                        <div className="mt-4">
                          <Label htmlFor="otherCondition" className="text-foreground text-sm">
                            Please specify the health condition
                          </Label>
                          <Input
                            id="otherCondition"
                            value={formData.familyDetails?.otherHealthCondition || ''}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                familyDetails: {
                                  ...formData.familyDetails!,
                                  otherHealthCondition: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter other health condition(s)"
                            className="mt-1"
                          />
                        </div>
                      )}
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
