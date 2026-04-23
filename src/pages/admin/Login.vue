<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  try {
    await authStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || '登录失败，请检查邮箱和密码'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600 p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-900 mb-2">管理系统</h1>
        <p class="text-gray-600">请登录以访问管理界面</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <input 
            id="email" 
            type="email" 
            v-model="email" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入邮箱"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input 
            id="password" 
            type="password" 
            v-model="password" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入密码"
          />
        </div>
        
        <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded-md">
          {{ error }}
        </div>
        
        <button 
          type="submit" 
          :disabled="loading" 
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <a href="#" class="text-blue-600 hover:underline text-sm">忘记密码？</a>
      </div>
    </div>
  </div>
</template>