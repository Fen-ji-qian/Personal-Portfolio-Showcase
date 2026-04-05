<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-dark-700">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="text-2xl font-bold text-gradient">
          Portfolio
        </router-link>
        
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/works" 
            class="text-gray-300 hover:text-primary transition-colors duration-300"
          >
            作品
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-300 hover:text-primary transition-colors duration-300"
          >
            关于
          </router-link>
          <router-link 
            to="/contact" 
            class="text-gray-300 hover:text-primary transition-colors duration-300"
          >
            联系
          </router-link>
        </div>

        <button 
          @click="toggleMenu"
          class="md:hidden text-gray-300 hover:text-primary"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden pb-4">
        <div class="flex flex-col space-y-4">
          <router-link 
            to="/works" 
            class="text-gray-300 hover:text-primary transition-colors duration-300"
            @click="toggleMenu"
          >
            作品
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-300 hover:text-primary transition-colors duration-300"
            @click="toggleMenu"
          >
            关于
          </router-link>
          <router-link 
            to="/contact" 
            class="text-gray-300 hover:text-primary transition-colors duration-300"
            @click="toggleMenu"
          >
            联系
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
