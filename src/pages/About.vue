<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="pt-24 pb-20 flex-grow">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <img 
              :src="profile.avatar" 
              :alt="profile.name"
              class="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary shadow-xl"
              onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'50\' fill=\'%23333\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%23666\' font-size=\'40\'%3E👤%3C/text%3E%3C/svg%3E'"
            />
            <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ profile.name }}</h1>
            <p class="text-xl text-primary mb-6">{{ profile.title }}</p>
            <p class="text-gray-300 text-lg max-w-2xl mx-auto">{{ profile.bio }}</p>
          </div>
          
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8 text-center">技能专长</h2>
            <div class="flex flex-wrap justify-center gap-3">
              <span 
                v-for="skill in profile.skills" 
                :key="skill"
                class="px-4 py-2 bg-dark-800 border border-primary/30 text-primary rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
              >
                {{ skill }}
              </span>
            </div>
          </section>
          
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8 text-center">工作经历</h2>
            <div class="space-y-6">
              <div 
                v-for="(exp, index) in profile.experience" 
                :key="index"
                class="bg-dark-800 p-6 rounded-lg border-l-4 border-primary"
              >
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 class="text-xl font-bold">{{ exp.role }}</h3>
                  <span class="text-primary font-semibold">{{ exp.period }}</span>
                </div>
                <p class="text-gray-400">{{ exp.company }}</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 class="text-3xl font-bold mb-8 text-center">社交媒体</h2>
            <div class="flex justify-center gap-6">
              <a 
                v-if="profile.social?.artstation" 
                :href="profile.social.artstation" 
                target="_blank"
                class="flex items-center gap-2 px-6 py-3 bg-dark-800 rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25 21.75 6.615 21.75 12 17.385 21.75 12 21.75zm5.25-9.375l-2.25 3.75h-1.5l2.25-3.75zm-3-3.75l-2.25 3.75h-1.5l2.25-3.75zm-3 0l-2.25 3.75H7.5l2.25-3.75zm-3 0L6 12.375 3.75 8.625h3z"/>
                </svg>
                ArtStation
              </a>
              <a 
                v-if="profile.social?.github" 
                :href="profile.social.github" 
                target="_blank"
                class="flex items-center gap-2 px-6 py-3 bg-dark-800 rounded-lg hover:bg-primary hover:text-dark-900 transition-all duration-300"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </section>
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
