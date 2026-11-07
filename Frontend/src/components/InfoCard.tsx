import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { EventoUrbano } from "../types/EventoUrbano";
import { SensorUrbano } from "../types/SensorUrbano";
import { BasePublica } from "../types/BasePublica";

type Props = {
  item: EventoUrbano | SensorUrbano | BasePublica;
};

export default function InfoCard({ item }: Props) {
  return (
    <View style={styles.card}>
      {"titulo" in item && (
        <>
          <Text style={styles.titulo}>🚨 {item.titulo}</Text>
          <Text>Descrição: {item.descricao}</Text>
          <Text>Tipo: {item.tipo}</Text>
          <Text>Local: {item.local}</Text>
          <Text>Data: {item.dataHora}</Text>
          <Text>Confiança: {item.confianca}%</Text>
          <Text>Prioridade: {item.prioridade}</Text>
          <Text>Resolvido: {item.resolvido ? "Sim" : "Não"}</Text>
        </>
      )}

      {"leitura" in item && (
        <>
          <Text style={styles.titulo}>📡 {item.nome}</Text>
          <Text>Tipo: {item.tipo}</Text>
          <Text>Local: {item.local}</Text>
          <Text>Leitura: {item.leitura} {item.unidade}</Text>
          <Text>Ativo: {item.ativo ? "Sim" : "Não"}</Text>
        </>
      )}

      {"orgaoResponsavel" in item && (
        <>
          <Text style={styles.titulo}>🏛️ {item.nome}</Text>
          <Text>Órgão responsável: {item.orgaoResponsavel}</Text>
          <Text>Descrição: {item.descricao}</Text>
          <Text>Tipo: {item.tipo}</Text>
          <Text>Local: {item.local}</Text>
          <Text>Data: {item.dataHora}</Text>
          <Text>Confiança: {item.confianca}%</Text>
          <Text>Ativo: {item.ativo ? "Sim" : "Não"}</Text>
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
