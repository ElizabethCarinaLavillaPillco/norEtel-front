<template>
  <div id="app">
    <MyNavbar />
    <main class="main-content">
      <router-view />
    </main>
    <MyFooter />
  </div>
</template>

<script>
import MyNavbar from '@/components/common/MyNavbar.vue'
import MyFooter from '@/components/common/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyNavbar,
    MyFooter,
  },
}
</script>

<style>
/* Estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-base);
  color: var(--color-gray-800);
  background-color: var(--color-gray-50);
  line-height: var(--line-height-normal);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* Importar fuentes */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');
</style>
