import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Classes", path: "/classes" },
  { name: "Plans & Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-heavy">
      {/* Top Bar */}
      <div className="hidden lg:block bg-background/50 py-2 border-b border-border/30">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="mailto:saadkhan070420@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              saadkhan070420@gmail.com
            </a>
            <a href="tel:+917354144214" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              073541 44214
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container flex items-center justify-between h-16 lg:h-20">
        <Link to="/">
          <Logo variant="full" size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="hero" size="lg">
            <Link to="/book">Book Online</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-3 text-foreground touch-target"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[-1]"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <nav className="container py-6 flex flex-col gap-2" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all touch-target ${
                        location.pathname === link.path 
                          ? "text-primary bg-primary/10" 
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-4"
                >
                  <Button asChild variant="hero" size="lg" className="w-full touch-target">
                    <Link to="/book" onClick={() => setIsMenuOpen(false)}>Book Online</Link>
                  </Button>
                </motion.div>
                <div className="flex items-center justify-center gap-8 pt-6 mt-4 border-t border-border">
                  <a href="#" aria-label="Facebook" className="p-3 text-muted-foreground hover:text-primary transition-colors touch-target">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" aria-label="Instagram" className="p-3 text-muted-foreground hover:text-primary transition-colors touch-target">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" aria-label="Twitter" className="p-3 text-muted-foreground hover:text-primary transition-colors touch-target">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
                {/* Mobile contact info */}
                <div className="mt-4 pt-4 border-t border-border text-center space-y-2">
                  <a 
                    href="tel:+917354144214" 
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    073541 44214
                  </a>
                  <a 
                    href="mailto:saadkhan070420@gmail.com" 
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    saadkhan070420@gmail.com
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
