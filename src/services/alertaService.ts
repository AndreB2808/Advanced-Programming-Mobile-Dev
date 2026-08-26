import api from "./api";
import { AlertaIndustrial } from "../types/AlertaIndustrial";

export async function listarAlertas(): Promise<AlertaIndustrial[]> {
    const response = await api.get<AlertaIndustrial[]>("/alertas");
    return response.data;
}

export async function buscarAlertaPorId(
    id: number
): Promise<AlertaIndustrial> {
    const response = await api.get<AlertaIndustrial>(`/alertas/${id}`);
    return response.data;
}

export async function criarAlerta(
    alerta: Omit<AlertaIndustrial, "id">
): Promise<AlertaIndustrial> {
    const response = await api.post<AlertaIndustrial>("/alertas", alerta);
    return response.data;
}

export async function atualizarAlerta(
    id: number,
    alerta: AlertaIndustrial
): Promise<AlertaIndustrial> {
    const response = await api.put<AlertaIndustrial>(
        `/alertas/${id}`,
        alerta
    );

    return response.data;
}