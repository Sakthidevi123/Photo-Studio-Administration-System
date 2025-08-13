import { Seo } from "@/components/Seo";
import { useAppData } from "@/context/AppDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from "recharts";
import { formatINR } from "@/lib/utils";

export default function AdminDashboard() {
  const { stats, bookings, services } = useAppData();

  // Simple chart data: bookings per service
  const data = services.map((s) => ({ name: s.name.split(" ")[0], count: bookings.filter((b)=>b.serviceId===s.id).length }));

  return (
    <div className="space-y-6">
      <Seo title="Dashboard" description="Overview of bookings, revenue, and workload." />
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Bookings</CardTitle></CardHeader>
          <CardContent className="text-3xl font-semibold">{stats.totalBookings}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Upcoming Sessions</CardTitle></CardHeader>
          <CardContent className="text-3xl font-semibold">{stats.upcomingSessions}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent className="text-3xl font-semibold">{formatINR(stats.revenue)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active Services</CardTitle></CardHeader>
          <CardContent className="text-3xl font-semibold">{services.length}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Bookings by Service</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <RTooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
