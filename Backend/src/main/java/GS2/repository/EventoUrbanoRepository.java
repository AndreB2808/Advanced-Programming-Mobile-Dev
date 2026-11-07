package GS2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import GS2.model.EventoUrbano;

public interface EventoUrbanoRepository extends JpaRepository<EventoUrbano, Long> {

    @Query("SELECT e.id FROM EventoUrbano e ORDER BY e.id")
    List<Long> listarIds();
}
