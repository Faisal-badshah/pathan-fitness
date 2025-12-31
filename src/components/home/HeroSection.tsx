import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ChevronDown, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gym.jpg";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Parallax Background Image */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern gym interior with professional equipment at Pathan Fitness Bhopal"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-cinematic" />
      
      {/* Radial glow at top */}
      <div className="absolute inset-0 bg-gradient-hero-radial" />

      {/* Animated particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="container relative z-10 pt-16 md:pt-20 px-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">
              #1 Premium Gym in Bhopal Since 2000
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] text-foreground leading-[0.9] tracking-tight mb-4 md:mb-6 text-shadow-hero"
          >
            FIND YOUR
            <span className="text-gradient block">STRENGTH</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-2xl mb-8 md:mb-10 leading-relaxed"
          >
            Get fit. Stay healthy. Feel amazing. Transform your body and mind at{" "}
            <span className="text-primary font-semibold">Pathan Fitness</span> — 
            your premier gym destination in Bhopal.
          </motion.p>

          {/* CTAs - Stack on mobile */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12"
          >
            <Button asChild variant="hero" size="lg" className="group btn-press shine touch-target w-full sm:w-auto">
              <Link to="/book">
                Join Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="lg" className="btn-press touch-target w-full sm:w-auto">
              <Link to="/book">
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Book a Free Trial
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-foreground hover:text-primary touch-target hidden sm:flex">
              <a href="tel:+917354144214">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                073541 44214
              </a>
            </Button>
          </motion.div>

          {/* Stats row - 2x2 grid on mobile */}
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:flex gap-4 md:gap-12"
          >
            {[
              { value: "25+", label: "Years Experience" },
              { value: "5000+", label: "Happy Members" },
              { value: "15+", label: "Expert Trainers" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <p className="font-display text-2xl md:text-3xl lg:text-4xl text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10 hidden sm:flex"
      >
        <span className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 md:w-8 md:h-12 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5 md:p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 md:w-1.5 md:h-3 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Side decorative elements - hidden on mobile */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-10">
        {["01", "02", "03"].map((num, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.2 }}
            className={`text-xs tracking-wider ${i === 0 ? "text-primary" : "text-muted-foreground/50"}`}
          >
            {num}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
