import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star, Zap, Crown, Sparkles, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "₹1,499",
    period: "/month",
    description: "Perfect for getting started",
    icon: Zap,
    features: [
      "Access to gym equipment",
      "Locker room access",
      "Basic fitness assessment",
      "Group classes (2x/week)",
      "Mobile app access",
    ],
    popular: false,
    gradient: false,
  },
  {
    name: "Premium",
    price: "₹2,999",
    period: "/month",
    description: "Most popular choice",
    icon: Crown,
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "1 personal training session/month",
      "Nutrition consultation",
      "Access to all amenities",
      "Priority booking",
      "Towel service",
    ],
    popular: true,
    gradient: true,
  },
  {
    name: "Elite",
    price: "₹4,999",
    period: "/month",
    description: "For serious athletes",
    icon: Sparkles,
    features: [
      "Everything in Premium",
      "4 personal training sessions/month",
      "Customized workout plan",
      "Monthly progress review",
      "Guest passes (2x/month)",
      "Exclusive member events",
      "Personal locker",
      "Free supplements sample",
    ],
    popular: false,
    gradient: false,
  },
];

const packages = [
  {
    name: "Starter Pack",
    sessions: "10 Sessions",
    price: "₹8,999",
    savings: "Save ₹1,000",
    description: "One-on-one sessions with a certified trainer",
  },
  {
    name: "Transform Pack",
    sessions: "20 Sessions",
    price: "₹16,999",
    savings: "Save ₹3,000",
    description: "Extended training with progress tracking",
  },
  {
    name: "Ultimate Pack",
    sessions: "30 Sessions",
    price: "₹23,999",
    savings: "Save ₹6,000",
    description: "Complete transformation program",
  },
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">Plans & Pricing</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              INVEST IN YOUR <span className="text-gradient">HEALTH</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the membership plan that fits your fitness goals and lifestyle. Start your transformation today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group rounded-2xl p-8 transition-all duration-500 ${
                  plan.popular
                    ? "bg-gradient-primary shadow-glow scale-[1.02]"
                    : "bg-gradient-card border border-border hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg"
                  >
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    Most Popular
                  </motion.div>
                )}

                {/* Plan Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.popular ? "bg-background/20" : "bg-primary/10"
                }`}>
                  <plan.icon className={`w-7 h-7 ${plan.popular ? "text-background" : "text-primary"}`} />
                </div>

                <div className="mb-6">
                  <h3 className={`font-display text-2xl mb-2 ${
                    plan.popular ? "text-background" : "text-foreground"
                  }`}>{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className={`font-display text-5xl ${
                    plan.popular ? "text-background" : "text-foreground"
                  }`}>{plan.price}</span>
                  <span className={plan.popular ? "text-background/70" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-background/20" : "bg-primary/20"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? "text-background" : "text-primary"}`} />
                      </div>
                      <span className={`text-sm ${plan.popular ? "text-background/90" : "text-foreground"}`}>
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.popular ? "secondary" : "hero"}
                  size="lg"
                  className={`w-full group/btn ${
                    plan.popular ? "bg-background text-foreground hover:bg-background/90" : ""
                  }`}
                >
                  <Link to="/book">
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Personal Training Packages */}
      <section className="py-20 lg:py-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">Personal Training</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              ONE-ON-ONE TRAINING PACKAGES
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Invest in yourself with our personal training packages. Work one-on-one with our certified trainers to achieve your fitness goals faster.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.sessions}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gradient-card rounded-2xl border border-border p-8 text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-glow-sm"
              >
                {/* Savings Badge */}
                <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {pkg.savings}
                </div>

                <p className="font-display text-4xl text-gradient mb-2">{pkg.sessions}</p>
                <h3 className="font-display text-xl text-foreground mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>
                
                <div className="mb-6">
                  <span className="font-display text-3xl text-foreground">{pkg.price}</span>
                </div>

                <Button asChild variant="outline" size="lg" className="w-full group/btn hover:bg-primary hover:text-primary-foreground">
                  <Link to="/contact">
                    Inquire Now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              NOT SURE WHICH PLAN IS RIGHT FOR YOU?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us for a free consultation and we will help you choose the perfect membership plan for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">Contact Us Today</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/book">Book Free Trial</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
