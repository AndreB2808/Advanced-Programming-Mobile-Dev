import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button
} from "react-native";

import { alertasMock } from "../data/Alertas";

import { AlertaIndustrial } from "../types/AlertaIndustrial";

import AlertaCard from "../components/AlertaCard";

export default function AlertaScreen() {

  const [alertas, setAlertas] =
    useState<AlertaIndustrial[]>(alertasMock);

  const [descricao, setDescricao] = useState("");

  function adicionarAlerta() {

  const severidades = ["BAIXO", "MÉDIO", "ALTO"];

  const setores = [
    "Produção",
    "Manutenção",
    "Logística",
    "Controle de Qualidade"
  ];
  const tipoRisco = [
    "EPI",
    "Área Restrita",
    "Área Perigosa"
  ];
  const individuo = [
    "Carlos Eduardo",
    "Ednaldo Pereira",
    "Cleber Carvalho",
    "Steve Cesar",
    "Jacinti Figuereda",
    "Flaviane dos Santos",
    "José Ribeiro",
    "Anderson Silveira",
    "Tomas Terlo"
  ];

  const novoAlerta: AlertaIndustrial = {
    id: alertas.length + 1,

    tipoRisco: 
      tipoRisco[Math.floor(Math.random() * tipoRisco.length)],

    descricao:
      descricao.trim() !== ""
        ? descricao 
        : "Sem descrição",

    setor:
      setores[Math.floor(Math.random() * setores.length)],

    nivelSeveridade:
      severidades[Math.floor(Math.random() * severidades.length)],

    dataHora: "20/05/2026",

    resolvido:
      Math.random() < 0.5,

    individuosSobRisco: 
      individuo[Math.floor(Math.random() * individuo.length)],

    gruposNotificados: "Equipe de Segurança"
  };

  setAlertas([...alertas, novoAlerta]);

  setDescricao("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Alertas Industriais
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Insira aqui a descrição do alerta"
        value={descricao}
        onChangeText={setDescricao}
        
      />

      <Button
        title="Adicionar Alerta"
        onPress={adicionarAlerta}
        color="#0152a3"
      />

      <View style={styles.lista}>
        {alertas.map((alerta) => (
          <AlertaCard
            key={alerta.id}
            alerta={alerta}
          />
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#04a68f"
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff"
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    textAlign: "center"
  },

  lista: {
    width: "100%",
    marginTop: 20
  }

});