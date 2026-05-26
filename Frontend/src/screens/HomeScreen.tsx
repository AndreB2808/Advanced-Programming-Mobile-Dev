import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";

import {
  listarAlertas,
  listarSensores,
  listarSistemas,
} from "../services/api";

import { Alerta } from "../types/Alerta";
import { Sensor } from "../types/Sensor";
import { Sistema } from "../types/Sistema";

type Props = {
  navigation: any;
};

const { width, height } = Dimensions.get("window");
export default function HomeScreen({ navigation }: Props) {

  const [carregando, setCarregando] = useState(true);

  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [sistemas, setSistemas] = useState<Sistema[]>([]);

  async function carregarDados() {

    try {

      setCarregando(true);

      const [
        dadosAlertas,
        dadosSensores,
        dadosSistemas
      ] = await Promise.all([
        listarAlertas(),
        listarSensores(),
        listarSistemas(),
      ]);

      setAlertas(
        Array.isArray(dadosAlertas)
          ? dadosAlertas
          : []
      );

      setSensores(
        Array.isArray(dadosSensores)
          ? dadosSensores
          : []
      );

      setSistemas(
        Array.isArray(dadosSistemas)
          ? dadosSistemas
          : []
      );

    } catch (error) {

      console.log(
        "Erro ao carregar dashboard:",
        error
      );

    } finally {

      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (carregando) {

    return (

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff9800" />

        <Text style={styles.loadingText}>
          Carregando missão...
        </Text>
      </View>
    );
  }

return (
  <View style={styles.tela}>

    <Image
      source={require("../../assets/background.png")}
      style={styles.imagemFundo}
      resizeMode="contain"
    />

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Controle da Missão Espacial
      </Text>

      <Text style={styles.subtitulo}>
        Painel integrado de monitoramento orbital
      </Text>

      <View style={styles.grid}>

        {/* ALERTAS */}

        <View style={styles.coluna}>

          <View style={styles.cardResumo}>
            <Text style={styles.numero}>
              {alertas.length}
            </Text>

            <Text style={styles.textoResumo}>
              Alertas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              navigation.navigate("Alertas")
            }
          >

            <Text style={styles.botaoTexto}>
              Abrir
            </Text>

          </TouchableOpacity>

          <View style={styles.previewBox}>

            <Text style={styles.previewTitulo}>
              Recentes
            </Text>

            {alertas.length > 0 ? (

              alertas
                .slice(0, 3)
                .map((alerta) => (

                  <View
                    key={alerta.id}
                    style={styles.previewItem}
                  >

                    <Text style={styles.previewPrincipal}>
                      {alerta.titulo}
                    </Text>

                    <Text style={styles.previewSecundario}>
                      {alerta.nivelCriticidade}
                    </Text>

                  </View>
                ))

            ) : (

              <Text style={styles.vazio}>
                Nenhum alerta registrado
              </Text>
            )}

          </View>

        </View>

        {/* SENSORES */}

        <View style={styles.coluna}>

          <View style={styles.cardResumo}>
            <Text style={styles.numero}>
              {sensores.length}
            </Text>

            <Text style={styles.textoResumo}>
              Sensores
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              navigation.navigate("Sensores")
            }
          >

            <Text style={styles.botaoTexto}>
              Abrir
            </Text>

          </TouchableOpacity>

          <View style={styles.previewBox}>

            <Text style={styles.previewTitulo}>
              Recentes
            </Text>

            {sensores.length > 0 ? (

              sensores
                .slice(0, 3)
                .map((sensor) => (

                  <View
                    key={sensor.id}
                    style={styles.previewItem}
                  >

                    <Text style={styles.previewPrincipal}>
                      {sensor.nome}
                    </Text>

                    <Text style={styles.previewSecundario}>
                      {sensor.leitura}
                      {sensor.unidade}
                    </Text>

                  </View>
                ))

            ) : (

              <Text style={styles.vazio}>
                Nenhum sensor registrado
              </Text>
            )}

          </View>

        </View>

        {/* SISTEMAS */}

        <View style={styles.coluna}>

          <View style={styles.cardResumo}>
            <Text style={styles.numero}>
              {sistemas.length}
            </Text>

            <Text style={styles.textoResumo}>
              Sistemas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              navigation.navigate("Sistemas")
            }
          >

            <Text style={styles.botaoTexto}>
              Abrir
            </Text>

          </TouchableOpacity>

          <View style={styles.previewBox}>

            <Text style={styles.previewTitulo}>
              Recentes
            </Text>

            {sistemas.length > 0 ? (

              sistemas
                .slice(0, 3)
                .map((sistema) => (

                  <View
                    key={sistema.id}
                    style={styles.previewItem}
                  >

                    <Text style={styles.previewPrincipal}>
                      {sistema.nome}
                    </Text>

                    <Text style={styles.previewSecundario}>
                      {sistema.nivelOperacao}
                    </Text>

                  </View>
                ))

            ) : (

              <Text style={styles.vazio}>
                Nenhum sistema registrado
              </Text>
            )}

          </View>

        </View>

      </View>

    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#050816"
  },

  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16
  },

  container: {
    padding: 20,
    backgroundColor: "transparent",
    minHeight: "100%"
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10
  },

  subtitulo: {
    color: "#8fa3bf",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 5
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 15
  },

  coluna: {
    flex: 1
  },

  cardResumo: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginBottom: 10
  },

  numero: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff9800"
  },

  textoResumo: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 5
  },

  botao: {
    backgroundColor: "#ff7300",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },

  previewBox: {
    backgroundColor: "#0b1324",
    borderWidth: 1,
    borderColor: "#1b2a45",
    borderRadius: 14,
    padding: 12,
    minHeight: 260
  },

  previewTitulo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },

  previewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#1d2c49",
    paddingVertical: 10
  },

  previewPrincipal: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 3,
    textAlign: "center"
  },

  previewSecundario: {
    color: "#8fa3bf",
    fontSize: 13,
    textAlign: "center"
  },

  vazio: {
    color: "#6f7f99",
    fontStyle: "italic",
    marginTop: 5,
    textAlign: "center"
  },
  tela: {
    flex: 1,
    backgroundColor: "#050816"
  },

  imagemFundo: {
    position: "absolute",

    width: width * 0.6,
    aspectRatio: 1,

    opacity: 0.25,

    top: "50%",
    left: "50%",

    transform: [
      { translateX: -(width * 0.6) / 2 },
      { translateY: -(width * 0.25) / 2 }
    ],
  },
});