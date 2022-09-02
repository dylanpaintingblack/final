<template>
    <div v-if="currentPurpose" class="edit-form">
        <h4>Propuesta</h4>
        <form>
            <div class="form-group">
                <label>Archivo:</label>
                <br />
                <a v-bind:href="currentPurpose.archivo">{{purpose.nombre}}</a>
            </div>
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" class="form-control" id="nombre" v-model="currentPurpose.nombre" />
            </div>
            <div class="form-group">
                <label for="rut">fecha</label>
                <input type="text" class="form-control" id="rut" v-model="currentPurpose.fecha" />
            </div>
            <div class="form-group">
                <label><strong>Estado:</strong></label>
                {{ currentPurpose.published ? "Aceptado!!!" : "Rechazado!!!" }}
            </div>
        </form>

        <button class="badge badge-primary mr-2" v-if="currentPurpose.published" @click="updateRevisado(false)">
            Aceptado
        </button>
        <button v-else class="badge badge-primary mr-2" @click="updateRevisado(true)">
            Aceptado
        </button>

        <button class="badge badge-danger mr-2" @click="deletePurpose">
            Borrar
        </button>

        <button type="submit" class="badge badge-success" @click="updatePurpose">
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
import PurposeDataService from "../services/PurposeDataService";
export default {
  name: "purpose",
  props: ["purpose"],
  data() {
    return {
      currentPurpose: null,
      message: "",
    };
  },
  watch: {
    purpose: function (purpose) {
      this.currentPurpose = { ...purpose };
      this.message = "";
    },
  },
  methods: {
    updateRevisado(status) {
      PurposeDataService.update(this.currentPurpose.key, {
        published: status,
      })
        .then(() => {
          this.currentPurpose.published = status;
          this.message = "Estado actualizado con exito!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePurpose() {
      const data = {
        archivo: this.currentPurpose.archivo,
        fecha: this.currentPurpose.fecha,
        nombre: this.currentPurpose.nombre,
      };
      PurposeDataService.update(this.currentPurpose.key, data)
        .then(() => {
          this.message = "Proveedor actualizado con exito!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePurpose() {
      PurposeDataService.delete(this.currentPurpose.key)
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
    this.currentPurpose = { ...this.purpose };
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
