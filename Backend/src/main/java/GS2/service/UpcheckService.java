package GS2.service;

import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;

import org.springframework.stereotype.Service;

import GS2.repository.EventoUrbanoRepository;
import GS2.repository.SensorUrbanoRepository;
import GS2.repository.BasePublicaRepository;

@Service
public class UpcheckService {

    private final EventoUrbanoRepository eventoRepository;
    private final SensorUrbanoRepository sensorRepository;
    private final BasePublicaRepository baseRepository;

    public UpcheckService(EventoUrbanoRepository eventoRepository,
            SensorUrbanoRepository sensorRepository,
            BasePublicaRepository baseRepository) {

        this.eventoRepository = eventoRepository;
        this.sensorRepository = sensorRepository;
        this.baseRepository = baseRepository;
    }

    public Map<String, List<Long>> listarIds() {

        Map<String, List<Long>> dados = new LinkedHashMap<>();

        dados.put("eventosUrbanos", eventoRepository.listarIds());
        dados.put("sensoresUrbanos", sensorRepository.listarIds());
        dados.put("basesPublicas", baseRepository.listarIds());

        return dados;
    }
}
