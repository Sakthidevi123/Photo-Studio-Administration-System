package com.snapgracehub.backend.config;

import com.snapgracehub.backend.model.Staff;
import com.snapgracehub.backend.model.ServiceItem;
import com.snapgracehub.backend.model.Booking;
import com.snapgracehub.backend.model.PhotoDelivery;
import com.snapgracehub.backend.repo.StaffRepository;
import com.snapgracehub.backend.repo.ServiceItemRepository;
import com.snapgracehub.backend.repo.BookingRepository;
import com.snapgracehub.backend.repo.PhotoDeliveryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final StaffRepository staffRepository;
    private final ServiceItemRepository serviceRepository;
    private final BookingRepository bookingRepository;
    private final PhotoDeliveryRepository photoDeliveryRepository;
    
    public DataInitializer(StaffRepository staffRepository, 
                          ServiceItemRepository serviceRepository,
                          BookingRepository bookingRepository,
                          PhotoDeliveryRepository photoDeliveryRepository) {
        this.staffRepository = staffRepository;
        this.serviceRepository = serviceRepository;
        this.bookingRepository = bookingRepository;
        this.photoDeliveryRepository = photoDeliveryRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 INITIALIZING SAMPLE DATA...");
        
        // Initialize Staff Data
        initializeStaffData();
        
        // Initialize Service Data  
        initializeServiceData();
        
        // Initialize Booking Data
        initializeBookingData();
        
        // Initialize Photo Delivery Data
        initializePhotoDeliveryData();
        
        System.out.println("✅ SAMPLE DATA INITIALIZATION COMPLETE!");
    }
    
    private void initializeStaffData() {
        System.out.println("📋 Initializing Staff Data...");
        
        if (staffRepository.count() == 0) {
            // Create Sakthi
            Staff sakthi = new Staff();
            sakthi.setFullName("Sakthi");
            sakthi.setEmail("sakthi@snapgracehub.com");
            sakthi.setRole("Lead Photographer");
            sakthi.setSkills(Arrays.asList("Wedding Photography", "Portrait Photography", "Photo Editing", "Studio Photography"));
            
            // Create Deva
            Staff deva = new Staff();
            deva.setFullName("Deva");
            deva.setEmail("deva@snapgracehub.com");
            deva.setRole("Senior Photographer");
            deva.setSkills(Arrays.asList("Event Photography", "Product Photography", "Drone Photography", "Cinematography"));
            
            // Create Kishore
            Staff kishore = new Staff();
            kishore.setFullName("Kishore");
            kishore.setEmail("kishore@snapgracehub.com");
            kishore.setRole("Creative Director");
            kishore.setSkills(Arrays.asList("Creative Direction", "Video Editing", "Color Grading"));
            
            // Create Karthi
            Staff karthi = new Staff();
            karthi.setFullName("Karthi");
            karthi.setEmail("karthi@snapgracehub.com");
            karthi.setRole("Photography Assistant");
            karthi.setSkills(Arrays.asList("Equipment Management", "Lighting Setup", "Photo Organization"));
            
            List<Staff> staffList = Arrays.asList(sakthi, deva, kishore, karthi);
            staffRepository.saveAll(staffList);
            
            System.out.println("✅ Added " + staffList.size() + " staff members: Sakthi, Deva, Kishore, Karthi");
        } else {
            System.out.println("ℹ️ Staff data already exists, skipping initialization");
        }
    }
    
    private void initializeServiceData() {
        System.out.println("🎨 Initializing Service Data...");
        
        if (serviceRepository.count() == 0) {
            // Wedding Photography Service
            ServiceItem wedding = new ServiceItem();
            wedding.setName("Wedding Photography - Premium Package");
            wedding.setDescription("Complete wedding photography coverage with professional editing");
            wedding.setCategory("Wedding");
            wedding.setDurationMin(480); // 8 hours
            wedding.setPrice(new BigDecimal("50000.00"));
            wedding.setActive(true);
            
            // Portrait Photography Service
            ServiceItem portrait = new ServiceItem();
            portrait.setName("Portrait Photography Session");
            portrait.setDescription("Professional portrait photography for individuals and families");
            portrait.setCategory("Portrait");
            portrait.setDurationMin(120); // 2 hours
            portrait.setPrice(new BigDecimal("15000.00"));
            portrait.setActive(true);
            
            // Event Photography Service
            ServiceItem event = new ServiceItem();
            event.setName("Event Photography Coverage");
            event.setDescription("Professional event photography for corporate and social events");
            event.setCategory("Event");
            event.setDurationMin(240); // 4 hours
            event.setPrice(new BigDecimal("25000.00"));
            event.setActive(true);
            
            List<ServiceItem> services = Arrays.asList(wedding, portrait, event);
            serviceRepository.saveAll(services);
            
            System.out.println("✅ Added " + services.size() + " services: Wedding, Portrait, Event");
        } else {
            System.out.println("ℹ️ Service data already exists, skipping initialization");
        }
    }
    
    private void initializeBookingData() {
        System.out.println("📅 Initializing Booking Data...");
        
        if (bookingRepository.count() == 0) {
            List<Staff> allStaff = staffRepository.findAll();
            List<ServiceItem> allServices = serviceRepository.findAll();
            
            if (!allStaff.isEmpty() && !allServices.isEmpty()) {
                // Sample Booking 1 - Kishore's Wedding Shoot
                Booking booking1 = new Booking();
                booking1.setCustomerName("Raj Kumar");
                booking1.setCustomerEmail("raj.kumar@example.com");
                booking1.setScheduledAt(LocalDateTime.now().plusDays(7));
                booking1.setServiceItem(allServices.get(0)); // Wedding service
                booking1.setAssignedStaff(allStaff.get(0)); // Kishore
                booking1.setStatus("confirmed");
                booking1.setTimeSlot("10:00");
                
                // Sample Booking 2 - Daya's Portrait Session
                Booking booking2 = new Booking();
                booking2.setCustomerName("Priya Sharma");
                booking2.setCustomerEmail("priya.sharma@example.com");
                booking2.setScheduledAt(LocalDateTime.now().plusDays(3));
                booking2.setServiceItem(allServices.get(1)); // Portrait service
                booking2.setAssignedStaff(allStaff.get(1)); // Daya
                booking2.setStatus("pending");
                booking2.setTimeSlot("14:00");
                
                // Sample Booking 3 - Karthi's Event Coverage
                Booking booking3 = new Booking();
                booking3.setCustomerName("Corporate Events Ltd");
                booking3.setCustomerEmail("events@corporate.com");
                booking3.setScheduledAt(LocalDateTime.now().plusDays(10));
                booking3.setServiceItem(allServices.get(2)); // Event service
                booking3.setAssignedStaff(allStaff.get(2)); // Karthi
                booking3.setStatus("confirmed");
                booking3.setTimeSlot("09:00");
                
                List<Booking> bookings = Arrays.asList(booking1, booking2, booking3);
                bookingRepository.saveAll(bookings);
                
                System.out.println("✅ Added " + bookings.size() + " sample bookings");
            } else {
                System.out.println("⚠️ Cannot create bookings - staff or services not found");
            }
        } else {
            System.out.println("ℹ️ Booking data already exists, skipping initialization");
        }
    }
    
    private void initializePhotoDeliveryData() {
        System.out.println("📸 Initializing Photo Delivery Data...");
        
        if (photoDeliveryRepository.count() == 0) {
            List<Booking> completedBookings = bookingRepository.findAll();
            
            if (!completedBookings.isEmpty()) {
                // Create sample deliveries for completed bookings
                for (int i = 0; i < Math.min(2, completedBookings.size()); i++) {
                    Booking booking = completedBookings.get(i);
                    
                    PhotoDelivery delivery = new PhotoDelivery();
                    delivery.setBooking(booking);
                    delivery.setTitle(booking.getCustomerName() + "'s " + booking.getServiceItem().getCategory() + " Photos");
                    delivery.setNotes("Your photos are ready for download! High-resolution images edited and color-corrected.");
                    
                    // Sample photo URLs (these would normally be actual file URLs)
                    List<String> samplePhotos = Arrays.asList(
                        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop"
                    );
                    delivery.setPhotos(samplePhotos);
                    
                    photoDeliveryRepository.save(delivery);
                }
                
                System.out.println("✅ Added sample photo deliveries");
            } else {
                System.out.println("⚠️ Cannot create photo deliveries - no bookings found");
            }
        } else {
            System.out.println("ℹ️ Photo delivery data already exists, skipping initialization");
        }
    }
}
