<template>
  <a-drawer title="详情" placement="right" :closable="false" v-model:open="dangerousWordsVisible"
    width="50%">
    <dangerWordsDetail></dangerWordsDetail>
  </a-drawer>
  <div >
    <a-modal v-model:open="open" title="敏感词列表" @ok="handleOk">
      <div>
        <a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="addSensitiveWords">
          <template #title>
            <p>请输入敏感词</p>
            <a-input v-model:value="sensitiveWord" placeholder="eg.悲痛欲绝" />
          </template>
          <a-button type="primary">
            新增+
          </a-button>
        </a-popconfirm>
        <span style="margin-left: 8px"></span>
        <a-button @click="deleteSensitiveWords">
            删除-
          </a-button>
      </div>
      <a-table :row-selection="{ selectedRowKeys: state2.selectedRowKeys2, onChange: onSelectChange2 }" :columns="columns2"
        :data-source="data2" @change="onChange2" :pagination="{ pageSize: 6 }">

      </a-table>
    </a-modal>
    <div style="margin-bottom: 16px;display: flex;">
      <a-button type="primary" :loading="state1.loading" @click="excel_output">
        导出为Excel
      </a-button>
      <span style="margin-left: 8px">
      </span>
      <a-button type="dashed" @click="showModal">
        敏感词列表
      </a-button>
    </div>

    <a-table :row-selection="{ selectedRowKeys: state1.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
      :data-source="data" @change="onChange" :pagination="{ pageSize: 6 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a @click="changedangerousWordsVisible">查看</a>
          </span>
        </template>
      </template> 
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import {ref,reactive,computed} from 'vue';
  import {Excel} from '../utils/excel';
  import ExcelJS from 'exceljs'
  import {TableColumnType,TableProps,UploadChangeParam,UploadProps,message} from 'ant-design-vue';
  import dangerWordsDetail from '../components/dangerWordsDetail.vue';
  import api from '../api/create';


  type Key = string | number;

  interface TableDataType{
    key: string;
    fullName: string;
    volunteerFullName:string
    className: string;
    sendTime: string;
    belong: string;
    sensitiveWords: string;
  };

  interface TableDataType2{
    key: string;
    sensitiveId:number;
    sensitiveWord: string;
  };

  //弹出抽屉
  let dangerousWordsVisible = ref<Boolean>(false);
  const sensitiveWord = ref('')

  function changedangerousWordsVisible(){
    dangerousWordsVisible.value = true;
  }

  const columns: TableColumnType < TableDataType > [] = [
    {
      title: '发送人姓名',
      dataIndex: 'fullName',
    },
    {
      title: '志愿者姓名',
      dataIndex: 'volunteerFullName',
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
      }],
      onFilter: (value: string, record: TableDataType) => record.className.indexOf(value) === 0,
    },
    {
      title: '发送时间',
      dataIndex: 'sendTime',
      sorter: (a: TableDataType, b: TableDataType) => a.sendTime.localeCompare(b.sendTime)

    },
    {
      title: '敏感词',
      dataIndex: 'sensitiveWords',
    },
    {
      title: '隶属',
      dataIndex: 'belong',
      filters: [{
        text: '海螺聊天室',
        value: '海螺聊天室',
      },
      {
        text: '论坛',
        value: '论坛',
      }],
      onFilter: (value: string, record: TableDataType) => record.belong.indexOf(value) === 0,
    },
    // {
    //   title: '操作',
    //   key: 'action',
    //   dataIndex: 'action',
    //   fixed: 'right',
    //   width: 100,
    // },
  ];

  const columns2: TableColumnType < TableDataType2 > [] = [
    {
      title: '敏感词',
      dataIndex: 'sensitiveWord',
    },
  ];

  const data:TableDataType = ref([])
  const data2:TableDataType = ref([])
  
  //弹出弹窗
  const open = ref<boolean>(false);
  const showModal = () => {
    open.value = true;
  };

  //弹窗中点击确认执行的方法
  const handleOk = (e: MouseEvent) => {
    console.log(e);
    open.value = false;
  };

  //敏感记录有变化时
  const onChange: TableProps < TableDataType > ['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  //敏感词有变化时
  const onChange2: TableProps < TableDataType > ['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  //敏感记录有选中时
  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state1.selectedRowKeys = selectedRowKeys;
  };

  //敏感词列表有变化时
  const onSelectChange2 = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys2 changed: ', selectedRowKeys);
    state2.selectedRowKeys2 = selectedRowKeys;
  };

  //敏感记录被选中的在里面的selectedRowKeys
  const state1 = reactive < {
    selectedRowKeys: Key[];
    loading: boolean;
  } > ({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });

  //敏感词被选中的在里面的selectedRowKeys
  const state2 = reactive < {
    selectedRowKeys2: Key[];
    loading2: boolean;
  } > ({
    selectedRowKeys2: [], // Check here to configure the default column
    loading2: false,
  });

  //敏感记录是否有被选中的记录
  const hasSelected = computed(() => state1.selectedRowKeys.length > 0);

  //导出excel代码
  const excel_output = () => {
    let newFileName = '敏感词记录';
    state1.loading = true;
    // ajax request after empty completing
    setTimeout(() => {
      state1.loading = false;
      state1.selectedRowKeys = [];
    }, 1000);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('sensitivewords_record');
    console.log(data.value[0]);
    
    const headers = Object.keys(data.value[0]);
    worksheet.addRow(headers);
    data.value.forEach(row => {
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

  //在对象数组中的每个对象加一个key值
  function addKey(array:any) {
    return array.map((obj:Object, index:number) => {
      return { key: index + 1,...obj};
    });
  }

  //获取敏感词列表
  api.getSensitiveWordsList()
  .then((res) => {
    console.log(res);
    data2.value = addKey(res.data);
  })
  .catch((error) => {
    console.log(error);
  })
  
  //新增敏感词
  const addSensitiveWords = ()=>{
    api.postSensitiveWords({sensitiveWord:sensitiveWord.value})
    .then((res)=>{
      console.log(res);

      //更新数据
      api.getSensitiveWordsList()
      .then((res) => {
        console.log(res);
        data2.value = addKey(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      message.success('上传成功~');
      sensitiveWord.value = '';
    })
    .catch((error)=>{
      console.log(error);
      message.error(error);
    })
  }

  //删除敏感词
  const deleteSensitiveWords = ()=>{
    console.log(state2);
    state2.selectedRowKeys2.forEach(element => {   
      let num = element-1;
      api.postDeleteSensitiveWords(data2.value[num].sensitiveId)
      .then((res)=>{
        console.log(res);
        //更新数据
        api.getSensitiveWordsList()
        .then((res) => {
          console.log(res);
          data2.value = addKey(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        message.success('删除成功~');
        })
      .catch((error)=>{
        console.log(error);
        message.error(error);
      })
    });
  }

  //给海螺聊天室响应的对象数组整形
  function transformObjects(array:any) {
    return array.map((obj:any) => {
        // 将 childrenClassName 改为 className
        if (obj.hasOwnProperty('childrenClassName')) {
            obj.className = obj.childrenClassName;
            delete obj.childrenClassName;
        }
        // 将 childrenFullName 改为 fullName
        if (obj.hasOwnProperty('childrenFullName')) {
            obj.fullName = obj.childrenFullName;
            delete obj.childrenFullName;
        }
        // 如果没有 volunteerFullName 属性，添加并设置为空字符串
        if (!obj.hasOwnProperty('volunteerFullName')) {
            obj.volunteerFullName = "尚未回复";
        }
        return obj;
    });
  }

  (//获取初始数据
  async function dataInitial(){
    //获取敏感词记录(海螺聊天室)
    await api.getHailuoSensitiveWordLog()
    .then((res) => {
      console.log(res);
      let middle = [];
      middle = res.data.map((obj:Object, index:number) => {
        return { belong:'海螺聊天室' , ...obj};
      });
      middle = transformObjects(middle);
      middle = middle.map((obj:Object, index:number) => {
        return {fullName:obj.fullName , volunteerFullName:'暂无志愿者回复',className: obj.className, sendTime: obj.sendTime, belong:'海螺聊天室' ,sensitiveWords:obj.sensitiveWords};
      });
      data.value = middle;
    })
    .catch((error) => {
      console.log(error);
    })

    //获取敏感词记录(论坛)
    await api.getForumSensitiveWordLog()
    .then((res) => {
      console.log(res);
      let middle = [];
      middle = res.data.map((obj:Object, index:number) => {
        return {fullName:obj.fullName , volunteerFullName:'无',className: obj.className, sendTime: obj.sendTime, belong:'论坛' ,sensitiveWords:obj.sensitiveWords};
      });
      data.value = data.value.concat(middle);
    })
    .catch((error) => {
      console.log(error);
    })
    data.value = addKey(data.value);
    console.log(data.value);
  })()
  
</script>

<style>

</style>