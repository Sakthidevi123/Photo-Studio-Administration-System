package com.snapgracehub.backend.web;

import com.snapgracehub.backend.model.ServiceItem;
import com.snapgracehub.backend.repo.ServiceItemRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceItemRepository repository;

    public ServiceController(ServiceItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ServiceItem> list() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceItem> get(@PathVariable Long id) {
        return repository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ServiceItem> create(@RequestBody @Valid ServiceItem serviceItem) {
        ServiceItem saved = repository.save(serviceItem);
        return ResponseEntity.created(URI.create("/api/services/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceItem> update(@PathVariable Long id, @RequestBody @Valid ServiceItem body) {
        return repository.findById(id).map(existing -> {
            existing.setName(body.getName());
            existing.setDescription(body.getDescription());
            existing.setCategory(body.getCategory());
            existing.setDurationMin(body.getDurationMin());
            existing.setActive(body.getActive());
            existing.setPrice(body.getPrice());
            return ResponseEntity.ok(repository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


