package backend_consultas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend_consultas.model.Consulta;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
 List<Consulta> findByMedicoId(Long medicoId);
 List<Consulta> findByPacienteId(Long pacienteId);
}
