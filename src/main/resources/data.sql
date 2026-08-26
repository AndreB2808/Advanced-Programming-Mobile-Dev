-- Dados iniciais

INSERT INTO
    alertas_industriais (
        tipo_risco,
        descricao,
        setor,
        nivel_severidade,
        data_hora,
        resolvido,
        individuos_sob_risco,
        grupos_notificados
    )
SELECT 'EPI', 'Funcionário sem máscara anti-toxina', 'PRODUÇÃO', 'ALTO', '2026-04-24 19:32', TRUE, 'João Pereira', 'RH'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM alertas_industriais
        WHERE
            descricao = 'Funcionário sem máscara anti-toxina'
            AND data_hora = '2026-04-24 19:32'
    );

INSERT INTO
    alertas_industriais (
        tipo_risco,
        descricao,
        setor,
        nivel_severidade,
        data_hora,
        resolvido,
        individuos_sob_risco,
        grupos_notificados
    )
SELECT 'Área Restrita', 'Funcionário próximo de área restrita para seu cargo', 'Logística', 'INDEFINIDO', '25/08/2026, 22:29:43', FALSE, 'Ednaldo P.', 'T. Crews'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM alertas_industriais
        WHERE
            descricao = 'Funcionário próximo de área restrita para seu cargo'
            AND data_hora = '25/08/2026, 22:29:43'
    );