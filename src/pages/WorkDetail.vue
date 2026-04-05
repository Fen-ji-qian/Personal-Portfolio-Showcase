<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="pt-24 pb-20 flex-grow">
      <div class="container-custom">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        
        <div v-else-if="error" class="text-center py-20">
          <p class="text-red-400 text-xl">{{ error }}</p>
          <router-link to="/works" class="btn-primary mt-4 inline-block">
            返回作品列表
          </router-link>
        </div>
        
        <div v-else-if="work" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ModelViewer 
              v-if="work.model_url" 
              :model-url="work.model_url"
              height="500px"
            />
            <div v-else class="aspect-video bg-dark-800 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">暂无 3D 模型</p>
            </div>
          </div>
          
          <div>
            <div class="mb-2 text-sm text-gray-500">
              <router-link to="/works" class="hover:text-primary">作品</router-link>
              <span> / </span>
              <span>{{ getSoftwareName(work.software) }}</span>
            </div>
            
            <h1 class="text-4xl font-bold mb-4">{{ work.title }}</h1>
            
            <div class="flex flex-wrap gap-2 mb-6">
              <span class="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg font-semibold">
                {{ getSoftwareName(work.software) }}
              </span>
              <span 
                v-for="tag in work.tags" 
                :key="tag"
                class="px-3 py-1.5 bg-dark-700 text-gray-300 text-sm rounded-lg"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-dark-800 p-4 rounded-lg">
                <p class="text-gray-500 text-sm mb-1">面数</p>
                <p class="text-xl font-semibold">{{ work.poly_count || 'N/A' }}</p>
              </div>
              <div class="bg-dark-800 p-4 rounded-lg">
                <p class="text-gray-500 text-sm mb-1">贴图分辨率</p>
                <p class="text-xl font-semibold">{{ work.texture_size || 'N/A' }}</p>
              </div>
              <div class="bg-dark-800 p-4 rounded-lg">
                <p class="text-gray-500 text-sm mb-1">渲染引擎</p>
                <p class="text-xl font-semibold">{{ work.render_engine || 'N/A' }}</p>
              </div>
              <div class="bg-dark-800 p-4 rounded-lg">
                <p class="text-gray-500 text-sm mb-1">技术栈</p>
                <p class="text-sm">{{ work.tech_stack?.join(', ') || 'N/A' }}</p>
              </div>
            </div>
            
            <div class="prose prose-invert max-w-none mb-8">
              <h2 class="text-2xl font-bold mb-4">作品简介</h2>
              <p class="text-gray-300">{{ work.summary }}</p>
            </div>
            
            <div class="prose prose-invert max-w-none">
              <h2 class="text-2xl font-bold mb-4">制作流程</h2>
              <div class="text-gray-300 whitespace-pre-line">{{ work.description }}</div>
            </div>
          </div>
        </div>
        
        <div v-if="work && hasThreeViews" class="mt-20">
          <h2 class="text-3xl font-bold text-center mb-8">三视角展示</h2>
          <ThreeViewImages 
            :front="work.view_front"
            :side="work.view_side"
            :back="work.view_back"
          />
        </div>
        
        <div v-if="work" class="mt-12 flex justify-center gap-4">
          <a 
            v-if="work.view_front"
            :href="work.view_front" 
            download
            class="btn-secondary"
            target="_blank"
          >
            下载渲染图
          </a>
          <button @click="shareWork" class="btn-primary">
            分享作品
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ModelViewer from '@/components/ModelViewer.vue'
import ThreeViewImages from '@/components/ThreeViewImages.vue'

const route = useRoute()
const work = ref(null)
const loading = ref(true)
const error = ref(null)

const hasThreeViews = computed(() => {
  return work.value?.view_front && work.value?.view_side && work.value?.view_back
})

const getSoftwareName = (software) => {
  const names = {
    blender: 'Blender',
    maya: 'Maya',
    '3dsmax': '3ds Max',
    zbrush: 'ZBrush'
  }
  return names[software] || software
}

const shareWork = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: work.value.title,
        text: work.value.summary,
        url: window.location.href
      })
    } catch (err) {
      console.error('分享失败:', err)
    }
  } else {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    alert('链接已复制到剪贴板')
  }
}

onMounted(async () => {
  if (!supabase) {
    error.value = 'Supabase 未配置，无法加载作品详情'
    loading.value = false
    return
  }
  
  const { data, error: fetchError } = await supabase
    .from('works')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (fetchError) {
    error.value = '作品不存在或加载失败'
    loading.value = false
  } else {
    work.value = data
    loading.value = false
  }
})
</script>
