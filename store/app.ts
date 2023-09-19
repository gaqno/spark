import { AppState } from "~/types/AppState";

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    darkMode: false,
    loading: false,
    env: "homolog",
    route: "home",
    language: "pt",
    sidebar: {
      small: false,
      show: false,
    },
    modal: {
      show: false,
      title: "",
      content: "",
      template: "",
      data: {},
    },
    toast: {
      show: false,
      title: "",
      content: "",
    },
    slide: {
      show: false,
      template: "",
      title: "",
      data: {},
    },
  } as AppState),
  getters: {
    getModalData (): Record<string, any> {
      return this.modal.data;
    },
    getSlideData (): Record<string, any> {
      return this.slide.data;
    },
  },
  actions: {
    setLoading (loading: boolean) {
      this.loading = loading;
    },
    setModal (modal: { show: boolean; title: string; content: string, template: string, data: Record<string, any> }) {
      this.modal = modal;
    },
    setSlide (slide: { show: boolean; template: string; title: string; data: Record<string, any> }) {
      this.slide = slide;
    },
    setToast (toast: { show: boolean; title: string; content: string }) {
      this.toast = toast;
    },
    toggleDarkMode () {
      this.darkMode = !this.darkMode;
    },
    toggleSlide () {
      this.slide.show = false;
      this.slide.template = "";
      this.slide.title = "";
      this.slide.data = {};
    },
    toggleSidebarSmall () {
      this.sidebar.small = !this.sidebar.small;
    },
    toggleModal () {
      this.modal.show = !this.modal.show;
      this.modal.content = "";
      this.modal.title = "";
      this.modal.template = "";
    },
  },
});
