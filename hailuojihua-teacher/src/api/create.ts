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
  getSensitiveWordsList():Promise<any>;
  postSensitiveWords(data: any):Promise<any>;
  postDeleteSensitiveWords(sensitiveId: any):Promise<any>;
  getHailuoSensitiveWordLog():Promise<any>;
  getForumSensitiveWordLog():Promise<any>;
  getonetiezi(postId:number):Promise<any>;
  getalltiezi(studentid:number):Promise<any>;
  getalluser():Promise<any>;
  getallpostNumber():Promise<any>;
  getallhailuoNumber():Promise<any>;
  getmoodPostHailuoNumber():Promise<any>;
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
  getSensitiveWordsList: () => axiosInstance.get(`/teacher/sensitiveWordList`),
  postSensitiveWords: (data) => axiosInstance.post('/teacher/postSensitiveWord', data),
  postDeleteSensitiveWords: (sensitiveId) => axiosInstance.post(`/teacher/deleteSensitiveWord/${sensitiveId}`),
  getHailuoSensitiveWordLog: () => axiosInstance.get(`/teacher/HailuoSensitiveWordLog`),
  getForumSensitiveWordLog: () => axiosInstance.get(`/teacher/ForumSensitiveWordLog`),
  getalltiezi: (studentid) => axiosInstance.get(`/teacher/userPosts/${studentid}`),
  getonetiezi: (postId) => axiosInstance.get(`/teacher/viewCompletePost/${postId}`),
  getalluser: () => axiosInstance.get(`/statistics/userNumber`),
  getallpostNumber: () => axiosInstance.get(`/statistics/postNumber`),
  getallhailuoNumber: () => axiosInstance.get(`/statistics/hailuoNumber`),
  getmoodPostHailuoNumber: () => axiosInstance.get(`/statistics/moodPostHailuoNumber`),
};

export default api;
