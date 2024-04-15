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
            <a-descriptions-item label="卡片内容"  span="3">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</a-descriptions-item>
            <a-descriptions-item label="卡片图" span="3">
                <a-image
                    :width="200"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </a-descriptions-item>
            <a-descriptions-item label="抽取时间" span="3">18:00:00</a-descriptions-item>
            <a-descriptions-item label="结束时间" span="3">18:00:00</a-descriptions-item>
            <a-descriptions-item label="学生感想" span="3"><div class="feeling">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div></a-descriptions-item>
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
    cardcontent: string;
    starttime: string;
    finishedtime: string;
    feeling: string
};

const columns: TableColumnType<TableDataType>[] = [
    {
        title: '卡片内容',
        dataIndex: 'cardcontent',
        ellipsis: true,
    },
    {
        title: '抽取时间',
        dataIndex: 'starttime',
        sorter: (a: TableDataType, b: TableDataType) => a.starttime.localeCompare(b.starttime)
    },
    
    {
        title: '完成时间',
        dataIndex: 'finishedtime',
        sorter: (a: TableDataType, b: TableDataType) => a.finishedtime.localeCompare(b.finishedtime),
    },

    {
        title: '学生感想',
        dataIndex: 'feeling',
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
        cardcontent: '天天开心~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
        starttime: '2024/4/15 10:47',
        finishedtime: '2024/4/15 10:48',
        feeling: '我很开心'
    }, {
        key: 'asdasd',
        cardcontent: '天天开心',
        starttime: '2024/4/15 10:47',
        finishedtime: '2024/4/15 10:48',
        feeling: '我很开心'
    }, {
        key: 'asdasd',
        cardcontent: '天天开心',
        starttime: '2024/4/15 10:47',
        finishedtime: '2024/4/15 10:48',
        feeling: '我很开心'
    }, {
        key: 'asdasd',
        cardcontent: '天天开心',
        starttime: '2024/4/15 10:47',
        finishedtime: '2024/4/15 10:48',
        feeling: '我很开心'
    }, {
        key: 'asdasd',
        cardcontent: '天天开心',
        starttime: '2024/4/15 10:47',
        finishedtime: '2024/4/15 10:48',
        feeling: '我很开心'
    },
];
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
const goto = (x: any): void => {
    console.log(x);
}
</script>

<style scoped>

.feeling{
    max-width: 300px;
}
:v-deep .ant-descriptions-item-label{
    min-width: 100px;
}
</style>