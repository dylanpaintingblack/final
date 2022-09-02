<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark" style="background-color: #29316b;">
      <router-link to="/" class="navbar-brand">Modulo Negociaciones</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/providers" class="nav-link">Proveedores</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Añadir Proveedor</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/purposes" class="nav-link">Propuestas</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addpurposes" class="nav-link">Añadir Propuesta</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <h2>Bienvenido!</h2>
      <a href="https://cutt.ly/yCoCNow" class="badge badge-primary">Política de tratamiento de datos personales</a>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style scoped>
.container h2 {
  text-align: center;
  margin: 25px auto;
}
</style>
