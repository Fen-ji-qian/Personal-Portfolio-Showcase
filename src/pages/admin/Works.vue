<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const works = ref([])
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')

const fetchWorks = async () => {
  loading.value = true
  
  let query = supabase.from('works').select('*')
  
  if (searchQuery.value) {
    query = query.ilike('title', `%${searchQuery.value}%`)
  }
  
  if (statusFilter.value !== 'all') {
    query = query.eq('status', statusFilter.value)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (!error) {
    works.value = data
  }
  
  loading.value = false
}

const deleteWork = async (id) => {
  if (confirm('确定要删除这个作品吗？')) {
    const { error } = await supabase
      .from('works')
      .delete()
      .eq('id', id)
    
    if (!error) {
      fetchWorks()
    }
  }
}

const createWork = () => {
  router.push('/admin/works/create')
}

const editWork = (id) => {
  router.push(`/admin/works/${id}/edit`)
}

onMounted(() => {
  fetchWorks()
})
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">作品管理</h1>
          <p class="text-gray-600">管理所有作品</p>
        </div>
        <button 
          @click="createWork" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          创建作品
        </button>
      </div>
      
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery" 
              @input="fetchWorks" 
              type="text" 
              placeholder="搜索作品标题" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="w-full md:w-48">
            <select 
              v-model="statusFilter" 
              @change="fetchWorks" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有状态</option>
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Works table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  标题
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="work in works" :key="work.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ work.title }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[`px-2 py-1 text-xs rounded-full`, 
                    work.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ work.status === 'published' ? '已发布' : '草稿' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(work.created_at).toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="editWork(work.id)" 
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    编辑
                  </button>
                  <button 
                    @click="deleteWork(work.id)" 
                    class="text-red-600 hover:text-red-900"
                  >
                    删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="loading" class="p-4 text-center text-gray-500">
          加载中...
        </div>
        <div v-else-if="works.length === 0" class="p-8 text-center text-gray-500">
          暂无作品
        </div>
      </div>
    </div>
  </AdminLayout>
</template>