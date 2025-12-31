import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import transformation images
import rahulBefore from "@/assets/transformations/rahul-before.jpg";
import rahulAfter from "@/assets/transformations/rahul-after.jpg";
import priyaBefore from "@/assets/transformations/priya-before.jpg";
import priyaAfter from "@/assets/transformations/priya-after.jpg";
import vikramBefore from "@/assets/transformations/vikram-before.jpg";
import vikramAfter from "@/assets/transformations/vikram-after.jpg";
import anjaliBefore from "@/assets/transformations/anjali-before.jpg";
import anjaliAfter from "@/assets/transformations/anjali-after.jpg";

const transformations = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 32,
    duration: "6 months",
    weightLost: "18 kg",
    testimonial: "The trainers at Pathan Fitness changed my life. I never thought I could achieve this!",
    beforeDesc: "Before: 98 kg",
    afterDesc: "After: 80 kg",
    beforeImage: rahulBefore,
    afterImage: rahulAfter,
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 28,
    duration: "4 months",
    weightLost: "12 kg",
    testimonial: "The personalized nutrition plan combined with expert training made all the difference.",
    beforeDesc: "Before: 75 kg",
    afterDesc: "After: 63 kg",
    beforeImage: priyaBefore,
    afterImage: priyaAfter,
  },
  {
    id: 3,
    name: "Vikram Singh",
    age: 45,
    duration: "8 months",
    weightLost: "25 kg",
    testimonial: "At 45, I'm in the best shape of my life. Age is just a number at Pathan Fitness!",
    beforeDesc: "Before: 105 kg",
    afterDesc: "After: 80 kg",
    beforeImage: vikramBefore,
    afterImage: vikramAfter,
  },
  {
    id: 4,
    name: "Anjali Verma",
    age: 35,
    duration: "5 months",
    weightLost: "15 kg",
    testimonial: "The supportive community here kept me motivated throughout my journey.",
    beforeDesc: "Before: 82 kg",
    afterDesc: "After: 67 kg",
    beforeImage: anjaliBefore,
    afterImage: anjaliAfter,
  },
];

const TransformationGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const currentTransformation = transformations[currentIndex];

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setSliderPosition(50);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setSliderPosition(50);
  };

  return (
    <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary font-semibold mb-4 tracking-wider uppercase text-sm">
            Real Results
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            TRANSFORMATION
            <span className="text-gradient-gold block">GALLERY</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real members, real transformations. See what's possible when dedication meets expert guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted cursor-ew-resize shadow-card"
                onMouseMove={(e) => isDragging && handleSliderChange(e)}
                onMouseDown={(e) => { setIsDragging(true); handleSliderChange(e); }}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={handleSliderChange}
              >
                {/* After image (background - full) */}
                <div className="absolute inset-0">
                  <img 
                    src={currentTransformation.afterImage} 
                    alt={`${currentTransformation.name} after transformation`}
                    className="w-full h-full object-cover"
                  />
                  {/* After overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Before image (clipped) */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img 
                    src={currentTransformation.beforeImage} 
                    alt={`${currentTransformation.name} before transformation`}
                    className="w-full h-full object-cover"
                  />
                  {/* Before overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl border-2 border-primary">
                    <ChevronLeft className="w-4 h-4 text-primary" />
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-sm font-semibold text-white flex flex-col items-start">
                  <span className="text-xs text-white/70 uppercase tracking-wider">Before</span>
                  <span>{currentTransformation.beforeDesc.replace("Before: ", "")}</span>
                </div>
                <div className="absolute bottom-4 right-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-foreground flex flex-col items-end">
                  <span className="text-xs text-primary-foreground/70 uppercase tracking-wider">After</span>
                  <span>{currentTransformation.afterDesc.replace("After: ", "")}</span>
                </div>

                {/* Instruction text */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white/80 pointer-events-none">
                  ← Drag to compare →
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentIndex(index); setSliderPosition(50); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`View transformation ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Testimonial Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stats */}
                <div className="flex gap-8 mb-8">
                  <div className="text-center">
                    <p className="font-display text-5xl text-primary">{currentTransformation.weightLost}</p>
                    <p className="text-sm text-muted-foreground mt-1">Weight Lost</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-5xl text-foreground">{currentTransformation.duration}</p>
                    <p className="text-sm text-muted-foreground mt-1">Duration</p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl text-foreground font-medium leading-relaxed mb-8">
                  "{currentTransformation.testimonial}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src={currentTransformation.afterImage} 
                      alt={currentTransformation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-xl text-foreground">{currentTransformation.name}</p>
                    <p className="text-sm text-muted-foreground">Age {currentTransformation.age} • Pathan Fitness Member</p>
                  </div>
                </div>

                {/* CTA */}
                <Button asChild variant="hero" size="lg" className="btn-press">
                  <Link to="/book">
                    Start Your Transformation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrev}
                className="rounded-full w-12 h-12"
                aria-label="Previous transformation"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full w-12 h-12"
                aria-label="Next transformation"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformationGallery;
