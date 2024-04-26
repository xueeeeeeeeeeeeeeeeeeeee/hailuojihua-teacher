<template>
  <a-drawer title="详情" placement="right" :closable="false" v-model:open="dangerousWordsVisible"
    width="50%">
    <dangerWordsDetail></dangerWordsDetail>
  </a-drawer>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" :loading="state1.loading" @click="excel_output">
        导出为Excel
      </a-button>
      <span style="margin-left: 8px">
      </span>
      <a-upload v-model:file-list="fileList" action="xxx" accept=".xlsx" name="file" :headers="headers"
        :before-upload="beforeUpload" @change="handleChange">
        <a-button>
          导入Excel
        </a-button>
      </a-upload>
    </div>

    <a-table :row-selection="{ selectedRowKeys: state1.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
      :data-source="data" @change="onChange" :pagination="{ pageSize: 6 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a @click="changedangerousWordsVisible">查看</a>
            <a-divider type="vertical" />
            <a>删除</a>
            <a-divider type="vertical" />
          </span>
        </template>
      </template> 
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import {
    ref,
    reactive,
    computed
  } from 'vue';
  import {
    Excel
  } from '../utils/excel';
  import ExcelJS from 'exceljs'
  import type {
    TableColumnType,
    TableProps
  } from 'ant-design-vue';
  import {
    message
  } from 'ant-design-vue';
  import type {
    UploadChangeParam
  } from 'ant-design-vue';
  import type {
    UploadProps
  } from 'ant-design-vue';
  import dangerWordsDetail from '../components/dangerWordsDetail.vue';


  type Key = string | number;

  type TableDataType = {
    key: string;
    id: string;
    name: string;
    age: number;
    address: string;
  };

  let dangerousWordsVisible = ref<Boolean>(false);
  function changedangerousWordsVisible(){
    dangerousWordsVisible.value = true;
  }

  const columns: TableColumnType < TableDataType > [] = [{
      title: '学号',
      dataIndex: 'id',
      sorter: (a: TableDataType, b: TableDataType) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '姓名',
      dataIndex: 'name',
      filters: [{
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [{
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value: string, record: TableDataType) => record.name.indexOf(value) === 0,
      sorter: (a: TableDataType, b: TableDataType) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      ellipsis: true,
      sorter: (a: TableDataType, b: TableDataType) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ellipsis: true,
      filters: [{
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: false,
      onFilter: (value: string, record: TableDataType) => record.address.indexOf(value) === 0,
      sorter: (a: TableDataType, b: TableDataType) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action', 
      fixed: 'right',
      width: 200,
    },
  ];

  const data: TableDataType[] = [{
      key: '1',
      id: 'asdwadasd',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      id: 'asdwadasd',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '3',
      id: 'asdwadasd',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '4',
      id: 'asdwadasd',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '5',
      id: 'asdwadasd',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '6',
      id: 'asdwadasd',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '7',
      id: 'asdwadasd',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '8',
      id: 'asdwadasd',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '9',
      id: 'asdwadasd',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },

    {
      key: '10',
      id: 'asdwadasd',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '11',
      id: 'asdwadasd',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ]
  const onChange: TableProps < TableDataType > ['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state1.selectedRowKeys = selectedRowKeys;
  };

  const state1 = reactive < {
    selectedRowKeys: Key[];
    loading: boolean;
  } > ({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });
  const hasSelected = computed(() => state1.selectedRowKeys.length > 0);

  //导出excel代码
  const excel_output = () => {
    let newFileName = '学生信息';
    state1.loading = true;
    // ajax request after empty completing
    setTimeout(() => {
      state1.loading = false;
      state1.selectedRowKeys = [];
    }, 1000);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('students_info');
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
    data.forEach(row => {
      console.log(row);
      worksheet.addRow(Object.values(row));
    });
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

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  const fileList = ref([]);
  const headers = {
    authorization: 'authorization-text',
  };

  // 上传组件ref


  const beforeUpload: UploadProps['beforeUpload'] = async (file: any) => {
    console.log(file);
    const header = ['id', 'name', 'age'];
    try {

      const excel = new Excel(file);
      // 导入文件获取数据
      const res = await excel.importExcel({
        header
      });
      data.value = res;
      console.log(data.value);
    } catch (err) {
      console.log(err);
    }
    return new Promise(() => {});
  };
</script>

<style>

</style>