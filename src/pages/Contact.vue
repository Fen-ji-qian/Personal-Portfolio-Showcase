<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="pt-24 pb-20 flex-grow">
      <div class="container-custom">
        <div class="max-w-2xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">联系我</h1>
          <p class="text-xl text-gray-300 mb-12">
            有合作意向或想交流 3D 建模技术？欢迎通过以下方式联系我
          </p>
          
          <div class="space-y-8">
            <div class="bg-dark-800 p-8 rounded-lg">
              <h2 class="text-2xl font-bold mb-4">发送邮件</h2>
              <p class="text-gray-400 mb-6">
                这是最直接的联系方式，我会在 24-48 小时内回复
              </p>
              <a 
                :href="`mailto:${profile.social.email}`"
                class="btn-primary inline-flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ profile.social.email }}
              </a>
            </div>
            
            <div class="bg-dark-800 p-8 rounded-lg">
              <h2 class="text-2xl font-bold mb-4">社交媒体</h2>
              <p class="text-gray-400 mb-6">
                关注我的社交媒体获取最新作品动态
              </p>
              <div class="flex justify-center gap-4">
                <a 
                  v-if="profile.social?.artstation" 
                  :href="profile.social.artstation" 
                  target="_blank"
                  class="flex items-center gap-2 px-6 py-3 bg-dark-700 rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25 21.75 6.615 21.75 12 17.385 21.75 12 21.75zm5.25-9.375l-2.25 3.75h-1.5l2.25-3.75zm-3-3.75l-2.25 3.75h-1.5l2.25-3.75zm-3 0l-2.25 3.75H7.5l2.25-3.75zm-3 0L6 12.375 3.75 8.625h3z"/>
                  </svg>
                  ArtStation
                </a>
                <a 
                  v-if="profile.social?.github" 
                  :href="profile.social.github" 
                  target="_blank"
                  class="flex items-center gap-2 px-6 py-3 bg-dark-700 rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import profile from '@/data/profile.js'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>
