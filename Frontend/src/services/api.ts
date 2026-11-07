
import { Platform } from "react-native";

import { EventoUrbano } from "../types/EventoUrbano";
import { SensorUrbano } from "../types/SensorUrbano";
import { BasePublica } from "../types/BasePublica";

const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8080"
    : "http://localhost:8080";

export type Upcheck = {
  eventosUrbanos: number[];
  sensoresUrbanos: number[];
  basesPublicas: number[];
};

async function buscarDados<T>(endpoint: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    throw new Error("Não foi possível conectar ao backend.");
  } finally {
    clearTimeout(timeout);
  }
}

export async function listarEventosUrbanos(): Promise<EventoUrbano[]> {
  return buscarDados<EventoUrbano[]>("/eventos-urbanos");
}

export async function listarSensoresUrbanos(): Promise<SensorUrbano[]> {
  return buscarDados<SensorUrbano[]>("/sensores-urbanos");
}

export async function listarBasesPublicas(): Promise<BasePublica[]> {
  return buscarDados<BasePublica[]>("/bases-publicas");
}

export async function verificarUpcheck(): Promise<Upcheck> {
  return buscarDados<Upcheck>("/upcheck");
}

export function idsMudaram(
  idsAnteriores: number[],
  idsAtuais: number[]
): boolean {
  if (idsAnteriores.length !== idsAtuais.length) {
    return true;
  }

  return idsAnteriores.some((id, index) => id !== idsAtuais[index]);
}
