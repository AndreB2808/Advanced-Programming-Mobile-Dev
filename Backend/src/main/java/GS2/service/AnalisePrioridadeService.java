
package GS2.service;

import java.util.Locale;

import org.springframework.stereotype.Service;

import GS2.model.EventoUrbano;

@Service
public class AnalisePrioridadeService {

    public String calcular(EventoUrbano evento) {

        if (Boolean.TRUE.equals(evento.getResolvido())) {
            return "BAIXA";
        }

        String tipo = evento.getTipo() == null
                ? ""
                : evento.getTipo().trim().toUpperCase(Locale.ROOT);

        double riscoBase;

        switch (tipo) {
            case "INCENDIO":
            case "INCÊNDIO":
            case "DESABAMENTO":
                riscoBase = 100;
                break;

            case "ALAGAMENTO":
            case "ENCHENTE":
            case "DESLIZAMENTO":
                riscoBase = 75;
                break;

            case "CALOR":
            case "TEMPESTADE":
            case "VENTANIA":
                riscoBase = 50;
                break;

            case "ENERGIA":
            case "AGUA":
            case "ÁGUA":
                riscoBase = 25;
                break;

            default:
                riscoBase = 50;
                break;
        }

        int confianca = evento.getConfianca() == null
                ? 0
                : Math.max(0, Math.min(100, evento.getConfianca()));

        double pontuacao = riscoBase * confianca / 100.0;

        if (pontuacao >= 80) {
            return "CRITICA";
        }

        if (pontuacao >= 55) {
            return "ALTA";
        }

        if (pontuacao >= 30) {
            return "MEDIA";
        }

        return "BAIXA";
    }
}
