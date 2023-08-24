import axios from "axios";
import { useAppStore } from "@/store/app";
import { ApiKeyResponse } from "types/response/ApiKeyResponse";
import { ApiKeyRequest } from "types/request/ApiKeyRequest";
import { CriarApiKeyResponse } from "types/response/CriarApiKeyResponse";

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

export const buscarTodas = (): Promise<ApiKeyResponse[]> => {
  return callApi("GET", "/admin/api/apikey") as Promise<ApiKeyResponse[]>;
};

export const buscarPorId = (idApiKey: string): Promise<ApiKeyResponse> => {
  return callApi("GET", `/admin/api/apikey/${idApiKey}`) as Promise<ApiKeyResponse>;
};

export const criar = (body: ApiKeyRequest): Promise<CriarApiKeyResponse> => {
  return callApi("POST", "/admin/api/apikey", { body }) as Promise<CriarApiKeyResponse>;
};

export const editar = (idApiKey: string, body: ApiKeyRequest): Promise<void> => {
  return callApi("PUT", `/admin/api/apikey/${idApiKey}`, { body }) as Promise<void>;
};

export const excluir = (idApiKey: string): Promise<void> => {
  return callApi("DELETE", `/admin/api/apikey/${idApiKey}`) as Promise<void>;
};
