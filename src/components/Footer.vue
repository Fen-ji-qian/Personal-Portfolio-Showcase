<template>
  <footer class="bg-dark-800 border-t border-dark-700 py-12">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold text-gradient mb-4">Portfolio</h3>
          <p class="text-gray-400 text-sm">
            专业 3D 建模师作品集，展示高质量的 3D 角色、场景、道具建模作品。
          </p>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">导航</h4>
          <div class="flex flex-col space-y-2">
            <router-link to="/works" class="text-gray-400 hover:text-primary transition-colors text-sm">
              作品展示
            </router-link>
            <router-link to="/about" class="text-gray-400 hover:text-primary transition-colors text-sm">
              关于我
            </router-link>
            <router-link to="/contact" class="text-gray-400 hover:text-primary transition-colors text-sm">
              联系方式
            </router-link>
          </div>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">社交媒体</h4>
          <div class="flex space-x-4">
            <a 
              v-if="profile.social?.artstation" 
              :href="profile.social.artstation" 
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              aria-label="ArtStation"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25 21.75 6.615 21.75 12 17.385 21.75 12 21.75zm5.25-9.375l-2.25 3.75h-1.5l2.25-3.75zm-3-3.75l-2.25 3.75h-1.5l2.25-3.75zm-3 0l-2.25 3.75H7.5l2.25-3.75zm-3 0L6 12.375 3.75 8.625h3z"/>
              </svg>
            </a>
            <a 
              v-if="profile.social?.github" 
              :href="profile.social.github" 
              target="_blank"
              class="text-gray-400 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-dark-700 text-center text-gray-500 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import profile from '@/data/profile.js'
</script>
