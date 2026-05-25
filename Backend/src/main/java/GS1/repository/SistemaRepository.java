package GS1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import GS1.model.Sistema;

public interface SistemaRepository extends JpaRepository<Sistema, Long> {
}