<template>
    <a-drawer title="该海螺详情" placement="right" :closable="false" v-model:open="visible" width="50%">
        <chat :hailuoid="clickhailuo"></chat>
    </a-drawer>
    <a-button type="primary" :loading="state1.loading" @click="excel_output">
        导出为Excel
    </a-button>
    <a-table :columns="columns" :data-source="hailuodata" @change="onChange" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <a @click="goto(record)">查看</a>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>

import API from '../api/create'
import ExcelJS from 'exceljs'
import type { TableColumnType, TableProps } from 'ant-design-vue';
import chat from './chat.vue'
import { ref, reactive, onMounted, watch } from 'vue';
const props = defineProps<{
    studentid: number; // 声明 props 的类型
}>();
watch(props, () => {
init();

},{
    deep:true
})
const init=()=>{
    console.log(props.studentid);
    
    API.getallHailuo(props.studentid)
        .then((res) => {
            console.log(res);
            hailuodata.value = res.data.map((item: any, index: number) => {
                return {
                    ...item, // 将原来的属性保留
                    key: index + 1 // 添加递增的键值，从 1 开始
                };
            });
            console.log(hailuodata.value);

        })
}
const clickhailuo = ref<number>();
const visible = ref<boolean>(false);
const state1 = reactive<{
    selectedRowKeys: any[];
    loading: boolean;
}>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
});
type TableDataType = {
    key: number;
    hailuo_id: number;
    volunteer_id: number;
    children_id: number;
    lastTime: string;
    state: string;
    unread: number;
};
type columnDataType = {
    header: string;
    key: number;
};
const columns: TableColumnType<TableDataType>[] = [
    {
        title: '海螺号',
        dataIndex: 'hailuo_id',

        sorter: (a: TableDataType, b: TableDataType) => a.hailuo_id - b.hailuo_id


    },
    {
        title: '志愿者id',
        dataIndex: 'volunteer_id',
        defaultSortOrder: 'descend',

    },

    {
        title: '最后时间',
        dataIndex: 'lastTime',

        sorter: (a: TableDataType, b: TableDataType) => a.lastTime.localeCompare(b.lastTime)

    }, {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const hailuodata = ref<TableDataType[]>([
    // {
    //     'key': '0',
    //     "volunteer_id": 0,
    //     "lastTime": "2024-04-25 20:20:47",
    //     "unread": 0,
    //     "hailuo_id": 54,
    //     "children_id": 10038,
    //     "state": "未分配"
    // }
]);
onMounted(() => {
init();
})
const excel_output = () => {
    let newFileName = '海螺聊天';
    state1.loading = true;
    // ajax request after empty completing
    setTimeout(() => {
        state1.loading = false;
        state1.selectedRowKeys = [];
    }, 1000);
    const workbook = new ExcelJS.Workbook();
    const worksheet:any = workbook.addWorksheet('sheet1');
    const headers = Object.keys(hailuodata.value[0]);
    worksheet.addRow(headers);
    hailuodata.value.forEach(row => {
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
        key: null,
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



const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
const goto = (x: any): void => {
    visible.value = true;
    console.log(x.hailuo_id);
    clickhailuo.value = x.hailuo_id
}
</script>