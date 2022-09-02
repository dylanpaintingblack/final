<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Lista de Proveedores</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(provider, index) in providers"
          :key="index" @click="setActiveProvider(provider, index)">
          {{ provider.nombre }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllProviders">
        Borrar todos!
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentProvider">
        <provider-details :provider="currentProvider" @refreshList="refreshList" />
      </div>
      <div v-else>
        <br />
        <p>Porfavor seleccione un proveedor...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProviderDataService from "../services/ProviderDataService";
import ProviderDetails from "./Provider";

export default {
  name: "providers-list",
  components: { ProviderDetails },
  data() {
    return {
      providers: [],
      currentProvider: null,
      currentIndex: -1,
    };
  },
  methods: {
    onDataChange(items) {
      let _providers = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _providers.push({
          key: key,
          foto:data.foto,
          nombre: data.nombre,
          rut: data.rut,
          cedula: data.cedula,
          email: data.email,
          mpio: data.mpio,
          depto: data.depto,
          address: data.address,
          cel: data.cel,
          category: data.category,
          tray: data.tray,
          published: data.published,
        });
      });

      this.providers = _providers;
    },

    refreshList() {
      this.currentProvider = null;
      this.currentIndex = -1;
    },

    setActiveProvider(provider, index) {
      this.currentProvider = provider;
      this.currentIndex = index;
    },

    removeAllProviders() {
      ProviderDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    ProviderDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    ProviderDataService.getAll().off("value", this.onDataChange);
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
