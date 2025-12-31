import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  aspectRatio?: string;
}

const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholderClassName = "",
  aspectRatio = "16/9"
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${placeholderClassName}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/5 to-transparent skeleton-shimmer" />
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default LazyImage;
