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
    user: {} as User,
  }),
  getters: {
    getUserSistemas (): User["sistemas"] {
      return this.user.sistemas;
    },
  },
  actions: {
    setUser (user: any) {
      this.user = user;
    },
    getUser () {
      return this.user;
    },
  },
});
