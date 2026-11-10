
package GS2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import GS2.model.SensorUrbano;
import GS2.repository.SensorUrbanoRepository;

@Service
public class SensorUrbanoService {

    private final SensorUrbanoRepository repository;

    public SensorUrbanoService(SensorUrbanoRepository repository) {
        this.repository = repository;
    }

    public List<SensorUrbano> listar() {
        return repository.findAll();
    }

    public SensorUrbano buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor urbano não encontrado"));
    }

    public SensorUrbano salvar(SensorUrbano sensorUrbano) {
        return repository.save(sensorUrbano);
    }

    public SensorUrbano atualizar(Long id, SensorUrbano sensorAtualizado) {

        SensorUrbano sensorExistente = buscarPorId(id);

        sensorExistente.setNome(sensorAtualizado.getNome());
        sensorExistente.setTipo(sensorAtualizado.getTipo());
        sensorExistente.setLocal(sensorAtualizado.getLocal());
        sensorExistente.setLeitura(sensorAtualizado.getLeitura());
        sensorExistente.setUnidade(sensorAtualizado.getUnidade());
        sensorExistente.setAtivo(sensorAtualizado.getAtivo());
        sensorExistente.setConfianca(sensorAtualizado.getConfianca());

        return repository.save(sensorExistente);
    }

    public void deletar(Long id) {
        repository.delete(buscarPorId(id));
    }
}
