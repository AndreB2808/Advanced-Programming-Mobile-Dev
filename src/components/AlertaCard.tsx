import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { AlertaIndustrial } from "../types/AlertaIndustrial";

type Props = {
  alerta: AlertaIndustrial;
};

export default function AlertaCard({ alerta }: Props) {
  return (
    <View style={styles.card}>

      <Text style={styles.titulo}>
        {alerta.tipoRisco}
      </Text>

      <Text>
        Descrição: {alerta.descricao}
      </Text>

      <Text>
        Setor: {alerta.setor}
      </Text>

      <Text>
        Risco: {alerta.nivelSeveridade}
      </Text>

      <Text>
        Data: {alerta.dataHora}
      </Text>

      <Text>
        Resolvido: {alerta.resolvido ? "Sim" : "Não"}
      </Text>

        <Text>
        Indivíduo em risco: {alerta.individuosSobRisco}
        </Text>

        <Text>
        Notificados: {alerta.gruposNotificados}
        </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff"
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});