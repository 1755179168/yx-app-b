<template>
  <div class="category-container">
    <serach @btnClick="searchData" :option="option" />
    <Tab
      :tabData="tabData"
      :total="dataTotal"
      @click="handler"
      v-if="dataTotal > 0 && tabData.length !== 0"
    />
  </div>
</template>

<script>
import serach from './serach/index.vue';
import Tab from './tab/index.vue';
import getProductAll from '@/api/productAll';
import axios from '@/api/Interceptor';

export default {
  computed: {
    routerInfo() {
      return {
        pagesize: this.$route.query.pagesize || 10,
        page: this.$route.query.page || 1,
      };
    },
  },
  async created() {
    this.$router.push({
      query: {
        page: 1,
        pagesize: 10,
      },
    });
    const pageList = await axios.get('/products/all', {
      params: {
        ...this.router,
        appkey: '1755179168_1639361355771',
      },
    });
    if (pageList.status === 'success') {
      this.dataTotal = pageList.data.total + 0;
      this.tabData = pageList.data.data;
    }
    const fldata = await axios.get('/category/all', {
      params: { appkey: '1755179168_1639361355771' },
    });
    this.fl = fldata.data.data;
    if (fldata.status === 'success') {
      for (let i = 0; i < fldata.data.data.length; i += 1) {
        this.option.push(fldata.data.data[i].name);
      }
    }
    for (let i = 0; i < this.tabData.length; i += 1) {
      for (let i1 = 0; i1 < fldata.data.data.length; i1 += 1) {
        const arr = fldata.data.data[i1].c_items;
        if (arr.indexOf(this.tabData[i].c_item) !== -1) {
          this.tabData[i].category = fldata.data.data[i1].name;
        }
      }
    }
  },
  components: {
    serach,
    Tab,
  },
  data() {
    return {
      tabData: [],
      dataTotal: 0,
      router: {
        page: 1,
        size: 10,
      },
      option: [],
      fl: [],
    };
  },
  methods: {
    async searchData(option) {
      let category;
      this.option.forEach((ele, i) => {
        if (ele === option) {
          category = i;
        }
      });
      const rep = await getProductAll(category + 1);
      const list = rep.data.data.map((ele) => ({
        ...ele,
        category: this.option[ele.category - 1],
      }));

      this.tabData = list;
      this.total = rep.data.total;
    },
    handler(pageInfo) {
      this.$router.push({
        query: {
          page: pageInfo.current,
          pagesize: pageInfo.pageSize,
        },
      });
      axios
        .get('/products/all', {
          params: {
            appkey: '1755179168_1639361355771',
            size: this.routerInfo.pagesize,
            page: this.routerInfo.page,
          },
        })
        .then((r) => {
          this.dataTotal = r.data.total + 0;
          const arr1 = r.data.data;
          for (let i = 0; i < arr1.length; i += 1) {
            for (let i1 = 0; i1 < this.fl.length; i1 += 1) {
              const arr = this.fl[i1].c_items;
              if (arr.indexOf(arr1[i].c_item) !== -1) {
                arr1[i].category = this.fl[i1].name;
              }
            }
            this.tabData = arr1;
          }
        });
    },
  },
};
</script>

<style>
.category-container {
  padding: 10px 0px;
}
</style>
