import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Sparkles, Calculator, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 1499,
    yearlyPrice: 14990,
    features: ["Gym access (6 AM - 10 PM)", "Basic equipment", "Locker room access", "Free fitness assessment"],
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    features: ["24/7 gym access", "All equipment", "Group classes included", "Sauna & steam room", "1 PT session/month"],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    features: ["Everything in Premium", "Unlimited PT sessions", "Personalized meal plans", "Priority booking", "Guest passes (4/month)"],
  },
];

const addOns: AddOn[] = [
  { id: "pt-pack", name: "PT Session Pack (4)", price: 3999, description: "4 personal training sessions" },
  { id: "nutrition", name: "Nutrition Coaching", price: 1499, description: "Monthly diet consultation" },
  { id: "locker", name: "Private Locker", price: 499, description: "Dedicated locker with key" },
];

const MembershipCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");
  const [isYearly, setIsYearly] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [displayTotal, setDisplayTotal] = useState(0);

  const calculateTotal = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return 0;

    let planPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);

    return planPrice + (isYearly ? addOnsTotal * 12 : addOnsTotal);
  };

  const calculateSavings = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan || !isYearly) return 0;
    
    const yearlyWithMonthly = plan.monthlyPrice * 12;
    const addOnsSavings = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + ((addOn?.price || 0) * 12 * 0.1);
    }, 0);
    
    return yearlyWithMonthly - plan.yearlyPrice + addOnsSavings;
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  useEffect(() => {
    const targetTotal = calculateTotal();
    const duration = 500;
    const steps = 20;
    const increment = (targetTotal - displayTotal) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayTotal(targetTotal);
        clearInterval(timer);
      } else {
        setDisplayTotal(prev => Math.round(prev + increment));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [selectedPlan, isYearly, selectedAddOns]);

  const savings = calculateSavings();

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Membership Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Selection */}
        <div>
          <Label className="text-sm text-muted-foreground mb-3 block">Select Your Plan</Label>
          <div className="grid grid-cols-3 gap-2">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-3 rounded-lg border text-center transition-all ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/10 ring-2 ring-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gold text-background text-xs">
                    Popular
                  </Badge>
                )}
                <span className="font-bold block">{plan.name}</span>
                <span className="text-sm text-muted-foreground">
                  ₹{isYearly ? Math.round(plan.yearlyPrice / 12).toLocaleString() : plan.monthlyPrice.toLocaleString()}/mo
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-2">
            <Switch
              id="billing"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing" className="cursor-pointer">
              Pay Yearly
            </Label>
          </div>
          {isYearly && (
            <Badge variant="outline" className="text-primary border-primary">
              <TrendingDown className="w-3 h-3 mr-1" />
              Save up to 17%
            </Badge>
          )}
        </div>

        {/* Add-ons */}
        <div>
          <Label className="text-sm text-muted-foreground mb-3 block">Optional Add-ons</Label>
          <div className="space-y-2">
            {addOns.map((addOn) => (
              <button
                key={addOn.id}
                onClick={() => toggleAddOn(addOn.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                  selectedAddOns.includes(addOn.id)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selectedAddOns.includes(addOn.id) ? "bg-primary border-primary" : "border-muted-foreground"
                  }`}>
                    {selectedAddOns.includes(addOn.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div>
                    <span className="font-medium block">{addOn.name}</span>
                    <span className="text-xs text-muted-foreground">{addOn.description}</span>
                  </div>
                </div>
                <span className="font-bold">+₹{addOn.price.toLocaleString()}{isYearly ? "/yr" : "/mo"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-border pt-4">
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-sm text-muted-foreground">Total {isYearly ? "per year" : "per month"}</span>
              <motion.div
                key={displayTotal}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-foreground"
              >
                ₹{displayTotal.toLocaleString()}
              </motion.div>
            </div>
            <AnimatePresence>
              {savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-1 text-primary"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold">Save ₹{Math.round(savings).toLocaleString()}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button asChild variant="hero" className="w-full">
            <Link to="/book">
              Get Started Today
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipCalculator;
