import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Alert as RNAlert,
} from "react-native";

import { criarAlerta, listarAlertas } from "../services/api";
import { Alerta } from "../types/Alerta";
import InfoCard from "../components/InfoCard";
import OptionChips from "../components/OptionChips";

type Props = {
  navigation: any;
};

export default function AlertasScreen({ navigation }: Props) {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nivelCriticidade, setNivelCriticidade] = useState("ALTO");
  const [sistemaAfetado, setSistemaAfetado] = useState("");
  const [resolvido, setResolvido] = useState(false);

  async function carregarAlertas() {
    try {
      setCarregando(true);
      const dados = await listarAlertas();
      setAlertas(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.log("Erro ao carregar alertas:", error);
      RNAlert.alert("Erro", "Não foi possível carregar os alertas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function salvarAlerta() {
    if (!titulo.trim() || !descricao.trim() || !sistemaAfetado.trim()) {
      RNAlert.alert("Atenção", "Preencha título, descrição e sistema afetado.");
      return;
    }

    const novoAlerta = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      nivelCriticidade,
      sistemaAfetado: sistemaAfetado.trim(),
      dataHora: new Date().toISOString(),
      resolvido,
    };

    try {
      const salvo = await criarAlerta(novoAlerta);
      setAlertas((anteriores) => [salvo, ...anteriores]);

      setTitulo("");
      setDescricao("");
      setNivelCriticidade("ALTO");
      setSistemaAfetado("");
      setResolvido(false);

      RNAlert.alert("Sucesso", "Alerta enviado para o backend.");
    } catch (error) {
      console.log("Erro ao criar alerta:", error);
      RNAlert.alert("Erro", "Falha ao enviar o alerta.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Alertas Críticos</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <OptionChips
          label="Nível de criticidade"
          options={["BAIXO", "MÉDIO", "ALTO", "EXTREMO"]}
          value={nivelCriticidade}
          onChange={setNivelCriticidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Sistema afetado"
          value={sistemaAfetado}
          onChangeText={setSistemaAfetado}
        />

        <View style={styles.switchLinha}>
          <Text style={styles.switchTexto}>Resolvido</Text>
          <Switch value={resolvido} onValueChange={setResolvido} />
        </View>

        <TouchableOpacity style={styles.botao} onPress={salvarAlerta}>
          <Text style={styles.botaoTexto}>Enviar alerta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Alertas salvos</Text>

      {carregando ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.lista}>
          {alertas.length > 0 ? (
            alertas.map((item) => (
              <InfoCard key={item.id} item={item} />
            ))
          ) : (
            <Text style={styles.vazio}>Nenhum alerta encontrado.</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#08111f",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  formulario: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cfd8dc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  switchLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  switchTexto: {
    fontSize: 16,
    fontWeight: "600",
  },
  botao: {
    backgroundColor: "#c62828",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  botaoVoltar: {
    backgroundColor: "#455a64",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  lista: {
    marginTop: 10,
  },
  vazio: {
    color: "#cfd8dc",
    textAlign: "center",
    marginTop: 10,
  },
});