/* eslint-disable no-console */
import { afterAll, describe, expect, it } from "vitest";
import {
  getUser,
  getApiKeys,
  getCollaborators,
  getCommunications,
  getCompanies,
  getPermissionGroups,
  getUsers,
  getSystems,
} from "~/service/api";
import { SistemaRequest } from "~/types/request/SistemaRequest";
import { ApiKeyResponse } from "~/types/response/ApiKey";
import { ComunicacaoResponse } from "~/types/response/CentralEventos";
import { ColaboradoresResponse } from "~/types/response/Colaboradores";
import { EmpresasResponse } from "~/types/response/Empresas";
import { GruposPermissoesResponse } from "~/types/response/GruposPermissoes";
import { UsuariosResponse } from "~/types/response/Usuarios";

describe("try to feetch from /usuario", () => {
  it("should return a user && match type UsuarioResponse", async () => {
    try {
      const response = await getUser({});
      console.log("🛠 should check if user match type UsuarioResponse");
      expect(response).toMatchObject({
        id: expect.any(String),
        login: expect.any(String),
        nome: expect.any(String),
        roles: expect.any(Array),
        sistemas: expect.any(Array),
        empresas: expect.any(Array),
      });
      console.log("✅ should return a user && match type UsuarioResponse");
      console.log("🌟 Proceding to next test");
      return response;
    } catch (error) {
      console.log("❌ should return a user && match type UsuarioResponse");
      throw error;
    }
  });
});

describe("try to feetch from /usuarios", () => {
  it("should return users && match type UsuariosResponse", async () => {
    try {
      const response: UsuariosResponse[] = await getUsers({ _limit: 50 });
      console.log("🛠 should check if every user match type UsuariosResponse");
      response.forEach((user, ind) => {
        try {
          expect(user).toMatchObject({
            idUsuario: expect.any(String),
            idExterno: expect.any(String),
            nome: expect.any(String),
            login: expect.any(String),
            status: expect.any(String),
            empresas: expect.any(Array),
            idGrupo: expect.any(Array),
          });
          if (response.length - 1 === ind) {
            console.log(`✅ ${ind} users matched type GruposPermissoesResponse`);
          }
        } catch (error) {
          console.log(`❌ usuarios/${ind} doesn't fit type UsuariosResponse`);
          console.log("❌", user);
          throw error;
        }
      });
      console.log("🌟 Proceding to next test");
    } catch (error) {
      console.log("❌ should return users && match type UsuariosResponse");
      throw error;
    }
  });
});

describe("try to feetch from /sistema", () => {
  it("should return sistema && match type SistemaResponse", async () => {
    try {
      const response: SistemaRequest[] = await getSystems({});
      console.log("🛠 should check if every sistema match type SistemaResponse");
      response.forEach((sistema, ind) => {
        try {
          expect(sistema).toMatchObject({
            idSistema: expect.any(String),
            nome: expect.any(String),
            // url: expect.any(String),
            // descricao: expect.any(String),
            status: expect.any(String),
            // icone: expect.any(String),
            // permissoes: expect.arrayContaining([
            //   expect.objectContaining({
            //     nome: expect.any(String),
            //     descricao: expect.any(String),
            //   }),
            // ]),
          });
          if (response.length - 1 === ind) {
            console.log(`✅ ${ind} sistemas matched type SistemaResponse`);
          }
        } catch (error) {
          console.log(`❌ sistema/${ind} doesn't fit type SistemaResponse`);
          console.log("❌", sistema);
          throw error;
        }
      });
      console.log("🌟 Proceding to next test");
    } catch (error) {
      console.log("❌ should return sistema && match type SistemaResponse", error);
      throw error;
    }
  });
});

describe("try to feetch from /perfil", () => {
  it("should return a perfil && match type GruposPermissoesResponse", async () => {
    try {
      const response: GruposPermissoesResponse[] = await getPermissionGroups({});
      console.log("🛠 should check if every perfil match type GruposPermissoesResponse");
      response.forEach((permissionGroup, ind) => {
        try {
          expect(permissionGroup).toMatchObject({
            idPerfil: expect.any(String),
            nomePerfil: expect.any(String),
            nomeSistema: expect.any(String),
            // permissoes: permissionGroup.permissoes ? expect.any(Array) : null || null,
          });
          if (response.length - 1 === ind) {
            console.log(`✅ ${ind} profiles matched type GruposPermissoesResponse`);
          }
        } catch (error) {
          console.log(`❌ perfil/${ind} doesn't fit type GruposPermissoesResponse`);
          console.log("❌", permissionGroup);
          throw error;
        }
      });
      console.log("🌟 Proceding to next test");
    } catch (error) {
      console.log(error, "❌ should return a perfil && match type GruposPermissoesResponse");
      throw error;
    }
  });
});

