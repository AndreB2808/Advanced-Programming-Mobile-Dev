package GS2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "eventos_urbanos")
public class EventoUrbano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private String tipo;
    private String local;
    private String dataHora;
    private Integer confianca;
    private String prioridade;
    private Boolean resolvido;

    public EventoUrbano() {
    }

    public EventoUrbano(Long id, String titulo, String descricao,
            String tipo, String local, String dataHora,
            Integer confianca, String prioridade,
            Boolean resolvido) {

        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipo = tipo;
        this.local = local;
        this.dataHora = dataHora;
        this.confianca = confianca;
        this.prioridade = prioridade;
        this.resolvido = resolvido;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getTipo() {
        return tipo;
    }

    public String getLocal() {
        return local;
    }

    public String getDataHora() {
        return dataHora;
    }

    public Integer getConfianca() {
        return confianca;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public Boolean getResolvido() {
        return resolvido;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public void setDataHora(String dataHora) {
        this.dataHora = dataHora;
    }

    public void setConfianca(Integer confianca) {
        this.confianca = confianca;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public void setResolvido(Boolean resolvido) {
        this.resolvido = resolvido;
    }
}
