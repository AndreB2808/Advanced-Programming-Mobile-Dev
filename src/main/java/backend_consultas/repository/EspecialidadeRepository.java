package backend_consultas.repository;
import backend_consultas.model.Especialidade;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {
}