import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Check, User, Calendar, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

const stepOneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

const stepTwoSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
});

type StepOneData = z.infer<typeof stepOneSchema>;
type StepTwoData = z.infer<typeof stepTwoSchema>;

interface TrialBooking {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  bookingId: string;
  createdAt: string;
}

const services = [
  { id: "personal-training", name: "Personal Training Session", duration: "60 min" },
  { id: "yoga", name: "Yoga Class", duration: "45 min" },
  { id: "weight-training", name: "Weight Training", duration: "60 min" },
  { id: "core-training", name: "Core Training", duration: "45 min" },
];

const timeSlots = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

const MultiStepTrialForm = () => {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [trialBooking, setTrialBooking] = useLocalStorage<TrialBooking | null>("pathan-trial-booking", null);

  const stepOneForm = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const stepTwoForm = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: { service: "", preferredDate: "", preferredTime: "" },
  });

  const handleStepOneSubmit = (data: StepOneData) => {
    setStepOneData(data);
    setStep(2);
  };

  const handleStepTwoSubmit = (data: StepTwoData) => {
    if (!stepOneData) return;
    
    const booking: TrialBooking = {
      name: stepOneData.name,
      email: stepOneData.email,
      phone: stepOneData.phone,
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      bookingId: `PF-TRIAL-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    
    setTrialBooking(booking);
    setIsComplete(true);
    setStep(3);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  if (trialBooking && !isComplete) {
    return (
      <Card className="glass-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Your Upcoming Trial</h3>
              <p className="text-sm text-muted-foreground">Booking #{trialBooking.bookingId}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Service:</span> <span className="text-foreground">{services.find(s => s.id === trialBooking.service)?.name}</span></p>
            <p><span className="text-muted-foreground">Date:</span> <span className="text-foreground">{new Date(trialBooking.preferredDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
            <p><span className="text-muted-foreground">Time:</span> <span className="text-foreground">{trialBooking.preferredTime}</span></p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 w-full"
            onClick={() => setTrialBooking(null)}
          >
            Book Another Trial
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-primary/20 overflow-hidden">
      <CardContent className="p-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 md:w-24 h-1 mx-2 rounded transition-all duration-300 ${
                  step > s ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait" custom={step}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Personal Information</h3>
              </div>
              <form onSubmit={stepOneForm.handleSubmit(handleStepOneSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    {...stepOneForm.register("name")} 
                    className="mt-1"
                  />
                  {stepOneForm.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1">{stepOneForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    {...stepOneForm.register("email")} 
                    className="mt-1"
                  />
                  {stepOneForm.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">{stepOneForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    {...stepOneForm.register("phone")} 
                    className="mt-1"
                  />
                  {stepOneForm.formState.errors.phone && (
                    <p className="text-destructive text-sm mt-1">{stepOneForm.formState.errors.phone.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" variant="hero">
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Service & Time</h3>
              </div>
              <form onSubmit={stepTwoForm.handleSubmit(handleStepTwoSubmit)} className="space-y-4">
                <div>
                  <Label>Select Service</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          stepTwoForm.watch("service") === service.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            value={service.id}
                            {...stepTwoForm.register("service")}
                            className="sr-only"
                          />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{service.duration}</span>
                      </label>
                    ))}
                  </div>
                  {stepTwoForm.formState.errors.service && (
                    <p className="text-destructive text-sm mt-1">{stepTwoForm.formState.errors.service.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      min={getMinDate()}
                      {...stepTwoForm.register("preferredDate")} 
                      className="mt-1"
                    />
                    {stepTwoForm.formState.errors.preferredDate && (
                      <p className="text-destructive text-sm mt-1">{stepTwoForm.formState.errors.preferredDate.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <select 
                      id="time"
                      {...stepTwoForm.register("preferredTime")}
                      className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {stepTwoForm.formState.errors.preferredTime && (
                      <p className="text-destructive text-sm mt-1">{stepTwoForm.formState.errors.preferredTime.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button type="submit" variant="hero" className="flex-1">
                    Confirm <Check className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Trial Booked!</h3>
              <p className="text-muted-foreground mb-6">
                We'll contact you shortly to confirm your free trial session.
              </p>
              {trialBooking && (
                <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                  <p className="text-sm"><span className="text-muted-foreground">Booking ID:</span> <span className="font-mono font-bold">{trialBooking.bookingId}</span></p>
                  <p className="text-sm"><span className="text-muted-foreground">Name:</span> {trialBooking.name}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Service:</span> {services.find(s => s.id === trialBooking.service)?.name}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Date:</span> {new Date(trialBooking.preferredDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Time:</span> {trialBooking.preferredTime}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default MultiStepTrialForm;
