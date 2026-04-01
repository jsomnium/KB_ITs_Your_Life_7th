import { createApp } from 'vue'
import AppRef from './AppRef.vue'
import AppRef2 from './AppRef2.vue'
import AppReactive from './AppReactive.vue'

// createApp(App).mount('#app')
// createApp(AppRef).mount('#app')
// createApp(AppRef2).mount('#app')
createApp(AppReactive).mount('#app')