type Sistema = {
  idSistema: string;
  nome: string;
  url: string | null;
  descricao: string | null;
  status: "A" | "B";
  icone: string | null;
  permissoes: string[] | null;
};

export const sistemaData: Sistema = {
  idSistema: "1",
  nome: "SSO",
  url: null,
  descricao: null,
  status: "A",
  icone: null,
  permissoes: null,
};
