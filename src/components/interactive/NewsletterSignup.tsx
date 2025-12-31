import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Mail, CheckCircle, Sparkles, X } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterData {
  email: string;
  subscribedAt: string;
}

interface NewsletterSignupProps {
  variant?: "inline" | "popup";
  onClose?: () => void;
}

const NewsletterSignup = ({ variant = "inline", onClose }: NewsletterSignupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useLocalStorage<NewsletterData | null>("pathan-newsletter", null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed({
      email: data.email,
      subscribedAt: new Date().toISOString(),
    });
    
    setIsSubmitting(false);
    reset();
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${variant === "popup" ? "relative" : ""} text-center py-6`}
      >
        {variant === "popup" && onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-xl font-bold mb-2">You're In! 🎉</h3>
        <p className="text-muted-foreground text-sm">
          Thanks for subscribing! We'll keep you updated with the latest fitness tips and exclusive offers.
        </p>
      </motion.div>
    );
  }

  const content = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Stay Fit, Stay Updated</h3>
          <p className="text-sm text-muted-foreground">Get weekly tips & exclusive offers</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="flex-1"
            />
            <Button type="submit" variant="hero" disabled={isSubmitting}>
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-destructive text-sm mt-1"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <p className="text-xs text-muted-foreground">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </form>
    </>
  );

  if (variant === "popup") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 w-80 glass-card p-4 rounded-2xl border border-primary/20 shadow-2xl"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {content}
      </motion.div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-primary/20">
      {content}
    </div>
  );
};

export default NewsletterSignup;
