<template>
    <a-table :columns="columns" :data-source="data" @change="onChange" :pagination="{ pageSize: 10 }">
    </a-table>
</template>
<script lang="ts" setup>

import type { TableColumnType, TableProps } from 'ant-design-vue';
import { ref } from 'vue';
const visible = ref<boolean>(true);


type TableDataType = {
    key: string;
    id: string;
    people_id: number;
    content: string;
    time: string
};

const columns: TableColumnType<TableDataType>[] = [
    {
        title: '聊天信息号',
        dataIndex: 'id',

        sorter: (a: TableDataType, b: TableDataType) => a.id.localeCompare(b.id)


    },
    {
        title: '发送人',
        dataIndex: 'people_id',
        defaultSortOrder: 'descend',

    },
    {
        title: '发送内容',
        dataIndex: 'content',
        defaultSortOrder: 'descend',
    },

    {
        title: '发送时间',
        dataIndex: 'time',

        sorter: (a: TableDataType, b: TableDataType) => a.time.localeCompare(b.time)

    },
];

const data: TableDataType[] = [
    {
        key: '1',
        id: '3',
        people_id: 32,
        content: 'New York No. 1 Lake Park',
        time: '2023-25-3 23:00:00',
    }, {
        key: '2',
        id: '3',
        people_id: 32,
        content: 'New York No. 1 Lake Park',
        time: '2023-25-3 23:00:00',
    }, {
        key: '3',
        id: '3',
        people_id: 32,
        content: 'New York No. 1 Lake Park',
        time: '2023-25-3 23:00:00',
    }, {
        key: '4',
        id: '3',
        people_id: 32,
        content: 'New York No. 1 Lake Park',
        time: '2023-25-3 23:00:00',
    }, {
        key: '5',
        id: '3',
        people_id: 32,
        content: 'New York No. 1 Lake Park',
        time: '2023-25-3 23:00:00',
    },
];
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
const goto = (x: any): void => {
    console.log(x);
}
</script>