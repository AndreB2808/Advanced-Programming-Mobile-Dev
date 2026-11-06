package GS2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bases_publicas")
public class BasePublica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String orgaoResponsavel;
    private String descricao;
    private String tipo;
    private String local;
    private String dataHora;
    private Integer confianca;
    private Boolean ativo;

    public BasePublica() {
    }

    public BasePublica(Long id, String nome, String orgaoResponsavel,
            String descricao, String tipo, String local,
            String dataHora, Integer confianca,
            Boolean ativo) {

        this.id = id;
        this.nome = nome;
        this.orgaoResponsavel = orgaoResponsavel;
        this.descricao = descricao;
        this.tipo = tipo;
        this.local = local;
        this.dataHora = dataHora;
        this.confianca = confianca;
        this.ativo = ativo;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getOrgaoResponsavel() {
        return orgaoResponsavel;
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

    public Boolean getAtivo() {
        return ativo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setOrgaoResponsavel(String orgaoResponsavel) {
        this.orgaoResponsavel = orgaoResponsavel;
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

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
