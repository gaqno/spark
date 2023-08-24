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

export const getLives = () => {
  return callApi("GET", "/portal/api/evento");
};

export const getPoliticaPrivacidade = (idEvento: string) => {
  return callApi("GET", `/portal/api/evento/${idEvento}/politica`);
};

export const baixarPdfPoliticaPrivacidade = (idEvento: string) => {
  return callApi("GET", `/portal/api/evento/${idEvento}/politica/pdf`);
};

export const concordarPoliticaPrivacidade = (idEvento: string) => {
  return callApi("POST", `/portal/api/evento/${idEvento}/politica/concordo`);
};

export const obterCredenciais = (idEvento: string) => {
  return callApi("PUT", `/portal/api/evento/${idEvento}/espera`);
};

export const obterSituacao = (idEvento: string) => {
  return callApi("GET", `/portal/api/evento/${idEvento}/situacao`);
};

export const obterParticipanteOnlinePorIdSso = (idUsuarioSso: string, idEvento: string) => {
  return callApi("GET", `/portal/api/evento/${idEvento}/participante/usuario-sso/${idUsuarioSso}/online`);
};

export const obterTodosParticipantesOnline = (idEvento: string) => {
  return callApi("GET", `/portal/api/evento/${idEvento}/participante/online`);
};

export const iniciar = (idEvento: string) => {
  return callApi("PUT", `/portal/api/evento/${idEvento}/inicia`);
};

export const entrada = (idEvento: string) => {
  return callApi("PUT", `/portal/api/evento/${idEvento}/entrada`);
};

export const saida = (idEvento: string, idUsuario: string) => {
  return callApi("PUT", `/portal/api/evento/${idEvento}/usuario/${idUsuario}/saida`);
};

export const encerrarLive = (idEvento: string) => {
  return callApi("PUT", `/portal/api/evento/${idEvento}/termina`);
};
