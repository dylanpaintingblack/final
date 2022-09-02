<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="row">
        <div class="col">
          <label for="nombre">Nombre</label>
          <input type="text" class="form-control" id="nombre" required v-model="purpose.nombre" name="nombre" />
        </div>
        <div class="col">
          <label for="fecha">Fecha</label>
          <input type="text" class="form-control" id="cedula" required v-model="purpose.fecha" name="cedula" />
        </div>
        <div class="col">
          <label for="archivo">Archivo</label>
          <input type="file" class="form-control" id="archivo" required v-on:change="purpose.archivo" name="archivo" />
        </div>
      </div>
      <button @click="savePurpose" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>Añadido con exito!</h4>
      <button class="btn btn-success" @click="newPurpose">Añadir</button>
    </div>
  </div>
</template>

<script>
import PurposeDataService from "../services/PurposeDataService";

export default {
  name: "add-purpose",
  data() {
    return {
      purpose: {
        nombre:"",
        fecha:"",
        archivo:"",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    savePurpose() {
      var data = {
        nombre:this.purpose.nombre,
        fecha: this.purpose.fecha,
        archivo: this.purpose.archivo,
        published: false,
      };

      PurposeDataService.create(data)
        .then(() => {
          console.log("Creado con exito!");
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPurpose() {
      this.submitted = false;
      this.purpose = {
        nombre:"",
        feche:"",
        archivo:"",
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
