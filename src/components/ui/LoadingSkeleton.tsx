import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  variant?: "hero" | "card" | "text" | "image";
  className?: string;
}

const LoadingSkeleton = ({ variant = "text", className = "" }: LoadingSkeletonProps) => {
  const baseClasses = "bg-muted/50 rounded-lg animate-pulse";
  
  const variants = {
    hero: "w-full h-[80vh]",
    card: "w-full h-64",
    text: "h-4 w-3/4",
    image: "w-full aspect-[16/9]",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/20 to-transparent skeleton-shimmer" />
    </motion.div>
  );
};

export const PageLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-4 space-y-8">
      <LoadingSkeleton variant="hero" className="max-h-[50vh]" />
      <div className="container space-y-6">
        <LoadingSkeleton variant="text" className="w-1/4" />
        <LoadingSkeleton variant="text" className="w-1/2" />
        <div className="grid md:grid-cols-3 gap-6">
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
          <LoadingSkeleton variant="card" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
