import axios from "axios";
import { useAppStore } from "@/store/app";

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

export const getColaboradores = () => {
  return callApi("GET", "/portal/api/colaboradores");
};

export const getColaborador = (idColaborador: string) => {
  return callApi("GET", `/portal/api/colaboradores/${idColaborador}`);
};

export const criarColaboradores = (colaborador: any) => {
  return callApi("POST", "/portal/api/colaboradores", { body: colaborador });
};

export const editarColaboradores = (colaborador: any, idColaborador: string) => {
  return callApi("PUT", `/portal/api/colaboradores/${idColaborador}`, { body: colaborador });
};

export const mudarStatus = (idColaborador: string, status: boolean) => {
  return callApi("PUT", `/portal/api/colaboradores/${idColaborador}/status/${status.toString()}`);
};

export const getEmpresas = () => {
  return callApi("GET", "/portal/api/empresas");
};

export const getFuncoes = () => {
  return callApi("GET", "/portal/api/funcoes");
};

export const getPapeis = () => {
  return callApi("GET", "/portal/api/papeis");
};

export const getPapeisPorFuncao = (idFuncao: string) => {
  return callApi("GET", `/portal/api/funcoes/${idFuncao}/papeis`);
};

export const redefinirSenha = (idColaborador: string) => {
  return callApi("PUT", `/portal/api/colaboradores/${idColaborador}/reset-senha`);
};
