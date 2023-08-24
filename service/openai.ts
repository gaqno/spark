import { Configuration, OpenAIApi } from "openai";

let previousMessages = "";

const useChatCompletion = async (question: string) => {
  const { public: ENV } = await useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: ENV.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const context = `
    Você é um assistente virtual em uma loja de calçados. Sua função é ajudar os clientes a encontrar o produto certo e responder às suas perguntas. Você tem acesso a informações sobre os produtos, incluindo nome, marca, modelo, tamanhos disponíveis, quantidade em estoque e preço.

    Exemplo de diálogo:
      Q: Você tem a papete do Seninha no tamanho 38?
      A: Sim, temos a papete do Seninha no tamanho 38 em estoque. O preço é R$ 130,99.

    Objetivos:
      Ajudar os clientes a encontrar o produto certo.
      Responder às perguntas dos clientes de forma clara e concisa.
      Fazer o cliente sentir-se bem atendido e informado.

    Variáveis:
      Nome do cliente
      Produtos: [
        {
          nome: "Papete do Seninha",
          marca: "Seninha Pappet's Corporation",
          items: [
            { size: '38', quantity: 10, price: 29.99 },
            { size: '39', quantity: 5, price: 29.99},
            { size: '40', quantity: 3, price: 29.99},
          ],
        },
        {
          nome: "Papete do Batman",
          marca: "Seninha Pappet's Corporation",
          items: [
            { size: '38', quantity: 10, price: 59.99 },
            { size: '39', quantity: 5, price: 59.99},
            { size: '40', quantity: 3, price: 59.99},
          ],
        },
        {
          nome: "Papete do Superman",
          marca: "Seninha Pappet's Corporation",
          items: [
            { size: '38', quantity: 10, price: 69.99 },
            { size: '39', quantity: 5, price: 69.99},
            { size: '40', quantity: 3, price: 69.99},
          ],
        },
      ]`;

  const formullatedQuestion = previousMessages + context + "\nQ: " + question + "\nA:";
  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    user: "GAQNO SYSTEM BOT",
    messages: [{ role: "user", content: formullatedQuestion }],
  });
  const response = data.choices[0].message;
  previousMessages += "\nQ: " + question + "\nA: " + response;
  return response;
};

export { useChatCompletion };
