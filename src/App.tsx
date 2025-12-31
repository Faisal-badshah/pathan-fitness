import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLoadingSkeleton } from "@/components/ui/LoadingSkeleton";

// Eager load the home page for fast initial render
import Index from "./pages/Index";

// Lazy load other pages for code splitting
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Classes = lazy(() => import("./pages/Classes"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Book = lazy(() => import("./pages/Book"));
const Contact = lazy(() => import("./pages/Contact"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Calculator = lazy(() => import("./pages/Calculator"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (previously cacheTime)
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/calculator" element={<Calculator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
