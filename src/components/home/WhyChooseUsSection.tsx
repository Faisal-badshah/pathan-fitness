import { motion } from "framer-motion";
import { Shield, Dumbbell, Users, Clock, Award, Heart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certified Trainers",
    description: "Our team consists of nationally certified fitness professionals with years of experience.",
    highlight: true,
  },
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    description: "State-of-the-art machines and free weights from premium brands for optimal workouts.",
  },
  {
    icon: Users,
    title: "Personalized Plans",
    description: "Custom workout and nutrition plans tailored to your unique goals and body type.",
  },
  {
    icon: Clock,
    title: "Extended Hours",
    description: "Open 6 AM to midnight, six days a week to fit your busy schedule perfectly.",
  },
  {
    icon: Shield,
    title: "Since 2000",
    description: "Over two decades of trusted fitness excellence serving the Bhopal community.",
    highlight: true,
  },
  {
    icon: Heart,
    title: "Supportive Community",
    description: "Join a motivating community of like-minded individuals on their fitness journey.",
  },
];

const WhyChooseUsSection = () => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-primary font-semibold mb-4 tracking-wider uppercase text-sm">
            Why Choose Us
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            THE PATHAN FITNESS
            <span className="text-gradient block">DIFFERENCE</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just a gym — we're your partners in transformation. Here's what sets us apart from the rest.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className={`group relative p-8 rounded-2xl border transition-all duration-500 hover-lift card-premium ${
                feature.highlight
                  ? "bg-gradient-card border-primary/30 shadow-glow-sm"
                  : "bg-card/50 border-border hover:border-primary/30"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  feature.highlight
                    ? "bg-primary/20 group-hover:bg-primary/30"
                    : "bg-secondary group-hover:bg-primary/10"
                }`}
              >
                <feature.icon
                  className={`w-8 h-8 transition-colors ${
                    feature.highlight ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Highlight badge */}
              {feature.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    Featured
                  </span>
                </div>
              )}

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
