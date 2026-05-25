package GS1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import GS1.model.Sistema;
import GS1.repository.SistemaRepository;

@Service
public class SistemaService {

    private final SistemaRepository repository;

    public SistemaService(SistemaRepository repository) {
        this.repository = repository;
    }

    public List<Sistema> listar() {
        return repository.findAll();
    }

    public Sistema buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sistema não encontrado"));
    }

    public Sistema salvar(Sistema sistema) {
        return repository.save(sistema);
    }

    public Sistema atualizar(Long id, Sistema sistemaAtualizado) {

        Sistema sistemaExistente = buscarPorId(id);

        sistemaExistente.setNome(sistemaAtualizado.getNome());
        sistemaExistente.setStatus(sistemaAtualizado.getStatus());
        sistemaExistente.setResponsavel(sistemaAtualizado.getResponsavel());
        sistemaExistente.setDescricao(sistemaAtualizado.getDescricao());
        sistemaExistente.setNivelOperacao(sistemaAtualizado.getNivelOperacao());

        return repository.save(sistemaExistente);
    }

    public void deletar(Long id) {
        Sistema sistema = buscarPorId(id);
        repository.delete(sistema);
    }
}