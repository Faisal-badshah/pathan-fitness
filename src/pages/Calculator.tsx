import Layout from "@/components/layout/Layout";
import MembershipCalculator from "@/components/interactive/MembershipCalculator";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  "Transparent pricing with no hidden fees",
  "Flexible monthly or yearly plans",
  "Add or remove features anytime",
  "14-day money-back guarantee",
  "Freeze membership for up to 2 months/year",
];

const Calculator = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Build Your <span className="text-gradient-primary">Perfect Plan</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Use our interactive calculator to customize your membership and see real-time pricing. No surprises, just transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <MembershipCalculator />
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                Why Our Members <span className="text-primary">Love Us</span>
              </h2>
              <p className="text-muted-foreground">
                We believe in complete transparency. What you see is what you pay — no hidden fees, no surprise charges.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="glass-card p-6 rounded-xl mt-8">
                <h3 className="font-bold mb-2">Need Help Choosing?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our fitness consultants are happy to help you find the perfect plan for your goals.
                </p>
                <p className="text-primary font-bold">
                  📞 Call: +91 98765 43210
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Calculator;
