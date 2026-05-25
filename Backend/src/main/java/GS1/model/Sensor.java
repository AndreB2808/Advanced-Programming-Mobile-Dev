package GS1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sensores")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo;
    private String status;
    private Double leitura;
    private String unidade;
    private String localizacao;

    public Sensor() {
    }

    public Sensor(Long id, String nome, String tipo, String status,
                  Double leitura, String unidade, String localizacao) {

        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.status = status;
        this.leitura = leitura;
        this.unidade = unidade;
        this.localizacao = localizacao;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getTipo() {
        return tipo;
    }

    public String getStatus() {
        return status;
    }

    public Double getLeitura() {
        return leitura;
    }

    public String getUnidade() {
        return unidade;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setLeitura(Double leitura) {
        this.leitura = leitura;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }
}