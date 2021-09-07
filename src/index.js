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

 
// function sayHi (){
//     console.log('hi')
// }
// function sayName(o){
//     console.log('my name is '+ o)
// }
// module.exports = { 
//     sayName:sayName, 
//     sayHi:sayHi, 
// }