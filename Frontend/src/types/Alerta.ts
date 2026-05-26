export type Alerta = {
  id: number;
  titulo: string;
  descricao: string;
  nivelCriticidade: string;
  dataHora: string;
  resolvido: boolean;
  sistemaAfetado: string;
};