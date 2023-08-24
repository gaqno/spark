type Empresa = {
  id: string;
  cnpj: string;
  nome: string;
  tipo: string; // You might want to use a more descriptive type here
};

export const empresaData: Empresa = {
  id: "1",
  cnpj: "25.187.746/0001-87",
  nome: "Escritório Nacional (25.187.746/0001-87)",
  tipo: "3",
};
