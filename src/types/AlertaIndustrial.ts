export type AlertaIndustrial = {
  id: number;
  tipoRisco: string;
  descricao: string;
  setor: string;
  nivelSeveridade: string;
  dataHora: string;
  resolvido: boolean;
  individuosSobRisco: string;
  gruposNotificados: string;
};
