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

export const getPortal = () => {
  return callApi("GET", "/portal/api/usuario/login");
};

export const postPortal = (body: any) => {
  return callApi("POST", "/portal/api/usuario/login", { body });
};

export const putPortal = (body: any) => {
  return callApi("PUT", "/portal/api/usuario/login", { body });
};

export const deletePortal = (body: any) => {
  return callApi("DELETE", "/portal/api/usuario/login", { body });
};
