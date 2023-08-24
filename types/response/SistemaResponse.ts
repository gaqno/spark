import { PermissaoResponse } from "./PermissaoResponse"

export interface SistemaResponse {
  idSistema: number;
  nome: string;
  url: string;
  descricao: string;
  status: string;
  permissoes: PermissaoResponse[];
}
