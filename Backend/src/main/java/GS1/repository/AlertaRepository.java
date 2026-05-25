package GS1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import GS1.model.Alerta;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {
}