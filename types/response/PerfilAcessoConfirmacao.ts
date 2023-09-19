export interface PerfilAcessoConfirmacaoResponse {
  usuarios?: string[];
  apiKeys?: {
    prefixo: string;
    consumidor: string;
  }[];
}
