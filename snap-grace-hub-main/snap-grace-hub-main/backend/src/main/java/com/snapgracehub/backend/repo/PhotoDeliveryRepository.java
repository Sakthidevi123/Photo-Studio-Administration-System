package com.snapgracehub.backend.repo;

import com.snapgracehub.backend.model.PhotoDelivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PhotoDeliveryRepository extends JpaRepository<PhotoDelivery, Long> {
    @Query("select d from PhotoDelivery d where lower(d.booking.customerEmail) = lower(:email)")
    List<PhotoDelivery> findByCustomerEmail(@Param("email") String email);
}


