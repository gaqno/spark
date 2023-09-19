/* eslint-disable no-console */
import { describe, expect, it, vi } from "vitest";
import { useChatCompletion } from "../service/openai";

vi.mock("#imports", () => {
  return {
    useRuntimeConfig () {
      return {
        public: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY,
          OPENAI_CONTEXT: process.env.OPENAI_CONTEXT,
        },
      };
    },
  };
});

describe("useChatCompletion", () => {
  it("should return a response from OpenAI API asking about systems", async () => {
    try {
      const question = "Quais sistemas vocês tem?";
      const response = await useChatCompletion(question);
      expect(response?.content)
        .includes(["Seninha"])
        .includes(["Batman"])
        .includes(["Superman"]);
      console.log(response?.content);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  });

  it("should return a response from OpenAI API asking about sizes", async () => {
    try {
      const question = "Quais tamanhos vocês tem?";
      const response = await useChatCompletion(question);
      expect(response?.content)
        .includes(["38"])
        .includes(["39"])
        .includes(["40"]);
      console.log(response?.content);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  });

  it("should return a response from OpenAI API asking about prices", async () => {
    try {
      const question = "Quais os preços?";
      const response = await useChatCompletion(question);
      expect(response?.content)
        .includes(["29,99"])
        .includes(["59,99"])
        .includes(["69,99"]);
      console.log(response?.content);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  });
});
