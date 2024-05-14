<template>
    <a-drawer placement="right" :closable="false" v-model:open="chatVisible" width="50%">
        <zhucevolunteer :studentid="userId"></zhucevolunteer>
    </a-drawer>

    <div>
        <div style="margin-bottom: 16px;display: flex;">
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
            <span style="margin-left: 8px">
            </span>
            <a-button type="dashed" @click="changeChatVisible">
                注册志愿者
            </a-button>
        </div>


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

import {
    message
} from 'ant-design-vue';
import type {
    UploadChangeParam
} from 'ant-design-vue';
import type {
    UploadProps
} from 'ant-design-vue';
import zhucevolunteer from '../components/zhucevolunteer.vue'
import tiezi from '../components/tiezi.vue'
import gameDetail from '../components/gameDetail.vue'
import api from '../api/create'
import * as XLSX from 'xlsx';

type Key = string | number;

interface TableDataType {
    [key: string]: any;
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

const successMes = (mes) => {
    message.success(mes, 3);
};
const errorMes = (mes) => {
    message.error(mes, 3);
};
const key = 'updatable';
const openMessage = (status: string) => {
    message.loading({ content: '上传中...', key, duration: 0 });
    if (status === 'isblank') {
        message.error({ content: '检测到表单中有空白值，请重新上传！', key, duration: 3 });
    } else if (status === 'isrepeat') {
        message.error({ content: '检测到表单中有重复用户名，请重新上传！', key, duration: 3 });
    } else if (status === 'notcomplete') {
        message.warning({ content: '有个别未上传成功，请重新上传未成功项!', key, duration: 2 });
    } else if (status === 'isfinished') {
        message.success({ content: '上传成功!', key, duration: 2 });
    }
};

function changeChatVisible(info: any) {
    chatVisible.value = true;
    // gameVisible.value = true;
    userId = info.id;
    username = info.name;
}

const dataSource: TableDataType[] = ref([]);



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

// 判断数组中是否有对象拥有重复的 username
function hasDuplicateUsername(array: any) {
    const usernames = new Set();
    for (const obj of array) {
        if (usernames.has(obj.username)) {
            return true; // 发现重复的 username
        }
        usernames.add(obj.username);
    }
    return false; // 没有重复的 username
}

// 判断数组中是否有对象的属性为空
function hasMissingProperties(array: any) {
    const requiredProps = ['volunteer_id', 'activity_seconds', 'start_time', 'end_time']
    for (const obj of array) {
        for (const prop of requiredProps) {
            if (!(prop in obj)) {
                return true; // 发现缺少属性的对象
            }
        }
    }
    return false; // 没有缺少属性的对象
}

// 导入excel
const beforeUpload: UploadProps['beforeUpload'] = async (file: any) => {
    let flag = 1;
    openMessage('');
    const header = ['volunteer_id', 'activity_seconds', 'start_time', 'end_time'];
    try {
        const excel = new Excel(file);
        // 导入文件获取数据
        const res = await excel.importExcel({
            header
        });
        console.log(res);
        //在注册前对数据进行检测
        if (hasMissingProperties(res)) {
            openMessage('isblank');
            return new Promise(() => { });
        } else if (hasDuplicateUsername(res)) {
            openMessage('isrepeat');
            return new Promise(() => { });
        }
        const promises: any = [];
        console.log(res);


        api.activityregistration({
            activityList: res
        })
            .then((res) => {
                console.log(res);
                if (res.msg == "服务器未知错误") {
                    errorMes('快去找毛祉轩');
                    flag = 0;
                }
                if (flag === 1) {
                    openMessage('isfinished');
                } else {
                    openMessage('notcomplete');
                }
            })
            .catch((error) => {
                console.log(error);
                errorMes(error);
            })

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
        volunteer_id: 'uuid登录之后在个人页面查看',
        activity_seconds: '获得的时数',
        start_time: '按照xxxx-xx-xx xx:xx:xx注意位数',
        end_time: '按照xxxx-xx-xx xx:xx:xx注意位数',
    }];

    // 将json数据转换成excel文件
    const worksheet = XLSX.utils.json_to_sheet(json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    try {
        // 将excel 文件保存为blob
        const blob = await writeFileAsync(workbook, '批量工作模板.xlsx', {
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