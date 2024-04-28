<template>
    <a-table :columns="columns" :data-source="data" @change="onChange" :pagination="{ pageSize: 10 }">
    </a-table>
</template>
<script lang="ts" setup>

import type { TableColumnType, TableProps } from 'ant-design-vue';
import { ref, onMounted } from 'vue';
import API from '../api/create'
const props = defineProps<{
    hailuoid: number; // 声明 props 的类型
}>();
onMounted(() => {
    console.log(props.hailuoid);
    API.readOnehailuo(props.hailuoid)
        .then((res) => {
            console.log(res.data.chatLog);
            // data.value=res.data.chatLog
            data.value = res.data.chatLog.map((item: any, index: number) => {
                return {
                    ...item, // 将原来的属性保留
                    key: index + 1 // 添加递增的键值，从 1 开始
                };
            });
        })
})
type TableDataType = {
    key: number;
    identity: string;
    content: string;
    sendTime: string
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
        dataIndex: 'sendTime',
        sorter: (a: TableDataType, b: TableDataType) => a.time.localeCompare(b.time)

    },
];

const data = ref<TableDataType[]>([
    {
        "key": 0,
        "identity": "儿童",
        "content": "111",
        "sendTime": "2024-04-25 20:20:46"
    }
]);
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
// const goto = (x: any): void => {
//     console.log(x);
// }
</script>