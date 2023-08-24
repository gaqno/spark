import axios from "axios";
import { useAppStore } from "@/store/app";
import { SistemaResponse } from "types/response/SistemaResponse";
import { SistemaRequest } from "types/request/SistemaRequest";

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

// import { SistemaRequest } from "../model/request/SistemaRequest";
// import { SistemaResponse } from "../model/response/SistemaResponse";
// import { BaseAdminService } from "./BaseAdminService";

export const recuperarSistemas = (): Promise<SistemaResponse[]> => {
  return callApi("GET", "/admin/api/sistema") as Promise<SistemaResponse[]>;
};

export const recuperarPorId = (idSistema: string): Promise<SistemaResponse> => {
  return callApi("GET", `/admin/api/sistema/${idSistema}`) as Promise<SistemaResponse>;
};

export const salvar = (body: any): Promise<void> => {
  return callApi("POST", "/admin/api/sistema", { body }) as Promise<void>;
};

export const editar = (idSistema: any, body: SistemaRequest): Promise<void> => {
  return callApi("PUT", `/admin/api/sistema/${idSistema}`, { body }) as Promise<void>;
};
