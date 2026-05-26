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

import { criarSistema, listarSistemas } from "../services/api";
import { Sistema } from "../types/Sistema";
import InfoCard from "../components/InfoCard";
import OptionChips from "../components/OptionChips";

type Props = {
  navigation: any;
};

export default function SistemasScreen({ navigation }: Props) {
  const [sistemas, setSistemas] = useState<Sistema[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [nome, setNome] = useState("");
  const [status, setStatus] = useState("ATIVO");
  const [responsavel, setResponsavel] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nivelOperacao, setNivelOperacao] = useState("NORMAL");

  async function carregarSistemas() {
    try {
      setCarregando(true);
      const dados = await listarSistemas();
      setSistemas(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.log("Erro ao carregar sistemas:", error);
      RNAlert.alert("Erro", "Não foi possível carregar os sistemas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarSistemas();
  }, []);

  async function salvarSistema() {
    if (!nome.trim() || !responsavel.trim() || !descricao.trim()) {
      RNAlert.alert("Atenção", "Preencha nome, responsável e descrição.");
      return;
    }

    const novoSistema = {
      nome: nome.trim(),
      status: status.trim(),
      responsavel: responsavel.trim(),
      descricao: descricao.trim(),
      nivelOperacao,
    };

    try {
      const salvo = await criarSistema(novoSistema);
      setSistemas((anteriores) => [salvo, ...anteriores]);

      setNome("");
      setStatus("ATIVO");
      setResponsavel("");
      setDescricao("");
      setNivelOperacao("NORMAL");

      RNAlert.alert("Sucesso", "Sistema enviado para o backend.");
    } catch (error) {
      console.log("Erro ao criar sistema:", error);
      RNAlert.alert("Erro", "Falha ao enviar o sistema.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Sistemas Monitorados</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={setStatus}
        />

        <TextInput
          style={styles.input}
          placeholder="Responsável"
          value={responsavel}
          onChangeText={setResponsavel}
        />

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <OptionChips
          label="Nível de operação"
          options={["FALHO", "NORMAL", "PERFORMÁTICO"]}
          value={nivelOperacao}
          onChange={setNivelOperacao}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarSistema}>
          <Text style={styles.botaoTexto}>Criar sistema</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Sistemas salvos</Text>

      {carregando ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.lista}>
          {sistemas.length > 0 ? (
            sistemas.map((sistema) => (
              <InfoCard key={sistema.id} item={sistema} />
            ))
          ) : (
            <Text style={styles.vazio}>Nenhum sistema encontrado.</Text>
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