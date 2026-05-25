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

import GS1.model.Sensor;
import GS1.service.SensorService;

@RestController
@RequestMapping("/sensores")
public class SensorController {

    private final SensorService service;

    public SensorController(SensorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Sensor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Sensor buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public Sensor salvar(@RequestBody Sensor sensor) {
        return service.salvar(sensor);
    }

    @PutMapping("/{id}")
    public Sensor atualizar(@PathVariable Long id,
                            @RequestBody Sensor sensor) {

        return service.atualizar(id, sensor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}