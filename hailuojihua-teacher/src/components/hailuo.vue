<template>
    <a-drawer title="该海螺详情" placement="right" :closable="false" v-model:open="visible" width="50%">
        <chat></chat>
    </a-drawer>
    <a-button type="primary" :loading="state1.loading" @click="excel_output">
        导出为Excel
    </a-button>
    <a-table :columns="columns" :data-source="data" @change="onChange" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <a @click="goto(record)">查看</a>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>
import {
    Excel
} from '../utils/excel';
import ExcelJS from 'exceljs'
import type { TableColumnType, TableProps } from 'ant-design-vue';
import chat from './chat.vue'
import { ref, reactive } from 'vue';
const visible = ref<boolean>(true);
const state1 = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
}>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
});
const excel_output = () => {
    let newFileName = '海螺聊天';
    state1.loading = true;
    // ajax request after empty completing
    setTimeout(() => {
        state1.loading = false;
        state1.selectedRowKeys = [];
    }, 1000);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('sheet1');
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    data.forEach(row => {
        console.log(row);
        worksheet.addRow(Object.values(row));
    });
    let x: columnDataType[] = columns.map((columnItem) => {
        const { title, dataIndex } = columnItem;
        return {
            header: title,
            key: dataIndex,

        } as columnDataType;
    });
    x.unshift({
        header: "索引",
        key: "key",
    });
    x.pop()
    worksheet.columns = x;
    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = newFileName + '.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(a.href);
    });
};

type TableDataType = {
    key: string;
    id: string;
    volunteer_id: number;
    volunteer_name: string;
    time: string
};
type columnDataType = {
    header: string;
    key: string;
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
    visible.value = true;
    console.log(x);
}
</script>