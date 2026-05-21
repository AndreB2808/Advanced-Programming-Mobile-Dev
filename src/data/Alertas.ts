import { AlertaIndustrial } from "../types/AlertaIndustrial";

export const alertasMock: AlertaIndustrial[] = [
  {
    id: 1,
    tipoRisco: "EPI",
    descricao: "Funcionário sem capacete",
    setor: "Produção",
    nivelSeveridade: "MÉDIO",
    dataHora: "20/05/2026 14:30",
    resolvido: false,
    individuosSobRisco: "Carlos Silva",
    gruposNotificados: "Equipe de Segurança, Supervisor de Produção"
  },

  {
    id: 2,
    tipoRisco: "Área Perigoda",
    descricao: "Funcionário próximo de área perigosa",
    setor: "Manutenção",
    nivelSeveridade: "ALTO",
    dataHora: "20/05/2026 15:10",
    resolvido: false,
    individuosSobRisco: "Marcos Oliveira",
    gruposNotificados: "Supervisor da Manutenção"
  },
  {
    id: 3,
    tipoRisco: "EPI",
    descricao: "Funcionário máscada de gás",
    setor: "Produção",
    nivelSeveridade: "ALTO",
    dataHora: "20/05/2026 14:30",
    resolvido: false,
    individuosSobRisco: "Cleber Carvalho",
    gruposNotificados: "Equipe de Segurança, Supervisor de Produção"
  },
  {
    id: 4,
    tipoRisco: "Área Restrita",
    descricao: "Pessoa não autorizada na área",
    setor: "Produção",
    nivelSeveridade: "BAIXO",
    dataHora: "21/05/2026 21:30",
    resolvido: false,
    individuosSobRisco: "Ednaldo Pereira",
    gruposNotificados: "Equipe de Segurança"
  }
];