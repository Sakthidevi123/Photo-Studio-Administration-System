import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <Seo title="Studio Manager – Home" description="Premium photo studio management: bookings, services, staff, and album delivery." />
      <section className="text-center max-w-3xl animate-enter">
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-4">
          Manage your photo studio with confidence
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8">
          Seamlessly handle bookings, services, staff schedules, and deliver final photos — all in one modern app.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/book">Book a Session</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/dashboard">Open Dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="w-full mt-16">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Smart Bookings</h3>
              <p className="text-sm text-muted-foreground">Quickly create and manage sessions with calendar view and filters.</p>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Service Catalog</h3>
              <p className="text-sm text-muted-foreground">Configure packages, pricing, and descriptions with ease.</p>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Photo Delivery</h3>
              <p className="text-sm text-muted-foreground">Clients securely access and download their final photos.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
