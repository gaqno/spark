import { useChatCompletion } from "@/service/openai";
import { useAppStore } from "@/store/app";

interface IResponse {
  data: string;
  role: string;
}

export const useCallAssistant = () => {
  const app = useAppStore();
  const response = ref({});
  const responseStream = ref([] as IResponse[]);
  const loadingSteam = ref(false);

  const ask = (value: string) => {
    if (!value) {
      return;
    }
    const questionText = value;
    responseStream.value.push({ data: questionText, role: "user" } as never);
    loadingSteam.value = true;
    app.setLoading(true);
    useChatCompletion(questionText)
      .then((data: any) => {
        app.setLoading(false);
        loadingSteam.value = false;
        response.value = data;
        responseStream.value.push({ data: data.content, role: "sys" } as never);
      })
      .catch(() => app.setToast({
        show: true,
        title: "Error",
        content: "Error",
      }));
  };

  return { ask, response, responseStream, loadingSteam };
};
