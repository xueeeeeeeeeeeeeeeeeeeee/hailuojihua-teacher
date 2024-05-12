<template>
    <div class="tiezi">
        <div class="tiezi-title">帖子标题：{{ detail.title }}</div>
        <div class="tiezi-content">帖子内容：{{ detail.content }}</div>
        <a-carousel :after-change="onChange">
            <div v-for="item in detail.images">
                <a-image :src="`http://124.220.40.115:82/images/${item}`" alt="" />
            </div>
        </a-carousel>
    </div>
    <a-table :columns="columns" :data-source="data" @change="onChange" :pagination="{ pageSize: 5 }">
    </a-table>
</template>
<script lang="ts" setup>

import type { TableColumnType, TableProps } from 'ant-design-vue';
import { ref, onMounted, reactive, watch } from 'vue';
import API from '../api/create'
const props = defineProps<{
    hailuoid: number; // 声明 props 的类型
}>();
let detail = reactive<detailTYPE>({
    images: "",
    content: "",
    title: ""
});
watch(props, () => {
    init();

}, {
    deep: true
});
const init = () => {
    console.log(props.hailuoid);
    API.getonetiezi(props.hailuoid)
        .then((res) => {
            console.log(res.data);
            detail.images = JSON.parse(res.data.images)
            detail.content = res.data.content
            detail.title = res.data.title
            data.value = res.data.comments
        })
}
onMounted(() => {
    init();
})
type TableDataType = {
    key: number;
    identity: string;
    content: string;
    createTime: string
};
type detailTYPE = {
    images: any;
    content: string;
    title: string;
};

const columns: TableColumnType<TableDataType>[] = [
    {
        title: '发送人',
        dataIndex: 'identity',
        defaultSortOrder: 'descend',

    },
    {
        title: '发送内容',
        dataIndex: 'content',
        defaultSortOrder: 'descend',
    },

    {
        title: '发送时间',
        dataIndex: 'createTime',

        sorter: (a: TableDataType, b: TableDataType) => a.createTime.localeCompare(b.createTime)

    },
];

const data = ref<TableDataType[]>([
]);
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
// const goto = (x: any): void => {
//     console.log(x);
// }
</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>