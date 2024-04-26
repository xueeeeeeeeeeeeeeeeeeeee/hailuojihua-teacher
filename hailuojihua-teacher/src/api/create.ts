import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import router from '../router'; // 假设你的路由器实例被导入为 router

// 创建 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://124.220.40.115:82',
  timeout: 5000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization =token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response:any) => {
    if(response.data.code===201){
        router.push('/login');
    }
        return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 定义接口
interface Api {
  login(data: any): Promise<any>;
  readOnestudent(hailuoId:number): Promise<any>;
  studentRegister(data:any): Promise<any>;
  getschoolList():Promise<any>;
  readOnehailuo(hailuoId:number):Promise<any>;
  getStudentList():Promise<any>;
  getStudentCards(hailuoId:number):Promise<any>;
  getallHailuo(studentid:number):Promise<any>;
}

const api: Api = {
  login: (data) => axiosInstance.post('/sign/psd_login', data),
  readOnestudent: (hailuoId) => axiosInstance.get(`/teacher/readOne/${hailuoId}`),
  studentRegister: (data) => axiosInstance.post('/teacher/studentRegister', data),
  getschoolList: () => axiosInstance.get(`/sign/schoolList`),
  readOnehailuo: (hailuoId) => axiosInstance.get(`/teacher/readOne/${hailuoId}`),
  getStudentList: () => axiosInstance.get(`/teacher/studentList`),
  getStudentCards: (hailuoId) => axiosInstance.get(`/teacher/emotionalCardHistory/${hailuoId}`),
  getallHailuo: (studentid) => axiosInstance.get(`/teacher/allHailuo/${studentid}`),
};

export default api;
