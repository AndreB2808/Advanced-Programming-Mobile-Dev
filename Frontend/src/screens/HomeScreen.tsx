
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
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
const COR_PRINCIPAL = "#01625A";

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
  const compacto = width < 600;

  const [eventos, setEventos] = useState<EventoUrbano[]>([]);
  const [sensores, setSensores] = useState<SensorUrbano[]>([]);
  const [bases, setBases] = useState<BasePublica[]>([]);
  const [conexao, setConexao] = useState<Conexao>("carregando");

  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(
    () =>
      Platform.OS === "web" &&
      typeof Notification !== "undefined" &&
      Notification.permission !== "granted"
  );

  const [mensagemNotificacoes, setMensagemNotificacoes] =
    useState("");

  const idsAnteriores = useRef<Upcheck | null>(null);
  const idsConhecidos = useRef<Set<number> | null>(null);

  const conectado = useRef(false);
  const verificando = useRef(false);
  const montado = useRef(true);

  const notificacoesAtivas = useRef(
    Platform.OS === "web" &&
    typeof Notification !== "undefined" &&
    Notification.permission === "granted"
  );

  const enviarNotificacao = useCallback((evento: EventoUrbano) => {
    if (
      Platform.OS !== "web" ||
      !notificacoesAtivas.current ||
      typeof Notification === "undefined" ||
      Notification.permission !== "granted"
    ) {
      return;
    }

    try {
      new Notification("Novo evento urbano - Plataforma URI", {
        body:
          `${evento.titulo}\n` +
          `${evento.local} | Prioridade: ${evento.prioridade}`,
      });
    } catch {
      console.warn("Não foi possível exibir a notificação.");
    }
  }, []);

  const ativarNotificacoes = async () => {
    if (
      Platform.OS !== "web" ||
      typeof Notification === "undefined"
    ) {
      setMensagemNotificacoes(
        "As notificações não são suportadas neste ambiente."
      );
      return;
    }

    if (
      typeof window === "undefined" ||
      !window.isSecureContext
    ) {
      setMensagemNotificacoes(
        "As notificações exigem localhost ou uma conexão HTTPS."
      );
      return;
    }

    if (Notification.permission === "denied") {
      setMensagemNotificacoes(
        "As notificações estão bloqueadas nas configurações do site."
      );
      return;
    }

    try {
      const permissao =
        Notification.permission === "granted"
          ? "granted"
          : await Notification.requestPermission();

      if (permissao === "granted") {
        notificacoesAtivas.current = true;
        setMostrarNotificacoes(false);
        setMensagemNotificacoes("");
      } else {
        notificacoesAtivas.current = false;
        setMensagemNotificacoes(
          "A permissão não foi concedida."
        );
      }
    } catch {
      setMensagemNotificacoes(
        "Não foi possível ativar as notificações."
      );
    }
  };

  const atualizarDados = useCallback(async () => {
    if (verificando.current) return;

    verificando.current = true;

    try {
      const idsAtuais = await verificarUpcheck();

      const novosIds = new Set(
        idsConhecidos.current
          ? idsAtuais.eventosUrbanos.filter(
            (id) => !idsConhecidos.current!.has(id)
          )
          : []
      );

      let eventosParaNotificar: EventoUrbano[] = [];

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

        eventosParaNotificar = novosEventos;
      } else {
        const anteriores = idsAnteriores.current;
        const consultas: Promise<void>[] = [];

        if (
          idsMudaram(
            anteriores.eventosUrbanos,
            idsAtuais.eventosUrbanos
          ) ||
          anteriores.assinaturas.eventosUrbanos !==
          idsAtuais.assinaturas.eventosUrbanos
        ) {
          consultas.push(
            listarEventosUrbanos().then((dados) => {
              if (montado.current) {
                setEventos(dados);
                eventosParaNotificar = dados;
              }
            })
          );
        }

        if (
          idsMudaram(
            anteriores.sensoresUrbanos,
            idsAtuais.sensoresUrbanos
          ) ||
          anteriores.assinaturas.sensoresUrbanos !==
          idsAtuais.assinaturas.sensoresUrbanos
        ) {
          consultas.push(
            listarSensoresUrbanos().then((dados) => {
              if (montado.current) {
                setSensores(dados);
              }
            })
          );
        }

        if (
          idsMudaram(
            anteriores.basesPublicas,
            idsAtuais.basesPublicas
          ) ||
          anteriores.assinaturas.basesPublicas !==
          idsAtuais.assinaturas.basesPublicas
        ) {
          consultas.push(
            listarBasesPublicas().then((dados) => {
              if (montado.current) {
                setBases(dados);
              }
            })
          );
        }

        await Promise.all(consultas);
      }

      if (!montado.current) return;

      const eventosNovos = eventosParaNotificar.filter(
        (evento) => novosIds.has(evento.id)
      );

      idsConhecidos.current = new Set(
        idsAtuais.eventosUrbanos
      );

      idsAnteriores.current = idsAtuais;
      conectado.current = true;

      setConexao("online");

      eventosNovos.forEach(enviarNotificacao);
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
  }, [enviarNotificacao]);

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
        <Text style={styles.tituloPainel}>
          Eventos Urbanos
        </Text>

        <Text style={styles.contador}>
          {online ? eventos.length : 0}
        </Text>
      </View>

      <Text style={styles.descricaoPainel}>
        Ocorrências e riscos registrados na cidade
      </Text>

      <ScrollView
        style={styles.conteudoRolavel}
        contentContainerStyle={styles.conteudoRolavelInterno}
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        {conexao === "carregando" && (
          <ActivityIndicator
            size="large"
            color={COR_PRINCIPAL}
            style={styles.carregamento}
          />
        )}

        {online && eventos.length === 0 && (
          <Text style={styles.vazio}>
            Nenhum evento registrado.
          </Text>
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
                    backgroundColor: corPrioridade(
                      evento.prioridade
                    ),
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
                    {evento.resolvido
                      ? "Resolvido"
                      : "Em andamento"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );

  const painelSensores = (
    <View style={styles.painel}>
      <View style={styles.cabecalhoPainel}>
        <Text style={styles.tituloPainel}>
          Sensores Urbanos
        </Text>

        <Text style={styles.contador}>
          {online ? sensores.length : 0}
        </Text>
      </View>

      <Text style={styles.descricaoPainel}>
        Monitoramento das condições ambientais
      </Text>

      <ScrollView
        style={styles.conteudoRolavel}
        contentContainerStyle={styles.conteudoRolavelInterno}
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        {online && sensores.length === 0 && (
          <Text style={styles.vazio}>
            Nenhum sensor registrado.
          </Text>
        )}

        {online &&
          sensores.map((sensor) => (
            <View
              key={sensor.id}
              style={styles.itemSecundario}
            >
              <View style={styles.itemCabecalho}>
                <Text style={styles.itemTitulo}>
                  {sensor.nome}
                </Text>

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

              <Text style={styles.itemLocal}>
                {sensor.local}
              </Text>

              <Text style={styles.itemDescricao}>
                Confiança:{" "}
                {sensor.confianca == null
                  ? "Não informada"
                  : `${sensor.confianca}%`}
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );

  const painelBases = (
    <View style={styles.painel}>
      <View style={styles.cabecalhoPainel}>
        <Text style={styles.tituloPainel}>
          Bases Públicas
        </Text>

        <Text style={styles.contador}>
          {online ? bases.length : 0}
        </Text>
      </View>

      <Text style={styles.descricaoPainel}>
        Informações disponibilizadas por órgãos públicos
      </Text>

      <ScrollView
        style={styles.conteudoRolavel}
        contentContainerStyle={styles.conteudoRolavelInterno}
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        {online && bases.length === 0 && (
          <Text style={styles.vazio}>
            Nenhuma base registrada.
          </Text>
        )}

        {online &&
          bases.map((base) => (
            <View
              key={base.id}
              style={styles.itemSecundario}
            >
              <Text style={styles.itemTitulo}>
                {base.nome}
              </Text>

              <Text style={styles.itemDescricao}>
                {base.orgaoResponsavel}
              </Text>

              <Text style={styles.itemLocal}>
                {base.local} • Confiança: {base.confianca}%
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.tela}>
      <View
        style={[
          styles.container,
          compacto && styles.containerCompacto,
        ]}
      >
        <View style={styles.topo}>
          <View style={styles.identidade}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.titulo}>
              Plataforma URI
            </Text>

            <Text style={styles.subtitulo}>
              Urban Risk Intelligence
            </Text>
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.textoAtualizacao}>
              Atualização automática a cada 3 segundos
            </Text>

            <View style={styles.separadorStatus} />

            <View style={styles.estadoConexao}>
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
        </View>

        <View
          style={[
            styles.layout,
            desktop && styles.layoutDesktop,
          ]}
        >
          {painelEventos}

          <View style={styles.colunaSecundaria}>
            {painelSensores}
            {painelBases}
          </View>
        </View>
      </View>

      <Modal
        visible={conexao === "offline"}
        transparent
        animationType="fade"
        onRequestClose={() => { }}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.modalIcone}>
              !
            </Text>

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

      <Modal
        visible={mostrarNotificacoes && online}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setMostrarNotificacoes(false)
        }
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.modalIconeNotificacao}>
              🔔
            </Text>

            <Text style={styles.modalTitulo}>
              Ativar notificações?
            </Text>

            <Text style={styles.modalDescricao}>
              Receba uma notificação no computador sempre
              que um novo evento urbano for registrado
              na Plataforma URI.
            </Text>

            {mensagemNotificacoes !== "" && (
              <Text style={styles.mensagemNotificacoes}>
                {mensagemNotificacoes}
              </Text>
            )}

            <View style={styles.modalAcoes}>
              <TouchableOpacity
                style={styles.botaoSecundario}
                onPress={() =>
                  setMostrarNotificacoes(false)
                }
              >
                <Text style={styles.botaoSecundarioTexto}>
                  Agora não
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBotao}
                onPress={ativarNotificacoes}
              >
                <Text style={styles.modalBotaoTexto}>
                  Ativar notificações
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalRodape}>
              Os eventos já carregados não geram
              notificações.
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
    backgroundColor: "#08110F",
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 0,
  },

  containerCompacto: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 10,
    flexShrink: 0,
  },

  identidade: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    flexShrink: 1,
  },

  logo: {
    width: 34,
    height: 34,
  },

  titulo: {
    color: "#F3F7FA",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitulo: {
    color: "#A0B3AD",
    fontSize: 13,
    marginTop: 0,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 10,
    flexShrink: 1,
  },

  textoAtualizacao: {
    color: "#A0B3AD",
    fontSize: 12,
  },

  separadorStatus: {
    width: 1,
    height: 14,
    backgroundColor: "#2D4C45",
  },

  estadoConexao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  statusTexto: {
    color: "#BFCBC7",
    fontSize: 13,
  },

  indicador: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  layout: {
    flex: 1,
    minHeight: 0,
    gap: 14,
    flexDirection: "column",
  },

  layoutDesktop: {
    flexDirection: "row-reverse",
    alignItems: "stretch",
  },

  painel: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#101F1D",
    borderWidth: 1,
    borderColor: "#23423C",
    borderTopWidth: 4,
    borderTopColor: COR_PRINCIPAL,
    borderRadius: 10,
    padding: 14,
    overflow: "hidden",
  },

  painelEventos: {
    flex: 1.5,
  },

  painelEventosDesktop: {
    flex: 1.8,
  },

  colunaSecundaria: {
    flex: 1,
    minHeight: 0,
    gap: 14,
  },

  cabecalhoPainel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },

  tituloPainel: {
    color: "#F1F6FA",
    fontSize: 19,
    fontWeight: "700",
    flexShrink: 1,
  },

  contador: {
    color: "#FFFFFF",
    backgroundColor: COR_PRINCIPAL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 13,
    fontWeight: "700",
  },

  descricaoPainel: {
    color: "#A4B8B1",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 12,
    flexShrink: 0,
  },

  conteudoRolavel: {
    flex: 1,
    minHeight: 0,
  },

  conteudoRolavelInterno: {
    paddingBottom: 6,
  },

  carregamento: {
    marginTop: 30,
  },

  vazio: {
    color: "#91A79E",
    fontSize: 13,
    marginTop: 12,
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
    backgroundColor: "#1B2E2A",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#2F4B44",
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
    color: "#B1C2BB",
    fontSize: 12,
  },

  itemLeitura: {
    color: "#8FD7C7",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 4,
  },

  itemLocal: {
    color: "#9DB8AF",
    fontSize: 12,
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
    backgroundColor: "#162722",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#325349",
    padding: 28,
    alignItems: "center",
  },

  modalIcone: {
    color: "#F07575",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 12,
  },

  modalIconeNotificacao: {
    fontSize: 32,
    marginBottom: 14,
  },

  modalTitulo: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  modalDescricao: {
    color: "#C0CEC8",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 23,
  },

  modalBotao: {
    backgroundColor: COR_PRINCIPAL,
    borderRadius: 7,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },

  modalBotaoTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },

  modalRodape: {
    color: "#96ADA4",
    fontSize: 11,
    textAlign: "center",
    marginTop: 18,
  },

  modalAcoes: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },

  botaoSecundario: {
    borderWidth: 1,
    borderColor: "#425F55",
    borderRadius: 7,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },

  botaoSecundarioTexto: {
    color: "#C0CEC8",
    fontSize: 14,
    fontWeight: "600",
  },

  mensagemNotificacoes: {
    color: "#F2C66D",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
});
