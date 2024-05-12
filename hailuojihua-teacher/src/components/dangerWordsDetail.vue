<template>
    <a-table :columns="columns" :data-source="data" @change="onChange" :pagination="{ pageSize: 10 }">
    <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
            <a @click="showModal">详情</a>
        </template>
    </template>
    </a-table>
    <a-modal v-model:open="open" title="记录详情" @ok="handleOk">
        <a-descriptions bordered :size="size">
            <a-descriptions-item label="聊天人"  span="3">轩祉毛</a-descriptions-item>
            <a-descriptions-item label="聊天时间" span="3">2024/4/15 13:57</a-descriptions-item>
            <a-descriptions-item label="敏感词" span="3">damn</a-descriptions-item>
            <a-descriptions-item label="聊天内容" span="3"><div class="chatcontent-container">damndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamndamn</div></a-descriptions-item>
        </a-descriptions>
    </a-modal>
</template>

<script setup lang="ts">
import type { TableColumnType, TableProps } from 'ant-design-vue';
import { ref } from 'vue';
import type { DescriptionsProps } from 'ant-design-vue';

const size = ref<DescriptionsProps['size']>('default');
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

type TableDataType = {
    key: string;
    people: string;
    chattime: string;
    dangerouskeywords: string;
    chatcontent: string
};

const columns: TableColumnType<TableDataType>[] = [
    {
        title: '聊天人',
        dataIndex: 'people',
        ellipsis: true,
    },
    {
        title: '聊天时间',
        dataIndex: 'chattime',
        sorter: (a: TableDataType, b: TableDataType) => a.chattime.localeCompare(b.chattime)
    },
    
    {
        title: '敏感词',
        dataIndex: 'dangerouskeywords',
    },

    {
        title: '聊天内容',
        dataIndex: 'chatcontent',
        ellipsis: true,
    },
    {
        title: '',
        key: 'operation',
    }
];

const data: TableDataType[] = [
    {
        key: 'asdasd',
        people: '天天开心~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
        chattime: '2024/4/15 10:47',
        dangerouskeywords: '2024/4/15 10:48',
        chatcontent: '我很开心'
    }
];
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};

</script>

<style scoped>

.chatcontent-container{
    max-width: 300px;
}

</style>