import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPortal from "./pages/BookingPortal";
import BookingManagement from "./pages/BookingManagement";
import ServicesAdmin from "./pages/ServicesAdmin";
import StaffAdmin from "./pages/StaffAdmin";
import PhotoDelivery from "./pages/PhotoDelivery";
import { AppDataProvider } from "@/context/AppDataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppDataProvider>
        <Routes>
          <Route path="/" element={<AppLayout /> }>
            <Route index element={<Index />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="book" element={<BookingPortal />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="admin/services" element={<ServicesAdmin />} />
            <Route path="admin/staff" element={<StaffAdmin />} />
            <Route path="photos" element={<PhotoDelivery />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
