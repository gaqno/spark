import axios from "axios";
import { useAppStore } from "@/store/app";
import { PerfilAcessoResponse } from "@/types/response/PerfilAcessoResponse";
import { PerfilAcessoConfirmacaoResponse } from "@/types/response/PerfilAcessoConfirmacaoResponse";

const callApi = (method: string, endpoint: string, data?: any, loading?: string) => {
  const config = useRuntimeConfig();
  axios.defaults.baseURL = config.public.BASE_API;

  loading === "disableLoading"
    ? useAppStore().setLoading(false)
    : useAppStore().setLoading(true);

  return axios({
    method,
    url: axios.defaults.baseURL + endpoint,
    params: data.params,
    data: data.body,
    headers: {
      "Content-Type": [data.headers ? data.headers : "application/json"],
      "Accept-Language": "pt-BR",
      Accept: ["application/json", "text/csv"],
      // Authorization: "Bearer " + useClientStore().access_token,
    },
  })
    .then((response: any) => {
      useAppStore().setLoading(false);
      return response.data;
    })
    .catch(() => {
      useAppStore().setLoading(false);
    });
};

export const buscarTodos = (): Promise<PerfilAcessoResponse[]> => {
  return callApi("GET", "/admin/api/perfil") as Promise<PerfilAcessoResponse[]>;
};

export const buscarPerfisUsuario = (): Promise<PerfilAcessoResponse[]> => {
  return callApi("GET", "/admin/api/perfil/perfis-usuario") as Promise<PerfilAcessoResponse[]>;
};

export const buscarPorId = (idPerfil: string): Promise<PerfilAcessoResponse> => {
  return callApi("GET", `/admin/api/perfil/${idPerfil}`) as Promise<PerfilAcessoResponse>;
};

export const getBySistema = (idSistema: string): Promise<PerfilAcessoResponse[]> => {
  return callApi("GET", `/admin/api/perfil/sistema/${idSistema}`) as Promise<PerfilAcessoResponse[]>;
};

export const salvar = (body: any): Promise<void> => {
  return callApi("POST", "/admin/api/perfil", { body }) as Promise<void>;
};

export const editar = (idPerfil: any, body: PerfilAcessoResponse): Promise<void> => {
  return callApi("PUT", `/admin/api/perfil/${idPerfil}`, { body }) as Promise<void>;
};

export const confirmacao = (idPerfil: any): Promise<PerfilAcessoConfirmacaoResponse> => {
  return callApi("GET", `/admin/api/perfil/confirmacao/${idPerfil}`) as Promise<PerfilAcessoConfirmacaoResponse>;
};

export const excluir = (idPerfil: string): Promise<void> => {
  return callApi("DELETE", `/admin/api/perfil/${idPerfil}`) as Promise<void>;
};
