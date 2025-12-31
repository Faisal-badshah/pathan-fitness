import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "073541 44214",
    href: "tel:+917354144214",
  },
  {
    icon: Mail,
    title: "Email",
    content: "saadkhan070420@gmail.com",
    href: "mailto:saadkhan070420@gmail.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Building no 128, main square, near Vardhan hospital, opposite to Jahangirabad, Pratap Nagar, Jahangirabad, Bhopal, Madhya Pradesh 462008, India",
    href: "https://maps.google.com/?q=Building+no+128+Jahangirabad+Bhopal",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon - Sat: 6am - 12am | Sunday: Closed",
    href: null,
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you soon.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">Contact Us</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              GET IN TOUCH
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our gym, classes, or memberships? We are here to help. Reach out to us and we will get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.title === "Address" ? "_blank" : undefined}
                    rel={item.title === "Address" ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                SEND US A MESSAGE
              </h2>

              {isSubmitted ? (
                <div className="bg-card rounded-2xl border border-border p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm text-muted-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                FIND US HERE
              </h2>
              <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-square lg:aspect-auto lg:h-full lg:min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.7711456!2d77.4!3d23.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pathan Fitness Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl text-foreground mb-2">
                PREFER TO TALK?
              </h2>
              <p className="text-muted-foreground">Call us directly and speak with our team.</p>
            </div>
            <Button asChild variant="hero" size="xl">
              <a href="tel:+917354144214">
                <Phone className="w-5 h-5" />
                Call 073541 44214
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
