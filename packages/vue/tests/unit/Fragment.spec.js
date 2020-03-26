import Vue from "vue"
import {mount} from "@vue/test-utils"
import Fragment from "../../src/components/Fragment"

Vue.use(Fragment)

const TestComponent = {
    render: h => h('p', [h('fragment', 'Hello, world!')])
}


it('renders no outer component.', ()=> {
    const wrapper = mount(TestComponent)
    expect(wrapper.html()).toBe('<p>Hello, world!</p>')
})