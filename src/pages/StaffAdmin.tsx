import { Seo } from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, ApiStaff } from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function StaffAdmin() {
  const [staff, setStaff] = useState<ApiStaff[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ 
    name: "", 
    role: "Photographer", 
    email: "", 
    skills: "Portrait, Product" 
  });
  const [submitting, setSubmitting] = useState(false);

  // Load staff from database
  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setLoading(true);
    try {
      const data = await api.listStaff();
      setStaff(data);
      console.log('Loaded staff from database:', data);
    } catch (error) {
      console.error('Error loading staff:', error);
      toast({ title: "Error", description: "Failed to load staff", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const addStaff = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast({ title: "Error", description: "Name and email are required", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean);
      const newStaff = await api.createStaff({
        fullName: form.name.trim(),
        role: form.role.trim(),
        email: form.email.trim(),
        skills: skillsArray
      });
      
      setStaff(prev => [newStaff, ...prev]);
      setForm({ name: "", role: "Photographer", email: "", skills: "Portrait, Product" });
      toast({ title: "Success", description: `Staff member "${newStaff.fullName}" added successfully!` });
      console.log('Added staff to database:', newStaff);
    } catch (error) {
      console.error('Error adding staff:', error);
      toast({ title: "Error", description: "Failed to add staff member", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteStaff = async (staffId: number) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;

    try {
      await api.deleteStaff(staffId);
      setStaff(prev => prev.filter(s => s.id !== staffId));
      toast({ title: "Success", description: "Staff member deleted successfully" });
      console.log('Deleted staff from database:', staffId);
    } catch (error) {
      console.error('Error deleting staff:', error);
      toast({ title: "Error", description: "Failed to delete staff member", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <Seo title="Staff Management" description="Manage staff profiles and roles." />
      
      {/* Add Staff Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Staff Member</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add new team members to your photography studio.
          </p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name"
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              placeholder="Enter full name"
              disabled={submitting}
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input 
              id="role"
              value={form.role} 
              onChange={(e) => setForm({ ...form, role: e.target.value })} 
              placeholder="e.g., Photographer, Editor"
              disabled={submitting}
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email"
              type="email" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              placeholder="email@example.com"
              disabled={submitting}
            />
          </div>
          <div>
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input 
              id="skills"
              value={form.skills} 
              onChange={(e) => setForm({ ...form, skills: e.target.value })} 
              placeholder="Portrait, Wedding, Event"
              disabled={submitting}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-4 flex justify-end">
            <Button 
              onClick={addStaff} 
              disabled={submitting || !form.name.trim() || !form.email.trim()}
            >
              {submitting ? "Adding..." : "Add Staff Member"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({staff.length})</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your photography team members.
          </p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-muted-foreground">Loading staff...</p>
          ) : staff.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No staff members found. Add your first team member above.</p>
          ) : (
            <div className="space-y-4">
              {staff.map((member) => (
                <div key={member.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{member.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    {member.skills && member.skills.length > 0 && (
                      <p className="text-sm mt-1">
                        <span className="font-medium">Skills:</span> {member.skills.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteStaff(member.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
