
package GS2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import GS2.model.EventoUrbano;
import GS2.repository.EventoUrbanoRepository;

@Service
public class EventoUrbanoService {

    private final EventoUrbanoRepository repository;

    public EventoUrbanoService(EventoUrbanoRepository repository) {
        this.repository = repository;
    }

    public List<EventoUrbano> listar() {
        return repository.findAll();
    }

    public EventoUrbano buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento urbano não encontrado"));
    }

    public EventoUrbano salvar(EventoUrbano eventoUrbano) {
        return repository.save(eventoUrbano);
    }

    public EventoUrbano atualizar(Long id, EventoUrbano eventoAtualizado) {

        EventoUrbano eventoExistente = buscarPorId(id);

        eventoExistente.setTitulo(eventoAtualizado.getTitulo());
        eventoExistente.setDescricao(eventoAtualizado.getDescricao());
        eventoExistente.setTipo(eventoAtualizado.getTipo());
        eventoExistente.setLocal(eventoAtualizado.getLocal());
        eventoExistente.setDataHora(eventoAtualizado.getDataHora());
        eventoExistente.setConfianca(eventoAtualizado.getConfianca());
        eventoExistente.setPrioridade(eventoAtualizado.getPrioridade());
        eventoExistente.setResolvido(eventoAtualizado.getResolvido());

        return repository.save(eventoExistente);
    }

    public void deletar(Long id) {
        EventoUrbano eventoUrbano = buscarPorId(id);
        repository.delete(eventoUrbano);
    }
}
