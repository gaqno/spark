<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot name="content">
      <section v-if="app.route === 'admin_sso'" class="pb-20">
        <div class="relative isolate mx-8 overflow-hidden rounded bg-slate-900 py-12">
          <img
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt=""
            class="absolute inset-0 -z-10 h-full w-full object-cover"
          >
          <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
            <div
              class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
          <div
            class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
          >
            <div
              class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Admin SSO
            </h2>
            <p class="mt-6 text-lg leading-8 text-white">
              Acompanhe os dados da sua empresa.
            </p>
          </div>
        </div>

        <section>
          <div class="container mx-auto mb-[5vh] mt-8 grid grid-cols-1 gap-8 px-8 lg:grid-cols-2">
            <div class="card card-compact w-96 bg-white shadow-xl">
              <div class="card-body">
                <figure>
                  <Bar id="products" :data="productsData" :options="chartOptions" />
                </figure>
                <h2 class="card-title mt-2 text-primary">
                  Grupos de permissões
                </h2>
                <p>Acompanhe os grupos de permissões</p>
                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_groups' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>

            <div class="card card-compact w-96 bg-white shadow-xl">
              <div class="card-body">
                <figure>
                  <Line id="financing" :data="financingData" :options="chartOptions" />
                </figure>
                <h2 class="card-title mt-2 text-primary">
                  Chaves de API
                </h2>
                <p>Acompanhe as chaves de API</p>
                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_keys' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>

            <div class="card card-compact w-96 bg-white shadow-xl">
              <div class="card-body">
                <figure>
                  <Doughnut id="storage" :data="storageData" :options="chartOptions" />
                </figure>
                <h2 class="card-title mt-2 text-primary">
                  Sistemas
                </h2>
                <p>Acompanhe os sistemas</p>
                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_systems' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>

            <div class="card card-compact w-96 bg-white shadow-xl">
              <div class="card-body">
                <figure>
                  <Bubble id="teams" :data="teamsData" :options="chartOptions" />
                </figure>
                <h2 class="card-title mt-2 text-primary">
                  Usuários
                </h2>
                <p>Acompanhe os usuários</p>
                <div class="card-actions justify-end">
                  <button class="btn bg-primary text-white" @click.prevent="app.$patch({ route: 'admin_sso_users' })">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </slot>
  </Transition>
</template>

<script setup>
import { Chart as ChartJS, Title, Tooltip, ArcElement, PointElement, Legend, BarElement, CategoryScale, LinearScale, LineElement } from "chart.js";
import { Bar, Line, Bubble, Doughnut } from "vue-chartjs";
import { useAppStore } from "@/store/app";
import { getAllProducts, getUsers } from "@/service/api";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, PointElement, LinearScale, LineElement);

const DEMONSTRATE_REF = false;

const app = useAppStore();

const currentReportView = ref("graphs");
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
const pagination = ref({});
const products = ref([]);
const users = ref([]);

const productsData = ref({
  labels: [],
  datasets: [],
});

const financingData = ref({
  labels: [],
  datasets: [],
});

const storageData = ref({
  labels: [],
  datasets: [],
});

const teamsData = ref({
  labels: [],
  datasets: [],
});

const usersData = ref({
  labels: [],
  datasets: [],
});

