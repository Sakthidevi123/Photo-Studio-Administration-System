package com.snapgracehub.backend.web;

import com.snapgracehub.backend.model.Booking;
import com.snapgracehub.backend.model.PhotoDelivery;
import com.snapgracehub.backend.repo.BookingRepository;
import com.snapgracehub.backend.repo.PhotoDeliveryRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
public class PhotoDeliveryController {

    private final PhotoDeliveryRepository deliveries;
    private final BookingRepository bookings;

    public PhotoDeliveryController(PhotoDeliveryRepository deliveries, BookingRepository bookings) {
        this.deliveries = deliveries;
        this.bookings = bookings;
    }

    @GetMapping
    public List<PhotoDelivery> list(@RequestParam(value = "email", required = false) String email) {
        if (email != null && !email.isBlank()) {
            return deliveries.findByCustomerEmail(email);
        }
        return deliveries.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoDelivery> get(@PathVariable Long id) {
        return deliveries.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PhotoDelivery> create(@RequestBody @Valid PhotoDelivery body) {
        if (body.getBooking() != null && body.getBooking().getId() != null) {
            Booking booking = bookings.findById(body.getBooking().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
            body.setBooking(booking);
        }
        PhotoDelivery saved = deliveries.save(body);
        return ResponseEntity.created(URI.create("/api/deliveries/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhotoDelivery> update(@PathVariable Long id, @RequestBody @Valid PhotoDelivery body) {
        return deliveries.findById(id).map(existing -> {
            if (body.getBooking() != null && body.getBooking().getId() != null) {
                Booking booking = bookings.findById(body.getBooking().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
                existing.setBooking(booking);
            }
            existing.setPhotos(body.getPhotos());
            existing.setNotes(body.getNotes());
            return ResponseEntity.ok(deliveries.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!deliveries.existsById(id)) return ResponseEntity.notFound().build();
        deliveries.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


