
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

import GS2.model.SensorUrbano;
import GS2.service.SensorUrbanoService;

@RestController
@RequestMapping("/sensores-urbanos")
public class SensorUrbanoController {

    private final SensorUrbanoService service;

    public SensorUrbanoController(SensorUrbanoService service) {
        this.service = service;
    }

    @GetMapping
    public List<SensorUrbano> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public SensorUrbano buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public SensorUrbano salvar(@RequestBody SensorUrbano sensorUrbano) {
        return service.salvar(sensorUrbano);
    }

    @PutMapping("/{id}")
    public SensorUrbano atualizar(@PathVariable Long id,
            @RequestBody SensorUrbano sensorUrbano) {

        return service.atualizar(id, sensorUrbano);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
