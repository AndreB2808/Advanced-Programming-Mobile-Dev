import { Platform } from "react-native";

const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080"
    : "http://localhost:8080";

export async function listarAlertas() {
  const response = await fetch(`${API_URL}/alertas`);
  if (!response.ok) throw new Error("Erro ao listar alertas");
  return await response.json();
}

export async function criarAlerta(alerta: any) {
  const response = await fetch(`${API_URL}/alertas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alerta),
  });

  if (!response.ok) throw new Error("Erro ao criar alerta");
  return await response.json();
}

export async function listarSensores() {
  const response = await fetch(`${API_URL}/sensores`);
  if (!response.ok) throw new Error("Erro ao listar sensores");
  return await response.json();
}

export async function criarSensor(sensor: any) {
  const response = await fetch(`${API_URL}/sensores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sensor),
  });

  if (!response.ok) throw new Error("Erro ao criar sensor");
  return await response.json();
}

export async function listarSistemas() {
  const response = await fetch(`${API_URL}/sistemas`);
  if (!response.ok) throw new Error("Erro ao listar sistemas");
  return await response.json();
}

export async function criarSistema(sistema: any) {
  const response = await fetch(`${API_URL}/sistemas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sistema),
  });

  if (!response.ok) throw new Error("Erro ao criar sistema");
  return await response.json();
}