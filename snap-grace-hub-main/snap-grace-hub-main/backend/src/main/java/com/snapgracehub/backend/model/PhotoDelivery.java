package com.snapgracehub.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "photo_deliveries")
public class PhotoDelivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Booking booking;

    // Display title in frontend albums
    private String title;

    // Multiple photo URLs to match frontend albums
    @ElementCollection
    @CollectionTable(name = "photo_delivery_items", joinColumns = @JoinColumn(name = "delivery_id"))
    @Column(name = "photo_url")
    private List<String> photos;

    private String notes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<String> getPhotos() { return photos; }
    public void setPhotos(List<String> photos) { this.photos = photos; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}


