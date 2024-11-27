<template>
  <div class="min-h-screen bg-[#1a1a1a]">

    <div class="w-full px-16 py-8 flex flex-row items-center justify-between gap-12">
      <img src="https://cdn.prod.website-files.com/66759412a4bcdefe60857ba0/6696ef8edb61008046e6742c_Original.svg"
           alt="ionWorks" class="h-[50px]">
      <a href="https://meetings.hubspot.com/valentin-sulzer?uuid=4b8c6f62-86e0-4082-9a5b-76ae24d91069"
         class="text-lg font-bold text-white bg-[#ff2f82] rounded-xl py-[1rem] px-[2rem]">Book a demo</a>
    </div>

    <div class="flex flex-col gap-12 p-16 bg-[#ff87b7]">

      <div class="-mb-8">
        <h1 class="text-4xl font-bold text-white">Data</h1>
        <p class="text-[#1a1a1a]">Note that you can toggle the graph for each battery by clicking on their names at the
          bottom of the graph.</p>
      </div>

      <div class="flex xl:flex-row flex-col gap-12 items-stretch mt-6">
        <div class="w-full xl:flex-2 p-4 rounded-xl bg-white">
          <div v-if="loading">Data loading...</div>
          <div v-else>
            <h2 class="text-2xl font-bold mb-2 text-[#1a1a1a]">Battery Voltage Chart</h2>

            <div class="flex flex-row gap-4 my-6 px-2 items-center">
              <p class="font-bold">Filters:</p>
              <label for="cRate">C-rate
                <select class="border border-gray-300 rounded-xl text-sm py-1" id="cRate" name="cRate" v-model="selectedCRate">
                  <option :value="-1" selected>All C-rates</option>
                  <option v-for="cRate in cRateArray" :value="cRate">{{ cRate }}</option>
                </select>
              </label>

              <select class="border border-gray-300 rounded-xl text-sm py-1" id="cRate" name="cRate" v-model="selectedTemp">
                <option :value="-1" selected>All Temperatures</option>
                <option v-for="temp in tempArray">{{ temp }}</option>
              </select>
            </div>


            <apex
                type="line"
                :options="chartOptions"
                :series="series"
                style="width: 100% !important;"
            />
          </div>

        </div>

        <div class="min-w-[430px] w-full flex-1 p-4 rounded-xl items-center bg-white">
          <h2 class="text-2xl font-bold mb-2 text-[#1a1a1a]">Legend</h2>
          <p class="mb-4 text-[#1a1a1a]">Blurb explaining table. Lorem ipsum dolor</p>
          <div class="flex flex-row">
            <div class="flex-1 py-4">
              <div class="font-bold px-3 bg-gray-500 text-white py-2">ID</div>
            </div>
            <div class="flex-1 py-4">
              <div class="font-bold px-3 bg-gray-500 text-white py-2">C-Rate</div>
            </div>
            <div class="flex-1 py-4">
              <div class="font-bold px-3 bg-gray-500 text-white py-2">Temperature</div>
            </div>
          </div>

          <div v-if="loading">Data loading...</div>
          <div v-else class="flex flex-row odd:bg-gray-200" v-for="(item, index) in data">
            <div class="py-2 px-3 flex flex-row flex-1 gap-4 items-center">
              <div class="circle rounded-full w-[15px] h-[15px] block"
                   :style="['background:' + colors[index]]"
              ></div>
              {{ index }}
              {{ item.id }}
            </div>

            <div class="flex-1 py-4">
              {{ item.parameters.cRate }}
            </div>

            <div class="flex-1 py-4">
              {{ item.parameters.temp }}
            </div>
          </div>


        </div>
      </div>


      <div class="min-w-[430px] w-full flex-1 p-4 rounded-xl items-center bg-white">
        <h2 class="text-2xl font-bold mb-2 text-[#1a1a1a]">All Params & Metrics</h2>
        <p class="mb-4 text-[#1a1a1a]">More comprehensive metrics. Blurb explaining table. Lorem ipsum dolor</p>
        <div class="flex flex-row">
          <div class="flex-1 py-4">
            <div class="font-bold px-3 bg-gray-500 text-white py-2">ID</div>
          </div>
          <div class="flex-1 py-4">
            <div class="font-bold px-3 bg-gray-500 text-white py-2">C-Rate</div>
          </div>
          <div class="flex-1 py-4">
            <div class="font-bold px-3 bg-gray-500 text-white py-2">Temperature</div>
          </div>
          <div class="flex-1 py-4">
            <div class="font-bold px-3 bg-gray-500 text-white py-2">Capacity</div>
          </div>
          <div class="flex-1 py-4">
            <div class="font-bold px-3 bg-gray-500 text-white py-2">Energy</div>
          </div>
        </div>

        <div v-if="loading">Data loading...</div>
        <div v-else class="flex flex-row odd:bg-gray-200" v-for="(item, index) in data">
          <div class="py-2 px-3 flex flex-row flex-1 gap-4 items-center">
            <div class="circle rounded-full w-[15px] h-[15px] block"
                 :style="['background:' + colors[index]]"
            ></div>
            {{ item.id }}
          </div>
          <div class="flex-1 px-3 py-4">
            {{ item.parameters.cRate }}
          </div>
          <div class="flex-1 px-3 py-4">
            {{ item.parameters.temp }}
          </div>
          <div class="flex-1 px-3 py-4">
            {{ truncate(item.metrics.capacity) }}
          </div>
          <div class="flex-1 px-3 py-4">
            {{ truncate(item.metrics.energy) }}
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import {RepositoryFactory} from '../shared/services/RepositoryFactory';

