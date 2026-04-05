<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-dark-800 rounded-lg overflow-hidden">
      <div class="aspect-video relative">
        <img 
          v-if="front"
          :src="front" 
          alt="正面视角"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-dark-700 flex items-center justify-center">
          <span class="text-gray-500">无正面图</span>
        </div>
      </div>
      <div class="p-3 text-center text-sm text-gray-400">正面视角</div>
    </div>
    
    <div class="bg-dark-800 rounded-lg overflow-hidden">
      <div class="aspect-video relative">
        <img 
          v-if="side"
          :src="side" 
          alt="侧面视角"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-dark-700 flex items-center justify-center">
          <span class="text-gray-500">无侧面图</span>
        </div>
      </div>
      <div class="p-3 text-center text-sm text-gray-400">侧面视角</div>
    </div>
    
    <div class="bg-dark-800 rounded-lg overflow-hidden">
      <div class="aspect-video relative">
        <img 
          v-if="back"
          :src="back" 
          alt="背面视角"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-dark-700 flex items-center justify-center">
          <span class="text-gray-500">无背面图</span>
        </div>
      </div>
      <div class="p-3 text-center text-sm text-gray-400">背面/细节视角</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  front: String,
  side: String,
  back: String
})
</script>
