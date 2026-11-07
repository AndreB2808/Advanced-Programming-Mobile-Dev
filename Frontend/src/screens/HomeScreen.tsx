
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import {
  listarEventosUrbanos,
  listarSensoresUrbanos,
  listarBasesPublicas,
  verificarUpcheck,
  idsMudaram,
  Upcheck,
} from "../services/api";

import { EventoUrbano } from "../types/EventoUrbano";
import { SensorUrbano } from "../types/SensorUrbano";
import { BasePublica } from "../types/BasePublica";

type Conexao = "carregando" | "online" | "offline";

const INTERVALO = 3000;

function corPrioridade(prioridade: string) {
  switch (prioridade.toUpperCase()) {
    case "BAIXA":
      return "#22543D";
    case "MEDIA":
      return "#69551F";
    case "ALTA":
      return "#8B4428";
    case "CRITICA":
      return "#8B2635";
    default:
      return "#344054";
  }
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const desktop = width >= 850;
  const duasColunas = width >= 600;

  const [eventos, setEventos] = useState<EventoUrbano[]>([]);
  const [sensores, setSensores] = useState<SensorUrbano[]>([]);
  const [bases, setBases] = useState<BasePublica[]>([]);
  const [conexao, setConexao] = useState<Conexao>("carregando");

  const idsAnteriores = useRef<Upcheck | null>(null);
  const conectado = useRef(false);
  const verificando = useRef(false);
  const montado = useRef(true);

  const atualizarDados = useCallback(async () => {
    if (verificando.current) return;

    verificando.current = true;

    try {
      const idsAtuais = await verificarUpcheck();

      if (!conectado.current || !idsAnteriores.current) {
        const [novosEventos, novosSensores, novasBases] =
          await Promise.all([
            listarEventosUrbanos(),
            listarSensoresUrbanos(),
            listarBasesPublicas(),
          ]);

        if (!montado.current) return;

        setEventos(novosEventos);
        setSensores(novosSensores);
        setBases(novasBases);
      } else {
        const anteriores = idsAnteriores.current;
        const consultas: Promise<void>[] = [];

        if (
          idsMudaram(
            anteriores.eventosUrbanos,
            idsAtuais.eventosUrbanos
          )
        ) {
          consultas.push(
            listarEventosUrbanos().then((dados) => {
              if (montado.current) setEventos(dados);
            })
          );
        }

        if (
          idsMudaram(
            anteriores.sensoresUrbanos,
            idsAtuais.sensoresUrbanos
          )
        ) {
          consultas.push(
            listarSensoresUrbanos().then((dados) => {
              if (montado.current) setSensores(dados);
            })
          );
        }

        if (
          idsMudaram(
            anteriores.basesPublicas,
            idsAtuais.basesPublicas
          )
        ) {
          consultas.push(
            listarBasesPublicas().then((dados) => {
              if (montado.current) setBases(dados);
            })
          );
        }

        await Promise.all(consultas);
      }

      if (!montado.current) return;

      idsAnteriores.current = idsAtuais;
      conectado.current = true;
      setConexao("online");
    } catch {
      if (!montado.current) return;

      conectado.current = false;
      idsAnteriores.current = null;

      setEventos([]);
      setSensores([]);
      setBases([]);
      setConexao("offline");
    } finally {
      verificando.current = false;
    }
  }, []);

  useEffect(() => {
    montado.current = true;

    atualizarDados();

    const intervalo = setInterval(() => {
      atualizarDados();
    }, INTERVALO);

    return () => {
      montado.current = false;
      clearInterval(intervalo);
    };
  }, [atualizarDados]);

  const online = conexao === "online";

  const painelEventos = (
    <View
      style={[
        styles.painel,
        styles.painelEventos,
        desktop && styles.painelEventosDesktop,
      ]}
    >
      <View style={styles.cabecalhoPainel}>
        <Text style={styles.tituloPainel}>Eventos Urbanos</Text>
        <Text style={styles.contador}>
          {online ? eventos.length : 0}
        </Text>
      </View>

      <Text style={styles.descricaoPainel}>
        Ocorrências e riscos registrados na cidade
      </Text>

      {conexao === "carregando" && (
        <ActivityIndicator
          size="large"
          color="#27C2EE"
          style={styles.carregamento}
        />
      )}

      {online && eventos.length === 0 && (
        <Text style={styles.vazio}>Nenhum evento registrado.</Text>
      )}

      {online && (
        <View style={styles.listaEventos}>
          {eventos.map((evento) => (
            <View
              key={evento.id}
              style={[
                styles.postit,
                {
                  width: duasColunas ? "48%" : "100%",
                  backgroundColor: corPrioridade(evento.prioridade),
                },
              ]}
            >
              <Text style={styles.postitPrioridade}>
                {evento.prioridade}
              </Text>

              <Text style={styles.postitTitulo}>
                {evento.titulo}
              </Text>

              <Text style={styles.postitDescricao}>
                {evento.descricao}
              </Text>

              <View style={styles.postitRodape}>
                <Text style={styles.postitInformacao}>
                  {evento.local}
                </Text>

                <Text style={styles.postitInformacao}>
                  Confiança: {evento.confianca}%
                </Text>

                <Text style={styles.postitStatus}>
                  {evento.resolvido ? "Resolvido" : "Em andamento"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const painelSensores = (
    <View style={styles.painel}>
      <View style={styles.cabecalhoPainel}>
        <Text style={styles.tituloPainel}>Sensores Urbanos</Text>
        <Text style={styles.contador}>
          {online ? sensores.length : 0}
        </Text>
      </View>

      <Text style={styles.descricaoPainel}>
        Monitoramento das condições ambientais
      </Text>

      {online && sensores.length === 0 && (
        <Text style={styles.vazio}>Nenhum sensor registrado.</Text>
      )}

      {online &&
        sensores.map((sensor) => (
          <View key={sensor.id} style={styles.itemSecundario}>
            <View style={styles.itemCabecalho}>
              <Text style={styles.itemTitulo}>{sensor.nome}</Text>

              <View
                style={[
                  styles.indicador,
                  {
                    backgroundColor: sensor.ativo
                      ? "#48CF94"
                      : "#F07575",
                  },
                ]}
              />
            </View>

            <Text style={styles.itemDescricao}>
              {sensor.tipo.replace(/_/g, " ")}
            </Text>

            <Text style={styles.itemLeitura}>
              {sensor.leitura} {sensor.unidade}
            </Text>

            <Text style={styles.itemLocal}>{sensor.local}</Text>
          </View>
        ))}
    </View>
  );

  const painelBases = (
    <View style={styles.painel}>
      <View style={styles.cabecalhoPainel}>
        <Text style={styles.tituloPainel}>Bases Públicas</Text>
        <Text style={styles.contador}>
          {online ? bases.length : 0}
        </Text>
      </View>

      <Text style={styles.descricaoPainel}>
        Informações disponibilizadas por órgãos públicos
      </Text>

      {online && bases.length === 0 && (
        <Text style={styles.vazio}>Nenhuma base registrada.</Text>
      )}

      {online &&
        bases.map((base) => (
          <View key={base.id} style={styles.itemSecundario}>
            <Text style={styles.itemTitulo}>{base.nome}</Text>

            <Text style={styles.itemDescricao}>
              {base.orgaoResponsavel}
            </Text>

            <Text style={styles.itemLocal}>
              {base.local} • Confiança: {base.confianca}%
            </Text>
          </View>
        ))}
    </View>
  );

  return (
    <View style={styles.tela}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.topo}>
          <View>
            <Text style={styles.titulo}>Plataforma URI</Text>

            <Text style={styles.subtitulo}>
              Urban Risk Intelligence
            </Text>
          </View>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.indicador,
                {
                  backgroundColor: online
                    ? "#48CF94"
                    : conexao === "offline"
                      ? "#F07575"
                      : "#F2C66D",
                },
              ]}
            />

            <Text style={styles.statusTexto}>
              {online
                ? "Conectado"
                : conexao === "offline"
                  ? "Desconectado"
                  : "Conectando"}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.layout,
            desktop && styles.layoutDesktop,
          ]}
        >
          {painelEventos}

          <View
            style={[
              styles.colunaSecundaria,
              desktop && styles.colunaDesktop,
            ]}
          >
            {painelSensores}
            {painelBases}
          </View>
        </View>

        <Text style={styles.rodape}>
          Atualização automática a cada 3 segundos
        </Text>
      </ScrollView>

      <Modal
        visible={conexao === "offline"}
        transparent
        animationType="fade"
        onRequestClose={() => { }}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.modalIcone}>!</Text>

            <Text style={styles.modalTitulo}>
              Sem conexão com o servidor
            </Text>

            <Text style={styles.modalDescricao}>
              Não foi possível acessar os dados da plataforma.
              Verifique se o backend está em execução.
            </Text>

            <TouchableOpacity
              style={styles.modalBotao}
              onPress={atualizarDados}
            >
              <Text style={styles.modalBotaoTexto}>
                Tentar novamente
              </Text>
            </TouchableOpacity>

            <Text style={styles.modalRodape}>
              A reconexão também será tentada automaticamente.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#080D14",
  },

  container: {
    padding: 24,
    paddingBottom: 35,
    minHeight: "100%",
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 28,
  },

  titulo: {
    color: "#F3F7FA",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitulo: {
    color: "#8292A5",
    fontSize: 13,
    marginTop: 4,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statusTexto: {
    color: "#B2C0CD",
    fontSize: 13,
  },

  indicador: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  layout: {
    gap: 18,
  },

  layoutDesktop: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
  },

  painel: {
    backgroundColor: "#111B27",
    borderWidth: 1,
    borderColor: "#263B4D",
    borderTopWidth: 4,
    borderTopColor: "#27C2EE",
    borderRadius: 10,
    padding: 18,
    minHeight: 230,
  },

  painelEventos: {
    minHeight: 420,
  },

  painelEventosDesktop: {
    flex: 1.8,
    minHeight: 630,
  },

  colunaSecundaria: {
    gap: 18,
  },

  colunaDesktop: {
    flex: 1,
  },

  cabecalhoPainel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  tituloPainel: {
    color: "#F1F6FA",
    fontSize: 19,
    fontWeight: "700",
    flexShrink: 1,
  },

  contador: {
    color: "#65D4F6",
    backgroundColor: "#203443",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 13,
    fontWeight: "700",
  },

  descricaoPainel: {
    color: "#8294A7",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 18,
  },

  carregamento: {
    marginTop: 70,
  },

  vazio: {
    color: "#7D8D9F",
    fontSize: 13,
    marginTop: 20,
    textAlign: "center",
  },

  listaEventos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },

  postit: {
    borderRadius: 6,
    padding: 14,
    minHeight: 185,
    justifyContent: "space-between",
    gap: 8,
  },

  postitPrioridade: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  postitTitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  postitDescricao: {
    color: "#F0F0F0",
    fontSize: 12,
    lineHeight: 18,
  },

  postitRodape: {
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF40",
    paddingTop: 9,
    gap: 4,
  },

  postitInformacao: {
    color: "#F0F0F0",
    fontSize: 12,
  },

  postitStatus: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },

  itemSecundario: {
    backgroundColor: "#1B2938",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#2D4255",
    padding: 13,
    marginBottom: 10,
    gap: 5,
  },

  itemCabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  itemTitulo: {
    color: "#EDF4F9",
    fontSize: 14,
    fontWeight: "700",
    flexShrink: 1,
  },

  itemDescricao: {
    color: "#9FAFC0",
    fontSize: 12,
  },

  itemLeitura: {
    color: "#65D4F6",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 4,
  },

  itemLocal: {
    color: "#899BAC",
    fontSize: 12,
  },

  rodape: {
    color: "#617487",
    fontSize: 11,
    textAlign: "center",
    marginTop: 24,
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "#000000BB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCaixa: {
    width: "100%",
    maxWidth: 410,
    backgroundColor: "#172230",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#324659",
    padding: 28,
    alignItems: "center",
  },

  modalIcone: {
    color: "#F07575",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 12,
  },

  modalTitulo: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  modalDescricao: {
    color: "#B7C4D0",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 23,
  },

  modalBotao: {
    backgroundColor: "#21A8D3",
    borderRadius: 7,
    paddingHorizontal: 30,
    paddingVertical: 13,
  },

  modalBotaoTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  modalRodape: {
    color: "#7E91A5",
    fontSize: 11,
    textAlign: "center",
    marginTop: 18,
  },
});
