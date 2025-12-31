import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl text-foreground tracking-wider">PATHAN FITNESS</h3>
              <p className="text-xs text-muted-foreground tracking-wide">Gym · Health, Fit for life</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your premier fitness destination in Bhopal. Transform your body and mind with our certified trainers since 2000.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-xl text-foreground tracking-wide">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/classes" className="text-sm text-muted-foreground hover:text-primary transition-colors">Classes</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Plans & Pricing</Link>
              <Link to="/book" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book Online</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-xl text-foreground tracking-wide">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+917354144214" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                073541 44214
              </a>
              <a href="mailto:saadkhan070420@gmail.com" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                saadkhan070420@gmail.com
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Building no 128, main square, near Vardhan hospital, Jahangirabad, Bhopal, MP 462008</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-xl text-foreground tracking-wide">Opening Hours</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Mon - Sat</p>
                  <p>6:00 AM - 12:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-0" />
                <div>
                  <p className="font-medium text-foreground">Sunday</p>
                  <p>Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            ©{new Date().getFullYear()} by Pathan Fitness. All rights reserved.
          </p>
          <Link to="/contact" className="text-sm text-primary hover:underline">
            Get in Touch
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
