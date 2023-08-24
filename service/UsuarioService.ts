import axios from "axios";
import { useAppStore } from "@/store/app";

const callApi = (method: string, endpoint: string, data?: any, loading?: string) => {
  const { getEndpoint } = useGetEnviroment();
  const url = getEndpoint();

  const newUrl = new URL(url + endpoint);
  newUrl.search = new URLSearchParams(url).toString();

  loading === "disableLoading"
    ? useAppStore().setLoading(false)
    : useAppStore().setLoading(true);

  return axios({
    method,
    url: newUrl.href,
    params: data.params,
    data: data.body,
    headers: {
      "Content-Type": [data.headers ? data.headers : "application/json"],
      "Accept-Language": "pt-BR",
      "Access-Control-Allow-Origin": "*",
      Accept: ["application/json", "text/csv"],
      // Authorization: "Bearer " + useClientStore().access_token,
    },
  })
    .then((response: any) => {
      useAppStore().setLoading(false);
      return response;
    })
    .catch(() => {
      useAppStore().setLoading(false);
    });
};

export const getUsuario = (params?: any) => {
  return callApi("GET", "/portal/api/usuario", { params });
};

export const login = (body: any) => {
  return callApi("POST", "/portal/api/usuario/login", { body });
};

export const recuperarSenha = (payload: any) => {
  return callApi("POST", "/portal/api/usuario/senha", { payload });
};

export const alterarSenha = (payload: any) => {
  return callApi("PUT", "/portal/api/usuario/senha", { payload });
};

export const alterarSenhaNova = (payload: any) => {
  return callApi("PUT", "/portal/api/usuario/login-alterar-senha", { payload });
};

export const logout = (params?: any) => {
  return callApi("GET", "/portal/api/usuario/logout", { params });
};

export const redirect = (idSistema: string) => {
  return callApi("GET", `/portal/api/usuario/redirect/${idSistema}`);
};

export const buscaTrofeus = (params?: any) => {
  return callApi("GET", "/portal/api/boas-praticas/informacoes/trofeu", { params });
};

// sara-admin-web

export const buscarTodos = (params?: any) => {
  return callApi("GET", "/portal/api/admin/usuarios", { params });
};

export const buscarPorId = (idUsuario: string, params?: any) => {
  return callApi("GET", `/portal/api/admin/usuarios/${idUsuario}`, { params });
};

export const salvar = (idUsuario: string, payload: any) => {
  return callApi("PUT", `/portal/api/admin/usuarios/${idUsuario}`, { payload });
};
