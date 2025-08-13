package com.snapgracehub.backend.web;

import com.snapgracehub.backend.repo.BookingRepository;
import com.snapgracehub.backend.repo.PhotoDeliveryRepository;
import com.snapgracehub.backend.repo.ServiceItemRepository;
import com.snapgracehub.backend.repo.StaffRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final BookingRepository bookings;
    private final PhotoDeliveryRepository deliveries;
    private final ServiceItemRepository services;
    private final StaffRepository staff;

    public DashboardController(BookingRepository bookings, PhotoDeliveryRepository deliveries,
                               ServiceItemRepository services, StaffRepository staff) {
        this.bookings = bookings;
        this.deliveries = deliveries;
        this.services = services;
        this.staff = staff;
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        Map<String, Object> m = new HashMap<>();
        m.put("bookings", bookings.count());
        m.put("deliveries", deliveries.count());
        m.put("services", services.count());
        m.put("staff", staff.count());
        return m;
    }
}


