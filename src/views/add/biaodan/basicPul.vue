<template>
  <a-form-model :rules="rules"
   ref="form" :model="formData" :label-col="{ span: 4 }" :wrapper-col="{ span: 15 }">
    <a-form-model-item label="商品售价">
      <a-input
      v-model.number="formData.price" />
    </a-form-model-item>
    <a-form-model-item label="销售折扣价">
      <a-input  v-model.number="formData.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存">
      <a-input v-model.number="formData.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计重单位">
      <a-input v-model="formData.unit" />
    </a-form-model-item>
    <a-form-model-item label="图片">
       <a-upload
      action="/upload/images?appkey=1755179168_1639361355771"
      list-type="picture-card"
      :file-list="formData.fileList"
      name="avatar"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="formData.fileList.length < 8">
        <a-icon :type="previewVisible ? 'loading' : 'plus' " />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    </a-form-model-item>
  <a-form-model-item>
    <a-button type="primary" class="next" @click="next">下一步</a-button>
    <a-button class="pre" @click="pre">上一步</a-button>
  </a-form-model-item>
  </a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['formData'],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      rules: {
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        inventory: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入商品计重单位', trigger: 'blur' }],
      },
    };
  },
  methods: {
    pre() {
      this.$emit('pre');
    },
    next() {
      this.$emit('next');
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || obj.preview;
      this.previewVisible = true;
    },
    //
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.formData.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const url = file.response ? file.response.data.url : file.url;
        this.formData.images = this.formData.images.filter((item) => item !== url);
      }
      this.formData.fileList = fileList;
    },

  },
};
</script>

<style scoped>
.pre{
  margin-left:100px;
}
</style>
