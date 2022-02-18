<template>
  <div class="add-product">
    <div class="lc"><step :current="ooo"></step></div>
    <div class="form">
      <basic
        :formData="basicInfo"
        v-if="category && ooo === 0"
        :categoryData="category"
        @click="handlerClick"
      ></basic>
      <basic-pul
        v-if="ooo === 1"
        @next="next"
        @pre="pre"
        :formData="basicPulInfo"
      ></basic-pul>
    </div>
  </div>
</template>
<script>
import axios from '@/api/Interceptor';
import step from './step/index.vue';
import basic from './biaodan/basic.vue';
import basicPul from './biaodan/basicPul.vue';

export default {
  async created() {
    this.productId = this.$route.params.productId || null;
    if (this.productId) {
      const data = await axios.get(`/products/${this.productId}?appkey=1755179168_1639361355771`);
      this.basicInfo = { ...this.basicInfo, ...data.data };
      this.basicPulInfo = { ...this.basicPulInfo, ...data.data };
      for (let i = 0; i < data.data.images.length; i += 1) {
        this.basicPulInfo.fileList.push({
          uid: `-${i + 1}`,
          name: 'image.png',
          status: 'done',
          url: data.data.images[i],
        });
      }
    }
    axios
      .get('/category/all', {
        params: {
          appkey: '1755179168_1639361355771',
        },
      })
      .then((r) => {
        this.category = r.data.data;
      });
  },
  data() {
    return {
      productId: null,
      ooo: 0,
      category: null,
      basicInfo: {
        tags: ['包邮，最晚次日达！'],
        category: [],
      },
      basicPulInfo: {
        fileList: [],
        images: [],
      },
    };
  },
  methods: {
    next() {
      this.ooo += 1;
      if (this.productId) {
        const obj = {
          ...this.basicInfo,
          ...this.basicPulInfo,
        };
        delete obj.fileList;
        axios.put('/products/edit',
          obj).then((r) => {
          if (r.status === 'success') {
            this.$message.success('修改成功！');
            this.$router.push({ path: '/product/list' });
          }
        });
      } else {
        const obj = {
          ...this.basicInfo,
          ...this.basicPulInfo,
          status: 1,
          appkey: '1755179168_1639361355771',
        };
        if (obj.category === '时令水果') {
          obj.category = 2;
        } else {
          obj.category = 1;
        }
        delete obj.fileList;
        axios.post('/products/add', obj).then((r) => {
          if (r.status === 'success') {
            this.$message.success('增加成功！');
            this.$router.push({ path: '/product/list' });
          }
        });
      }
    },
    handlerClick() {
      this.ooo += 1;
    },
    pre() {
      this.ooo -= 1;
    },
  },
  components: {
    step,
    basic,
    basicPul,
  },
};
</script>

<style scoped>
.lc {
  padding: 10px;
  width: 80%;
  margin: 0 auto;
}
div.form {
  margin: 40px auto;
  width: 45%;
}
</style>
