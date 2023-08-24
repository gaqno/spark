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

export const getAdmin = (params: any) => {
  return callApi("GET", "/admin/api/usuario", { params });
};

export const postAdmin = (body: any) => {
  return callApi("POST", "/admin/api/usuario", { body });
};

export const putAdmin = (body: any, idUsuario: any) => {
  return callApi("PUT", `/admin/api/usuario/${idUsuario}`, { body });
};

export const deleteAdmin = (idUsuario: any) => {
  return callApi("DELETE", `/admin/api/usuario/${idUsuario}`);
};
