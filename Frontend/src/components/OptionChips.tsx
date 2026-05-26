import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function OptionChips({ label, options, value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.lista}>
        {options.map((option) => {
          const ativo = option === value;

          return (
            <TouchableOpacity
              key={option}
              style={[styles.item, ativo && styles.itemAtivo]}
              onPress={() => onChange(option)}
            >
              <Text style={[styles.texto, ativo && styles.textoAtivo]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  lista: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  item: {
    borderWidth: 1,
    borderColor: "#cfd8dc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    marginRight: 8,
    marginBottom: 8,
  },
  itemAtivo: {
    backgroundColor: "#0d47a1",
    borderColor: "#0d47a1",
  },
  texto: {
    color: "#263238",
    fontWeight: "500",
  },
  textoAtivo: {
    color: "#fff",
  },
});