import axios from "axios";
import { useAppStore } from "@/store/app";

const callApi = (
  method: string,
  endpoint: string,
  data?: any,
  loading?: string,
) => {
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

export const Login = (body: { login: string; senha: string }) => {
  return callApi("POST", "/portal/api/usuario/login", { body });
};

export const getAllProducts = (params: any) => {
  return callApi("GET", "/products", { params });
};

export const getProductsByFilter = (params: any) => {
  return callApi("GET", "/products/search", { params });
};

export const postProduct = (body: any) => {
  return callApi("POST", "/products", { body });
};

export const getUsersByFilter = (params: any) => {
  return callApi("GET", "/users/filter", { params });
};

// ANCORA

export const getUser = (params: any) => {
  return callApi("GET", "/portal/api/usuario", { params });
};

export const getUsers = (params: any) => {
  return callApi("GET", "/portal/api/usuarios", { params });
};

export const getApiKeys = (params: any) => {
  return callApi("GET", "/portal/api/apikey", { params });
};

export const getPermissionGroups = (params: any) => {
  return callApi("GET", "/portal/api/perfil", { params });
};

export const postPermissionGroup = (body: any) => {
  return callApi("POST", "/portal/api/perfil", { body });
};

export const getSystems = (params: any) => {
  return callApi("GET", "/portal/api/sistema", { params });
};

export const postSystem = (body: any) => {
  return callApi("POST", "/portal/api/sistema", { body });
};

export const getCompanies = (params: any) => {
  return callApi("GET", "/portal/api/empresas", { params });
};
