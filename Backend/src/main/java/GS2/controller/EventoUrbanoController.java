
package GS2.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import GS2.model.EventoUrbano;
import GS2.service.EventoUrbanoService;

@RestController
@RequestMapping("/eventos-urbanos")
public class EventoUrbanoController {

    private final EventoUrbanoService service;

    public EventoUrbanoController(EventoUrbanoService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventoUrbano> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public EventoUrbano buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public EventoUrbano salvar(@RequestBody EventoUrbano eventoUrbano) {
        return service.salvar(eventoUrbano);
    }

    @PutMapping("/{id}")
    public EventoUrbano atualizar(@PathVariable Long id,
            @RequestBody EventoUrbano eventoUrbano) {

        return service.atualizar(id, eventoUrbano);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
