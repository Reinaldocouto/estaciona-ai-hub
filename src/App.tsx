
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Spaces from "./pages/Spaces";
import SpaceDetails from "./pages/SpaceDetails";
import HowItWorks from "./pages/HowItWorks";
import RentOutSpot from "./pages/RentOutSpot";
import Premium from "./pages/Premium";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/spaces/:id" element={<SpaceDetails />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/rent-out-spot" element={<RentOutSpot />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
