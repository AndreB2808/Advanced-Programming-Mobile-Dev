CREATE TABLE IF NOT EXISTS gs2_inicializacao (id INTEGER PRIMARY KEY);

INSERT INTO
    eventos_urbanos (
        titulo,
        descricao,
        tipo,
        local,
        data_hora,
        confianca,
        resolvido
    )
SELECT 'Interrupcao de energia em Pinheiros', 'Falha temporaria no fornecimento eletrico', 'ENERGIA', 'Pinheiros', '2026-11-06 10:15', 92, TRUE
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM eventos_urbanos
        WHERE
            titulo = 'Interrupcao de energia em Pinheiros'
    );

INSERT INTO
    eventos_urbanos (
        titulo,
        descricao,
        tipo,
        local,
        data_hora,
        confianca,
        resolvido
    )
SELECT 'Calor intenso na Vila Mariana', 'Temperaturas elevadas durante a tarde', 'CALOR', 'Vila Mariana', '2026-11-06 13:00', 88, FALSE
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM eventos_urbanos
        WHERE
            titulo = 'Calor intenso na Vila Mariana'
    );

INSERT INTO
    eventos_urbanos (
        titulo,
        descricao,
        tipo,
        local,
        data_hora,
        confianca,
        resolvido
    )
SELECT 'Alagamento na Avenida Paulista', 'Acumulo de agua prejudicando o transito', 'ALAGAMENTO', 'Bela Vista', '2026-11-06 14:30', 95, FALSE
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM eventos_urbanos
        WHERE
            titulo = 'Alagamento na Avenida Paulista'
    );

INSERT INTO
    sensores_urbanos (
        nome,
        tipo,
        local,
        leitura,
        unidade,
        ativo,
        confianca
    )
SELECT 'Termometro Central', 'TEMPERATURA', 'Centro', 39.5, 'C', TRUE, 96
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM sensores_urbanos
        WHERE
            nome = 'Termometro Central'
    );

INSERT INTO
    sensores_urbanos (
        nome,
        tipo,
        local,
        leitura,
        unidade,
        ativo,
        confianca
    )
SELECT 'Sensor de Umidade', 'UMIDADE', 'Vila Mariana', 45.0, '%', TRUE, 90
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM sensores_urbanos
        WHERE
            nome = 'Sensor de Umidade'
    );

INSERT INTO
    sensores_urbanos (
        nome,
        tipo,
        local,
        leitura,
        unidade,
        ativo,
        confianca
    )
SELECT 'Anemometro Norte', 'VELOCIDADE_VENTO', 'Santana', 62.0, 'km/h', TRUE, 93
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM sensores_urbanos
        WHERE
            nome = 'Anemometro Norte'
    );

INSERT INTO
    bases_publicas (
        nome,
        orgao_responsavel,
        descricao,
        tipo,
        local,
        data_hora,
        confianca,
        ativo
    )
SELECT 'Boletim de Alagamentos', 'Defesa Civil', 'Dados simulados sobre areas sujeitas a alagamento', 'ALAGAMENTO', 'Centro', '2026-11-06 09:00', 98, TRUE
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM bases_publicas
        WHERE
            nome = 'Boletim de Alagamentos'
    );

INSERT INTO
    bases_publicas (
        nome,
        orgao_responsavel,
        descricao,
        tipo,
        local,
        data_hora,
        confianca,
        ativo
    )
SELECT 'Monitoramento Climatico', 'INMET', 'Dados simulados sobre temperaturas elevadas', 'CALOR', 'Sao Paulo', '2026-11-06 12:00', 97, TRUE
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM bases_publicas
        WHERE
            nome = 'Monitoramento Climatico'
    );

INSERT INTO
    bases_publicas (
        nome,
        orgao_responsavel,
        descricao,
        tipo,
        local,
        data_hora,
        confianca,
        ativo
    )
SELECT 'Relatorio de Energia', 'Prefeitura Municipal', 'Dados simulados de interrupcoes no fornecimento de energia', 'ENERGIA', 'Zona Oeste', '2026-11-06 08:30', 90, TRUE
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    )
    AND NOT EXISTS (
        SELECT 1
        FROM bases_publicas
        WHERE
            nome = 'Relatorio de Energia'
    );

INSERT INTO
    gs2_inicializacao (id)
SELECT 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 1
    );

INSERT INTO
    eventos_urbanos (
        titulo,
        descricao,
        tipo,
        local,
        data_hora,
        confianca,
        resolvido
    )
SELECT 'Incêndio em edifício comercial', 'Incêndio de grandes proporções em edifício comercial, com evacuação em andamento e risco de propagação.', 'INCENDIO', 'Santa Ifigênia', '2026-11-05 16:12', 99, FALSE
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 2
    )
    AND NOT EXISTS (
        SELECT 1
        FROM eventos_urbanos
        WHERE
            titulo = 'Incêndio em edifício comercial'
    );

INSERT INTO
    gs2_inicializacao (id)
SELECT 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM gs2_inicializacao
        WHERE
            id = 2
    );