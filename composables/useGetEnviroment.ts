import { useAppStore } from "@/store/app";

export const useGetEnviroment = () => {
  const getEndpoint = () => {
    const { env } = useAppStore();
    const { public: publicConfig } = useRuntimeConfig();

    switch (env) {
      case "local":
        return `${publicConfig.ANCORA_ENDPOINT_DEFAULT}`;
      case "homolog":
        return `${publicConfig.ANCORA_ENDPOINT_HOMOLOG}`;
      case "staging":
        return `${publicConfig.ANCORA_ENDPOINT_STAGING}`;
      case "production":
        return `${publicConfig.ANCORA_ENDPOINT_PROD}`;
      default:
        return `${publicConfig.ANCORA_ENDPOINT_DEFAULT}`;
    }
  };

  return { getEndpoint };
};
