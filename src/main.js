import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/main.css' // Mantenemos el import de estilos
import App from './App.vue'
import router from './router'

// ----------------------------------------------------
// 1. Crear la instancia de Pinia (el estado global)
const pinia = createPinia()

// 2. Crear la aplicación Vue
const app = createApp(App)

// 3. Montar Pinia en la aplicación Vue (¡CRUCIAL!)
// Pinia debe ser montado ANTES de usar el router si las stores se usan en beforeEach.
app.use(pinia)

// 4. Montar Vue Router
app.use(router)

// 5. Montar la aplicación
app.mount('#app')
