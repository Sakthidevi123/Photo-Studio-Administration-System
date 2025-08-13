export type ApiService = {
  id: number;
  name: string;
  description?: string;
  category?: string;
  durationMin?: number;
  active?: boolean;
  price: number;
};

export type ApiStaff = {
  id: number;
  fullName: string;
  role?: string;
  email?: string;
  skills?: string[];
};

export type ApiBooking = {
  id: number;
  customerName: string;
  customerEmail?: string;
  scheduledAt: string; // ISO date-time
  timeSlot?: string;
  serviceItem?: { id: number } | ApiService;
  assignedStaff?: { id: number } | ApiStaff;
  status?: string;
};

export type ApiDelivery = {
  id: number;
  booking: { id: number } | ApiBooking;
  title?: string;
  photos: string[];
  notes?: string;
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function http<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...options,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }
    return res.json() as Promise<T>;
  } catch (error) {
    console.error(`API request failed: ${path}`, error);
    throw error;
  }
}

export const api = {
  // Services
  listServices: () => http<ApiService[]>("/api/services"),
  createService: (s: Partial<ApiService>) => http<ApiService>("/api/services", { method: "POST", body: JSON.stringify(s) }),
  updateService: (id: number, s: Partial<ApiService>) => http<ApiService>(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(s) }),
  deleteService: (id: number) => http<void>(`/api/services/${id}`, { method: "DELETE" }),

  // Staff
  listStaff: () => http<ApiStaff[]>("/api/staff"),
  createStaff: (s: Partial<ApiStaff>) => http<ApiStaff>("/api/staff", { method: "POST", body: JSON.stringify(s) }),
  updateStaff: (id: number, s: Partial<ApiStaff>) => http<ApiStaff>(`/api/staff/${id}`, { method: "PUT", body: JSON.stringify(s) }),
  deleteStaff: (id: number) => http<void>(`/api/staff/${id}`, { method: "DELETE" }),

  // Bookings
  listBookings: () => http<ApiBooking[]>("/api/bookings"),
  createBooking: (b: Partial<ApiBooking>) => http<ApiBooking>("/api/bookings", { method: "POST", body: JSON.stringify(b) }),
  updateBooking: (id: number, b: Partial<ApiBooking>) => http<ApiBooking>(`/api/bookings/${id}`, { method: "PUT", body: JSON.stringify(b) }),
  deleteBooking: (id: number) => http<void>(`/api/bookings/${id}`, { method: "DELETE" }),

  // Deliveries
  listDeliveries: () => http<ApiDelivery[]>("/api/deliveries"),
  searchDeliveries: (email: string) => http<ApiDelivery[]>(`/api/deliveries?email=${encodeURIComponent(email)}`),
  createDelivery: (d: Partial<ApiDelivery>) => http<ApiDelivery>("/api/deliveries", { method: "POST", body: JSON.stringify(d) }),
  updateDelivery: (id: number, d: Partial<ApiDelivery>) => http<ApiDelivery>(`/api/deliveries/${id}`, { method: "PUT", body: JSON.stringify(d) }),
  deleteDelivery: (id: number) => http<void>(`/api/deliveries/${id}`, { method: "DELETE" }),

  // Dashboard
  dashboardStats: () => http<Record<string, number>>("/api/dashboard/stats"),
};