const DataRepo = RepositoryFactory.get('data');

export default {
  data() {
    return {
      data: [],

      allVoltage: [],
      allCapacity: [],

      tempArray: [],
      selectedTemp: -1,

      cRateArray: [],
      selectedCRate: -1,

      loading: false,

      colors: ['#db402a', '#f0873c', '#f0d145', '#91d439', '#4c8645', '#315bf0', '#a1d9f0', '#c78bf0', '#f046ca'],
    };
  },
  components: {
    apex: VueApexCharts,
  },
  async created() {
    await this.getData().then(() => {
      this.cleanData();
      this.loading = false;
    });
  },
  methods: {
    async getData(crate = this.selectedCRate, temp = this.selectedTemp) {
      this.loading = true;

      this.data = await DataRepo.getChartByData(this.selectedCRate, this.selectedTemp);
    },
    truncate(number) {
      return number.toFixed(2);
    },
    cleanData() {
      Object.keys(this.data).forEach(i => {

        this.allVoltage.push(...this.data[i].outputs.voltage);
        this.allCapacity.push(...this.data[i].outputs.capacity);

        if (!this.cRateArray.includes(this.data[i].parameters.cRate)) {
          this.cRateArray.push(this.data[i].parameters.cRate);
        }

        if (!this.tempArray.includes(this.data[i].parameters.temp)) {
          this.tempArray.push(this.data[i].parameters.temp);
        }
      });

    }
  },
  computed: {
    voltageMin() {
      return this.allVoltage ? Math.min(...this.allVoltage) : 0;
    },
    voltageMax() {
      return this.allVoltage ? Math.max(...this.allVoltage) : 0;
    },

    capacityMin() {
      return this.allCapacity ? Math.min(...this.allCapacity) : 0;
    },
    capacityMax() {
      return this.allCapacity ? Math.max(...this.allCapacity) : 0;
    },

    chartOptions() {
      return {
        chart: {
          type: 'line',
          zoom: {
            enabled: true,
          },
        },
        colors: this.colors,
        stroke: {
          curve: 'smooth'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          type: 'numeric',
          min: this.capacityMin,
          max: this.capacityMax,
          tickAmount: 5,
          title: {
            text: 'Capacity [A.h]'
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
          },
        },
        yaxis: {
          show: true,
          min: this.voltageMin,
          max: this.voltageMax,
          tickAmount: 10,
          title: {
            text: 'Voltage [V]'
          },
          labels: {
            formatter: function (val) {
              return val.toFixed(2);
            }
          },
        }
      };
    },

    series() {
      let series = [];
      let series2 = [];

      Object.keys(this.data).forEach((battery, index) => {

        series.push({
          name: this.data[battery].id,
          data: []
        });

        Object.keys(this.data[battery].outputs.capacity).forEach(dataPoint => {
          series[index].data[dataPoint] = {
            x: this.data[battery].outputs.capacity[dataPoint],
            y: this.data[battery].outputs.voltage[dataPoint]
          };
        });
      });

      return series;
    }
  },
  watch: {
    selectedCRate() {
      this.getData(this.selectedCRate, this.selectedTemp).then(() => {
        this.cleanData();
        this.loading = false;
      });
    },
    selectedTemp() {
      this.getData(this.selectedCRate, this.selectedTemp).then(() => {
        this.cleanData();
        this.loading = false;
      });
    }
  }
}
</script>
