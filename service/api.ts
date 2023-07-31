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
    .then((response) => {
      useAppStore().setLoading(false);
      return response.data;
    })
    .catch(() => {
      useAppStore().setLoading(false);
    });
};

export const getAllProducts = (params: any) => {
  return callApi("GET", "/products", { params });
};

export const getProductsByFilter = (params: any) => {
  return callApi("GET", "/products/search", { params });
};
