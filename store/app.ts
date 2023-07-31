export const useAppStore = defineStore("app", {
  state: () => ({
    darkMode: false,
    loading: false,
    route: "home",
    language: "pt",
    modal: {
      show: false,
      title: "",
      content: "",
    },
    toast: {
      show: false,
      title: "",
      content: "",
    },
    slide: {
      show: false,
      template: "",
      data: {},
    },
  }),
  getters: {},
  actions: {
    toggleDarkMode () {
      this.darkMode = !this.darkMode;
    },
    toggleSlide () {
      this.slide.show = false;
      this.slide.template = "";
      this.slide.data = {};
    },
    setSlideTemplate (template: string) {
      this.slide.show = true;
      this.slide.template = template;
      this.slide.data = {};
    },
    setLoading (loading: boolean) {
      this.loading = loading;
    },
    setModal (modal: { show: boolean; title: string; content: string }) {
      this.modal = modal;
    },
    setSlide (slide: { show: boolean; template: string; data: any }) {
      this.slide = slide;
    },
    toggleToasterError () {
      this.toast.show = true;
      this.toast.title = "Erro :(";
      this.toast.content = "Por favor, tente novamente mais tarde.";
    },
    toggleLanguage () {
      const langs = ["pt", "en", "cn"];
      const index = langs.indexOf(this.language);
      this.language = langs[(index + 1) % langs.length];
    },
  },
});
