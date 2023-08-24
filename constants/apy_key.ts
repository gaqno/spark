type ApiKey = {
  idApiKey: string;
  idSistema: string;
  nomeSistema: string;
  prefixo: string;
  consumidor: string;
  dataCriacao: string; // You might want to use a Date type here
  status: "A" | "B"; // Assuming status can be either 'A' or 'B'
  grupos: string[];
};

export const apiKeyData: ApiKey = {
  idApiKey: "6",
  idSistema: "7",
  nomeSistema: "Benner API",
  prefixo: "b118c0e",
  consumidor: "Integrador WMS",
  dataCriacao: "19/06/2023 17:11",
  status: "A",
  grupos: ["14"],
};
