<template>
  <div>
    <h1>Lista de costos</h1>
    <hr />
    <div class="row">
      <div class="column" style="margin-right: 500px;">
        <button class="form-button" @click="inserView">Nuevo</button>
      </div>
      <div class="column">
        <div class="row">
          <div class="column">
            <input v-model="search" placeholder="Search" />
          </div>
          <div class="column">
            <button class="form-button" @click="buscarCCostos">Buscar</button>
          </div>
        </div>
      </div>
    </div>
    
    <hr />
    <table v-if="search == ''" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(costo, index) in costos" :key="index">
          <td>{{ costo.Codigo }}</td>
          <td>{{ costo.NombreCentroCostos }}</td>
          <td><button @click="editarCosto(1, index)">Editar</button></td>
          <td><button @click="eliminarCosto(1, index)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
    <table v-if="search != ''" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(costo, index) in costosSearch" :key="index">
          <td>{{ costo.Codigo }}</td>
          <td>{{ costo.NombreCentroCostos }}</td>
          <td><button @click="editarCosto(2, index)">Editar</button></td>
          <td><button @click="eliminarCosto(2, index)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr />
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      costos: "",
      message: "",
      ncodigo: "",
      nnombre: "",
      search: "",
      costosSearch: ""
    };
  },
  mounted() {
    this.message = "";
    (this.ncodigo = ""), (this.nnombre = ""), this.obtenerCosto();
  },
  methods: {
    async obtenerCosto() {
      this.message = "";
      let url = "http://localhost:8000/api/getCentrosCostos/";
      const { data } = await axios.get(url);
      this.costos = data;
    },

    inserView() {
      this.$router.push({ path: "inCenCosto" });
    },

    async buscarCCostos(){
      let formData = {
          descripcioncentrocostos: this.search,
        };
        let url = "http://localhost:8000/api/searchCentrosCostos/";
        const { data } = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        console.log(data);
      this.costosSearch = data;
    },

    async editarCosto(func, index) {
      let costosArr = (func == 1) ? this.costos : this.costosSearch
      const costoEditado = prompt(
        "Editar costo",
        costosArr[index].NombreCentroCostos
      );
      if (costoEditado !== null) {
        this.message = "";
        let formData = {
          codigocentrocostos: costosArr[index].Codigo,
          descripcioncentrocostos: costoEditado,
        };
        console.log(formData)
        let url = "http://localhost:8000/api/updateCentrosCostos/";
        const { data } = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        console.log(data)
        this.obtenerCosto();
      }
    },

    async eliminarCosto(func, index) {
      let costosArr = (func == 1) ? this.costos : this.costosSearch
      if (confirm("¿Eliminar costo?")) {
        this.message = "";
        let formData = {
          codigocentrocostos: costosArr[index].Codigo,
          descripcioncentrocostos: costosArr[index].NombreCentroCostos,
        };
        let url = "http://localhost:8000/api/deleteCentrosCostos/";
        const { data } = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        this.obtenerCosto();
      }
    },
  },
};
</script>
<style>
* {
  box-sizing: border-box;
}
.form-button {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Create three equal columns that floats next to each other */
.column {
  float: left;
  padding: 10px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
