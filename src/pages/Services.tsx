import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Dumbbell, Heart, Target, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Heart,
    title: "Flexibility Training",
    description: "Join one of our trainers for an hour of unique exercises to tighten and strengthen your body. This type of training allows for a wide variety of exercises that works every muscle group. Flexibility Training will improve all fitness areas by emphasizing coordination, balance and core strength.",
    benefits: [
      "Improved coordination and balance",
      "Enhanced core strength",
      "Full body workout",
      "Reduced risk of injury",
    ],
  },
  {
    icon: Dumbbell,
    title: "Weight Training",
    description: "Use one of our trainers as a personal coach as you begin a journey to get faster, stronger and healthier. Weight Training is suitable for everyone at any kind of fitness level. It is an excellent training program, taking advantage of the body's natural movements. Do not hesitate to start today!",
    benefits: [
      "Build muscle and strength",
      "Increase metabolism",
      "Improve bone density",
      "Boost confidence",
    ],
  },
  {
    icon: Target,
    title: "Core Training",
    description: "Strengthen your foundation with targeted core exercises designed to improve your posture, stability, and overall athletic performance. Our trainers will guide you through effective routines that build a solid core, essential for all other physical activities.",
    benefits: [
      "Better posture",
      "Improved stability",
      "Enhanced athletic performance",
      "Reduced back pain",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">Our Services</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              LET US BE YOUR GUIDE
            </h1>
            <p className="text-lg text-muted-foreground">
              Personal training is the most effective way to reach your fitness goals. Our certified staff will work one on one with you to keep you motivated and educated while you focus on your goal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">
                      Get in Touch
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} bg-gradient-card rounded-2xl p-12 border border-border`}>
                  <service.icon className="w-32 h-32 text-primary/20 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              READY TO GET STARTED?
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a free consultation with one of our certified trainers and discover which service is right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/book">Book Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
