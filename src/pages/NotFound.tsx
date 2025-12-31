import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import Logo from "@/components/brand/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Animated 404 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <span className="font-display text-[150px] sm:text-[200px] lg:text-[250px] leading-none text-gradient">
                  404
                </span>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Dumbbell className="w-16 h-16 sm:w-24 sm:h-24 text-primary/30" />
                </motion.div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
                PAGE NOT FOUND
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like this page took a rest day! Let's get you back on track with your fitness journey.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="hero" size="lg" className="btn-press gap-2">
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-press gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Or explore these pages:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { name: "Services", path: "/services" },
                  { name: "Classes", path: "/classes" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <Logo variant="icon" size="sm" className="mx-auto opacity-30" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
