export interface PerfilAcessoResponse {
  idPerfil: string;
  nomePerfil: string;
  idSistema: string;
  nomeSistema?: string;
  permissoes?: string[];
}