describe("try to feetch from /apikey", () => {
  it("should return a apikey && match type ApiKeyResponse", async () => {
    try {
      const response: ApiKeyResponse[] = await getApiKeys({});
      console.log("🛠 should check if every apikey match type ApiKeyResponse");
      response.forEach((apikey, ind) => {
        try {
          expect(apikey).toMatchObject({
            consumidor: expect.any(String),
            dataCriacao: expect.any(String),
            grupos: expect.any(Array),
            idApiKey: expect.any(String),
            idSistema: expect.any(String),
            nomeSistema: expect.any(String),
            prefixo: expect.any(String),
            status: expect.any(String),
          });
          if (response.length - 1 === ind) {
            console.log(`✅ ${ind} apikeys matched type GruposPermissoesResponse`);
          }
        } catch (error) {
          console.log(`❌ apikey/${ind} doesn't fit type ApiKeyResponse`);
          console.log("❌", apikey);
          throw error;
        }
      });
      console.log("🌟 Proceding to next test");
    } catch (error) {
      console.log("❌ should return a apikey && match type ApiKeyResponse");
      throw error;
    }
  });
});

describe("try to feetch from /empresas", () => {
  it("should return empresas && match type EmpresasResponse", async () => {
    try {
      const response: EmpresasResponse[] = await getCompanies({});
      console.log("🛠 should check if every companie match type ApiKeyResponse");
      response.forEach((companie, ind) => {
        try {
          expect(companie).toMatchObject({
            id: expect.any(String),
            cnpj: expect.any(String),
            nome: expect.any(String),
            tipo: expect.any(String) || null,
          });
          if (response.length - 1 === ind) {
            console.log(`✅ ${ind} companies matched type GruposPermissoesResponse`);
          }
        } catch (err) {
          console.log(`❌ empresas/${ind} doesn't fit type EmpresasResponse`);
          console.log("❌", companie);
          throw err;
        }
      });
      console.log("🌟 Proceding to next test");
    } catch (error) {
      console.log("❌ should return empresas && match type EmpresasResponse");
      throw error;
    }
  });
});

describe("try to feetch from /central-eventos", () => {
  it("should return a comunicações && match type ComunicacaoResponse", async () => {
    try {
      const response: ComunicacaoResponse[] = await getCommunications({});
      console.log("🛠 should check if every communication match type ComunicacaoResponse");
      response.forEach((communication, ind) => {
        try {
          expect(communication).toMatchObject({
            id: expect.any(String),
            categoria: expect.any(String),
            videos: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                imagemCapa: expect.any(String),
                tituloEvento: expect.any(String),
                dataHoraEvento: expect.any(String),
                assuntoEvento: expect.any(String),
                descricaoEvento: expect.any(String),
                idVideo: expect.any(String),
                tituloVideo: expect.any(String),
              }),
            ]),
          });
          if (response.length - 1 === ind) {
            console.log(`✅ ${ind} comunications matched type ComunicacaoResponse`);
          }
        } catch (err) {
          console.log(`❌ empresas/${ind} doesn't fit type EmpresasResponse`);
          console.log("❌", communication);
          throw err;
        }
      });
      console.log("🌟 Proceding to next test");
    } catch (error) {
      console.log("❌ should return a comunicações && match type ComunicacaoResponse");
      throw error;
    }
  });
});

describe("try to feetch from /colaboradores", () => {
  it("should return colaboradores && match type ColaboradoresResponse", async () => {
    try {
      const response: ColaboradoresResponse[] = await getCollaborators({});
      console.log("🛠 should check if every colaborador match type ColaboradoresResponse");
      response.forEach((colaborador, ind) => {
        try {
          expect(colaborador).toMatchObject({
            id: expect.any(String),
            nome: expect.any(String),
            login: expect.any(String),
            statusDescricao: expect.any(String),
            status: expect.any(String),
          });
          if (response.length - 1 === ind) {
            console.log(`✅ ${ind} colaboradores matched type ColaboradoresResponse`);
          }
        } catch (err) {
          console.log(`❌ colaboradores/${ind} doesn't fit type ColaboradoresResponse`);
          console.log("❌", colaborador);
          throw err;
        }
      });
      console.log("🌟 Proceding to next test");
    } catch (error) {
      console.log("❌ should return colaboradores && match type ColaboradoresResponse");
      throw error;
    }
  });
});

afterAll(() => {
  console.log("🌟 All tests passed");
});
