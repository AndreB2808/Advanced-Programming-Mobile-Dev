import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert as RNAlert,
} from "react-native";

import { criarSensor, listarSensores } from "../services/api";
import { Sensor } from "../types/Sensor";
import InfoCard from "../components/InfoCard";
import OptionChips from "../components/OptionChips";

type Props = {
  navigation: any;
};

export default function SensoresScreen({ navigation }: Props) {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("ATIVO");
  const [leitura, setLeitura] = useState("");
  const [unidade, setUnidade] = useState("%");
  const [localizacao, setLocalizacao] = useState("");

  async function carregarSensores() {
    try {
      setCarregando(true);
      const dados = await listarSensores();
      setSensores(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.log("Erro ao carregar sensores:", error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarSensores();
  }, []);

  async function salvarSensor() {
    if (!nome.trim() || !tipo.trim() || !leitura.trim() || !localizacao.trim()) {
      RNAlert.alert("Atenção", "Preencha nome, tipo, leitura e localização.");
      return;
    }

    const novoSensor = {
      nome: nome.trim(),
      tipo: tipo.trim(),
      status: status.trim(),
      leitura: Number(leitura.replace(",", ".")),
      unidade,
      localizacao: localizacao.trim(),
    };

    if (Number.isNaN(novoSensor.leitura)) {
      RNAlert.alert("Atenção", "Leitura inválida.");
      return;
    }

    try {
      const salvo = await criarSensor(novoSensor);
      setSensores((anteriores) => [salvo, ...anteriores]);

      setNome("");
      setTipo("");
      setStatus("ATIVO");
      setLeitura("");
      setUnidade("%");
      setLocalizacao("");

      RNAlert.alert("Sucesso", "Sensor enviado para o backend.");
    } catch (error) {
      console.log("Erro ao criar sensor:", error);
      RNAlert.alert("Erro", "Falha ao enviar o sensor.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Sensores da Missão</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo"
          value={tipo}
          onChangeText={setTipo}
        />

        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={setStatus}
        />

        <TextInput
          style={styles.input}
          placeholder="Leitura"
          value={leitura}
          onChangeText={setLeitura}
          keyboardType="numeric"
        />

        <OptionChips
          label="Unidade"
          options={["%", "ºC", "Pa"]}
          value={unidade}
          onChange={setUnidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Localização"
          value={localizacao}
          onChangeText={setLocalizacao}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarSensor}>
          <Text style={styles.botaoTexto}>Enviar sensor</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Sensores salvos</Text>

      {carregando ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.lista}>
          {sensores.length > 0 ? (
            sensores.map((sensor) => (
              <InfoCard key={sensor.id} item={sensor} />
            ))
          ) : (
            <Text style={styles.vazio}>Nenhum sensor encontrado.</Text>
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
    backgroundColor: "#07111f",
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
  },
  botao: {
    backgroundColor: "#c62828",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
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