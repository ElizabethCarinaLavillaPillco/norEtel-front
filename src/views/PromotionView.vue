<script setup>
import MyNavbar from '../components/common/MyNavbar.vue'
import MyFooter from '../components/common/MyFooter.vue'
// import CardService from '../components/CardService.vue'

// const handlePlanPurchase = (planData) => {
//   console.log('Plan seleccionado:', planData)
//   // Aquí puedes agregar la lógica para manejar la compra
// }
</script>

<template>
  <div class="app-container">
    <!-- Navbar fijo en la parte superior -->
    <MyNavbar class="navbar" />

    <h1>mis promociones</h1>
    <h1>mis promociones</h1>
    <h1>mis promociones</h1>

    <h1>mis promociones</h1>
    <h1>mis promociones</h1>
    <h1>mis promociones</h1>

    <MyFooter />
  </div>
</template>

<style scoped>
/* Contenedor principal de la aplicación */
.app-container {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Navbar fijo en la parte superior */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Contenido principal */
.main-content {
  margin-top: var(--navbar-height, 70px);
  padding: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
}
</style>
