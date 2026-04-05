<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="pt-16 flex-grow">
      <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
        
        <div class="container-custom relative z-10 py-20">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              我是<span class="text-gradient">{{ profile.name }}</span>
            </h1>
            <p class="text-2xl md:text-3xl text-gray-300 mb-8 animate-fade-in">
              {{ profile.title }}
            </p>
            <p class="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-slide-up">
              {{ profile.bio }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <router-link to="/works" class="btn-primary">
                查看作品
              </router-link>
              <router-link to="/contact" class="btn-secondary">
                联系我
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section v-if="featuredWorks.length > 0" class="py-20 bg-dark-800">
        <div class="container-custom">
          <h2 class="text-4xl font-bold text-center mb-12">精选作品</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WorkCard 
              v-for="work in featuredWorks" 
              :key="work.id" 
              :work="work" 
            />
          </div>
          <div class="text-center mt-12">
            <router-link to="/works" class="btn-secondary">
              查看更多作品
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import WorkCard from '@/components/WorkCard.vue'
import profile from '@/data/profile.js'

const featuredWorks = ref([])

onMounted(async () => {
  if (!supabase) {
    console.warn('Supabase 未配置，无法加载作品数据')
    return
  }
  
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('featured', true)
    .order('order_num', { ascending: true })
    .limit(3)

  if (!error && data) {
    featuredWorks.value = data
  }
})
</script>
