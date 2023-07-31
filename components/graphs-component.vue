<template>
  <section v-if="currentReportView === 'graphs'" class="pb-20">
    <div class="relative isolate overflow-hidden bg-gray-900 mx-8 rounded py-12">
      <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover">
      <div
        class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Relatórios
        </h2>
        <p class="mt-6 text-lg leading-8 text-white">
          Acompanhe os relatórios de vendas e estoque.
        </p>
      </div>
    </div>

    <div class="container grid grid-cols-1 lg:grid-cols-2 mx-auto gap-8 mb-[5vh] px-8 mt-8">
      <div class="card card-compact w-90 bg-white shadow-xl">
        <div class="card-body">
          <figure>
            <Bar
              id="products"
              :data="productsData"
              :options="chartOptions"
            />
          </figure>
          <h2 class="card-title text-primary mt-2">
            Produtos
          </h2>
          <p>
            Produtos em estoque.
          </p>
          <div class="card-actions justify-end">
            <button class="btn bg-primary text-white" @click.prevent="currentReportView = 'report_products'">
              Detalhes
            </button>
          </div>
        </div>
      </div>

      <div class="card card-compact w-90 bg-white shadow-xl">
        <div class="card-body">
          <figure>
            <Line
              id="financing"
              :data="financingData"
              :options="chartOptions"
            />
          </figure>
          <h2 class="card-title text-primary mt-2">
            Produtos
          </h2>
          <p>Produtos com maiores notas</p>
          <div class="card-actions justify-end">
            <button class="btn bg-primary text-white" @click.prevent="currentReportView = 'report_financing'">
              Detalhes
            </button>
          </div>
        </div>
      </div>

      <div class="card card-compact w-90 bg-white shadow-xl">
        <div class="card-body">
          <figure>
            <Doughnut
              id="storage"
              :data="storageData"
              :options="chartOptions"
            />
          </figure>
          <h2 class="card-title text-primary mt-2">
            Estoque
          </h2>
          <p>Acompanhe qual item mais tem no estoque.</p>
          <div class="card-actions justify-end">
            <button class="btn bg-primary text-white" @click.prevent="currentReportView = 'report_storage'">
              Detalhes
            </button>
          </div>
        </div>
      </div>

      <div class="card card-compact w-90 bg-white shadow-xl">
        <div class="card-body">
          <figure>
            <Bubble
              id="teams"
              :data="teamsData"
              :options="chartOptions"
            />
          </figure>
          <h2 class="card-title text-primary mt-2">
            Estoque
          </h2>
          <p>Acompanhe qual item mais tem no estoque.</p>
          <div class="card-actions justify-end">
            <button class="btn bg-primary text-white" @click.prevent="currentReportView = 'report_teams'">
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Bar, Line, Bubble, Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, ArcElement, PointElement, Legend, BarElement, CategoryScale, LinearScale, LineElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, PointElement, LinearScale, LineElement);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const DEMONSTRATE_REF = false;

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

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
  if (DEMONSTRATE_REF) { DEMONSTRATE(); }

  if (props.data) {
    const categoryStocks = {};
    for (const product of props.data) {
      const category = product.category;
      const stock = product.stock;
      categoryStocks[category] = (categoryStocks[category] || 0) + stock;
    }

    const productArr = newData("Em estoque");
    const financingArr = newData("Maior nota");
    const storageArr = newData("Armazenamento");
    const teamsArr = newData("Equipes");

    for (const product of props.data) {
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
  }
});
</script>
