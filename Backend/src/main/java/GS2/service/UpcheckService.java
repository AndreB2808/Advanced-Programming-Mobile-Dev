package GS2.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import GS2.model.EventoUrbano;
import GS2.model.SensorUrbano;
import GS2.model.BasePublica;

import GS2.repository.EventoUrbanoRepository;
import GS2.repository.SensorUrbanoRepository;
import GS2.repository.BasePublicaRepository;

@Service
public class UpcheckService {

    private final EventoUrbanoRepository eventoRepository;
    private final SensorUrbanoRepository sensorRepository;
    private final BasePublicaRepository baseRepository;
    private final ObjectMapper objectMapper;

    public UpcheckService(EventoUrbanoRepository eventoRepository,
            SensorUrbanoRepository sensorRepository,
            BasePublicaRepository baseRepository,
            ObjectMapper objectMapper) {

        this.eventoRepository = eventoRepository;
        this.sensorRepository = sensorRepository;
        this.baseRepository = baseRepository;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> listarIds() {

        List<EventoUrbano> eventos = eventoRepository.findAll(Sort.by("id"));

        List<SensorUrbano> sensores = sensorRepository.findAll(Sort.by("id"));

        List<BasePublica> bases = baseRepository.findAll(Sort.by("id"));

        Map<String, Object> dados = new LinkedHashMap<>();

        dados.put(
                "eventosUrbanos",
                eventos.stream().map(EventoUrbano::getId).toList());

        dados.put(
                "sensoresUrbanos",
                sensores.stream().map(SensorUrbano::getId).toList());

        dados.put(
                "basesPublicas",
                bases.stream().map(BasePublica::getId).toList());

        Map<String, String> assinaturas = new LinkedHashMap<>();

        assinaturas.put("eventosUrbanos", gerarAssinatura(eventos));
        assinaturas.put("sensoresUrbanos", gerarAssinatura(sensores));
        assinaturas.put("basesPublicas", gerarAssinatura(bases));

        dados.put("assinaturas", assinaturas);

        return dados;
    }

    private String gerarAssinatura(Object dados) {

        try {
            byte[] conteudo = objectMapper.writeValueAsBytes(dados);

            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            return HexFormat.of().formatHex(digest.digest(conteudo));

        } catch (JsonProcessingException | NoSuchAlgorithmException e) {
            throw new IllegalStateException(
                    "Erro ao verificar atualizacoes dos dados", e);
        }
    }
}
