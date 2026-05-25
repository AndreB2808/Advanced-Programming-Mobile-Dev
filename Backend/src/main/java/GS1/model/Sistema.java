package GS1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sistemas")
public class Sistema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String status;
    private String responsavel;
    private String descricao;
    private String nivelOperacao;

    public Sistema() {
    }

    public Sistema(Long id, String nome, String status,
                   String responsavel, String descricao,
                   String nivelOperacao) {

        this.id = id;
        this.nome = nome;
        this.status = status;
        this.responsavel = responsavel;
        this.descricao = descricao;
        this.nivelOperacao = nivelOperacao;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getStatus() {
        return status;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getNivelOperacao() {
        return nivelOperacao;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setNivelOperacao(String nivelOperacao) {
        this.nivelOperacao = nivelOperacao;
    }
}