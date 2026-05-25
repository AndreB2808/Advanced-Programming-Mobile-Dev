package GS1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import GS1.model.Alerta;
import GS1.repository.AlertaRepository;

@Service
public class AlertaService {

    private final AlertaRepository repository;

    public AlertaService(AlertaRepository repository) {
        this.repository = repository;
    }

    public List<Alerta> listar() {
        return repository.findAll();
    }

    public Alerta buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerta não encontrado"));
    }

    public Alerta salvar(Alerta alerta) {
        return repository.save(alerta);
    }

    public Alerta atualizar(Long id, Alerta alertaAtualizado) {

        Alerta alertaExistente = buscarPorId(id);

        alertaExistente.setTitulo(alertaAtualizado.getTitulo());
        alertaExistente.setDescricao(alertaAtualizado.getDescricao());
        alertaExistente.setNivelCriticidade(alertaAtualizado.getNivelCriticidade());
        alertaExistente.setDataHora(alertaAtualizado.getDataHora());
        alertaExistente.setResolvido(alertaAtualizado.getResolvido());
        alertaExistente.setSistemaAfetado(alertaAtualizado.getSistemaAfetado());

        return repository.save(alertaExistente);
    }

    public void deletar(Long id) {
        Alerta alerta = buscarPorId(id);
        repository.delete(alerta);
    }
}