import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Users, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import yogaImage from "@/assets/yoga-class.jpg";
import weightImage from "@/assets/weight-lifting.jpg";

const classes = [
  {
    title: "Yoga",
    image: yogaImage,
    duration: "60 min",
    level: "All Levels",
    schedule: "Mon, Wed, Fri - 7:00 AM & 6:00 PM",
    description: "Join us for Yoga and exercise your way to a healthy body and mind. Yoga techniques build a strong body from which one can transition into more advanced stages, including a diversity of exercises and modifications to suit a range of difficulties, from beginner to advanced. Treat yourself today — you deserve it!",
  },
  {
    title: "Weight Lifting",
    image: weightImage,
    duration: "75 min",
    level: "All Levels",
    schedule: "Tue, Thu, Sat - 8:00 AM & 7:00 PM",
    description: "Join us for Weight Lifting and exercise your way to a healthy body and mind. Weight Lifting techniques build a strong body from which one can transition into more advanced stages, including a diversity of exercises and modifications to suit a range of difficulties, from beginner to advanced. Treat yourself today — you deserve it!",
  },
];

const schedule = [
  { day: "Monday", classes: ["Yoga - 7:00 AM", "Yoga - 6:00 PM"] },
  { day: "Tuesday", classes: ["Weight Lifting - 8:00 AM", "Weight Lifting - 7:00 PM"] },
  { day: "Wednesday", classes: ["Yoga - 7:00 AM", "Yoga - 6:00 PM"] },
  { day: "Thursday", classes: ["Weight Lifting - 8:00 AM", "Weight Lifting - 7:00 PM"] },
  { day: "Friday", classes: ["Yoga - 7:00 AM", "Yoga - 6:00 PM"] },
  { day: "Saturday", classes: ["Weight Lifting - 8:00 AM", "Weight Lifting - 7:00 PM"] },
  { day: "Sunday", classes: ["Closed"] },
];

const Classes = () => {
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
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">Fitness Classes</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              FIND THE RIGHT CLASS FOR YOU
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our group fitness classes led by experienced instructors who will guide you through every step of your fitness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Classes */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="space-y-16">
            {classes.map((cls, index) => (
              <motion.div
                key={cls.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                    {cls.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {cls.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      {cls.level}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {cls.schedule}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {cls.description}
                  </p>
                  <Button asChild variant="hero" size="lg">
                    <Link to="/book">Book This Class</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              WEEKLY SCHEDULE
            </h2>
            <p className="text-muted-foreground">Plan your week with our class schedule</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-7">
              {schedule.map((day, index) => (
                <div
                  key={day.day}
                  className={`p-6 ${index < schedule.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}
                >
                  <p className="font-display text-lg text-foreground mb-4">{day.day}</p>
                  <div className="space-y-2">
                    {day.classes.map((cls, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {cls}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild variant="hero" size="xl">
              <Link to="/book">Book a Class Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Classes;
