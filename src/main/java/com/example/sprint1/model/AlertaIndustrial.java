package com.example.sprint1.model;

import jakarta.persistence.*;

@Entity
@Table(name = "alertas_industriais")
public class AlertaIndustrial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoRisco;
    private String descricao;
    private String setor;
    private String nivelSeveridade;
    private String dataHora;
    private Boolean resolvido;
    private String individuosSobRisco;
    private String gruposNotificados;

    public AlertaIndustrial() {
    }

    public AlertaIndustrial(Long id, String tipoRisco, String descricao, String setor, String nivelSeveridade, String dataHora, Boolean resolvido) {
        this.id = id;
        this.tipoRisco = tipoRisco;
        this.descricao = descricao;
        this.setor = setor;
        this.nivelSeveridade = nivelSeveridade;
        this.dataHora = dataHora;
        this.resolvido = resolvido;
    }

    public Long getId() {
        return id;
    }

    public String getTipoRisco() {
        return tipoRisco;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getSetor() {
        return setor;
    }

    public String getNivelSeveridade() {
        return nivelSeveridade;
    }

    public String getDataHora() {
        return dataHora;
    }

    public String getIndividuosSobRisco() {
        return individuosSobRisco;
    }
    
    public String getGruposNotificados() {
    return gruposNotificados;
    }

    public Boolean getResolvido() {
        return resolvido;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTipoRisco(String tipoRisco) {
        this.tipoRisco = tipoRisco;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public void setNivelSeveridade(String nivelSeveridade) {
        this.nivelSeveridade = nivelSeveridade;
    }

    public void setDataHora(String dataHora) {
        this.dataHora = dataHora;
    }

    public void setResolvido(Boolean resolvido) {
        this.resolvido = resolvido;
    }

    public void setIndividuosSobRisco(String individuosSobRisco) {
        this.individuosSobRisco = individuosSobRisco;
    }
    
    public void setGruposNotificados(String gruposNotificados) {
    this.gruposNotificados = gruposNotificados;
    }
}