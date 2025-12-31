import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Heart, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import TransformationGallery from "@/components/home/TransformationGallery";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import trainerImage from "@/assets/trainer-session.jpg";
import yogaImage from "@/assets/yoga-class.jpg";
import weightImage from "@/assets/weight-lifting.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const services = [
  {
    icon: Dumbbell,
    title: "Weight Training",
    description: "Build strength and muscle with our certified trainers guiding you through personalized weight training programs."
  },
  {
    icon: Heart,
    title: "Flexibility Training",
    description: "Improve coordination, balance and core strength with unique exercises that work every muscle group."
  },
  {
    icon: Target,
    title: "Core Training",
    description: "Strengthen your core with targeted exercises designed to improve posture and overall stability."
  }
];

const classes = [
  {
    title: "Yoga",
    image: yogaImage,
    description: "Exercise your way to a healthy body and mind with our yoga classes suitable for all levels."
  },
  {
    title: "Weight Lifting",
    image: weightImage,
    description: "Build strength and confidence with our weight lifting classes led by experienced trainers."
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Premium Cinematic Hero */}
      <HeroSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* About Preview */}
      <section className="py-16 lg:py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-semibold mb-3 md:mb-4 tracking-wider uppercase text-xs md:text-sm">About Us</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 md:mb-6">
                STATE-OF-THE-ART
                <span className="text-gradient block">FACILITY</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
                Our state-of-the-art facility and fully-equipped training rooms offer a workout experience in a comfortable, personal and professional atmosphere. Pathan Fitness employs certified and experienced trainers who are always on-hand and ready to help our clients have a top notch training experience every time.
              </p>
              <Button asChild variant="outline" size="lg" className="btn-press w-full sm:w-auto">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elevated hover-lift">
                <img
                  src={trainerImage}
                  alt="Personal trainer helping client with weight training"
                  className="w-full aspect-[4/5] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-gradient-primary text-primary-foreground p-4 md:p-6 rounded-xl shadow-glow">
                <p className="font-display text-3xl md:text-5xl">25+</p>
                <p className="text-xs md:text-sm font-medium">Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-32 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
          >
            <p className="text-primary font-semibold mb-3 md:mb-4 tracking-wider uppercase text-xs md:text-sm">Our Services</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 md:mb-6">
              LET US BE YOUR
              <span className="text-gradient block">GUIDE</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Personal training is the most effective way to reach your fitness goals. Our certified staff will work one on one with you to keep you motivated and educated.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-card p-6 md:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 shadow-card hover-lift card-premium"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-3 md:mb-4">{service.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">{service.description}</p>
                <Button asChild variant="ghost" className="p-0 text-primary hover:text-primary/80 underline-grow text-sm">
                  <Link to="/services">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Gallery */}
      <TransformationGallery />

      {/* Classes Preview */}
      <section className="py-16 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
          >
            <p className="text-primary font-semibold mb-3 md:mb-4 tracking-wider uppercase text-xs md:text-sm">Fitness Classes</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 md:mb-6">
              FIND THE RIGHT
              <span className="text-gradient block">CLASS FOR YOU</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Join our group fitness classes led by experienced instructors who will guide you through every step.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
            {classes.map((cls, index) => (
              <motion.div
                key={cls.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-elevated hover-lift"
              >
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2 md:mb-3">{cls.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 line-clamp-2">{cls.description}</p>
                  <Button asChild variant="hero" size="default" className="btn-press w-full sm:w-auto">
                    <Link to="/classes">View Schedule</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="py-16 lg:py-32 relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/10 rounded-full blur-3xl" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Users className="w-12 h-12 md:w-20 md:h-20 text-primary mx-auto mb-6 md:mb-8 icon-glow" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 md:mb-6">
              READY TO START YOUR
              <span className="text-gradient block">FITNESS JOURNEY?</span>
            </h2>
            <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
              Join Pathan Fitness today and transform your body with our certified trainers. First consultation is free!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="btn-press shine w-full sm:w-auto">
                <Link to="/book">Book a Free Session</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-press w-full sm:w-auto">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
