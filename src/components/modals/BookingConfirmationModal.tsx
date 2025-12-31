import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Clock, User, Mail, Phone, X, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails | null;
}

const BookingConfirmationModal = ({
  isOpen,
  onClose,
  bookingDetails,
}: BookingConfirmationModalProps) => {
  if (!bookingDetails) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const bookingReference = `PF-${Date.now().toString(36).toUpperCase()}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="sr-only">Booking Confirmed</DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle className="w-10 h-10 text-primary" />
            </motion.div>
          </motion.div>

          <h2 className="font-display text-3xl text-foreground mb-2">
            BOOKING CONFIRMED!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your session has been successfully booked
          </p>

          {/* Booking Reference */}
          <div className="bg-primary/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
            <p className="font-display text-2xl text-primary tracking-wider">{bookingReference}</p>
          </div>

          {/* Booking Details */}
          <div className="bg-secondary rounded-xl p-6 text-left space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-foreground font-medium">{bookingDetails.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Service</p>
                <p className="text-foreground font-medium">{bookingDetails.service}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-foreground font-medium text-sm">{formatDate(bookingDetails.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-foreground font-medium">{bookingDetails.time}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Confirmation sent to</p>
                <p className="text-foreground font-medium">{bookingDetails.email}</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <p className="text-sm text-muted-foreground mb-6">
            A confirmation email has been sent to your email address. Please arrive 10 minutes before your scheduled time.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" className="flex-1" onClick={onClose}>
              Done
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4" />
              Add to Calendar
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;
