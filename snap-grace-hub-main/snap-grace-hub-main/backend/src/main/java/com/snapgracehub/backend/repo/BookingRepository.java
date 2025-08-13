package com.snapgracehub.backend.repo;

import com.snapgracehub.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {}


