<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="pt-24 pb-20 flex-grow">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-8">
          作品展示
        </h1>
        
        <FilterBar 
          :categories="categories"
          :active-category="activeCategory"
          @category-change="handleCategoryChange"
        />
        
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        
        <div v-else-if="works.length === 0" class="text-center py-20">
          <p class="text-gray-400 text-xl">暂无作品</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <WorkCard 
            v-for="work in works" 
            :key="work.id" 
            :work="work" 
          />
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FilterBar from '@/components/FilterBar.vue'
import WorkCard from '@/components/WorkCard.vue'

const categories = ref([])
const works = ref([])
const activeCategory = ref('all')
const loading = ref(true)

const loadCategories = async () => {
  if (!supabase) return
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (!error && data) {
    categories.value = data
  }
}

const loadWorks = async (category = 'all') => {
  if (!supabase) {
    loading.value = false
    return
  }
  
  loading.value = true
  
  let query = supabase
    .from('works')
    .select('*')
    .order('order_num', { ascending: true })

  if (category !== 'all') {
    query = query.eq('software', category)
  }

  const { data, error } = await query

  if (!error && data) {
    works.value = data
  }
  
  loading.value = false
}

const handleCategoryChange = (category) => {
  activeCategory.value = category
  loadWorks(category)
}

onMounted(async () => {
  await loadCategories()
  await loadWorks()
})
</script>
