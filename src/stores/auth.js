import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role || 'viewer'
  },
  
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        this.user = data.user
        return data.user
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      this.loading = true
      
      try {
        const { error } = await supabase.auth.signOut()
        
        if (error) throw error
        
        this.user = null
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async checkAuth() {
      this.loading = true
      
      try {
        const { data: { user } } = await supabase.auth.getUser()
        this.user = user
        return user
      } catch (error) {
        this.error = error.message
        this.user = null
        return null
      } finally {
        this.loading = false
      }
    }
  }
})