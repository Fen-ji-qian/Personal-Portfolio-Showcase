<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const route = useRoute()
const userId = route.params.id

const form = ref({
  name: '',
  email: '',
  role: 'viewer',
  active: true
})

const loading = ref(false)
const error = ref('')

const fetchUser = async () => {
  loading.value = true
  
  try {
    const { data, error: supabaseError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (supabaseError) throw supabaseError
    
    form.value = {
      name: data.name,
      email: data.email,
      role: data.role,
      active: data.active
    }
  } catch (err: any) {
    error.value = err.message || '获取用户信息失败'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  
  try {
    const { error: dbError } = await supabase
      .from('users')
      .update({
        name: form.value.name,
        role: form.value.role,
        active: form.value.active
      })
      .eq('id', userId)
    
    if (dbError) throw dbError
    
    router.push('/admin/users')
  } catch (err: any) {
    error.value = err.message || '更新用户失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">编辑用户</h1>
        <p class="text-gray-600">修改用户信息</p>
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
              disabled 
              class="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              placeholder="请输入邮箱"
            />
            <p class="text-xs text-gray-500 mt-1">邮箱不可修改</p>
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
              {{ loading ? '保存中...' : '保存' }}
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