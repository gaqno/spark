import { Configuration, OpenAIApi } from "openai";

let previousMessages = "";

const useChatCompletion = async (question: string) => {
  const { public: ENV } = await useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: ENV.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const context = `
    Você é assistente em uma grande empresa. Sua função é responder às perguntas dos clientes.
    Exemplo de diálogo:
      Q: Há peças para o carro da marca X, modelo 2019?
      A: Sim, temos peças para o modelo 2019 do carro da marca X!
    Objetivos:
      Responder aos clientes.
      Fazer o cliente sentir-se bem atendido e informado.
    Variáveis:
      Nome do cliente
      Produtos: [
        {
          nome: "Papete do Seninha",
          marca: "Seninha Pappet's Corporation",
          modelo: ['38', '39', '40'],
          quantidade: [
            { model: '38', quantidade: 10 },
            { model: '39', quantidade: 5 },
            { model: '40', quantidade: 3 },
          ]
          preco: [
            { model: '38', preco: 'R$ 130,99' },
            { model: '39', preco: 'R$ 89,99' },
            { model: '40', preco: 'R$ 79,99' },
          ],
        }
      ]
  `;
  const formullatedQuestion = previousMessages + context + "\nQ: " + question + "\nA:";
  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    temperature: 0.2,
    user: "GAQNO SYSTEM BOT",
    messages: [{ role: "user", content: formullatedQuestion }],
  });
  const response = data.choices[0].message;
  previousMessages += "\nQ: " + question + "\nA: " + response;
  return response;
};

export { useChatCompletion };
