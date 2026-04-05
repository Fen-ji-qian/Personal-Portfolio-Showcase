<template>
  <div class="w-full">
    <div class="flex flex-wrap gap-2 justify-center mb-8">
      <button
        @click="selectCategory('all')"
        :class="[
          'px-4 py-2 rounded-lg transition-all duration-300',
          activeCategory === 'all'
            ? 'bg-primary text-dark-900 font-semibold'
            : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
        ]"
      >
        全部
      </button>
      
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        :class="[
          'px-4 py-2 rounded-lg transition-all duration-300',
          activeCategory === category.id
            ? 'bg-primary text-dark-900 font-semibold'
            : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
        ]"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  activeCategory: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['category-change'])

const selectCategory = (category) => {
  emit('category-change', category)
}
</script>
