import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api, ApiBooking, ApiService, ApiStaff } from "@/lib/api";
import portrait1 from "@/assets/photos/portrait-1.jpg";
import portrait2 from "@/assets/photos/portrait-2.jpg";

export type Service = {
  id: string;
  name: string;
  category: "Wedding" | "Portrait" | "Product" | "Event" | "Other";
  price: number;
  durationMin: number;
  description?: string;
  active: boolean;
};

export type Staff = {
  id: string;
  name: string;
  role: string;
  email: string;
  skills: string[];
};

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceId: string;
  staffId?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  timeSlot: string; // e.g., "10:00"
  status: BookingStatus;
  notes?: string;
  createdAt: string;
};

export type Album = {
  id: string;
  customerEmail: string;
  title: string;
  photos: string[];
  createdAt: string;
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

const seedServices: Service[] = [
  { id: uuidv4(), name: "Wedding Classic", category: "Wedding", price: 1200, durationMin: 240, description: "4-hour coverage + 100 edited photos", active: true },
  { id: uuidv4(), name: "Portrait Studio", category: "Portrait", price: 250, durationMin: 60, description: "1-hour portrait session", active: true },
  { id: uuidv4(), name: "Product Essentials", category: "Product", price: 400, durationMin: 120, description: "Up to 15 products, studio lighting", active: true },
];

const seedStaff: Staff[] = [
  { id: uuidv4(), name: "Grace Kim", role: "Lead Photographer", email: "grace@example.com", skills: ["Wedding", "Portrait"] },
  { id: uuidv4(), name: "Liam Ortiz", role: "Photographer", email: "liam@example.com", skills: ["Product", "Portrait"] },
  { id: uuidv4(), name: "Maya Chen", role: "Editor", email: "maya@example.com", skills: ["Editing", "Retouching"] },
];

const todayISO = new Date().toISOString().slice(0,10);
const seedBookings: Booking[] = [
  { id: uuidv4(), customerName: "Ava Patel", customerEmail: "ava@example.com", serviceId: seedServices[0].id, date: todayISO, timeSlot: "10:00", status: "confirmed" as BookingStatus, createdAt: new Date().toISOString() },
];

const seedAlbums: Album[] = [
  { id: uuidv4(), customerEmail: "ava@example.com", title: "Ava Portraits", photos: [
    portrait1,
    portrait2,
  ], createdAt: new Date().toISOString() },
];

export type AppData = {
  services: Service[];
  staff: Staff[];
  bookings: Booking[];
  albums: Album[];
  // Services
  addService: (s: Omit<Service, "id">) => void;
  updateService: (id: string, patch: Partial<Service>) => void;
  deleteService: (id: string) => void;
  // Staff
  addStaff: (s: Omit<Staff, "id">) => void;
  updateStaff: (id: string, patch: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  // Bookings
  addBooking: (b: Omit<Booking, "id" | "status" | "createdAt">) => Booking;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  setBookingStatus: (id: string, status: BookingStatus) => void;
  // Derived
  stats: {
    totalBookings: number;
    upcomingSessions: number;
    revenue: number;
    staffWorkload: Record<string, number>;
  };
};

const AppDataContext = createContext<AppData | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>(() => load("services", seedServices));
  const [staff, setStaff] = useState<Staff[]>(() => load("staff", seedStaff));
  const [bookings, setBookings] = useState<Booking[]>(() => load("bookings", seedBookings));
  const [albums, setAlbums] = useState<Album[]>(() => load("albums", seedAlbums));

  useEffect(() => save("services", services), [services]);
  useEffect(() => save("staff", staff), [staff]);
  useEffect(() => save("bookings", bookings), [bookings]);
  useEffect(() => save("albums", albums), [albums]);

  useEffect(() => {
    // Initial fetch from backend; fallback to local seed if API fails
    (async () => {
      try {
        const [svc, stf, bks] = await Promise.all([
          api.listServices(),
          api.listStaff(),
          api.listBookings(),
        ]);
        setServices(
          svc.map((x: ApiService) => ({
            id: String(x.id),
            name: x.name,
            category: (x.category as any) || "Other",
            price: Number(x.price),
            durationMin: x.durationMin ?? 60,
            description: x.description,
            active: x.active ?? true,
          }))
        );
        setStaff(
          stf.map((x: ApiStaff) => ({
            id: String(x.id),
            name: x.fullName,
            role: x.role || "",
            email: x.email || "",
            skills: x.skills || [],
          }))
        );
        setBookings(
          bks.map((b: ApiBooking) => ({
            id: String(b.id),
            customerName: b.customerName,
            customerEmail: b.customerEmail || "",
            serviceId: String((b.serviceItem as any)?.id),
            staffId: b.assignedStaff ? String((b.assignedStaff as any).id) : undefined,
            date: b.scheduledAt.slice(0, 10),
            timeSlot: b.timeSlot || "10:00",
            status: (b.status as any) || "pending",
            createdAt: b.scheduledAt,
          }))
        );
        // Albums: use deliveries endpoint without filter for admin needs
        try {
          const deliveries = await api.listDeliveries();
          setAlbums(deliveries.map((d) => ({
            id: String(d.id),
            customerEmail: (d.booking as any)?.customerEmail || "",
            title: d.title || "Album",
            photos: d.photos || [],
            createdAt: new Date().toISOString(),
          })));
        } catch {}
      } catch {
        // keep local seed
      }
    })();
  }, []);

  // Services
  const addService: AppData["addService"] = async (s) => {
    try {
      const created = await api.createService({
        name: s.name,
        description: s.description,
        category: s.category,
        durationMin: s.durationMin,
        active: s.active,
        price: s.price,
      });
      setServices((prev) => [{
        id: String(created.id),
        name: created.name,
        category: (created.category as any) || "Other",
        price: Number(created.price),
        durationMin: created.durationMin ?? 60,
        description: created.description,
        active: created.active ?? true,
      }, ...prev]);
    } catch {
      setServices((prev) => [{ id: uuidv4(), ...s }, ...prev]);
    }
  };
  const updateService: AppData["updateService"] = async (id, patch) => {
    const localIdx = services.findIndex((x) => x.id === id);
    if (localIdx >= 0) setServices((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    try {
      await api.updateService(Number(id), patch as any);
    } catch {}
  };
  const deleteService: AppData["deleteService"] = async (id) => {
    setServices((prev) => prev.filter((i) => i.id !== id));
    try { await api.deleteService(Number(id)); } catch {}
  };

  // Staff
  const addStaff: AppData["addStaff"] = async (s) => {
    console.log('Adding staff:', s);
    try {
      const created = await api.createStaff({ fullName: s.name, role: s.role, email: s.email, skills: s.skills });
      console.log('Staff created successfully:', created);
      setStaff((prev) => [{ id: String(created.id), name: created.fullName, role: created.role || "", email: created.email || "", skills: created.skills || [] }, ...prev]);
    } catch (error) {
      console.error('Failed to create staff:', error);
      setStaff((prev) => [{ id: uuidv4(), ...s }, ...prev]);
    }
  };
  const updateStaff: AppData["updateStaff"] = async (id, patch) => {
    setStaff((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    try { await api.updateStaff(Number(id), { fullName: patch.name, role: patch.role, email: patch.email, skills: patch.skills }); } catch {}
  };
  const deleteStaff: AppData["deleteStaff"] = async (id) => {
    setStaff((prev) => prev.filter((i) => i.id !== id));
    try { await api.deleteStaff(Number(id)); } catch {}
  };

  // Bookings
  const addBooking: AppData["addBooking"] = (b) => {
    const optimistic: Booking = { id: uuidv4(), status: "pending", createdAt: new Date().toISOString(), ...b };
    setBookings((prev) => [optimistic, ...prev]);
    api.createBooking({
      customerName: b.customerName,
      customerEmail: b.customerEmail,
      scheduledAt: new Date(`${b.date}T${b.timeSlot || "10:00"}:00`).toISOString(),
      timeSlot: b.timeSlot,
      serviceItem: { id: Number(b.serviceId) },
      status: "pending",
    }).then((created) => {
      setBookings((prev) => prev.map((x) => (x.id === optimistic.id ? {
        id: String(created.id),
        customerName: created.customerName,
        customerEmail: created.customerEmail || "",
        serviceId: String((created.serviceItem as any)?.id),
        staffId: created.assignedStaff ? String((created.assignedStaff as any).id) : undefined,
        date: created.scheduledAt.slice(0, 10),
        timeSlot: created.timeSlot || b.timeSlot || "10:00",
        status: (created.status as any) || "pending",
        createdAt: created.scheduledAt,
      } : x)));
    }).catch(()=>{});
    return optimistic;
  };
  const updateBooking: AppData["updateBooking"] = (id, patch) => {
    setBookings((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    api.updateBooking(Number(id), {
      scheduledAt: patch.date ? new Date(`${patch.date}T${patch.timeSlot || "10:00"}:00`).toISOString() : undefined,
      timeSlot: patch.timeSlot,
      status: patch.status,
    }).catch(()=>{});
  };
  const setBookingStatus: AppData["setBookingStatus"] = (id, status) => updateBooking(id, { status });

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const upcomingSessions = bookings.filter((b) => b.status !== "cancelled" && new Date(b.date) >= new Date(new Date().toDateString())).length;
    const revenue = bookings
      .filter((b) => b.status === "confirmed" || b.status === "completed")
      .reduce((sum, b) => {
        const s = services.find((x) => x.id === b.serviceId);
        return sum + (s?.price ?? 0);
      }, 0);
    const staffWorkload = staff.reduce<Record<string, number>>((acc, st) => {
      acc[st.id] = bookings.filter((b) => b.staffId === st.id && b.status !== "cancelled").length;
      return acc;
    }, {});

    return { totalBookings, upcomingSessions, revenue, staffWorkload };
  }, [bookings, services, staff]);

  const value: AppData = {
    services, staff, bookings, albums,
    addService, updateService, deleteService,
    addStaff, updateStaff, deleteStaff,
    addBooking, updateBooking, setBookingStatus,
    stats,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
