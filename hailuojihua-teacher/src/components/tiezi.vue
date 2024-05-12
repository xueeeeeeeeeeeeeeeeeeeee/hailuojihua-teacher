<template>
    <a-drawer title="该帖子详情" placement="right" :closable="false" v-model:open="visible" width="50%">
        <tiezidetail :hailuoid="clickhailuo"></tiezidetail>
    </a-drawer>
    <!-- <a-button type="primary" :loading="state1.loading" @click="excel_output">
        导出为Excel
    </a-button> -->
    <a-table :columns="columns" :data-source="tiezidata" @change="onChange" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <a @click="goto(record)">查看</a>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>

import API from '../api/create'

import type { TableColumnType, TableProps } from 'ant-design-vue';
import tiezidetail from './tiezidetail.vue'
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
    
    API.getalltiezi(props.studentid)
        .then((res) => {
            console.log(res);
            tiezidata.value = res.data.map((item: any, index: number) => {
                return {
                    ...item, // 将原来的属性保留
                    key: index + 1 // 添加递增的键值，从 1 开始
                };
            });
            console.log(tiezidata.value);

        })
}
const clickhailuo = ref<number>();
const visible = ref<boolean>(false);
// const state1 = reactive<{
//     selectedRowKeys: any[];
//     loading: boolean;
// }>({
//     selectedRowKeys: [], // Check here to configure the default column
//     loading: false,
// });
type TableDataType = {
    key: number;
    postId: number;
    title: string;
    content: string;
    createTime: string;
};
// type columnDataType = {
//     header: string;
//     key: number;
// };
const columns: TableColumnType<TableDataType>[] = [
    {
        title: '帖子号',
        dataIndex: 'postId',

        sorter: (a: TableDataType, b: TableDataType) => a.postId - b.postId


    },
    {
        title: '标题',
        dataIndex: 'title',
        defaultSortOrder: 'descend',

    }, {
        title: '内容',
        dataIndex: 'content',

    },

    {
        title: '时间',
        dataIndex: 'createTime',

        sorter: (a: TableDataType, b: TableDataType) => a.createTime.localeCompare(b.createTime)

    }, {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

const tiezidata = ref<TableDataType[]>([
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
    console.log(props.studentid);
    
init();
})
// const excel_output = () => {
//     let newFileName = '海螺聊天';
//     state1.loading = true;
//     // ajax request after empty completing
//     setTimeout(() => {
//         state1.loading = false;
//         state1.selectedRowKeys = [];
//     }, 1000);
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('sheet1');
//     const headers = Object.keys(hailuodata.value[0]);
//     worksheet.addRow(headers);
//     hailuodata.value.forEach(row => {
//         console.log(row);
//         worksheet.addRow(Object.values(row));
//     });
//     let x: columnDataType[] = columns.map((columnItem) => {
//         const { title, dataIndex } = columnItem;
//         return {
//             header: title,
//             key: dataIndex,

//         } as columnDataType;
//     });
//     x.unshift({
//         header: "索引",
//         key: "key",
//     });
//     x.pop()
//     worksheet.columns = x;
//     workbook.xlsx.writeBuffer().then((data) => {
//         let blob = new Blob([data], {
//             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//         });
//         const a = document.createElement('a');
//         a.href = URL.createObjectURL(blob);
//         a.download = newFileName + '.xlsx';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(a.href);
//     });
// };



const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
const goto = (x: any): void => {
    visible.value = true;
    console.log(x.hailuo_id);
    clickhailuo.value = x.postId
}
</script>