const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    getAllProducts()
      .then((res) => {
        pagination.value = {
          total: res.total,
          limit: res.limit,
          page: 1,
          pages: Math.ceil(res.total / res.limit),
        };
        products.value = res.products.map(i => ({
          ...i,
          price: i.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" }),
        }));

        const categoryStocks = {};
        for (const product of products.value) {
          const category = product.category;
          const stock = product.stock;
          categoryStocks[category] = (categoryStocks[category] || 0) + stock;
        }

        const productArr = newData("Em estoque");
        const financingArr = newData("Maior nota");
        const storageArr = newData("Armazenamento");
        const teamsArr = newData("Equipes");

        for (const product of products.value) {
          productArr.labels.push(product.title);
          productArr.datasets[0].data.push(product.stock);

          financingArr.labels.push(product.title);
          financingArr.datasets[0].data.push(product.rating);
        }

        storageArr.labels = Object.keys(categoryStocks);
        storageArr.datasets[0].data = Object.values(categoryStocks);

        teamsArr.labels = Object.keys(categoryStocks);
        teamsArr.datasets[0].data = Object.values(categoryStocks);

        productsData.value = productArr;
        financingData.value = financingArr;
        storageData.value = storageArr;
        teamsData.value = randomData("bubble");

        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const fetchUsers = () => {
  return new Promise(() => {
    getUsers()
      .then((res) => {
        users.value = res.users.map(i => ({
          ...i,
          address: i.address,
          age: i.age,
          bank: i.bank,
          birthDate: i.birthDate,
          bloodGroup: i.bloodGroup,
          company: i.company,
          domain: i.domain,
          email: i.email,
        }));

        const usersArr = newData("Idade");
        for (const user of users.value) {
          usersArr.labels.push(`${user.firstName} ${user.lastName}`);
          usersArr.datasets[0].data.push(user.age);
        }
        usersData.value = usersArr;
      });
  });
};

const getRandomInt = () => {
  return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
};

const getRandomXYR = () => {
  const maxX = 300;
  const maxY = 500;
  const maxR = 50;

  const _x = Math.floor(Math.random() * maxX);
  const _y = Math.floor(Math.random() * maxY);
  const _r = Math.floor(Math.random() * maxR);

  return { x: _x, y: _y, r: _r };
};

const getRandomHEX = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const randomData = (type) => {
  if (type === "bar") {
    return {
      labels: ["Camiseta", "Calça", "Tênis", "Boné", "Meia", "Cinto"],
      datasets: [
        {
          label: "Vendas",
          backgroundColor: [
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
          ],
          data: [
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
          ],
        },
      ],
    };
  }

  if (type === "line") {
    return {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
      datasets: [
        {
          label: "Vendas",
          backgroundColor: [
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
          ],
          data: [
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
          ],
        },
      ],
    };
  }

  if (type === "doughnut") {
    return {
      labels: ["Camiseta", "Calça", "Tênis", "Boné", "Meia", "Cinto"],
      datasets: [
        {
          label: "Vendas",
          backgroundColor: [
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
          ],
          data: [
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
            getRandomInt(),
          ],
        },
      ],
    };
  }

  if (type === "bubble") {
    return {
      labels: ["Camiseta", "Calça", "Tênis", "Boné", "Meia", "Cinto"],
      datasets: [
        {
          label: "Vendas",
          backgroundColor: [
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
            getRandomHEX(),
          ],
          data: [
            getRandomXYR(),
            getRandomXYR(),
            getRandomXYR(),
            getRandomXYR(),
            getRandomXYR(),
            getRandomXYR(),
          ],
        },
      ],
    };
  }
};

// const handleSlide = (value) => {
//   app.setSlide({
//     show: true,
//     template: "filters",
//     data: {
//       type: value
//     }
//   })
// }

const newData = (type) => {
  const obj = {
    labels: [],
    datasets: [
      {
        label: type,
        backgroundColor: getRandomHEX,
        data: [],
      },
    ],
  };
  return obj;
};

const DEMONSTRATE = () => {
  if (currentReportView.value === "graphs") {
    setInterval(() => {
      productsData.value = randomData("bar");
      financingData.value = randomData("line");
      storageData.value = randomData("doughnut");
      teamsData.value = randomData("bubble");
    }, 3000);
  } else {
    clearInterval();
  }
};

onMounted(() => {
  Promise.all([
    fetchProducts(),
    fetchUsers(),
  ]);

  if (DEMONSTRATE_REF) { DEMONSTRATE(); }
});
</script>
