<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { ref } from 'vue'

const settings = ref({
  siteName: '管理系统',
  theme: 'light',
  notifications: {
    email: true,
    push: false
  }
})

const loading = ref(false)
const success = ref('')

const handleSubmit = async () => {
  loading.value = true
  success.value = ''
  
  // 模拟保存设置
  setTimeout(() => {
    loading.value = false
    success.value = '设置已保存'
    
    // 3秒后清除成功消息
    setTimeout(() => {
      success.value = ''
    }, 3000)
  }, 1000)
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">设置</h1>
        <p class="text-gray-600">配置系统参数和个人偏好</p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">系统配置</h2>
            
            <div class="space-y-4">
              <div>
                <label for="siteName" class="block text-sm font-medium text-gray-700 mb-1">网站名称</label>
                <input 
                  id="siteName" 
                  type="text" 
                  v-model="settings.siteName" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入网站名称"
                />
              </div>
              
              <div>
                <label for="theme" class="block text-sm font-medium text-gray-700 mb-1">主题</label>
                <select 
                  id="theme" 
                  v-model="settings.theme" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">浅色</option>
                  <option value="dark">深色</option>
                  <option value="system">跟随系统</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">通知设置</h2>
            
            <div class="space-y-4">
              <div class="flex items-center">
                <input 
                  id="emailNotifications" 
                  type="checkbox" 
                  v-model="settings.notifications.email" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="emailNotifications" class="ml-2 block text-sm text-gray-700">
                  邮件通知
                </label>
              </div>
              
              <div class="flex items-center">
                <input 
                  id="pushNotifications" 
                  type="checkbox" 
                  v-model="settings.notifications.push" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="pushNotifications" class="ml-2 block text-sm text-gray-700">
                  推送通知
                </label>
              </div>
            </div>
          </div>
          
          <div v-if="success" class="bg-green-100 text-green-700 p-3 rounded-md">
            {{ success }}
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              type="submit" 
              :disabled="loading" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? '保存中...' : '保存设置' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>