import autograph from './autograph.vue' 
const autographs = {
    install: function (Vue) {
      if (typeof window !== 'undefined' && window.Vue) {
        Vue = window.Vue
      }
      Vue.component('autographs', autograph)
    }
  }  
export default autographs

