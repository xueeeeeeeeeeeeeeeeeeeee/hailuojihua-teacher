<template>
    <a-table :columns="columns" :data-source="data" @change="onChange" :pagination="{ pageSize: 10 }">
    <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'operation'">
            <a @click="showModal(record)">详情</a>
        </template>
    </template>
    </a-table>
    <a-modal v-model:open="open" title="记录详情" @ok="handleOk">
        <a-descriptions bordered :size="size">
            <a-descriptions-item label="卡片标题"  span="3"><div class="width-limit">{{ record.title }}</div></a-descriptions-item>
            <a-descriptions-item label="卡片内容"  span="3"><div class="width-limit">{{ record.content }}</div></a-descriptions-item>
            <a-descriptions-item label="卡片图" span="3">
                <a-image
                    :width="200"
                    :src="`http://124.220.40.115:82/images/pic3/${record.image}`"
                />
            </a-descriptions-item>
            <a-descriptions-item label="抽取时间" span="3"><div class="width-limit">{{ record.createTime }}</div></a-descriptions-item>
            <a-descriptions-item label="学生感想" span="3"><div class="width-limit">{{ record.feedback }}</div></a-descriptions-item>
        </a-descriptions>
    </a-modal>
</template>

<script setup lang="ts">
import type { TableColumnType, TableProps } from 'ant-design-vue';
import {  ref, watch , defineProps } from 'vue';
import type { DescriptionsProps } from 'ant-design-vue';
import api from '../api/create';

const props = defineProps(['userId'])

watch(props,(newValue)=>{
    //获取学生卡片列表
    api.getStudentCards(newValue.userId)
    .then((res)=>{
        console.log(res);
        data.value = res.data;
    })
    .catch((error)=>{
        console.log(error);
    })
},
{deep:true})
const size = ref<DescriptionsProps['size']>('default');
const open = ref<boolean>(false);
const record = ref<any>({});

//控制窗口弹出
const showModal = (res:any) => {
  open.value = true;
  record.value = res;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};


//表格数据类型
type TableDataType = {
    cardId: number,
    content: string,
    createTime: string,
    feedback: string,
    image: string,
    logId: number,
    title: string
};

//表格标头
const columns: TableColumnType<TableDataType>[] = [
    {
        title: '卡片标题',
        dataIndex: 'title',
        ellipsis: true,
    },
    {
        title: '卡片内容',
        dataIndex: 'content',
        ellipsis: true,
    },
    {
        title: '抽取时间',
        dataIndex: 'createTime',
        sorter: (a: TableDataType, b: TableDataType) => a.createTime.localeCompare(b.createTime)
    },
    {
        title: '学生感想',
        dataIndex: 'feedback',
        ellipsis: true,
    },
    {
        title: '',
        key: 'operation',
    }
];

const data = ref<TableDataType[]>([]);
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};

//获取学生卡片列表
api.getStudentCards(props.userId)
.then((res)=>{
    console.log(res);
    data.value = res.data;
})
.catch((error)=>{
    console.log(error);
})
</script>

<style scoped>

.width-limit{
    max-width: 300px;
}
:v-deep .ant-descriptions-item-label{
    min-width: 100px;
}
</style>