import { Seo } from "@/components/Seo";
import { useAppData } from "@/context/AppDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ServicesAdmin() {
  const { services, addService, updateService, deleteService } = useAppData();
  const [form, setForm] = useState({ name: "", category: "Portrait", price: "250", durationMin: "60", description: "", active: true });

  function create() {
    if (!form.name) return;
    addService({ name: form.name, category: form.category as any, price: Number(form.price), durationMin: Number(form.durationMin), description: form.description, active: form.active });
    setForm({ name: "", category: "Portrait", price: "250", durationMin: "60", description: "", active: true });
    toast({ title: "Service added" });
  }

  return (
    <div className="space-y-6 animate-enter">
      <Seo title="Services" description="Manage service packages and pricing." />

      {/* Hero header */}
      <div className="rounded-xl p-6 bg-gradient-primary text-primary-foreground shadow-elevated">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-background/20">
            <Camera className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl">Service Catalog</h1>
            <p className="text-sm opacity-90">Create, price, and curate your studio's offerings.</p>
          </div>
        </div>
      </div>

      {/* Create form */}
      <Card className="shadow-elevated">
        <CardHeader><CardTitle>Add New Service</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-5 gap-3">
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(v)=>setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Wedding','Portrait','Product','Event','Other'].map((c)=>(<SelectItem key={c} value={c}>{c}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price</Label>
            <Input type="number" value={form.price} onChange={(e)=>setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <Label>Duration (min)</Label>
            <Input type="number" value={form.durationMin} onChange={(e)=>setForm({ ...form, durationMin: e.target.value })} />
          </div>
          <div className="flex items-end">
            <Button onClick={create} variant="hero" className="w-full">Add Service</Button>
          </div>
          <div className="md:col-span-5">
            <Label>Description</Label>
            <Input value={form.description} onChange={(e)=>setForm({ ...form, description: e.target.value })} placeholder="Optional description" />
          </div>
        </CardContent>
      </Card>

      {/* Services grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((s)=> (
          <Card key={s.id} className="glass hover-scale">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{s.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{s.category} • {s.durationMin} min</p>
                </div>
                <Badge variant={s.active ? 'default':'secondary'}>{s.active ? 'Active':'Inactive'}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 min-h-10">{s.description || '—'}</p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">{formatINR(s.price)}</div>
                <div className="flex items-center gap-2">
                  <Button variant="soft" onClick={()=>updateService(s.id, { active: !s.active })}>{s.active ? 'Deactivate' : 'Activate'}</Button>
                  <Button variant="destructive" onClick={()=>deleteService(s.id)}>Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
