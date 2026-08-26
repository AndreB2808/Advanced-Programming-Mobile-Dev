package com.example.sprint1.service;

import com.example.sprint1.model.AlertaIndustrial;
import com.example.sprint1.repository.AlertaIndustrialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertaIndustrialService {

    private final AlertaIndustrialRepository repository;

    public AlertaIndustrialService(AlertaIndustrialRepository repository) {
        this.repository = repository;
    }

    public List<AlertaIndustrial> listar() {
        return repository.findAll();
    }

    public AlertaIndustrial buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerta não encontrado"));
    }

    public AlertaIndustrial salvar(AlertaIndustrial alertaIndustrial) {
        return repository.save(alertaIndustrial);
    }

    public AlertaIndustrial atualizar(Long id, AlertaIndustrial alertaAtualizado) {
        AlertaIndustrial alertaExistente = buscarPorId(id);
        alertaExistente.setTipoRisco(alertaAtualizado.getTipoRisco());
        alertaExistente.setDescricao(alertaAtualizado.getDescricao());
        alertaExistente.setSetor(alertaAtualizado.getSetor());
        alertaExistente.setNivelSeveridade(alertaAtualizado.getNivelSeveridade());
        alertaExistente.setDataHora(alertaAtualizado.getDataHora());
        alertaExistente.setResolvido(alertaAtualizado.getResolvido());
        alertaExistente.setIndividuosSobRisco(alertaAtualizado.getIndividuosSobRisco());
        alertaExistente.setGruposNotificados(alertaAtualizado.getGruposNotificados());
        return repository.save(alertaExistente);
    }

    public void deletar(Long id) {
        AlertaIndustrial alerta = buscarPorId(id);
        repository.delete(alerta);
    }
}