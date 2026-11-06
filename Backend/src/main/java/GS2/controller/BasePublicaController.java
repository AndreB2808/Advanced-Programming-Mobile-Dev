
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

import GS2.model.BasePublica;
import GS2.service.BasePublicaService;

@RestController
@RequestMapping("/bases-publicas")
public class BasePublicaController {

    private final BasePublicaService service;

    public BasePublicaController(BasePublicaService service) {
        this.service = service;
    }

    @GetMapping
    public List<BasePublica> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public BasePublica buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public BasePublica salvar(@RequestBody BasePublica basePublica) {
        return service.salvar(basePublica);
    }

    @PutMapping("/{id}")
    public BasePublica atualizar(@PathVariable Long id,
            @RequestBody BasePublica basePublica) {

        return service.atualizar(id, basePublica);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
