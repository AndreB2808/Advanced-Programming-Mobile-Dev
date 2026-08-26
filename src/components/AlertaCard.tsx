import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { AlertaIndustrial } from "../types/AlertaIndustrial";

type Props = {
  alerta: AlertaIndustrial;
  onDetalhes: (id: number) => void;
};

export default function AlertaCard({
  alerta,
  onDetalhes,
}: Props) {

  const iconeStatus = alerta.resolvido ? "✅" : "⛔";

  return (
    <View style={styles.card}>

      <Text style={styles.titulo}>
        {iconeStatus} #{alerta.id} - {alerta.tipoRisco}
      </Text>

      <View style={styles.botao}>
        <Button
          title="Ver detalhes"
          onPress={() => onDetalhes(alerta.id)}
          color="#0152a3"
        />
      </View>

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
    backgroundColor: "#fff",
    alignItems: "center",
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  botao: {
    width: "70%",
  },
});