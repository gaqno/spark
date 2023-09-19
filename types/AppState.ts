export interface AppState {
  darkMode: boolean;
  loading: boolean;
  sidebar: {
    small: boolean;
    show: boolean;
  }
  route: string;
  env: "local" | "homolog" | "staging" | "production";
  language: string;
  modal: {
    show: boolean;
    title: string;
    content: string;
    template: string;
    data: Record<string, any>;
  };
  toast: {
    show: boolean;
    title: string;
    content: string;
  };
  slide: {
    show: boolean;
    template: string;
    title: string;
    data: Record<string, any>;
  };
}
