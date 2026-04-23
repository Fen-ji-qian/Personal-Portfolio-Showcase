<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const stats = ref({
  totalWorks: 0,
  totalUsers: 0,
  activeWorks: 0,
  pendingWorks: 0
})

const recentWorks = ref([])
const recentUsers = ref([])

const fetchStats = async () => {
  // 获取作品统计
  const { data: works, error: worksError } = await supabase
    .from('works')
    .select('*')
  
  if (!worksError && works) {
    stats.value.totalWorks = works.length
    stats.value.activeWorks = works.filter(work => work.status === 'published').length
    stats.value.pendingWorks = works.filter(work => work.status === 'draft').length
    
    // 获取最近的作品
    recentWorks.value = works
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
  }
  
  // 获取用户统计
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
  
  if (!usersError && users) {
    stats.value.totalUsers = users.length
    
    // 获取最近的用户
    recentUsers.value = users
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">仪表盘</h1>
        <p class="text-gray-600">欢迎回来，这里是系统概览</p>
      </div>
      
      <!-- Stats cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">总作品数</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalWorks }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">总用户数</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">已发布作品</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.activeWorks }}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">草稿作品</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.pendingWorks }}</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.256-1.667.964-1.667 1.732V16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent activities -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent works -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">最近作品</h2>
          <div class="space-y-4">
            <div v-for="work in recentWorks" :key="work.id" class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ work.title }}</p>
                <p class="text-sm text-gray-500">{{ new Date(work.created_at).toLocaleDateString() }}</p>
              </div>
              <span :class="[`px-2 py-1 text-xs rounded-full`, 
                work.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              ]">
                {{ work.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </div>
            <div v-if="recentWorks.length === 0" class="text-center py-4 text-gray-500">
              暂无作品
            </div>
          </div>
        </div>
        
        <!-- Recent users -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">最近用户</h2>
          <div class="space-y-4">
            <div v-for="user in recentUsers" :key="user.id" class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-medium">{{ user.name.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ user.name }}</p>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
              <span :class="[`px-2 py-1 text-xs rounded-full`, 
                user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                user.role === 'editor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              ]">
                {{ user.role === 'admin' ? '管理员' : user.role === 'editor' ? '编辑' : '查看者' }}
              </span>
            </div>
            <div v-if="recentUsers.length === 0" class="text-center py-4 text-gray-500">
              暂无用户
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>