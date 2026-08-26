package com.example.sprint1.controller;

import com.example.sprint1.model.AlertaIndustrial;
import com.example.sprint1.service.AlertaIndustrialService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alertas")
@CrossOrigin
public class AlertaIndustrialController {

    private final AlertaIndustrialService service;

    public AlertaIndustrialController(AlertaIndustrialService service) {
        this.service = service;
    }

    @GetMapping
    public List<AlertaIndustrial> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public AlertaIndustrial buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public AlertaIndustrial salvar(@RequestBody AlertaIndustrial alertaIndustrial) {
        return service.salvar(alertaIndustrial);
    }

    @PutMapping("/{id}")
    public AlertaIndustrial atualizar(@PathVariable Long id, @RequestBody AlertaIndustrial alertaIndustrial) {
        return service.atualizar(id, alertaIndustrial);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}