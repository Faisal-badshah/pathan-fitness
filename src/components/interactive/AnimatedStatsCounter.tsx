import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Dumbbell, Calendar, Trophy } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

const stats: Stat[] = [
  { icon: <Users className="w-8 h-8" />, value: 5000, suffix: "+", label: "Happy Members", duration: 2000 },
  { icon: <Dumbbell className="w-8 h-8" />, value: 1200000, suffix: "+", label: "Kg Lifted This Year", duration: 2500 },
  { icon: <Calendar className="w-8 h-8" />, value: 25, suffix: "", label: "Years of Excellence", duration: 1500 },
  { icon: <Trophy className="w-8 h-8" />, value: 150, suffix: "+", label: "Transformations", duration: 1800 },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
};

const CountUpNumber = ({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  );
};

const AnimatedStatsCounter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient-primary">Numbers</span> Speak
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Since 2000, we've been transforming lives and building a community of fitness enthusiasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="glass-card p-6 md:p-8 text-center rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ type: "spring", delay: index * 0.1 + 0.3 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary"
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  <CountUpNumber value={stat.value} suffix={stat.suffix} duration={stat.duration} />
                </div>

                {/* Label */}
                <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>

                {/* Decorative glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStatsCounter;
