interface Empresas {
  idEmpresa: string,
  cnpj: string,
  nome: string,
  idGrupo: string
}

export interface UsuariosResponse {
  idUsuario: string,
  idExterno: string,
  nome: string,
  login: string,
  status: string,
  empresas: Empresas[],
  idGrupo: string[]
}
