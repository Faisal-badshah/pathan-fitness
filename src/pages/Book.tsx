import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookingConfirmationModal from "@/components/modals/BookingConfirmationModal";

const timeSlots = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
];

const services = [
  "Personal Training Session",
  "Yoga Class",
  "Weight Lifting Class",
  "Flexibility Training",
  "Core Training",
  "Free Consultation",
];

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15, "Phone number is too long"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  message: z.string().max(500, "Message is too long").optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Book = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message?: string;
  } | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      message: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setBookingDetails({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
      message: data.message,
    });
    setShowModal(true);
    form.reset();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBookingDetails(null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">Book Online</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              SCHEDULE YOUR <span className="text-gradient">SESSION</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Book a class, personal training session, or free consultation. Fill out the form below and we will confirm your appointment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Info */}
                <div className="bg-gradient-card rounded-2xl border border-border p-6 space-y-4 shadow-card">
                  <h2 className="font-display text-xl text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    Personal Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Service Selection */}
                <div className="bg-gradient-card rounded-2xl border border-border p-6 space-y-4 shadow-card">
                  <h2 className="font-display text-xl text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    Select Service & Time
                  </h2>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Service *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Preferred Date *</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Preferred Time *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="bg-gradient-card rounded-2xl border border-border p-6 space-y-4 shadow-card">
                  <h2 className="font-display text-xl text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    Additional Notes
                  </h2>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Any special requirements or goals?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your fitness goals or any special requirements..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Processing...
                    </span>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By submitting this form, you agree to be contacted by our team to confirm your appointment.
                </p>
              </motion.form>
            </Form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        bookingDetails={bookingDetails}
      />
    </Layout>
  );
};

export default Book;
