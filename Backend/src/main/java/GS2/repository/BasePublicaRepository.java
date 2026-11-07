package GS2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import GS2.model.BasePublica;

public interface BasePublicaRepository extends JpaRepository<BasePublica, Long> {

    @Query("SELECT b.id FROM BasePublica b ORDER BY b.id")
    List<Long> listarIds();
}
