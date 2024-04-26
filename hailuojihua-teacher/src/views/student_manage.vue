<template>
  <a-drawer :title="`${username}的海螺详情`" placement="right" :closable="false" v-model:open="chatVisible" width="50%">
    <hailuo :studentid="nowstudentid"></hailuo>
  </a-drawer>
  <a-drawer :title="`${username}的帖子详情`" placement="right" :closable="false" v-model:open="tieziVisible" width="50%">
    <tiezi :studentid="nowstudentid"></tiezi>
  </a-drawer>
  <a-drawer :title="`${username}的游戏详情`" placement="right" :closable="false" v-model:open="gameVisible" width="50%">
    <gameDetail :userId="userId"></gameDetail>
  </a-drawer>
  <div>
    <div style="margin-bottom: 16px;display: flex;">
      <a-button type="primary" :loading="state1.loading" @click="excel_output">
        导出为Excel
      </a-button>
      <span style="margin-left: 8px">
      </span>
      <a-popover title="tips:" trigger="hover" placement="top">
        <template #content>
          <p>请下载右侧模板编写后导入~</p>
        </template>
        <a-upload v-model:file-list="fileList" action="xxx" accept=".xlsx" name="file" :headers="headers"
          :before-upload="beforeUpload" @change="handleChange">
          <a-button>
            导入Excel
          </a-button>
        </a-upload>
      </a-popover>
      <span style="margin-left: 8px">
      </span>
      <a-button type="dashed" @click="downloadTemplate">
        下载模板
      </a-button>
    </div>

    <a-table :row-selection="{ selectedRowKeys: state1.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
      :data-source="dataSource" @change="onChange" :pagination="{ pageSize: 6 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a @click="changeChatVisible(record)">查看聊天室</a>
            <a-divider type="vertical" />
            <a @click="changetieziVisible(record)">查看论坛</a>
            <a-divider type="vertical" />
            <a @click="changeGameVisible(record)">查看游戏</a>
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
  message,
  notification
} from 'ant-design-vue';
import type {
  UploadChangeParam
} from 'ant-design-vue';
import type {
  UploadProps
} from 'ant-design-vue';
import hailuo from '../components/hailuo.vue'
import tiezi from '../components/tiezi.vue'
import gameDetail from '../components/gameDetail.vue'
import api from '../api/create'
import * as XLSX from 'xlsx';

type Key = string | number;

type TableDataType = {
  name: string;
  id: string;
  className: string;
  username: string;
};
let tieziVisible = ref<Boolean>(false);
let chatVisible = ref<Boolean>(false);
let gameVisible = ref<Boolean>(false);
let userId = ref();
let username = ref();
let NotificationDescription = '';
const nowstudentid = ref();
const openNotification = () => {
  notification.open({
    message: '操作失败~~',
    description: NotificationDescription,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const success = () => {
  message.success('XLSX文件导入成功~~', 3);
};
const progress = () => {
  const hide = message.loading('文件上传中，稍安勿躁~~', 0);
  setTimeout(hide, 2500);
};


function changeChatVisible(info: any) {
  chatVisible.value = true;
  nowstudentid.value = info.id;
  username = info.name;
}
function changetieziVisible(info: any) {
  tieziVisible.value = true;
  nowstudentid.value = info.id;
  username = info.name;
}

function changeGameVisible(info: any) {
  gameVisible.value = true;
  userId = info.id;
  username = info.name;
}

const columns: TableColumnType<TableDataType>[] = [{
  title: '姓名',
  dataIndex: 'name',
},
{
  title: '班级',
  dataIndex: 'className',
  filters: [{
    text: '一年级',
    value: '一年',
    children: [{
      text: '一年级1班',
      value: '一年1班',
    },
    {
      text: '一年级2班',
      value: '一年2班',
    },
    {
      text: '一年级3班',
      value: '一年3班',
    }
    ]
  },
  {
    text: '二年级',
    value: '二年',
    children: [{
      text: '二年级1班',
      value: '二年1班',
    },
    {
      text: '二年级2班',
      value: '二年2班',
    },
    {
      text: '二年级3班',
      value: '二年3班',
    }
    ]
  },
  {
    text: '三年级',
    value: '三年',
    children: [{
      text: '三年级1班',
      value: '三年1班',
    },
    {
      text: '三年级2班',
      value: '三年2班',
    },
    {
      text: '三年级3班',
      value: '三年3班',
    }
    ]
  }
  ],
  onFilter: (value: string, record: TableDataType) => record.className.indexOf(value) === 0,

},
{
  title: '昵称',
  dataIndex: 'username',
},
{
  title: '操作',
  key: 'action',
  dataIndex: 'action',
  fixed: 'right',
  width: 250,
},
];

const dataSource: TableDataType[] = ref([]);

const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
};

const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state1.selectedRowKeys = selectedRowKeys;
};

const state1 = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
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
  const headers = Object.keys(dataSource.value[0]);
  worksheet.addRow(headers);
  dataSource.value.forEach(row => {
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

//请求获取本校学生列表
api.getStudentList()
  .then((res) => {
    console.log(res);
    dataSource.value = res.data;
  })
  .catch((error) => {
    console.log(error);
  })

// 导入excel
const beforeUpload: UploadProps['beforeUpload'] = async (file: any) => {
  console.log(file);
  const header = ['username', 'name', "className", "password"];
  try {
    const excel = new Excel(file);
    // 导入文件获取数据
    const res = await excel.importExcel({
      header
    });
    console.log(res);

    const promises: any = [];
    promises.push(
      api.studentRegister({
        studentList: res
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
    );


    Promise.all(promises)
      .then(() => {
        return api.getStudentList();
      })
      .then((studentList) => {
        console.log(studentList);
        dataSource.value = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
  }
  return new Promise(() => { });
};

//下载模板
const writeFileAsync = (workbook: any, filename: string, options: Object) => {
  return new Promise((resolve, reject) => {
    try {
      XLSX.writeFile(workbook, filename, options);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const downloadTemplate = async () => {
  // 构造json
  const json = [{
    username: 'eg.xxx的昵称',
    name: 'eg.xxx的真名',
    className: 'eg.xxx的班级',
    password: 'eg.xxx的密码',
  }];

  // 将json数据转换成excel文件
  const worksheet = XLSX.utils.json_to_sheet(json);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  try {
    // 将excel 文件保存为blob
    const blob = await writeFileAsync(workbook, '批量注册模板.xlsx', {
      bookType: 'xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    if (blob instanceof Blob) {
      // 创建下载链接
      const url = window.URL.createObjectURL(blob);

      // 创建隐藏的a标签，设置下载链接并触发点击
      const a = document.createElement('a');
      a.href = url;
      a.download = 'excel.template.xlsx';
      document.body.appendChild(a);
      a.click();

      // 释放对象url
      window.URL.revokeObjectURL(url);

      // 等待5秒后关闭模态框
      setTimeout(() => {
        document.body.removeChild(a);
      }, 5000);
    } else {
      throw new Error('Invalid Blob');
    }
  } catch (error) {
    //console.error('Error creating object URL:', error);
  }
};
</script>

<style></style>