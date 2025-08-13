package com.snapgracehub.backend.web;

import com.snapgracehub.backend.model.Staff;
import com.snapgracehub.backend.repo.StaffRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private static final Logger logger = LoggerFactory.getLogger(StaffController.class);
    private final StaffRepository repository;

    public StaffController(StaffRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Staff> list() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> get(@PathVariable Long id) {
        return repository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Staff> create(@RequestBody @Valid Staff staff) {
        Staff saved = repository.save(staff);
        return ResponseEntity.created(URI.create("/api/staff/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> update(@PathVariable Long id, @RequestBody @Valid Staff body) {
        return repository.findById(id).map(existing -> {
            existing.setFullName(body.getFullName());
            existing.setEmail(body.getEmail());
            existing.setRole(body.getRole());
            existing.setSkills(body.getSkills());
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


