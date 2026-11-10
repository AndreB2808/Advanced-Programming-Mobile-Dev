
package GS2.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import GS2.model.EventoUrbano;
import GS2.repository.EventoUrbanoRepository;

@Service
public class EventoUrbanoService {

    private final EventoUrbanoRepository repository;
    private final AnalisePrioridadeService analisePrioridade;

    public EventoUrbanoService(
            EventoUrbanoRepository repository,
            AnalisePrioridadeService analisePrioridade) {

        this.repository = repository;
        this.analisePrioridade = analisePrioridade;
    }

    public List<EventoUrbano> listar() {
        return repository.findAll(Sort.by("id"))
                .stream()
                .map(this::aplicarPrioridade)
                .toList();
    }

    public EventoUrbano buscarPorId(Long id) {
        return aplicarPrioridade(buscarOriginal(id));
    }

    public EventoUrbano salvar(EventoUrbano eventoUrbano) {
        eventoUrbano.setPrioridade(
                analisePrioridade.calcular(eventoUrbano));

        return repository.save(eventoUrbano);
    }

    public EventoUrbano atualizar(Long id, EventoUrbano eventoAtualizado) {

        EventoUrbano eventoExistente = buscarOriginal(id);

        eventoExistente.setTitulo(eventoAtualizado.getTitulo());
        eventoExistente.setDescricao(eventoAtualizado.getDescricao());
        eventoExistente.setTipo(eventoAtualizado.getTipo());
        eventoExistente.setLocal(eventoAtualizado.getLocal());
        eventoExistente.setDataHora(eventoAtualizado.getDataHora());
        eventoExistente.setConfianca(eventoAtualizado.getConfianca());
        eventoExistente.setResolvido(eventoAtualizado.getResolvido());

        eventoExistente.setPrioridade(
                analisePrioridade.calcular(eventoExistente));

        return repository.save(eventoExistente);
    }

    public void deletar(Long id) {
        repository.delete(buscarOriginal(id));
    }

    private EventoUrbano buscarOriginal(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento urbano não encontrado"));
    }

    private EventoUrbano aplicarPrioridade(EventoUrbano evento) {

        return new EventoUrbano(
                evento.getId(),
                evento.getTitulo(),
                evento.getDescricao(),
                evento.getTipo(),
                evento.getLocal(),
                evento.getDataHora(),
                evento.getConfianca(),
                analisePrioridade.calcular(evento),
                evento.getResolvido());
    }
}
