package GS1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import GS1.model.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
}