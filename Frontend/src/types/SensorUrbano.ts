export type SensorUrbano = {
  id: number;
  nome: string;
  tipo: string;
  local: string;
  leitura: number;
  unidade: string;
  ativo: boolean;
  confianca: number | null;
};
