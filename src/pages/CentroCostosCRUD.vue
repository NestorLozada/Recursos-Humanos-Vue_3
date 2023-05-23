<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="column" style="margin-right: 500px">
          <button class="form-button">Nuevo</button>
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
          body-classes="table-full-width table-responsive">
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
                    <button class="form-button" @click="editarCosto(costo)">
                      Editar</button>
                  </td>

                  <div v-if="isModalVisible" class="modal-overlay" @click="closeModal()"></div>
                  <td>
                    <button class="form-button" @click="eliminarCosto(costo)">Eliminar</button>
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
                    <button class="form-button" @click="editarCosto(costo)">
                      Editar
                    </button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarCosto(2, index)">
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


    <!-- Modal -->
    <div v-if="isModalVisible" class="modal modal-style" id="editcc" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Editar costo N°<b>{{ costo.CodigoE }}</b></h2>
        <div class="modal-body">
          <div class="form-group inputModal">
            <input type="hidden" id="Codigo" v-model="costo.CodigoE" />
            <input type="text" id="NombreCentroCostos" v-model="costo.NombreCentroCostosE" />
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="updateCosto(costo.CodigoE, costo.NombreCentroCostosE)">
              Editar
            </button>
          </div>
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">
              Cancelar
            </button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isMEliminarVisible" class="modal modal-style" id="editcc" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h4>Esta seguro de eliminar el centro de costo N°<b>{{ costo.CodigoE }}</b></h4>
        <input type="hidden" id="Codigo" v-model="costo.CodigoE" />
        <input type="hidden" id="NombreCentroCostos" v-model="costo.NombreCentroCostosE" />
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="btnModel" @click="deleteCosto(costo.CodigoE, costo.NombreCentroCostosE)">Si</button>
          </div>
          <div class="column">
            <button style="margin: 0 20px;" @click="closeModal()">No</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div></template>
<script>
import axios from "axios";
import * as $ from "jquery";
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
      costo: {
        CodigoE: '',
        NombreCentroCostosE: ''
      },
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
    eliminarCosto(costo) {
      this.isMEliminarVisible = true;
      console.log(costo)
      this.costo.CodigoE = costo.Codigo
      this.costo.NombreCentroCostosE = costo.NombreCentroCostos
    },
    closeModal() {
      this.isModalVisible = false;
      this.isMEliminarVisible = false;
    },
    showAlert(message) {
      this.$swal(message);
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

    editarCosto(costo) {
      console.log('entra')
      console.log(costo)
      this.isModalVisible = true;
      this.costo.CodigoE = costo.Codigo
      this.costo.NombreCentroCostosE = costo.NombreCentroCostos
    },

    async updateCosto(index, NombreCentroCostos) {
      this.isModalVisible = false;
      let formData = {
        codigocentrocostos: index,
        descripcioncentrocostos: NombreCentroCostos,
      };
      console.log(formData);
      let url = `${process.env.apiWebsite}/api/updateCentrosCostos/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data);
      this.showAlert(data.message)
      this.obtenerCosto();
    },


    async deleteCosto(index, NombreCentroCostos) {
      this.isMEliminarVisible = false;
      let formData = {
        codigocentrocostos: index,
        descripcioncentrocostos: NombreCentroCostos,
      };
      let url = `${process.env.apiWebsite}/api/deleteCentrosCostos/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data);
      this.showAlert(data.message)
      this.obtenerCosto();
    }
  },
};
</script>

<style>
.form-button {
  display: block;
  margin: 0 20px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

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

.btnMdiv {
  display: flex;
  margin: 5%;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content1 button:hover {
  background-color: #444;
}

.btns {
  display: flex;
  justify-content: center;
}

.inputModal {
  width: 500px;
}

.modal-content {
  width: auto;
}
</style>
