<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="row">
        <div class="col">
          <label for="nombre">Nombre</label>
          <input type="text" class="form-control" id="nombre" required v-model="provider.nombre" name="nombre" />
        </div>
        <div class="col">
          <label for="cedula">Cedula</label>
          <input class="form-control" id="cedula" required v-model="provider.cedula" name="cedula" />
        </div>
        <div class="col">
          <label for="rut">RUT(sin -)</label>
          <input class="form-control" id="rut" required v-model="provider.rut" name="rut" />
        </div>
        <div class="col">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" required v-model="provider.email" name="email" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="mpio">Municipio</label>
          <input type="text" class="form-control" id="mpio" required v-model="provider.mpio" name="mpio" />
        </div>
        <div class="col">
          <label for="depto">Departamento</label>
          <input type="text" class="form-control" id="depto" required v-model="provider.depto" name="depto" />
        </div>
        <div class="col">
          <label for="address">Direccion</label>
          <input type="text" class="form-control" id="address" required v-model="provider.address" name="address" />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <label for="cel">Celular</label>
          <input type="text" class="form-control" id="cel" required v-model="provider.cel" name="cel" />
        </div>
        <div class="col">
          <label for="category">Categoria</label>
          <input type="text" class="form-control" id="category" required v-model="provider.category" name="category" />
        </div>
        <div class="col">
          <label for="tray">Trayectoria(años)</label>
          <input type="number" class="form-control" id="tray" required v-model="provider.tray" name="tray" min="1" />
        </div>
      </div>
      <button @click="saveProvider" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>Añadido con exito!</h4>
      <button class="btn btn-success" @click="newProvider">Añadir</button>
    </div>
  </div>
</template>

<script>
import ProviderDataService from "../services/ProviderDataService";

export default {
  name: "add-provider",
  data() {
    return {
      provider: {
        foto:"",
        nombre: "",
        rut: "",
        cedula: "",
        email: "",
        mpio: "",
        depto: "",
        address: "",
        cel: "",
        category: "",
        tray: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveProvider() {
      var data = {
        foto:this.provider.foto,
        nombre: this.provider.nombre,
        rut: this.provider.rut,
        cedula: this.provider.cedula,
        email: this.provider.email,
        mpio: this.provider.mpio,
        depto: this.provider.depto,
        address: this.provider.address,
        cel: this.provider.cel,
        category: this.provider.category,
        tray: this.provider.tray,
        published: false,
      };

      ProviderDataService.create(data)
        .then(() => {
          console.log("Creado con exito!");
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newProvider() {
      this.submitted = false;
      this.provider = {
        foto:"",
        nombre: "",
        rut: "",
        cedula: "",
        email: "",
        mpio: "",
        depto: "",
        address: "",
        cel: "",
        category: "",
        tray: "",
        published: false,
      };
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 600px;
  margin: auto;
}
</style>
