<template>
    <a-drawer title="该海螺详情" placement="right" :closable="false" v-model:open="visible"
         width="50%">
       <chat></chat>
    </a-drawer>
    <a-table :columns="columns" :data-source="data" @change="onChange" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <a @click="goto(record)">查看</a>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>

import type { TableColumnType, TableProps } from 'ant-design-vue';
import chat from './chat.vue'
import { ref } from 'vue';
const visible = ref<boolean>(true);


type TableDataType = {
    key: string;
    id: string;
    volunteer_id: number;
    volunteer_name: string;
    time: string
};

const columns: TableColumnType<TableDataType>[] = [
    {
        title: '海螺号',
        dataIndex: 'id',

        sorter: (a: TableDataType, b: TableDataType) => a.id.localeCompare(b.id)


    },
    {
        title: '志愿者id',
        dataIndex: 'volunteer_id',
        defaultSortOrder: 'descend',

    },
    {
        title: '志愿者名字',
        dataIndex: 'volunteer_name',
        defaultSortOrder: 'descend',
    },

    {
        title: '创建时间',
        dataIndex: 'time',

        sorter: (a: TableDataType, b: TableDataType) => a.time.localeCompare(b.time)

    }, {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const data: TableDataType[] = [
    {
        key: '1',
        id: '3',
        volunteer_id: 32,
        volunteer_name: 'New York No. 1 Lake Park',
        time: '2023-25-3 23:00:00',
    }, {
        key: '2',
        id: '3',
        volunteer_id: 32,
        volunteer_name: 'New York No. 1 Lake Park',
        time: '2023-25-1 23:00:00',
    }, {
        key: '3',
        id: '3',
        volunteer_id: 32,
        volunteer_name: 'New York No. 1 Lake Park',
        time: '2023-25-2 23:00:00',
    }, {
        key: '4',
        id: '3',
        volunteer_id: 32,
        volunteer_name: 'New York No. 1 Lake Park',
        time: '2023-25-5 23:00:00',
    }
];
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
const goto = (x: any): void => {
    visible.value=true;
    console.log(x);
}
</script>