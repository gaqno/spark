interface Breadcrumb {
  name: string;
  icon: string;
  view: string;
  father: string;
}

export const useFormatBreadcrumbs = () => {
  const formatBreadcrumbs = (name: string): Breadcrumb | string => {
    if (name === "reports") {
      return {
        name: "Relatórios",
        father: "",
        view: name,
        icon: "mdi-file-chart",
      };
    }
    if (name === "report_products") {
      return {
        name: "Produtos",
        view: name,
        father: "Relatórios",
        icon: "mdi-account-multiple",
      };
    }
    if (name === "report_financing") {
      return {
        name: "Financeiro",
        view: name,
        father: "Relatórios",
        icon: "mdi-package-variant-closed",
      };
    }
    if (name === "report_storage") {
      return {
        name: "Estoque",
        view: name,
        father: "Relatórios",
        icon: "mdi-package-variant-closed",
      };
    }
    if (name === "report_teams") {
      return {
        name: "Times",
        view: name,
        father: "Relatórios",
        icon: "mdi-account-group",
      };
    }
    if (name === "report_users") {
      return {
        name: "Usuários",
        view: name,
        father: "Relatórios",
        icon: "mdi-account-multiple",
      };
    }
    if (name === "admin_sso") {
      return {
        name: "Admin SSO",
        view: name,
        father: "",
        icon: "mdi-lock",
      };
    }
    if (name === "admin_sso_keys") {
      return {
        name: "Chaves de API",
        view: name,
        father: "Admin SSO",
        icon: "mdi-lock",
      };
    }
    if (name === "admin_sso_users") {
      return {
        name: "Usuários",
        view: name,
        father: "Admin SSO",
        icon: "mdi-lock",
      };
    }
    if (name === "admin_sso_groups") {
      return {
        name: "Grupos de permissões",
        view: name,
        father: "Admin SSO",
        icon: "mdi-lock",
      };
    }
    if (name === "admin_sso_systems") {
      return {
        name: "Sistemas",
        view: name,
        father: "Admin SSO",
        icon: "mdi-lock",
      };
    }
    if (name === "best_pratices") {
      return {
        name: "Boas Práticas",
        view: name,
        father: "",
        icon: "mdi-lightbulb-on",
      };
    }
    if (name === "best_pratices_media") {
      return {
        name: "Mídias",
        view: name,
        father: "Boas Práticas",
        icon: "mdi-lightbulb-on",
      };
    }
    if (name === "my_franchises") {
      return {
        name: "Minhas Franquias",
        view: name,
        father: "",
        icon: "mdi-store",
      };
    }
    if (name === "assistant") {
      return {
        name: "Assistente",
        view: name,
        father: "",
        icon: "mdi-robot",
      };
    }
    if (name === "powerbi") {
      return {
        name: "PowerBI",
        view: name,
        father: "",
        icon: "mdi-chart-bar",
      };
    }
    if (name === "product_catalog") {
      return {
        name: "Catálogo de Produtos",
        view: name,
        father: "",
        icon: "mdi-package-variant-closed",
      };
    }
    if (name === "shopping_portal") {
      return {
        name: "Portal de Compras",
        view: name,
        father: "",
        icon: "mdi-cart",
      };
    }
    if (name === "contact") {
      return {
        name: "Contato",
        view: name,
        father: "",
        icon: "mdi-email",
      };
    }
    if (name === "communications") {
      return {
        name: "Comunicações",
        view: name,
        father: "",
        icon: "mdi-message-text",
      };
    }
    if (name === "employees") {
      return {
        name: "Gestão de colaboradores",
        view: name,
        father: "",
        icon: "mdi-account-tie",
      };
    }
    if (name === "my_account") {
      return {
        name: "Minha conta",
        view: name,
        father: "",
        icon: "mdi-account",
      };
    }
    if (name === "collaborators") {
      return {
        name: "Colaboradores",
        view: name,
        father: "",
        icon: "mdi-account-group",
      };
    }
    return {
      name,
      view: name,
      father: "",
      icon: "mdi-view-dashboard",
    };
  };

  return { formatBreadcrumbs };
};
