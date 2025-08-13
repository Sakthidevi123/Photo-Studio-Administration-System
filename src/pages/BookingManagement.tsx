import { Seo } from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { api, ApiBooking, ApiDelivery } from "@/lib/api";
import { useMemo, useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function BookingManagement() {
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const [deliveries, setDeliveries] = useState<ApiDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Load bookings from API
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      // Load both bookings and deliveries
      const [bookingData, deliveryData] = await Promise.all([
        api.listBookings(),
        api.listDeliveries()
      ]);
      
      setBookings(bookingData);
      setDeliveries(deliveryData);
      console.log('Loaded bookings:', bookingData);
      console.log('Loaded deliveries:', deliveryData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({ title: "Error", description: "Failed to load bookings", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = 
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (booking.customerEmail || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      
      // Hide completed bookings that have deliveries (photos have been delivered)
      const hasDelivery = deliveries.some(delivery => {
        if (typeof delivery.booking === 'object' && 'id' in delivery.booking) {
          return delivery.booking.id === booking.id;
        }
        return false;
      });
      
      const shouldHideCompletedWithDelivery = booking.status === 'completed' && hasDelivery;
      
      return matchesSearch && matchesStatus && !shouldHideCompletedWithDelivery;
    });
  }, [bookings, deliveries, searchQuery, statusFilter]);

  // Update booking status
  const updateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      // Find the current booking to preserve other fields
      const currentBooking = bookings.find(b => b.id === bookingId);
      if (!currentBooking) {
        throw new Error('Booking not found');
      }

      // Update local state immediately for better UX
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus.toLowerCase() } : b)
      );

      // Try different approaches for backend update
      let updateSuccess = false;
      
      // Approach 1: Just status
      try {
        const updateData = { status: newStatus };
        console.log('Attempting update with:', updateData);
        await api.updateBooking(bookingId, updateData);
        updateSuccess = true;
      } catch (error1) {
        console.log('Approach 1 failed, trying approach 2');
        
        // Approach 2: Status in uppercase
        try {
          const updateData = { status: newStatus.toUpperCase() };
          console.log('Attempting update with uppercase:', updateData);
          await api.updateBooking(bookingId, updateData);
          updateSuccess = true;
        } catch (error2) {
          console.log('Approach 2 failed, trying approach 3');
          
          // Approach 3: Full booking object
          try {
            const updateData = {
              customerName: currentBooking.customerName,
              customerEmail: currentBooking.customerEmail,
              scheduledAt: currentBooking.scheduledAt,
              timeSlot: currentBooking.timeSlot,
              status: newStatus.toUpperCase()
            };
            console.log('Attempting full update:', updateData);
            await api.updateBooking(bookingId, updateData);
            updateSuccess = true;
          } catch (error3) {
            console.error('All update approaches failed:', error3);
            // Keep local state change but show warning
            toast({ 
              title: "Local update only", 
              description: `Status updated locally to ${newStatus.toLowerCase()}. Backend sync may be needed.`,
              variant: "default"
            });
            return;
          }
        }
      }
      
      if (updateSuccess) {
        toast({ 
          title: "Status updated", 
          description: `Booking has been ${newStatus.toLowerCase()} successfully`,
          variant: "default"
        });
        
        console.log('Booking status updated successfully');
        
        // Reload bookings to ensure consistency
        setTimeout(() => {
          loadBookings();
        }, 1000);
      }
      
    } catch (error) {
      console.error('Critical error updating booking:', error);
      
      // Revert local state change
      const originalBooking = bookings.find(b => b.id === bookingId);
      if (originalBooking) {
        setBookings(prev => 
          prev.map(b => b.id === bookingId ? originalBooking : b)
        );
      }
      
      toast({ 
        title: "Update failed", 
        description: "Failed to update booking status. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  // Get status badge color
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <Seo title="Booking Management" description="Manage customer bookings and appointments." />
      
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage customer bookings, update status, and track appointments.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Bookings</Label>
              <Input
                id="search"
                placeholder="Search by customer name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="status">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      {loading ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p>Loading bookings...</p>
          </CardContent>
        </Card>
      ) : filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all" 
                ? "No bookings match your search criteria." 
                : "No bookings found."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Customer Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{booking.customerName}</h3>
                    <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <span>📅 {formatDate(booking.scheduledAt)}</span>
                      <span>🕒 {booking.timeSlot || "Not specified"}</span>
                      <Badge variant={getStatusBadgeVariant(booking.status || "pending")}>
                        {(booking.status || "pending").charAt(0).toUpperCase() + (booking.status || "pending").slice(1)}
                      </Badge>
                    </div>
                    {booking.serviceItem && (
                      <p className="mt-1 text-sm font-medium">
                        Service: {typeof booking.serviceItem === 'object' ? booking.serviceItem.name : 'Unknown Service'}
                      </p>
                    )}
                    {booking.assignedStaff && (
                      <p className="text-sm text-muted-foreground">
                        Assigned to: {typeof booking.assignedStaff === 'object' ? booking.assignedStaff.fullName : 'Unknown Staff'}
                      </p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'confirmed' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'completed' && (
                      <Badge variant="secondary" className="w-fit">Completed</Badge>
                    )}
                    
                    {booking.status === 'cancelled' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateBookingStatus(booking.id, 'pending')}
                      >
                        Reactivate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
