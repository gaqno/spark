import axios from "axios";
import { UsuarioResponse } from "~/types/response/Usuario";
import { ApiKeyResponse } from "~/types/response/ApiKey";
import { UsuariosResponse } from "~/types/response/Usuarios";
import { ComunicacaoResponse } from "~/types/response/CentralEventos";
import { GruposPermissoesResponse } from "~/types/response/GruposPermissoes";
import { ColaboradoresResponse } from "~/types/response/Colaboradores";
import { EmpresasResponse } from "~/types/response/Empresas";

const callApi = (
  method: string,
  endpoint: string,
  data?: any,
) => {
  const { public: ENV } = useRuntimeConfig();
  axios.defaults.baseURL = ENV.BASE_API;
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
      return response.data;
    });
};

export const Login = (body: { login: string; senha: string }) => {
  return callApi("POST", "/portal/api/usuario/login", { body });
};

// ANCORA

export const getUser = (params: any): Promise<UsuarioResponse> => {
  return callApi("GET", "/portal/api/usuario", { params });
};

export const getUsers = (params: any): Promise<UsuariosResponse[]> => {
  return callApi("GET", "/portal/api/usuarios", { params });
};

export const getApiKeys = (params: any): Promise<ApiKeyResponse[]> => {
  return callApi("GET", "/portal/api/apikey", { params });
};

export const getPermissionGroups = (params: any): Promise<GruposPermissoesResponse[]> => {
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

export const getCompanies = (params: any): Promise<EmpresasResponse[]> => {
  return callApi("GET", "/portal/api/empresas", { params });
};

export const getCommunications = (params: any): Promise<ComunicacaoResponse[]> => {
  return callApi("GET", "/portal/api/central-eventos", { params });
};

export const getCollaborators = (params: any): Promise<ColaboradoresResponse[]> => {
  return callApi("GET", "/portal/api/colaboradores", { params });
};

export const putCollaborator = (body: any) => {
  return callApi("PUT", `/portal/api/colaboradores/${body.id}`, { body });
};

export const postCollaborator = (body: any) => {
  return callApi("POST", "/portal/api/colaboradores", { body });
};

export const deleteCollaborator = (body: any) => {
  return callApi("DELETE", "/portal/api/colaboradores", { body });
};
