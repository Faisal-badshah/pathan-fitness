import Layout from "@/components/layout/Layout";
import ClassScheduleCalendar from "@/components/interactive/ClassScheduleCalendar";
import { motion } from "framer-motion";

const Schedule = () => {
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
              Class <span className="text-gradient-primary">Schedule</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Find the perfect class that fits your schedule. Reserve your spot and join our community of fitness enthusiasts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule Calendar */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ClassScheduleCalendar />
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Tips for Your First Class</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="glass-card p-5 rounded-xl">
                <h3 className="font-bold mb-2">Arrive Early</h3>
                <p className="text-sm text-muted-foreground">
                  Come 10-15 minutes before class to set up and meet the instructor.
                </p>
              </div>
              <div className="glass-card p-5 rounded-xl">
                <h3 className="font-bold mb-2">Bring Water</h3>
                <p className="text-sm text-muted-foreground">
                  Stay hydrated! We have water fountains, but bring your own bottle.
                </p>
              </div>
              <div className="glass-card p-5 rounded-xl">
                <h3 className="font-bold mb-2">Dress Comfortably</h3>
                <p className="text-sm text-muted-foreground">
                  Wear breathable workout clothes and appropriate footwear.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
