interface User {
  id: string;
  login: string;
  nome: string;
  roles: string[];
  sistemas: {
    id: string;
    nome: string;
    url: string;
    icone: string;
  }[];
  empresas: {
    id: string;
    cnpj: string;
    nome: string;
  }[];
}

export const useClientStore = defineStore("client", {
  state: () => ({
    id: "",
    login: "",
    nome: "",
    roles: [],
    sistemas: [] as User["sistemas"],
    empresas: [] as User["empresas"],
  }),
  getters: {
    getUserSistemas (): User["sistemas"] {
      return this.sistemas;
    },
    getUserRoles (): User["roles"] {
      return this.roles;
    },
    getUserEmpresas (): User["empresas"] {
      return this.empresas;
    },
  },
  actions: {
    setUser (user: any) {
      this.id = user.id;
      this.login = user.login;
      this.nome = user.nome;
      this.roles = user.roles;
      this.sistemas = user.sistemas;
      this.empresas = user.empresas;
    },
  },
});
