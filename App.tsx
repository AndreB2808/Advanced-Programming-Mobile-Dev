import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

type Consulta = {
  id: number;
  paciente: string;
  medico: string;
  data: string;
  status: "agendada" | "confirmada" | "cancelada" | "realizada";
};

export default function App() {
  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    paciente: "Carlos Andrade",
    medico: "Dr. Roberto Silva",
    data: "28/02/2026",
    status: "agendada",
  });

  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Consultas</Text>

      <View style={styles.card}>
        <Text style={styles.textoCard}>Paciente: {consulta.paciente}</Text>
        <Text style={styles.textoCard}>Médico: {consulta.medico}</Text>
        <Text style={styles.textoCard}>Data: {consulta.data}</Text>
        <Text style={styles.textoCard}>Status: {consulta.status}</Text>

        {consulta.status === "agendada" && (
          <View style={styles.botao}>
            <Button
              title="Confirmar Consulta"
              onPress={confirmarConsulta}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffea30",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "80%",
    padding: 20,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "#fffed0", // parte de dentro branca
  },
  textoCard: {
    fontWeight: "bold", // textos em negrito
    marginBottom: 5,
  },
  botao: {
    marginTop: 15, // botão mais abaixo
  },
});