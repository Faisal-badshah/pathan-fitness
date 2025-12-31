import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Member since 2019",
    content: "Pathan Fitness completely transformed my life. I lost 25 kgs in 6 months with their personalized training program. The trainers are exceptional and truly care about your progress.",
    rating: 5,
    image: "RK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Member since 2021",
    content: "The yoga classes here are phenomenal. The peaceful environment combined with expert instruction has helped me manage stress and improve flexibility. Best decision I ever made!",
    rating: 5,
    image: "PS",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Member since 2020",
    content: "As a working professional, I needed a gym with flexible hours. Pathan Fitness offers exactly that with top-notch equipment and knowledgeable staff. Highly recommended!",
    rating: 5,
    image: "AP",
  },
  {
    id: 4,
    name: "Sunita Verma",
    role: "Member since 2022",
    content: "I was nervous about joining a gym at 45, but the trainers made me feel so comfortable. The personalized attention and supportive community keep me motivated every day.",
    rating: 5,
    image: "SV",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Swipe handlers for mobile
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      goToPrev();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  }, [goToPrev, goToNext]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            WHAT OUR MEMBERS SAY
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it. Here's what our community has to say about their journey with Pathan Fitness.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 md:p-12 shadow-card overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <Quote className="w-16 h-16 md:w-24 md:h-24 text-primary/10" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-base md:text-xl lg:text-2xl text-foreground leading-relaxed mb-6 md:mb-8 font-medium">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-base md:text-lg text-primary">{currentTestimonial.image}</span>
                  </div>
                  <div>
                    <p className="font-display text-lg md:text-xl text-foreground">{currentTestimonial.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{currentTestimonial.role}</p>
                  </div>
                </div>

                {/* Swipe hint for mobile */}
                <p className="md:hidden text-xs text-muted-foreground text-center mt-4">
                  Swipe to see more
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrev}
                  className="rounded-full"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
