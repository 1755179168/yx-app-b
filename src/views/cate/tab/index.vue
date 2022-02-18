<template>
  <a-table
    ref="container"
    v-if="total !== 0"
    :columns="columns"
    :data-source="tab"
    :pagination="option"
    @change="changePage"
  >
    <div slot="operation" class="operation" slot-scope="text, record">
      <a-button type="primary" @click="productEdit(record)">编辑 </a-button
      ><a-button type="danger" @click="btnclick(record.id)">删除</a-button>
    </div>
    <span slot="action" slot-scope="text, record">
      <a>Invite 一 {{ record.name }}</a>
      <a-divider type="vertical" />
      <a>Delete</a>
      <a-divider type="vertical" />
      <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
    </span>
  </a-table>
</template>
<script>
import removeProduct from '@/api/removeProduct';

const columns = [
  {
    title: '产品',
    dataIndex: 'c_item',
    key: 'c_item',
  },
  {
    title: '描述',
    dataIndex: 'a',
    key: 'a',
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: '种类',
    key: 'category',
    dataIndex: 'category',
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '限制购数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  data() {
    return {
      columns,
      option: {
        total: this.total,
        current: 1,
        defaultCurrent: 1,
        defaultPageSize: 10,
        hideOnSinglePage: true,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    };
  },
  props: {
    tabData: {
      type: Array,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    tab() {
      return this.tabData.map((r) => ({
        ...r,
        price_off: r.price_off ? r.price_off : '无折扣',
        key: r.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      this.option = {
        ...page,
      };
      this.$emit('click', page);
    },
    productEdit(record) {
      this.$router.push({
        name: 'productEdit',
        params: {
          productId: record.id,
        },
      });
    },
    btnclick(record) {
      const self = this;
      this.$confirm({
        title: '确定要删除这件商品？',
        async onOk() {
          const url = `/products/${record}`;
          const data = await removeProduct(url);
          if (data.status === 'success') {
            self.$message.success('删除成功！');
          }
        },
        class: 'test',
        cancelText: '取消',
        okText: '删除',
        centered: true,
        closable: true,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.operation .ant-btn {
  margin-left: 10px;
}
</style>
