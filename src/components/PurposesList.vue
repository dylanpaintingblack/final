<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Lista de Propuestas</h4>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(purpose, index) in purposes"
          :key="index" @click="setActivePurpose(purpose, index)">
          {{ purpose.nombre }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPurposes">
        Borrar todas!
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPurpose">
        <purpose-details :purpose="currentPurpose" @refreshList="refreshList" />
      </div>
      <div v-else>
        <br />
        <p>Porfavor seleccione una Propuesta...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PurposeDataService from "../services/PurposeDataService";
import PurposeDetails from "./Purpose";

export default {
  name: "purposes-list",
  components: { PurposeDetails },
  data() {
    return {
      purposes: [],
      currentPurpose: null,
      currentIndex: -1,
    };
  },
  methods: {
    onDataChange(items) {
      let _purposes = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _purposes.push({
          key: key,
          nombre:data.nombre,
          fecha:data.fecha,
          archivo:data.archivo,
          published: data.published,
        });
      });

      this.purposes = _purposes;
    },

    refreshList() {
      this.currentPurpose = null;
      this.currentIndex = -1;
    },

    setActivePurpose(purpose, index) {
      this.currentPurpose = purpose;
      this.currentIndex = index;
    },

    removeAllPurposes() {
      PurposeDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    PurposeDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    PurposeDataService.getAll().off("value", this.onDataChange);
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
