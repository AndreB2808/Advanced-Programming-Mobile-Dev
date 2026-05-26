import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Alerta } from "../types/Alerta";
import { Sensor } from "../types/Sensor";
import { Sistema } from "../types/Sistema";

type Props = {
  item: Alerta | Sensor | Sistema;
};

export default function InfoCard({ item }: Props) {
  return (
    <View style={styles.card}>
      {"nivelCriticidade" in item && (
        <>
          <Text style={styles.titulo}>🚨 {item.titulo}</Text>
          <Text>Descrição: {item.descricao}</Text>
          <Text>Criticidade: {item.nivelCriticidade}</Text>
          <Text>Sistema afetado: {item.sistemaAfetado}</Text>
          <Text>Data: {item.dataHora}</Text>
          <Text>Resolvido: {item.resolvido ? "Sim" : "Não"}</Text>
        </>
      )}

      {"leitura" in item && (
        <>
          <Text style={styles.titulo}>📡 {item.nome}</Text>
          <Text>Tipo: {item.tipo}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Leitura: {item.leitura} {item.unidade}</Text>
          <Text>Localização: {item.localizacao}</Text>
        </>
      )}

      {"nivelOperacao" in item && (
        <>
          <Text style={styles.titulo}>🖥️ {item.nome}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Responsável: {item.responsavel}</Text>
          <Text>Descrição: {item.descricao}</Text>
          <Text>Nível de operação: {item.nivelOperacao}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});