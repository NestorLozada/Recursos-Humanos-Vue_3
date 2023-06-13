<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row rowSearchNew">
        <div class="column" style="margin-right: 500px">
          <!-- <button class="form-button" @click="insertarCosto">Nuevo</button> -->
        </div>
        <div class="column">
          <div class="row search">
            <div class="column">
              <input v-model="search" class="form-control" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">
              <h4 class="card-title">Parámetros</h4>
              <p class="card-category">Tabla</p>
            </template>
            <table v-if="search == ''" class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th></th>
                  <th>Nombre</th>
                  <th></th>
                  <th>Visualizar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(parametro, index) in parametros" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td></td>
                  <td>{{ parametro }}</td>
                  <td>
                    <!-- <button class="form-button" @click="editarCosto(costo)">
                      Visualizar</button> -->
                  </td>
                  <td>
                    <button class="form-button" @click="showModal(parametro)">Visualizar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-if="search != ''" class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th></th>
                  <th>Nombre</th>
                  <th></th>
                  <th>Visualizar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(parametro, index) in parametrosFiltrados" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td></td>
                  <td>{{ parametro }}</td>
                  <td>
                    <!-- <button class="form-button" @click="editarCosto(costo)">
                      Visualizar</button> -->
                  </td>
                  <td>
                    <button class="form-button" @click="showModal(parametro)">Visualizar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
    </div>


    <!-- Modal -->
    <div v-if="isModalSexo" class="modal modal-style" id="modalSexo" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Sexo</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(GeneroCombo, index) in GeneroCombo" :key="index">
                  <td>{{ GeneroCombo.Descripcion }}</td>
                  <td>{{ GeneroCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
            
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isModalEstadoTrabajador" class="modal modal-style" id="modalEstadoTrabajador" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Estado Trabajador</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(EstadoTrabajadorCombo, index) in EstadoTrabajadorCombo" :key="index">
                  <td>{{ EstadoTrabajadorCombo.Descripcion }}</td>
                  <td>{{ EstadoTrabajadorCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isModalTipoContrato" class="modal modal-style" id="modalTipoContrato" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Tipo Contrato</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(TipoContratoCombo, index) in TipoContratoCombo" :key="index">
                  <td>{{ TipoContratoCombo.Descripcion }}</td>
                  <td>{{ TipoContratoCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isModalTipoCese" class="modal modal-style" id="modalTipoCese" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Tipo Cese</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(TipoCeseCombo, index) in TipoCeseCombo" :key="index">
                  <td>{{ TipoCeseCombo.Descripcion }}</td>
                  <td>{{ TipoCeseCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isModalEstadoCivil" class="modal modal-style" id="modalEstadoCivil" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Estado Civil</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(EstadoCivilCombo, index) in EstadoCivilCombo" :key="index">
                  <td>{{ EstadoCivilCombo.Descripcion }}</td>
                  <td>{{ EstadoCivilCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isModalEsReingreso" class="modal modal-style" id="modalEsReingreso" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Es Reingreso</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(EsReingresoCombo, index) in EsReingresoCombo" :key="index">
                  <td>{{ EsReingresoCombo.Descripcion }}</td>
                  <td>{{ EsReingresoCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isModalTipoCuenta" class="modal modal-style" id="modalTipoCuenta" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Tipo Cuenta</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(TipoCuentaCombo, index) in TipoCuentaCombo" :key="index">
                  <td>{{ TipoCuentaCombo.Descripcion }}</td>
                  <td>{{ TipoCuentaCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isModalTipoTrabajador" class="modal modal-style" id="modalTipoTrabajador" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h2>Tipo Trabajador</h2>
        <div class="modal-body modalCC">
          <table class="table">
            <thead>
                <tr class="trModal">
                  <th>Codigo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(TipoTrabajadorCombo, index) in TipoTrabajadorCombo" :key="index">
                  <td>{{ TipoTrabajadorCombo.Descripcion }}</td>
                  <td>{{ TipoTrabajadorCombo.Codigo }}</td>
                </tr>
              </tbody>
          </table>
          <div class="form-group inputModal">
          </div>
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
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
    Card,
  },
  data() {
    return {
      parametros: ['Sexo', 'Estado Trabajador', 'Tipo Contrato', 'Tipo Cese', 'Estado Civil', 'Es Reingreso', 'Tipo Cuenta', 'Tipo Trabajador'],
      TipoTrabajadorCombo: "",
      GeneroCombo: "",
      EstadoTrabajadorCombo: "",
      TipoCeseCombo: "",
      TipoContratoCombo: "",
      EstadoCivilCombo: "",
      EsReingresoCombo: "",
      TipoCuentaCombo: "",
      search: "",
      parametrosSearch: "",
      isModalSexo: false,
      isModalEstadoTrabajador: false,
      isModalTipoCese: false,
      isModalTipoContrato: false,
      isModalEstadoCivil: false,
      isModalEsReingreso: false,
      isModalTipoCuenta: false,
      isModalTipoTrabajador: false,      
    };
  },
  mounted() {
    this.getGenero();
    this.getEstadoTrabajador();
    this.getTipoContrato();
    this.getTipoCese();
    this.getEstadoCivil();
    this.getEsReingreso();
    this.getTipoCuenta();
    this.getTipoTrabajador();
  },
  computed: {
    parametrosFiltrados() {
      const searchTerm = this.search.toLowerCase();
      return this.parametros.filter(parametro => {
        return parametro.toLowerCase().includes(searchTerm)
      });
    },
  },
  methods: {
    showModal(parametro){
      switch (parametro) {
        case 'Sexo':
          this.isModalSexo = true;
          break;
        case 'Estado Trabajador':
          this.isModalEstadoTrabajador = true;
          break;
        case 'Tipo Contrato':
          this.isModalTipoContrato = true;
          break;
        case 'Tipo Cese':
          this.isModalTipoCese = true;
          break;
        case 'Estado Civil':
          this.isModalEstadoCivil = true;
          break;
        case 'Es Reingreso':
          this.isModalEsReingreso = true;
          break;
        case 'Tipo Cuenta':
          this.isModalTipoCuenta = true;
          break;
        case 'Tipo Trabajador':
          this.isModalTipoTrabajador = true;
          break;
        default:
          this.showAlert('No se pudo abrir el modal!')
          break;
      }
    },
    closeModal() {
      this.isModalSexo = false;
      this.isModalEstadoTrabajador = false;
      this.isModalTipoContrato = false;
      this.isModalTipoCese = false;
      this.isModalEstadoCivil = false;
      this.isModalEsReingreso = false;
      this.isModalTipoCuenta = false;
      this.isModalTipoTrabajador = false;
    },
    showAlert(message) {
      this.$swal(message);
    },

    async getGenero(){
      let url = `${process.env.apiWebsite}/api/getGenero/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.GeneroCombo = data;
    },
    async getEstadoTrabajador(){
      let url = `${process.env.apiWebsite}/api/getEstadoTrabajador/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.EstadoTrabajadorCombo = data;
    },
    async getTipoContrato(){
      let url = `${process.env.apiWebsite}/api/getTipoContrato/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipoContratoCombo = data;
    },
    async getTipoCese(){
      let url = `${process.env.apiWebsite}/api/getTipoCese/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipoCeseCombo = data;
    },
    async getEstadoCivil(){
      let url = `${process.env.apiWebsite}/api/getEstadoCivil/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.EstadoCivilCombo = data;
    },
    async getEsReingreso(){
      let url = `${process.env.apiWebsite}/api/getEsReingreso/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.EsReingresoCombo = data;
    },
    async getTipoCuenta(){
      let url = `${process.env.apiWebsite}/api/getTipoCuenta/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipoCuentaCombo = data;
    },
    async getTipoTrabajador(){
      let url = `${process.env.apiWebsite}/api/getTipoTrabajador/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipoTrabajadorCombo = data;
    },

  },
};
</script>
<style>
.trModal{
  text-align-last: center;
}

.modalCC{
  height: 40vh;
}

</style>
