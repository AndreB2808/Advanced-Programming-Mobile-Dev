package GS1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "alertas")
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private String nivelCriticidade;
    private String dataHora;
    private Boolean resolvido;
    private String sistemaAfetado;

    public Alerta() {
    }

    public Alerta(Long id, String titulo, String descricao,
                   String nivelCriticidade, String dataHora,
                   Boolean resolvido, String sistemaAfetado) {

        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.nivelCriticidade = nivelCriticidade;
        this.dataHora = dataHora;
        this.resolvido = resolvido;
        this.sistemaAfetado = sistemaAfetado;
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

    public String getNivelCriticidade() {
        return nivelCriticidade;
    }

    public String getDataHora() {
        return dataHora;
    }

    public Boolean getResolvido() {
        return resolvido;
    }

    public String getSistemaAfetado() {
        return sistemaAfetado;
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

    public void setNivelCriticidade(String nivelCriticidade) {
        this.nivelCriticidade = nivelCriticidade;
    }

    public void setDataHora(String dataHora) {
        this.dataHora = dataHora;
    }

    public void setResolvido(Boolean resolvido) {
        this.resolvido = resolvido;
    }

    public void setSistemaAfetado(String sistemaAfetado) {
        this.sistemaAfetado = sistemaAfetado;
    }
}