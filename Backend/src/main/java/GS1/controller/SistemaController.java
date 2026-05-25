package GS1.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import GS1.model.Sistema;
import GS1.service.SistemaService;

@RestController
@RequestMapping("/sistemas")
public class SistemaController {

    private final SistemaService service;

    public SistemaController(SistemaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sistema> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Sistema buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Sistema salvar(@RequestBody Sistema sistema) {
        return service.salvar(sistema);
    }

    @PutMapping("/{id}")
    public Sistema atualizar(@PathVariable Long id,
                             @RequestBody Sistema sistema) {

        return service.atualizar(id, sistema);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}