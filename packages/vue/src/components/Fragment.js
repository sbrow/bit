export const Fragment = {
  install (Vue) {
    // install the teleporter
    Vue.directive('fragment', {
      inserted (element) {
        const fragment = document.createDocumentFragment()
        Array.from(element.childNodes).forEach(child => fragment.appendChild(child))
        element.parentNode.insertBefore(fragment, element)
        element.parentNode.removeChild(element)
      }
    })

    Vue.component('fragment', {
      render: function(h){ return h('div', {directives: [{name: 'fragment'}]}, this.$slots.default)}
    })
  }
}
export default Fragment
