package com.snapgracehub.backend.web;

import com.snapgracehub.backend.model.Booking;
import com.snapgracehub.backend.model.ServiceItem;
import com.snapgracehub.backend.model.Staff;
import com.snapgracehub.backend.repo.BookingRepository;
import com.snapgracehub.backend.repo.ServiceItemRepository;
import com.snapgracehub.backend.repo.StaffRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookings;
    private final ServiceItemRepository services;
    private final StaffRepository staff;

    public BookingController(BookingRepository bookings, ServiceItemRepository services, StaffRepository staff) {
        this.bookings = bookings;
        this.services = services;
        this.staff = staff;
    }

    @GetMapping
    public List<Booking> list() { return bookings.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> get(@PathVariable Long id) {
        return bookings.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> create(@RequestBody @Valid Booking body) {
        if (body.getServiceItem() != null && body.getServiceItem().getId() != null) {
            ServiceItem si = services.findById(body.getServiceItem().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Service not found"));
            body.setServiceItem(si);
        }
        if (body.getAssignedStaff() != null && body.getAssignedStaff().getId() != null) {
            Staff st = staff.findById(body.getAssignedStaff().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Staff not found"));
            body.setAssignedStaff(st);
        }
        Booking saved = bookings.save(body);
        return ResponseEntity.created(URI.create("/api/bookings/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> update(@PathVariable Long id, @RequestBody @Valid Booking body) {
        return bookings.findById(id).map(existing -> {
            existing.setCustomerName(body.getCustomerName());
            existing.setCustomerEmail(body.getCustomerEmail());
            existing.setScheduledAt(body.getScheduledAt());
            if (body.getServiceItem() != null && body.getServiceItem().getId() != null) {
                ServiceItem si = services.findById(body.getServiceItem().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Service not found"));
                existing.setServiceItem(si);
            }
            if (body.getAssignedStaff() != null && body.getAssignedStaff().getId() != null) {
                Staff st = staff.findById(body.getAssignedStaff().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Staff not found"));
                existing.setAssignedStaff(st);
            }
            existing.setStatus(body.getStatus());
            existing.setTimeSlot(body.getTimeSlot());
            return ResponseEntity.ok(bookings.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!bookings.existsById(id)) return ResponseEntity.notFound().build();
        bookings.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


