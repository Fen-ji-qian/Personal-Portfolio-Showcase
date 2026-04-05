<template>
  <div class="bg-dark-800 rounded-lg overflow-hidden">
    <div class="relative w-full" :style="{ height: height }">
      <div ref="container" class="w-full h-full"></div>
      
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-dark-900/80">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-gray-300">加载中...</p>
          <p v-if="progress" class="text-sm text-gray-500 mt-2">{{ Math.round(progress) }}%</p>
        </div>
      </div>
      
      <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-dark-900/80">
        <div class="text-center p-8">
          <p class="text-red-400 text-lg mb-4">{{ error }}</p>
          <p class="text-gray-400 text-sm">WebGL 不可用时显示降级内容</p>
        </div>
      </div>
      
      <div class="absolute top-4 right-4 flex gap-2">
        <button
          @click="toggleWireframe"
          class="px-3 py-1.5 bg-dark-900/80 backdrop-blur text-white text-sm rounded-lg hover:bg-primary hover:text-dark-900 transition-colors"
          :title="wireframe ? '显示材质' : '显示线框'"
        >
          {{ wireframe ? '材质' : '线框' }}
        </button>
        <button
          @click="resetView"
          class="px-3 py-1.5 bg-dark-900/80 backdrop-blur text-white text-sm rounded-lg hover:bg-primary hover:text-dark-900 transition-colors"
          title="重置视角"
        >
          重置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps({
  modelUrl: {
    type: String,
    required: true
  },
  height: {
    type: String,
    default: '600px'
  }
})

const container = ref(null)
const loading = ref(true)
const progress = ref(0)
const error = ref(null)
const wireframe = ref(false)

let scene = null
let camera = null
let renderer = null
let controls = null
let model = null
let animationId = null

const initScene = () => {
  const width = container.value.clientWidth
  const height = container.value.clientHeight

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x121212)

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(5, 3, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1

  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  controls.minDistance = 1
  controls.maxDistance = 50
  controls.maxPolarAngle = Math.PI

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
  fillLight.position.set(-5, 0, -5)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0x00d4ff, 0.3)
  rimLight.position.set(0, 5, -5)
  scene.add(rimLight)

  const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222)
  scene.add(gridHelper)
}

const loadModel = () => {
  if (!props.modelUrl) {
    error.value = '模型 URL 未提供'
    loading.value = false
    return
  }

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)

  loader.load(
    props.modelUrl,
    (gltf) => {
      model = gltf.scene

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          if (child.material) {
            child.material.needsUpdate = true
          }
        }
      })

      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      
      model.scale.setScalar(3 / maxDim)
      
      box.setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center)
      model.position.y = 0

      scene.add(model)
      loading.value = false
    },
    (xhr) => {
      if (xhr.total > 0) {
        progress.value = (xhr.loaded / xhr.total) * 100
      }
    },
    (err) => {
      console.error('模型加载失败:', err)
      error.value = '模型加载失败，请检查文件路径'
      loading.value = false
    }
  )
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  if (controls) {
    controls.update()
  }
  
  renderer.render(scene, camera)
}

const toggleWireframe = () => {
  wireframe.value = !wireframe.value
  
  if (model) {
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            mat.wireframe = wireframe.value
          })
        } else {
          child.material.wireframe = wireframe.value
        }
      }
    })
  }
}

const resetView = () => {
  if (controls) {
    controls.reset()
    camera.position.set(5, 3, 5)
  }
}

const handleResize = () => {
  if (!container.value || !camera || !renderer) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  try {
    initScene()
    loadModel()
    animate()
    
    window.addEventListener('resize', handleResize)
  } catch (err) {
    console.error('初始化 3D 场景失败:', err)
    error.value = 'WebGL 不支持，显示降级内容'
    loading.value = false
  }
})

watch(() => props.modelUrl, (newUrl) => {
  if (model) {
    scene.remove(model)
  }
  loadModel()
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  window.removeEventListener('resize', handleResize)
  
  if (controls) {
    controls.dispose()
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (container.value && renderer) {
    container.value.removeChild(renderer.domElement)
  }
})
</script>
