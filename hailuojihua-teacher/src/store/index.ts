import { defineStore } from 'pinia'

// 定义存储的类型
interface User {
  username: string;
  // 可以添加其他用户相关信息
}

// 创建并导出使用 Pinia 的 store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as User | null,
  }),
  actions: {
    login(username: string, password: string) {
      // 模拟登录请求
      // 如果登录成功，设置 isLoggedIn 为 true，并保存用户信息
      this.isLoggedIn = true
      this.user = { username }
    },
    logout() {
      // 模拟注销操作
      // 设置 isLoggedIn 为 false，并清除用户信息
      this.isLoggedIn = false
      this.user = null
    },
  },
})
