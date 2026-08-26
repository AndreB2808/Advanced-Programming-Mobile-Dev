import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
  Pressable,
  Modal,
} from "react-native";

import { AlertaIndustrial } from "../types/AlertaIndustrial";
import AlertaCard from "../components/AlertaCard";

import {
  listarAlertas,
  criarAlerta,
  atualizarAlerta,
  buscarAlertaPorId,
} from "../services/alertaService";

export default function AlertaScreen() {

  const [alertas, setAlertas] = useState<AlertaIndustrial[]>([]);

  const [alertaSelecionado, setAlertaSelecionado] =
    useState<AlertaIndustrial | null>(null);

  const [modalVisivel, setModalVisivel] = useState(false);

  const [tipoRisco, setTipoRisco] = useState("EPI");
  const [descricao, setDescricao] = useState("");
  const [setor, setSetor] = useState("Produção");

  const [nivelSeveridade, setNivelSeveridade] =
    useState("BAIXO");

  const [individuosSobRisco, setIndividuosSobRisco] =
    useState("");

  const [gruposNotificados, setGruposNotificados] =
    useState("");

  const [carregando, setCarregando] = useState(true);

  const [carregandoDetalhe, setCarregandoDetalhe] =
    useState(false);

  const [erro, setErro] = useState<string | null>(null);

  const [criando, setCriando] = useState(false);

  const tiposRisco = [
    "EPI",
    "Área Restrita",
    "Área Perigosa",
  ];

  const setores = [
    "Produção",
    "Manutenção",
    "Logística",
    "Controle de Qualidade",
  ];

  const severidades = [
    "BAIXO",
    "MÉDIO",
    "ALTO",
    "INDEFINIDO",
  ];

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function carregarAlertas() {
    try {
      setCarregando(true);
      setErro(null);

      const lista = await listarAlertas();

      setAlertas(lista);

    } catch (error) {
      console.error("Erro ao carregar alertas:", error);

      setErro(
        "Não foi possível carregar os alertas.\nVerifique se o backend está rodando em http://localhost:8080"
      );

    } finally {
      setCarregando(false);
    }
  }

  async function adicionarAlerta() {
    try {
      setCriando(true);
      setErro(null);

      const novoAlerta: Omit<AlertaIndustrial, "id"> = {
        tipoRisco,

        descricao:
          descricao.trim() !== ""
            ? descricao.trim()
            : "Sem descrição",

        setor,

        nivelSeveridade,

        dataHora: new Date().toLocaleString("pt-BR"),

        resolvido: false,

        individuosSobRisco:
          individuosSobRisco.trim() !== ""
            ? individuosSobRisco.trim()
            : "Não informado",

        gruposNotificados:
          gruposNotificados.trim() !== ""
            ? gruposNotificados.trim()
            : "Não informado",
      };

      const alertaCriado =
        await criarAlerta(novoAlerta);

      setAlertas((alertasAtuais) => [
        ...alertasAtuais,
        alertaCriado,
      ]);

      setDescricao("");
      setIndividuosSobRisco("");
      setGruposNotificados("");

    } catch (error) {
      console.error("Erro ao criar alerta:", error);

      setErro(
        "Não foi possível criar o alerta. Veja o console para mais detalhes."
      );

    } finally {
      setCriando(false);
    }
  }

  async function abrirDetalhes(id: number) {
    try {
      setModalVisivel(true);
      setCarregandoDetalhe(true);
      setAlertaSelecionado(null);
      setErro(null);

      const alerta =
        await buscarAlertaPorId(id);

      setAlertaSelecionado(alerta);

    } catch (error) {
      console.error(
        "Erro ao buscar detalhe do alerta:",
        error
      );

      setErro(
        "Não foi possível carregar os detalhes do alerta."
      );

    } finally {
      setCarregandoDetalhe(false);
    }
  }

  function fecharDetalhes() {
    setModalVisivel(false);
  }

  async function resolverAlerta(
    alerta: AlertaIndustrial
  ) {
    try {
      setErro(null);

      const alertaAtualizado =
        await atualizarAlerta(
          alerta.id,
          {
            ...alerta,
            resolvido: true,
          }
        );

      setAlertas((alertasAtuais) =>
        alertasAtuais.map((item) =>
          item.id === alertaAtualizado.id
            ? alertaAtualizado
            : item
        )
      );

      setAlertaSelecionado(alertaAtualizado);

    } catch (error) {
      console.error(
        "Erro ao atualizar alerta:",
        error
      );

      setErro(
        "Não foi possível marcar o alerta como resolvido."
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Alertas Industriais
      </Text>

      <View style={styles.formulario}>

        <Text style={styles.label}>
          Tipo de risco
        </Text>

        <View style={styles.opcoesContainer}>
          {tiposRisco.map((opcao) => (
            <Pressable
              key={opcao}
              onPress={() => setTipoRisco(opcao)}
              style={[
                styles.opcao,
                tipoRisco === opcao &&
                styles.opcaoSelecionada,
              ]}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  tipoRisco === opcao &&
                  styles.textoOpcaoSelecionada,
                ]}
              >
                {opcao}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Insira a descrição do alerta"
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>
          Setor
        </Text>

        <View style={styles.opcoesContainer}>
          {setores.map((opcao) => (
            <Pressable
              key={opcao}
              onPress={() => setSetor(opcao)}
              style={[
                styles.opcao,
                setor === opcao &&
                styles.opcaoSelecionada,
              ]}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  setor === opcao &&
                  styles.textoOpcaoSelecionada,
                ]}
              >
                {opcao}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>
          Nível de severidade
        </Text>

        <View style={styles.opcoesContainer}>
          {severidades.map((opcao) => (
            <Pressable
              key={opcao}
              onPress={() =>
                setNivelSeveridade(opcao)
              }
              style={[
                styles.opcao,
                nivelSeveridade === opcao &&
                styles.opcaoSelecionada,
              ]}
            >
              <Text
                style={[
                  styles.textoOpcao,
                  nivelSeveridade === opcao &&
                  styles.textoOpcaoSelecionada,
                ]}
              >
                {opcao}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>
          Indivíduos sob risco
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: João Silva"
          value={individuosSobRisco}
          onChangeText={setIndividuosSobRisco}
        />

        <Text style={styles.label}>
          Grupos notificados
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Equipe de Segurança"
          value={gruposNotificados}
          onChangeText={setGruposNotificados}
        />

        <View style={styles.botaoAdicionar}>
          <Button
            title={
              criando
                ? "Criando..."
                : "Adicionar Alerta"
            }
            onPress={adicionarAlerta}
            disabled={criando}
            color="#0152a3"
          />
        </View>

      </View>

      {carregando && (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.carregando}
        />
      )}

      {erro && !modalVisivel && (
        <View style={styles.erroContainer}>
          <Text style={styles.erroTexto}>
            {erro}
          </Text>
        </View>
      )}

      {!carregando && (
        <View style={styles.lista}>

          {alertas.map((alerta) => (
            <AlertaCard
              key={alerta.id}
              alerta={alerta}
              onDetalhes={abrirDetalhes}
            />
          ))}

        </View>
      )}

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharDetalhes}
      >

        <View style={styles.modalFundo}>

          <View style={styles.modalCard}>

            {carregandoDetalhe && (
              <>
                <ActivityIndicator
                  size="large"
                  color="#0152a3"
                />

                <Text style={styles.carregandoDetalheTexto}>
                  Carregando detalhes...
                </Text>
              </>
            )}

            {erro && (
              <View style={styles.erroModal}>
                <Text style={styles.erroTexto}>
                  {erro}
                </Text>

                <View style={styles.botaoModal}>
                  <Button
                    title="Fechar"
                    onPress={fecharDetalhes}
                    color="#555"
                  />
                </View>
              </View>
            )}

            {!carregandoDetalhe &&
              !erro &&
              alertaSelecionado && (
                <ScrollView>

                  <Text style={styles.detalheTitulo}>
                    {alertaSelecionado.resolvido
                      ? "✅"
                      : "⏳"}{" "}
                    Alerta #{alertaSelecionado.id}
                  </Text>

                  <Text style={styles.detalhe}>
                    Tipo de risco:{" "}
                    {alertaSelecionado.tipoRisco}
                  </Text>

                  <Text style={styles.detalhe}>
                    Descrição:{" "}
                    {alertaSelecionado.descricao}
                  </Text>

                  <Text style={styles.detalhe}>
                    Setor:{" "}
                    {alertaSelecionado.setor}
                  </Text>

                  <Text style={styles.detalhe}>
                    Nível de severidade:{" "}
                    {alertaSelecionado.nivelSeveridade}
                  </Text>

                  <Text style={styles.detalhe}>
                    Data e hora:{" "}
                    {alertaSelecionado.dataHora}
                  </Text>

                  <Text style={styles.detalhe}>
                    Resolvido:{" "}
                    {alertaSelecionado.resolvido
                      ? "Sim"
                      : "Não"}
                  </Text>

                  <Text style={styles.detalhe}>
                    Indivíduos sob risco:{" "}
                    {alertaSelecionado.individuosSobRisco}
                  </Text>

                  <Text style={styles.detalhe}>
                    Grupos notificados:{" "}
                    {alertaSelecionado.gruposNotificados}
                  </Text>

                  {!alertaSelecionado.resolvido && (
                    <View style={styles.botaoModal}>
                      <Button
                        title="Marcar como resolvido"
                        onPress={() =>
                          resolverAlerta(
                            alertaSelecionado
                          )
                        }
                        color="#018f50"
                      />
                    </View>
                  )}

                  <View style={styles.botaoModal}>
                    <Button
                      title="Fechar"
                      onPress={fecharDetalhes}
                      color="#555"
                    />
                  </View>

                </ScrollView>
              )}

          </View>

        </View>

      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#04a68f",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },

  formulario: {
    width: "100%",
    maxWidth: 600,
    alignItems: "center",
  },

  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    textAlign: "center",
  },

  opcoesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
  },

  opcao: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },

  opcaoSelecionada: {
    backgroundColor: "#0152a3",
    borderColor: "#0152a3",
  },

  textoOpcao: {
    color: "#333",
    textAlign: "center",
  },

  textoOpcaoSelecionada: {
    color: "#fff",
    fontWeight: "bold",
  },

  botaoAdicionar: {
    width: "70%",
    marginTop: 15,
  },

  carregando: {
    marginTop: 30,
  },

  erroContainer: {
    width: "100%",
    maxWidth: 600,
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ffcccc",
  },

  erroTexto: {
    textAlign: "center",
  },

  lista: {
    width: "100%",
    maxWidth: 600,
    marginTop: 25,
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 600,
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  detalheTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  detalhe: {
    fontSize: 16,
    marginBottom: 10,
  },

  botaoModal: {
    width: "80%",
    alignSelf: "center",
    marginTop: 15,
  },

  carregandoDetalheTexto: {
    textAlign: "center",
    marginTop: 15,
  },

  erroModal: {
    width: "100%",
  },

});