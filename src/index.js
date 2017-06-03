import VueSteve from './components/Steve.vue'
export default VueSteve

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('Steve', VueSteve)
}