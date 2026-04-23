<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const users = ref([])
const loading = ref(false)
const searchQuery = ref('')
const roleFilter = ref('all')

const fetchUsers = async () => {
  loading.value = true
  
  let query = supabase.from('users').select('*')
  
  if (searchQuery.value) {
    query = query.ilike('name', `%${searchQuery.value}%`).or(`ilike(email, '%${searchQuery.value}%')`)
  }
  
  if (roleFilter.value !== 'all') {
    query = query.eq('role', roleFilter.value)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (!error) {
    users.value = data
  }
  
  loading.value = false
}

const deleteUser = async (id) => {
  if (confirm('确定要删除这个用户吗？')) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (!error) {
      fetchUsers()
    }
  }
}

const createUser = () => {
  router.push('/admin/users/create')
}

const editUser = (id) => {
  router.push(`/admin/users/${id}/edit`)
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">用户管理</h1>
          <p class="text-gray-600">管理所有用户</p>
        </div>
        <button 
          @click="createUser" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          创建用户
        </button>
      </div>
      
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery" 
              @input="fetchUsers" 
              type="text" 
              placeholder="搜索用户名或邮箱" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="w-full md:w-48">
            <select 
              v-model="roleFilter" 
              @change="fetchUsers" 
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有角色</option>
              <option value="admin">管理员</option>
              <option value="editor">编辑</option>
              <option value="viewer">查看者</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Users table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  用户名
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  邮箱
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  角色
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
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span class="text-blue-600 font-medium text-sm">{{ user.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[`px-2 py-1 text-xs rounded-full`, 
                    user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                    user.role === 'editor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  ]">
                    {{ user.role === 'admin' ? '管理员' : user.role === 'editor' ? '编辑' : '查看者' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[`px-2 py-1 text-xs rounded-full`, 
                    user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]">
                    {{ user.active ? '活跃' : '禁用' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(user.created_at).toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="editUser(user.id)" 
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    编辑
                  </button>
                  <button 
                    @click="deleteUser(user.id)" 
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
        <div v-else-if="users.length === 0" class="p-8 text-center text-gray-500">
          暂无用户
        </div>
      </div>
    </div>
  </AdminLayout>
</template>