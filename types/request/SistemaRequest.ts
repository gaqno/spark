import { PermissaoRequest } from "./PermissaoRequest"

export interface SistemaRequest {
  icone?: string;
  nome: string;
  url?: string;
  descricao?: string;
  status: string;
  permissoes: PermissaoRequest[];
}
