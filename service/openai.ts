import { Configuration, OpenAIApi } from "openai";

let previousMessages = "";

const useChatCompletion = async (question: string) => {
  const { public: ENV } = await useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: ENV.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const context = `
    Você é assistente na Rede Ancora, uma grande empresa de autopeças. Sua função é responder às perguntas dos clientes.
    Exemplo de diálogo:
      Q: Há peças para o carro da marca X, modelo 2019?
      A: Sim, temos peças para o modelo 2019 do carro da marca X!
    Objetivos:
      Responder aos clientes.
      Fazer o cliente sentir-se bem atendido e informado.
      Caso retorne dados, coloque a resposat dentro de <DETAILS></DETAILS>.
    Sobre a Rede Ancora:
      Fundada em 1998, a Rede ANCORA é uma rede de cooperação de autopeças que mantém a individualidade de cada membro. Atende a Linha Leve e Linha Pesada, com mais de 200 mil itens e parcerias com mais de 100 fábricas. A partir de 2018, começou a expandir seu modelo de franquia.
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
    user: "Rede Ancora BOT",
    messages: [{ role: "user", content: formullatedQuestion }],
  });
  const response = data.choices[0].message;
  previousMessages += "\nQ: " + question + "\nA: " + response;
  return response;
};

export { useChatCompletion };
