import { PermissaoResponse } from "./Permissao";

export interface SistemaResponse {
  idSistema: number;
  nome: string;
  url: string;
  descricao: string;
  status: string;
  permissoes: PermissaoResponse[];
}
