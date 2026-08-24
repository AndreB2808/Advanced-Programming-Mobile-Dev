package backend_consultas.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend_consultas.exception.DadosInvalidosException;
import backend_consultas.exception.RecursoDuplicadoException;
import backend_consultas.exception.RecursoNaoEncontradoException;
import backend_consultas.model.Especialidade;
import backend_consultas.repository.EspecialidadeRepository;

@Service
public class EspecialidadeService {
    private final EspecialidadeRepository repository;

    public EspecialidadeService(EspecialidadeRepository repository) {
        this.repository = repository;
    }

    public Especialidade salvar(Especialidade especialidade) {
        if (especialidade.getNome() != null) {
            especialidade.setNome(especialidade.getNome().trim());
        }
        if (especialidade.getNome() == null || especialidade.getNome().isBlank()) {
            throw new DadosInvalidosException("Nome da especialidade é obrigatório.");
        }
        if (repository.existsByNomeIgnoreCase(especialidade.getNome())) {
            throw new RecursoDuplicadoException("Especialidade já cadastrada.");
        }
        return repository.save(especialidade);
    }

    public List<Especialidade> listar() {
        return repository.findAll();
    }

    public Especialidade buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Especialidade não encontrada"));
    }
}
