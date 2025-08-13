import { Seo } from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api, ApiDelivery } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useMemo, useState, useEffect } from "react";

export default function PhotoDelivery() {
  const [email, setEmail] = useState("");
  const [deliveries, setDeliveries] = useState<ApiDelivery[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchDeliveries = async () => {
    if (!email.trim()) {
      toast({ title: "Email required", description: "Please enter your email address.", variant: "destructive" });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const results = await api.searchDeliveries(email.trim());
      setDeliveries(results);
      setSearched(true);
      console.log('Found deliveries:', results);
      
      if (results.length > 0) {
        toast({
          title: "Photos found!",
          description: `Found ${results.length} photo album${results.length > 1 ? 's' : ''} for ${email.trim()}`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error searching deliveries:', error);
      setDeliveries([]);
      setSearched(true);
      toast({ 
        title: "Search failed", 
        description: "Unable to search for deliveries. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchDeliveries();
    }
  };

  return (
    <div className="space-y-6">
      <Seo title="Photo Delivery" description="Clients can access and download their final photos." />
      <Card>
        <CardHeader><CardTitle>Access your photo albums</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Enter your email address</label>
            <div className="flex gap-2 mt-1">
              <Input 
                value={email} 
                placeholder="your.email@example.com" 
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <Button onClick={searchDeliveries} disabled={loading || !email.trim()}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter the email address you used when booking your session. No account needed.
            </p>
          </div>
          <div className="space-y-3">
            {searched && deliveries.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <div className="text-4xl mb-4">📧</div>
                <p className="text-lg font-medium mb-2">No photo albums found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  We couldn't find any photo deliveries for <strong>{email}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  • Make sure you entered the correct email address<br/>
                  • Check if your photos are still being processed<br/>
                  • Contact us if you believe this is an error
                </p>
              </div>
            )}
            
            {searched && deliveries.length > 0 && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✅</span>
                  <div>
                    <p className="font-medium text-green-800">
                      Your photos have been delivered!
                    </p>
                    <p className="text-sm text-green-700">
                      Found {deliveries.length} album{deliveries.length > 1 ? 's' : ''} for {email}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {deliveries.map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader>
                  <CardTitle className="text-base">{delivery.title}</CardTitle>
                  {delivery.notes && (
                    <p className="text-sm text-muted-foreground mt-1">{delivery.notes}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">📷 Photo Album Ready</p>
                        <p className="text-sm text-muted-foreground">
                          {delivery.photos.length} high-resolution photos available
                        </p>
                      </div>
                      <Button size="sm">
                        Download All
                      </Button>
                    </div>
                    
                    {/* Photo thumbnails */}
                    {delivery.photos.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Photo Preview:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {delivery.photos.slice(0, 6).map((photo, index) => (
                            <div key={index} className="relative group cursor-pointer">
                              <img 
                                src={photo} 
                                alt={`Photo ${index + 1}`} 
                                className="w-full aspect-square object-cover rounded-md hover:opacity-80 transition-opacity"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNNTAgMTAwTDE1MCA1MFYxNTBMNTAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPjwvc3ZnPg==';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-md flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                                  View
                                </span>
                              </div>
                            </div>
                          ))}
                          {delivery.photos.length > 6 && (
                            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                              <span className="text-sm text-gray-500 font-medium">
                                +{delivery.photos.length - 6}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground text-center">
                      All photos are available in high resolution. Click "Download All" to get your complete album.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
