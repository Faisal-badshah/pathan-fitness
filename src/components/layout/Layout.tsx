import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomCTA from "@/components/ui/MobileBottomCTA";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-28 pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomCTA />
    </div>
  );
};

export default Layout;
