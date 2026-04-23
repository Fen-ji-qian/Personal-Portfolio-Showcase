<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  title: '',
  description: '',
  status: 'draft'
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  
  try {
    const { data, error: supabaseError } = await supabase
      .from('works')
      .insert({
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
        user_id: authStore.user?.id
      })
      .select()
      .single()
    
    if (supabaseError) throw supabaseError
    
    router.push('/admin/works')
  } catch (err: any) {
    error.value = err.message || '创建作品失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">创建作品</h1>
        <p class="text-gray-600">添加新作品</p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input 
              id="title" 
              type="text" 
              v-model="form.title" 
              required 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入作品标题"
            />
          </div>
          
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea 
              id="description" 
              v-model="form.description" 
              rows="4" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入作品描述"
            ></textarea>
          </div>
          
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select 
              id="status" 
              v-model="form.status" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
            </select>
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
              @click="router.push('/admin/works')" 
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