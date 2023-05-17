<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
      <div class="column" style="margin-right: 500px">
        <button class="form-button" @click="showModal">Nuevo</button>
        <InsertCC v-show="isModalVisible" @close="closeModal" />
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
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Centros de Costo</h4>
              <p class="card-category">Tabla</p>
            </template>
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
                  <td>
                    <button class="form-button" @click="showModal()">
                      Editar
                    </button>
                  </td>
                      <div v-if="isModalVisible" class="modal">
                      <div class="modal-content">
                        <h2>Editar costo</h2>
                        <input
                            type="number"
                            id="NombreCentroCostos"
                          />
                          <div class="btnMdiv">
                            <button class="btnModel" @click="editarCosto(2, index)">Editar</button>
                            <button class="btnModel" @click="closeModal()">Cancelar</button>
                          </div>
                      </div>
                    </div>

                    <div v-if="modalVisible" class="modal-overlay" @click="closeModal()"></div>
                  <td>
                    <button
                      class="form-button"
                      @click="ShowModalEliminar()"
                    >
                   
                      Eliminar
                    </button>
                    <div v-if="isMEliminarVisible" class="modal1">
                      <div class="modal-content1">
                        <h4>Esta seguro de eliminar?</h4>
                       
                          <div class="btnMdiv">
                            <button class="btnModel" @click="eliminarCosto(1, index)">Si</button>
                            <button class="btnModel" @click="closeModal()">No</button>
                          </div>
                      </div>
                    </div>
                  </td>
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
                  <td>
                    <button class="form-button" @click="editarCosto(2, index)">
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      class="form-button"
                      @click="eliminarCosto(2, index)"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
import InsertCC from "./InsertCC.vue";

export default {
  components: {
    LTable,
    Card,
  },
  data() {
    return {
      costos: [],
      message: "",
      ncodigo: "",
      nnombre: "",
      search: "",
      costosSearch: "",
      isModalVisible: false,
      isMEliminarVisible: false,
     
    };
  },
  mounted() {
    this.message = "";
    (this.ncodigo = ""), (this.nnombre = ""), this.obtenerCosto();
  },
  created() {
    this.obtenerCosto();
  },
  methods: {
    async obtenerCosto() {
      this.message = "";
      let url = `${process.env.apiWebsite}/api/getCentrosCostos/`;
      const { data } = await axios.get(url);
      this.costos = data;
    },

    showModal() {
      this.isModalVisible = true;
    },
    ShowModalEliminar(){
      this.isMEliminarVisible=true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isMEliminarVisible=false;
    },
    
    async buscarCCostos() {
      let formData = {
        descripcioncentrocostos: this.search,
      };
      let url = `${process.env.apiWebsite}/api/searchCentrosCostos/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data);
      this.costosSearch = data;
    },

    async editarCosto(func, index) {
      
      let costosArr = func == 1 ? this.costos : this.costosSearch;
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
        console.log(formData);
        let url = `${process.env.apiWebsite}/api/updateCentrosCostos/`;
        const { data } = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        console.log(data);
        this.obtenerCosto();
      }
    },

    async eliminarCosto(func, index) {
      let costosArr = func == 1 ? this.costos : this.costosSearch;
      if (confirm("¿Eliminar costo?")) {
        this.message = "";
        let formData = {
          codigocentrocostos: costosArr[index].Codigo,
          descripcioncentrocostos: costosArr[index].NombreCentroCostos,
        };
        let url = `${process.env.apiWebsite}/api/deleteCentrosCostos/`;
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
/* * {
  box-sizing: border-box;
} */
.form-button {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Create three equal columns that floats next to each other */
/* .column {
  float: left;
  padding: 10px;
} */

/* Clear floats after the columns */
/* .row:after {
  content: "";
  display: table;
  clear: both;
} */
/* table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
} */
.main-panel {
  padding-left: 30px;
  padding-right: 30px;
}

.modal1 {
  position: fixed;
  top: 0;
  left: 0;
  margin: 10% 30% 50% 50%;
  background-color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content1 {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
}

.modal-content1 h3 {
  margin-top: 0;
}

.modal-content1 button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btnMdiv{
  display: flex;
  margin:5%;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content1 button:hover {
  background-color: #444;
}
</style>
