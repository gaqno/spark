type Role =
  | "CRIAR_APIKEY"
  | "CRIAR_GRUPO"
  | "CRIAR_PERMISSAO"
  | "CRIAR_SISTEMA"
  | "CRIAR_USUARIO"
  | "VISUALIZAR_APIKEY"
  | "VISUALIZAR_EMPRESA"
  | "VISUALIZAR_GRUPO"
  | "VISUALIZAR_HOME"
  | "VISUALIZAR_PERMISSAO"
  | "VISUALIZAR_SISTEMA"
  | "VISUALIZAR_USUARIO"

type SystemType = {
  id: string;
  nome: string;
  url: string;
  icone: string;
};

type Empresa = {
  id: string;
  cnpj: string;
  nome: string;
};

type User = {
  id: string;
  login: string;
  nome: string;
  roles: Role[];
  sistemas: SystemType[];
  empresas: Empresa[];
};

export const userData: User = {
  id: "1",
  login: "admin",
  nome: "Administrador",
  roles: [
    "CRIAR_APIKEY",
    "CRIAR_GRUPO",
    "CRIAR_PERMISSAO",
    "CRIAR_SISTEMA",
    "CRIAR_USUARIO",
    "VISUALIZAR_APIKEY",
    "VISUALIZAR_EMPRESA",
    "VISUALIZAR_GRUPO",
    "VISUALIZAR_HOME",
    "VISUALIZAR_PERMISSAO",
    "VISUALIZAR_SISTEMA",
    "VISUALIZAR_USUARIO",
  ],
  sistemas: [
    {
      id: "5",
      nome: "Portal ANCORA",
      url: "https://app.hmg.redeancora.com.br/portal",
      icone: "house",
    },
    {
      id: "34",
      nome: "Catálogo de Produtos",
      url: "https://catalogo.redeancora.com.br/",
      icone: "tools",
    },
    // ... other system objects ...
  ],
  empresas: [
    {
      id: "7",
      cnpj: "41974031000120",
      nome: "PARALAMA AUTOPECAS LTDA.",
    },
    // ... other empresa objects ...
  ],
};
