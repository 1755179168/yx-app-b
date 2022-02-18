<template>
  <a-form-model
    ref="ruleForm"
    :model="formData"
    :rules="rules">
    <a-form-model-item ref="title" label="副标题" prop="title">
      <a-input v-model="formData.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="formData.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="商品分类" prop="category">
      <a-select v-model="formData.category" placeholder="请选择分类" @change="handlerChange">
        <a-select-option :value="prop.name" :key="prop.id"
         v-for="prop in categoryData"> {{prop.name}} </a-select-option>
      </a-select></a-form-model-item>
    <a-form-model-item prop="c_item">
      <a-select v-model="formData.c_item" placeholder="请选择分类">
        <a-select-option v-for="prop in option" :key="prop" :value="prop">
           {{prop}} </a-select-option> </a-select>
    </a-form-model-item>
    <a-form-model-item label="标签" prop="tags">
      <a-select
        mode="tags"
        :default-value="['包邮，最晚次日达！']" v-model="formData.tags">
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
      <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  props: ['categoryData', 'formData'],
  data() {
    return {
      categoryTitle: '',
      rules: {
        title: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
        category: [
          {
            required: true,
            message: '请选择反分类',
            trigger: 'blur',
          },
        ],
        tags: [{
          required: true,
          message: '请选择',
          trigger: 'blur',
        }],
        desc: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
      },
    };
  },
  methods: {
    onSubmit() {
      const self = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          self.$emit('click', this.formData);
        } else {
          return false;
        }
        return '';
      });
    },
    handlerChange(a) {
      this.categoryTitle = a;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
  computed: {
    option() {
      let arr = [];
      for (let i = 0; i < this.categoryData.length; i += 1) {
        if (this.categoryData[i].name === this.categoryTitle) {
          arr = this.categoryData[i].c_items;
        }
      }
      return arr;
    },
  },
};
</script>
