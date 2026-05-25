package GS1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import GS1.model.Sensor;
import GS1.repository.SensorRepository;

@Service
public class SensorService {

    private final SensorRepository repository;

    public SensorService(SensorRepository repository) {
        this.repository = repository;
    }

    public List<Sensor> listar() {
        return repository.findAll();
    }

    public Sensor buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor não encontrado"));
    }

    public Sensor salvar(Sensor sensor) {
        return repository.save(sensor);
    }

    public Sensor atualizar(Long id, Sensor sensorAtualizado) {

        Sensor sensorExistente = buscarPorId(id);

        sensorExistente.setNome(sensorAtualizado.getNome());
        sensorExistente.setTipo(sensorAtualizado.getTipo());
        sensorExistente.setStatus(sensorAtualizado.getStatus());
        sensorExistente.setLeitura(sensorAtualizado.getLeitura());
        sensorExistente.setUnidade(sensorAtualizado.getUnidade());
        sensorExistente.setLocalizacao(sensorAtualizado.getLocalizacao());

        return repository.save(sensorExistente);
    }

    public void deletar(Long id) {
        Sensor sensor = buscarPorId(id);
        repository.delete(sensor);
    }
}