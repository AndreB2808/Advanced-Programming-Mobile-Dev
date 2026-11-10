
package GS2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sensores_urbanos")
public class SensorUrbano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo;
    private String local;
    private Double leitura;
    private String unidade;
    private Boolean ativo;
    private Integer confianca;

    public SensorUrbano() {
    }

    public SensorUrbano(Long id, String nome, String tipo,
            String local, Double leitura,
            String unidade, Boolean ativo,
            Integer confianca) {

        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.local = local;
        this.leitura = leitura;
        this.unidade = unidade;
        this.ativo = ativo;
        this.confianca = confianca;
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

    public String getLocal() {
        return local;
    }

    public Double getLeitura() {
        return leitura;
    }

    public String getUnidade() {
        return unidade;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public Integer getConfianca() {
        return confianca;
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

    public void setLocal(String local) {
        this.local = local;
    }

    public void setLeitura(Double leitura) {
        this.leitura = leitura;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public void setConfianca(Integer confianca) {
        this.confianca = confianca;
    }
}
