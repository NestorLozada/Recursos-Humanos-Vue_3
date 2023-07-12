<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row rowSearchNew">
        <div class="col-6">
          <div class="column">
            <button class="form-button newBtn" @click="insertarCosto">Nuevo</button>
          </div>
        </div>
          <div class="col-6">
          <div class="column">
            <input v-model="search" class="form-control" placeholder="Search" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
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
                    <button class="form-button" @click="editarCosto(costo)">Editar</button>
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
                <tr v-for="(costo, index) in costosFiltrados" :key="index">
                  <td>{{ costo.Codigo }}</td>
                  <td>{{ costo.NombreCentroCostos }}</td>
                  <td>
                    <button class="form-button" @click="editarCosto(costo)">Editar</button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarCosto(costo)">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div v-if="isModalVisible" class="modal modal-style " id="editcc" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Editar costo N°<b>{{ costoE.CodigoE }}</b></h2>
        <div class="form-group inputModal">
          <input class="form-control" type="hidden" id="Codigo" v-model="costoE.CodigoE" />
          <input class="form-control m-auto" type="text" id="NombreCentroCostos" v-model="costoE.NombreCentroCostosE" />
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="updateCosto(costoE.CodigoE, costoE.NombreCentroCostosE)">Editar</button>
          </div>
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isMEliminarVisible" class="modal modal-style" id="deletecc" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h4>Esta seguro de eliminar el centro de costo N°<b>{{ costos.Codigo }}</b></h4>
        <input type="hidden" id="Codigo" v-model="costo.CodigoE" />
        <input type="hidden" id="NombreCentroCostos" v-model="costos.NombreCentroCostos" />
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="btnModel" @click="deleteCosto(costos.Codigo, costos.NombreCentroCostos)">Si</button>
          </div>
          <div class="column">
            <button style="margin: 0 20px;" @click="closeModal()">No</button>
          </div>
        </div>
      </div>

    </div>

    <!-- <div v-if="isMInsertarVisible" class="modal modal-style" id="insertcc" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Insertar Centro Costo</h2>
        <div>
          <div class="form-group inputModal">
            <label for="movimientoPlanilla">Código</label>
            <input type="number" placeholder="Código Centro Costos" class="form-control m-auto" id="Codigo" v-model="costos.Codigo" required/>
            <span>{{ errors }}</span>
          </div>
          <div class="form-group inputModal">
            <label for="movimientoPlanilla">Descripción</label>
            <input type="text" placeholder="Descripción Centro Costos" class="form-control m-auto" id="NombreCentroCostos" v-model="costos.NombreCentroCostos" />
          </div>
        </div>
        <div class="modal-footer"></div>
        <div class="row btns">
          <div class="column">
            <button class="btnModel" @click="insetCosto(costos.Codigo, costos.NombreCentroCostos)">Si</button>
          </div>
          <div class="column">
            <button style="margin: 0 20px;" @click="closeModal()">No</button>
          </div>
        </div>
      </div>
    </div> -->

    <div v-if="isMInsertarVisible" class="modal modal-style" id="insertcc" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
    <div class="modal-content">
      <h2>Insertar Centro Costo</h2>
      <div>
        <div class="form-group inputModal">
          <label for="movimientoPlanilla">Código</label>
          <input type="number" placeholder="Código Centro Costos" class="form-control m-auto" id="Codigo" v-model="costos.Codigo" />
          <span class="error-message">{{ errorMessages.Codigo }}</span>
        </div>
        <div class="form-group inputModal">
          <label for="movimientoPlanilla">Descripción</label>
          <input type="text" placeholder="Descripción Centro Costos" class="form-control m-auto" id="NombreCentroCostos" v-model="costos.NombreCentroCostos" />
          <span class="error-message">{{ errorMessages.NombreCentroCostos }}</span>
        </div>
      </div>
      <div class="modal-footer"></div>
      <div class="row btns">
        <div class="column">
          <button class="btnModel" @click="insetCosto(costos.Codigo, costos.NombreCentroCostos)">Si</button>
        </div>
        <div class="column">
          <button style="margin: 0 20px;" @click="closeModal">No</button>
        </div>
      </div>
    </div>
  </div>



  </div>
</template>
<script>
import axios from "axios";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";

export default {
  components: {
    LTable,
    Card
  },
  data() {
    return {
      costos: '',
      costo: {
        Codigo: '',
        NombreCentroCostos: ''
      },
      costoE: {
        CodigoE: '',
        NombreCentroCostosE: ''
      },
      errorMessages: {
        Codigo: '',
        NombreCentroCostos: ''
      },
      message: "",
      ncodigo: "",
      nnombre: "",
      search: "",
      costosSearch: "",
      isModalVisible: false,
      isMEliminarVisible: false,
      isMInsertarVisible: false,
    };
  },
  mounted() {
    this.message = "";
    this.obtenerCosto();
  },
  computed: {
    costosFiltrados() {
      const searchTerm = this.search.toLowerCase();
      return this.costos.filter(costo => {
        const codigo = costo.Codigo.toString(); // Convertir el código a cadena
        const nombre = costo.NombreCentroCostos.toLowerCase();
        return codigo.includes(searchTerm) || nombre.includes(searchTerm);
      });
    },
  },
  methods: {
    validateForm() {
    this.errorMessages = {
      Codigo: '',
      NombreCentroCostos: ''
    };
    let isValid = true;
    if (!this.costos.Codigo) {
      this.errorMessages.Codigo = 'El campo Código es obligatorio.';
      isValid = false;
    }
    if (!this.costos.NombreCentroCostos) {
      this.errorMessages.NombreCentroCostos = 'El campo Descripción es obligatorio.';
      isValid = false;
    }
    return isValid;
  },
    async obtenerCosto() {
      this.message = "";
      let url = `${process.env.apiWebsite}/api/getCentrosCostos/`;
      const { data } = await axios.get(url);
      this.costos = data;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isMEliminarVisible = false;
      this.isMInsertarVisible = false;
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
    insertarCosto() {
      this.isMInsertarVisible = true;
      this.costoE.CodigoE = ''
      this.costoE.NombreCentroCostosE = ''
    },
    async insetCosto(codigo, NombreCentroCostos) {
      if (!this.validateForm()){ 
        this.showModal('Errores en el formulario')
      }else{
        this.isMInsertarVisible = false;
        let formData = {
          codigocentrocostos: codigo,
          descripcioncentrocostos: NombreCentroCostos,
        };
        console.log(formData)
        let url = `${process.env.apiWebsite}/api/insertCentrosCostos/`;
        const { data } = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        console.log(data);
        this.showAlert(data)
        this.obtenerCosto();
      }
    },
    editarCosto(costo) {
      console.log('entra')
      console.log(costo)
      this.isModalVisible = true;
      this.costoE.CodigoE = costo.Codigo
      this.costoE.NombreCentroCostosE = costo.NombreCentroCostos
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
    eliminarCosto(costo) {
      this.isMEliminarVisible = true;
      console.log(costo)
      this.costos.Codigo = costo.Codigo
      this.costos.NombreCentroCostos = costo.NombreCentroCostos
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
      //console.log(data);
      this.showAlert(data.message)
      this.obtenerCosto();
    }
  },
};
</script>
<style>
.input{
  text-align: -webkit-center;
}

.modal-content{
  width: auto;
}
</style>
