package GS2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import GS2.model.SensorUrbano;

public interface SensorUrbanoRepository extends JpaRepository<SensorUrbano, Long> {

    @Query("SELECT s.id FROM SensorUrbano s ORDER BY s.id")
    List<Long> listarIds();
}
