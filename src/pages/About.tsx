import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Users, Award, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import trainerImage from "@/assets/trainer-session.jpg";
import heroGym from "@/assets/hero-gym.jpg";

const stats = [
  { icon: Clock, value: "25+", label: "Years Experience" },
  { icon: Users, value: "5000+", label: "Happy Members" },
  { icon: Award, value: "15+", label: "Certified Trainers" },
];

const values = [
  "Personalized fitness programs tailored to your goals",
  "Certified and experienced professional trainers",
  "State-of-the-art equipment and facilities",
  "Comfortable and motivating atmosphere",
  "Flexible scheduling to fit your lifestyle",
  "Continuous support and progress tracking",
];

const About = () => {
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
            <p className="text-primary font-semibold mb-4 tracking-wider uppercase">About Us</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              FITNESS IS A LIFESTYLE
            </h1>
            <p className="text-lg text-muted-foreground">
              At Pathan Fitness, our approach is what makes us the best value in Bhopal and we have proudly continued that philosophy since 2000.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-display text-3xl md:text-4xl text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                OUR STORY
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We asked ourselves what is vitally important to our clients, and we arrived at a method that is efficient and effective. It does not matter if you have never worked out before or are just ready to take it to the next level.
                </p>
                <p>
                  At Pathan Fitness, we will help you get where you want to go. Since we were established back in 2000, we have been serving the Bhopal area with a new way to exercise. And our clients cannot stop raving about it!
                </p>
                <p>
                  Our method of getting you where you want to go is why Pathan Fitness is unique. We find out what is really important to you and design a customized plan for you. This allows you to get to your ideal fitness level sooner.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={heroGym}
                alt="Pathan Fitness gym interior"
                className="rounded-2xl shadow-card w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img
                src={trainerImage}
                alt="Personal training session"
                className="rounded-2xl shadow-card w-full aspect-[3/4] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                WHY CHOOSE US
              </h2>
              <p className="text-muted-foreground mb-8">
                Our staff will encourage you to strive towards your goals. We have everything you need — knowledge, experience and equipment.
              </p>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              OUR TRAINERS
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our staff are all professionals with years of fitness experience. We have a ton of certified trainers for you to choose from. Each brings their own fitness specialty and unique training style, but all are committed to ensuring safe and effective workouts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-card p-8 rounded-2xl border border-border text-center"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl text-foreground mb-4">
              Let Us Match You With The Perfect Trainer
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Achieve your fitness dreams with a trainer that understands your goals and motivates you every step of the way.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/book">Book a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
