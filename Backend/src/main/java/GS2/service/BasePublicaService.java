
package GS2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import GS2.model.BasePublica;
import GS2.repository.BasePublicaRepository;

@Service
public class BasePublicaService {

    private final BasePublicaRepository repository;

    public BasePublicaService(BasePublicaRepository repository) {
        this.repository = repository;
    }

    public List<BasePublica> listar() {
        return repository.findAll();
    }

    public BasePublica buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Base pública não encontrada"));
    }

    public BasePublica salvar(BasePublica basePublica) {
        return repository.save(basePublica);
    }

    public BasePublica atualizar(Long id, BasePublica baseAtualizada) {

        BasePublica baseExistente = buscarPorId(id);

        baseExistente.setNome(baseAtualizada.getNome());
        baseExistente.setOrgaoResponsavel(baseAtualizada.getOrgaoResponsavel());
        baseExistente.setDescricao(baseAtualizada.getDescricao());
        baseExistente.setTipo(baseAtualizada.getTipo());
        baseExistente.setLocal(baseAtualizada.getLocal());
        baseExistente.setDataHora(baseAtualizada.getDataHora());
        baseExistente.setConfianca(baseAtualizada.getConfianca());
        baseExistente.setAtivo(baseAtualizada.getAtivo());

        return repository.save(baseExistente);
    }

    public void deletar(Long id) {
        BasePublica basePublica = buscarPorId(id);
        repository.delete(basePublica);
    }
}
