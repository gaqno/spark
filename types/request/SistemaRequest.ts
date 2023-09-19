export interface SistemaRequest {
  idSistema?: string;
  nome: string;
  url?: string;
  descricao?: string;
  status: string;
  icone?: string;
  permissoes: [
    {
      nome: string;
      descricao: string;
    }
  ];
}
