import { describe, it } from "vitest";
import { render } from "@testing-library/vue";
import TableComponent from "@/components/TableComponent.vue";

describe("example", () => {
  it("should show roles", () => {
    const wrapper = render(TableComponent, {
      props: {
        template: "stock",
        title: "Grupos de permissões",
        action: "handleSlide",
        actions: [
          { label: "Editar", icon: "mdi:square-edit-outline", template: "edit", action: () => { } },
          { label: "Excluir", icon: "mdi:trash-can-outline", template: "delete", action: () => { } },
        ],
        columns: "columns",
        darkMode: false,
        data: "permissionGroups",
        description: "Você possui x grupos de permissões cadastrados.",
        loading: false,
        pagination: {
          page: 1,
          total: 10,
        },
        route: "",
      },
    });
    console.log(wrapper);
  });
});
