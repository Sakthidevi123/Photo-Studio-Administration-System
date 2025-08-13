import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatINR } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { api, ApiService } from "@/lib/api";

export default function BookingPortal() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [serviceId, setServiceId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>("10:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const times = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];

  // Load services from API
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await api.listServices();
      const activeServices = data.filter(s => s.active !== false);
      setServices(activeServices);
      if (activeServices.length > 0 && !serviceId) {
        setServiceId(String(activeServices[0].id));
      }
      console.log('Loaded services for booking:', activeServices);
    } catch (error) {
      console.error('Error loading services:', error);
      toast({ title: "Error", description: "Failed to load services", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    // Enhanced validation
    if (!serviceId || !date || !timeSlot || !name.trim() || !email.trim()) {
      toast({ title: "Missing info", description: "Please fill out all fields.", variant: "destructive" });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      toast({ title: "Invalid date", description: "Please select a future date.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // Format date properly for backend
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = timeSlot.split(':')[0].padStart(2, '0');
      const minute = timeSlot.split(':')[1].padStart(2, '0');
      
      const scheduledDateTime = `${year}-${month}-${day}T${hour}:${minute}:00`;
      console.log('Submitting booking with datetime:', scheduledDateTime);
      
      const bookingData = {
        customerName: name.trim(),
        customerEmail: email.trim(),
        scheduledAt: scheduledDateTime,
        timeSlot: timeSlot,
        serviceItem: { id: Number(serviceId) },
        status: "pending"
      };
      
      console.log('Booking payload:', bookingData);
      const booking = await api.createBooking(bookingData);
      
      toast({ 
        title: "Booking requested successfully!", 
        description: `Reference ID: ${booking.id}. We will contact you soon to confirm.`,
        duration: 5000
      });
      
      // Reset form
      setName("");
      setEmail("");
      setDate(new Date());
      setTimeSlot("10:00");
      if (services.length > 0) {
        setServiceId(String(services[0].id));
      }
      
      console.log('Booking created successfully:', booking);
    } catch (error) {
      console.error('Booking submission error:', error);
      let errorMessage = "Please try again or contact us directly.";
      
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        if (error.message.includes('400') || error.message.includes('Bad Request')) {
          errorMessage = "Invalid booking data. Please check all fields.";
        } else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
          errorMessage = "Server error. Please contact support.";
        } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          errorMessage = "Network error. Please check your connection.";
        }
      }
      
      toast({ 
        title: "Booking failed", 
        description: errorMessage, 
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Seo title="Book a Session" description="Browse time slots and book your photo session." />
        <Card>
          <CardContent className="py-8 text-center">
            <p>Loading booking form...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Seo title="Book a Session" description="Browse time slots and book your photo session." />
      <Card>
        <CardHeader>
          <CardTitle>Book your photo session</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose your preferred service, date, and time. We'll contact you to confirm your booking.
          </p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="service">Service *</Label>
              <Select value={serviceId} onValueChange={setServiceId}>
                <SelectTrigger className="mt-1" id="service">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name} – {formatINR(s.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {services.length === 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  No services available at the moment.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="date">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start mt-1" id="date">
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    initialFocus 
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="time">Time *</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="mt-1" id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name *</Label>
              <Input 
                id="name"
                className="mt-1" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Jane Doe"
                disabled={submitting}
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email"
                className="mt-1" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="jane@example.com"
                disabled={submitting}
              />
            </div>
            <Button 
              onClick={submit} 
              className="w-full" 
              disabled={submitting || !serviceId || !date || !name.trim() || !email.trim()}
            >
              {submitting ? "Submitting..." : "Request Booking"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Your booking request will be reviewed and confirmed within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
