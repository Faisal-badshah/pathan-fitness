import { Link } from "react-router-dom";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileBottomCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-heavy border-t border-border/50 p-3 safe-area-bottom">
      <div className="flex gap-3">
        <Button 
          asChild 
          variant="outline" 
          size="lg" 
          className="flex-1 btn-press gap-2"
        >
          <a href="tel:+917354144214">
            <Phone className="w-4 h-4" />
            <span>Call Us</span>
          </a>
        </Button>
        <Button 
          asChild 
          variant="hero" 
          size="lg" 
          className="flex-1 btn-press gap-2"
        >
          <Link to="/book">
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomCTA;
