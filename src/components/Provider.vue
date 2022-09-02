<template>
  <div v-if="currentProvider" class="edit-form">
    <h4>Proveedor</h4>
    <form>
      <div class="form-group">
        <label>Foto:</label>
        <br />
        <img v-bind:src="currentProvider.foto" width="100" height="100" />
      </div>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" class="form-control" id="nombre" v-model="currentProvider.nombre" />
      </div>
      <div class="form-group">
        <label for="rut">Rut(sin indicativo)</label>
        <input type="text" class="form-control" id="rut" v-model="currentProvider.rut" />
      </div>
      <div class="form-group">
        <label for="cedula">Cedula</label>
        <input type="text" class="form-control" id="cedula" v-model="currentProvider.cedula" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" v-model="currentProvider.email" />
      </div>
      <div class="form-group">
        <label for="mpio">Municipio</label>
        <input type="text" class="form-control" id="mpio" v-model="currentProvider.mpio" />
      </div>
      <div class="form-group">
        <label for="depto">Departamento</label>
        <input type="text" class="form-control" id="depto" v-model="currentProvider.depto" />
      </div>
      <div class="form-group">
        <label for="address">Direccion</label>
        <input type="text" class="form-control" id="address" v-model="currentProvider.address" />
      </div>
      <div class="form-group">
        <label for="cel">Celular</label>
        <input type="text" class="form-control" id="cel" v-model="currentProvider.cel" />
      </div>
      <div class="form-group">
        <label for="category">Categoria</label>
        <input type="text" class="form-control" id="category" v-model="currentProvider.category" />
      </div>
      <div class="form-group">
        <label for="tray">Trayectoria</label>
        <input type="text" class="form-control" id="tray" v-model="currentProvider.tray" />
      </div>
      <div class="form-group">
        <label><strong>Estado:</strong></label>
        {{ currentProvider.published ? "Revisado" : "Pendiente" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2" v-if="currentProvider.published" @click="updateRevisado(false)">
      Revisado
    </button>
    <button v-else class="badge badge-primary mr-2" @click="updateRevisado(true)">
      Revisado
    </button>

    <button class="badge badge-danger mr-2" @click="deleteProvider">
      Borrar
    </button>

    <button type="submit" class="badge badge-success" @click="updateProvider">
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Porfavor seleccione un proveedor...</p>
  </div>
</template>

<script>
import ProviderDataService from "../services/ProviderDataService";
export default {
  name: "provider",
  props: ["provider"],
  data() {
    return {
      currentProvider: null,
      message: "",
    };
  },
  watch: {
    provider: function (provider) {
      this.currentProvider = { ...provider };
      this.message = "";
    },
  },
  methods: {
    updateRevisado(status) {
      ProviderDataService.update(this.currentProvider.key, {
        published: status,
      })
        .then(() => {
          this.currentProvider.published = status;
          this.message = "Estado actualizado con exito!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateProvider() {
      const data = {
        nombre: this.currentProvider.nombre,
        rut: this.currentProvider.rut,
        cedula: this.currentProvider.cedula,
        email: this.currentProvider.email,
        mpio: this.currentProvider.mpio,
        depto: this.currentProvider.depto,
        address: this.currentProvider.address,
        cel: this.currentProvider.cel,
        category: this.currentProvider.category,
        tray: this.currentProvider.tray,
        foto: this.currentProvider.foto,
      };
      ProviderDataService.update(this.currentProvider.key, data)
        .then(() => {
          this.message = "Proveedor actualizado con exito!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteProvider() {
      ProviderDataService.delete(this.currentProvider.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentProvider = { ...this.provider };
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

img {
  border-radius: 10px;
}
</style>
