<template>
  <div class="bg-dark-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <router-link :to="`/works/${work.id}`" class="block">
      <div class="relative overflow-hidden aspect-video">
        <img 
          :src="work.cover_url" 
          :alt="work.title"
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <p class="text-gray-200 text-sm line-clamp-2">{{ work.summary }}</p>
          </div>
        </div>
      </div>
      
      <div class="p-5">
        <h3 class="text-xl font-bold mb-2 text-white hover:text-primary transition-colors">
          {{ work.title }}
        </h3>
        
        <div class="flex flex-wrap gap-2 mb-3">
          <span class="px-2 py-1 bg-dark-700 text-primary text-xs rounded">
            {{ getSoftwareName(work.software) }}
          </span>
          <span v-for="tag in work.tags?.slice(0, 2)" :key="tag" class="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded">
            {{ tag }}
          </span>
        </div>
        
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>面数：{{ work.poly_count || 'N/A' }}</span>
          <span>贴图：{{ work.texture_size || 'N/A' }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  work: {
    type: Object,
    required: true
  }
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
</script>
