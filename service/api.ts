import axios from "axios";
import { useAppStore } from "@/store/app";
import UserMock from "@/mocks/usuario.json";
import ApiKeysMock from "@/mocks/api_keys.json";
import SystemMock from "@/mocks/sistema.json";
import UsersMock from "@/mocks/usuarios.json";
import PerfilMock from "@/mocks/perfil.json";
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

export const getUser = (_params: any) => {
  return new Promise((resolve) => {
    useAppStore().setLoading(true);
    const timing = setTimeout(() => {
      useAppStore().setLoading(false);
      clearTimeout(timing);
      resolve({
        ...UserMock,
      });
    }, 300);
  });
};

export const getUsers = (params: any) => {
  return new Promise((resolve) => {
    useAppStore().setLoading(true);
    const timing = setTimeout(() => {
      useAppStore().setLoading(false);
      clearTimeout(timing);
      resolve({
        total: UsersMock.length,
        pages: Math.ceil(UsersMock.length / 10),
        actual: params.actual,
        limit: params.limit,
        data: UsersMock.slice(
          (params.actual - 1) * params.limit,
          params.actual * params.limit,
        ),
      });
    }, 300);
  });
};

export const getApiKeys = (params: any) => {
  return new Promise((resolve) => {
    useAppStore().setLoading(true);
    const timing = setTimeout(() => {
      useAppStore().setLoading(false);
      clearTimeout(timing);
      resolve({
        total: ApiKeysMock.length,
        pages: Math.ceil(ApiKeysMock.length / 10),
        actual: params.actual,
        limit: params.limit,
        data: ApiKeysMock.slice(
          (params.actual - 1) * params.limit,
          params.actual * params.limit,
        ),
      });
    }, 300);
  });
};

export const getPermissionGroups = (params: any) => {
  return new Promise((resolve) => {
    useAppStore().setLoading(true);
    const timing = setTimeout(() => {
      useAppStore().setLoading(false);
      clearTimeout(timing);
      resolve({
        total: PerfilMock.length,
        pages: Math.ceil(PerfilMock.length / 10),
        actual: params.actual,
        limit: params.limit,
        data: PerfilMock.slice(
          (params.actual - 1) * params.limit,
          params.actual * params.limit,
        ),
      });
    }, 300);
  });
};

export const getSystems = (params: any) => {
  return new Promise((resolve) => {
    useAppStore().setLoading(true);
    const timing = setTimeout(() => {
      useAppStore().setLoading(false);
      clearTimeout(timing);
      resolve({
        total: SystemMock.length,
        pages: Math.ceil(SystemMock.length / 10),
        actual: params.actual,
        limit: params.limit,
        data: SystemMock.slice(
          (params.actual - 1) * params.limit,
          params.actual * params.limit,
        ),
      });
    }, 300);
  });
};
