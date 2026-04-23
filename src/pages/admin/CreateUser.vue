<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'viewer',
  active: true
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  
  try {
    // 创建用户
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.value.email,
      password: form.value.password
    })
    
    if (authError) throw authError
    
    // 创建用户记录
    const { error: dbError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        name: form.value.name,
        email: form.value.email,
        role: form.value.role,
        active: form.value.active
      })
    
    if (dbError) throw dbError
    
    router.push('/admin/users')
  } catch (err: any) {
    error.value = err.message || '创建用户失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">创建用户</h1>
        <p class="text-gray-600">添加新用户</p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input 
              id="name" 
              type="text" 
              v-model="form.name" 
              required 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入用户名"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input 
              id="email" 
              type="email" 
              v-model="form.email" 
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
              v-model="form.password" 
              required 
              minlength="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
            />
          </div>
          
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">角色</label>
            <select 
              id="role" 
              v-model="form.role" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="viewer">查看者</option>
              <option value="editor">编辑</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          
          <div class="flex items-center">
            <input 
              id="active" 
              type="checkbox" 
              v-model="form.active" 
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="active" class="ml-2 block text-sm text-gray-700">
              活跃状态
            </label>
          </div>
          
          <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded-md">
            {{ error }}
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              type="submit" 
              :disabled="loading" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? '创建中...' : '创建' }}
            </button>
            <button 
              type="button" 
              @click="router.push('/admin/users')" 
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>