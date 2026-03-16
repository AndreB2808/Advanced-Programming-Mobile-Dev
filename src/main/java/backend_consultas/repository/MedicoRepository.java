package backend_consultas.repository;

import backend_consultas.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
public interface MedicoRepository extends JpaRepository<Medico, Long> {
}