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
              <button class="form-button" @click="buscarMovimiento">Buscar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">
              <h4 class="card-title">Movimiento Plantilla</h4>
              <p class="card-category">Tabla</p>
            </template>
            <table v-if="search == ''" class="table">
              <thead>
                <tr>
                  <th>CODIGO</th>
                  <th>DESCRIPCION</th>
                  <th>TIPO</th>
                  <th>AFECTA IESS</th>
                  <th>AFECTA IR</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(movimiento, index) in movimientos" :key="index">
                  <td>{{ movimiento.CodigoConcepto }}</td>
                  <td>{{ movimiento.Concepto }}</td>
                  <td>{{ movimiento.TipoOperacion }}</td>
                  <td>{{ movimiento.Aplica_iess }}</td>
                  <td>{{ movimiento.Aplica_imp_renta }}</td>
                  <td>
                    <button class="form-button" @click="editarMovimiento(movimiento)">Editar</button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarMovimiento(movimiento)">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-if="search != ''" class="table">
              <thead>
                <tr>
                  <th>CODIGO</th>
                  <th>DESCRIPCION</th>
                  <th>TIPO</th>
                  <th>AFECTA IESS</th>
                  <th>AFECTA IR</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(movimiento, index) in movimientosSearch" :key="index">
                  <td>{{ movimiento.Codigo }}</td>
                  <td>{{ movimiento.NombreCentroCostos }}</td>
                  <td>
                    <button class="form-button" @click="editarMovimiento(2, index)">
                      Editar
                    </button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarMovimiento(2, index)">
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
      <div class="modal-content1">
        <h2>Insertar Movimiento</h2>
        <div class="modal-body">
          <!-- <div class="row"> -->
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CodigoConcepto">Codigo Planilla:</label>
                  <input type="text" class="form-control" id="CodigoConcepto" placeholder="Ingrese el codigo de planilla" v-model="movimiento.CodigoConcepto">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="concepto">Concepto:</label>
                  <input type="text" class="form-control" id="concepto" placeholder="Ingrese el concepto" v-model="movimiento.Concepto">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Prioridad">Prioridad:</label>
                  <input type="number" class="form-control" id="Prioridad" placeholder="Ingrese la Prioridad" v-model="movimiento.Prioridad">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">{{ movimiento.TipoOperacion }}
                  <label for="tipoOperacion">Tipo de Operacion:</label>
                  <select class="form-control" id="tipoOperacion" v-model="movimiento.TipoOperacion">
                    <option v-for="(tipoOp) in TipoOperacionCombo" :value="tipoOp.CodigoTipooperacion" :selected="movimiento.TipoOperacion === tipoOp.CodigoTipooperacion">{{ tipoOp.CodigoTipooperacion }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta1">Cuenta 1:</label>
                  <input type="text" class="form-control" id="Cuenta1" placeholder="Ingrese la cuenta 1" v-model="movimiento.Cuenta1">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta2">Cuenta 2:</label>
                  <input type="text" class="form-control" id="Cuenta2" placeholder="Ingrese la cuenta 2" v-model="movimiento.Cuenta2">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta3">Cuenta 3:</label>
                  <input type="text" class="form-control" id="Cuenta3" placeholder="Ingrese la cuenta 3" v-model="movimiento.Cuenta3">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta4">Cuenta 4:</label>
                  <input type="text" class="form-control" id="Cuenta4" placeholder="Ingrese la cuenta 4" v-model="movimiento.Cuenta4">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="movimientoExcepcion1">Movimiento Excepción 1:</label>
                  <select class="form-control" id="movimientoExcepcion1" v-model="movimiento.MovimientoExcepcion1">
                    <option value="opcion1" selected>Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="movimientoExcepcion2">Movimiento Excepción 2:</label>
                  <select class="form-control" id="movimientoExcepcion2" v-model="movimiento.MovimientoExcepcion2">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <!-- <div class="form-group"> -->
                  <label for="movimientoExcepcion3">Movimiento Excepción 3:</label>
                  <select class="form-control" id="movimientoExcepcion3" v-model="movimiento.MovimientoExcepcion3">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                <!-- </div> -->
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Aplica_iess">Aplica IESS:</label>
                  <select class="form-control" id="Aplica_iess" v-model="movimiento.Aplica_iess">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Aplica_imp_renta">Impuesto Renta:</label>
                  <select class="form-control" id="Aplica_imp_renta" v-model="movimiento.Aplica_imp_renta">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Empresa_Afecta_Iess">Empresa Afecta IESS:</label>
                  <select class="form-control" id="Empresa_Afecta_Iess" v-model="movimiento.Empresa_Afecta_Iess">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <!-- <div class="form-group">
                  <label for="Aplica_Proy_Renta">Aplica Renta:</label>
                  <select class="form-control" id="Aplica_Proy_Renta" v-model="movimiento.Aplica_Proy_Renta">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                </div> -->
              </div>
              <div class="column marginColum">
                <!-- <div class="form-group">
                  <label for="Aplica_iess">Aplica IESS:</label>
                  <input type="text" class="form-control" id="Aplica_iess" placeholder="Ingrese sin aplica IESS">
                </div> -->
              </div>
            </div>
          <!-- </div> -->
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
      movimiento: {
        CodigoConcepto: '',
        Concepto: '',
        Prioridad: '',
        TipoOperacion: '',
        Cuenta1: '',
        Cuenta2: '',
        Cuenta3: '',
        Cuenta4: '',
        MovimientoExcepcion1: '',
        MovimientoExcepcion2: '',
        MovimientoExcepcion3: '',
        Aplica_iess: '',
        Aplica_imp_renta: '',
        Aplica_Proy_Renta: '',
        Empresa_Afecta_Iess: '',
      },
      movimientos: "",
      TipoOperacionCombo: "",
      movExcepcion1y2Combo: "",
      movExcepcion3Combo: "",
      trabaAfectaIESSCombo: "",
      trabAfecImpuestoRentaCombo: "",
      message: "",
      search: "",
      movimientosSearch: "",
      isModalVisible: false,
      isMEliminarVisible: false,
    };
  },
  mounted() {
    this.message = "";
    this.obtenerMovimientoPlantilla();
    this.getTiposOperacion();
    this.getMovExcepcion1y2();
    this.getMovExcepcion3();
    this.getTrabAfecImpuestoRenta();
    this.getTrabaAfectaIESS();
  },
  methods: {
    async getTiposOperacion(){
      let url = `${process.env.apiWebsite}/api/getTiposOperacion/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.TipoOperacionCombo = data;
    },
    async getMovExcepcion1y2(){
      let url = `${process.env.apiWebsite}/api/getMovExcepcion1y2/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.movExcepcion1y2Combo = data;
    },
    async getMovExcepcion3(){
      let url = `${process.env.apiWebsite}/api/getMovExcepcion3/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.movExcepcion3Combo = data;
    },
    async getTrabaAfectaIESS(){
      let url = `${process.env.apiWebsite}/api/getTrabaAfectaIESS/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.trabaAfectaIESSCombo = data;
    },
    async getTrabAfecImpuestoRenta(){
      let url = `${process.env.apiWebsite}/api/getTrabAfecImpuestoRenta/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.trabAfecImpuestoRentaCombo = data;
    },

    async obtenerMovimientoPlantilla() {
      this.message = "";
      let url = `${process.env.apiWebsite}/api/getMovimientoPlanilla/`;
      const { data } = await axios.get(url);
      this.movimientos = data;
      //console.log(data);
    },


    showModal() {
      this.isModalVisible = true;
    },
    eliminarMovimiento(costo) {
      this.isMEliminarVisible = true;
      console.log(costo)
      this.costo.CodigoE = costo.Codigo
    },
    closeModal() {
      this.isModalVisible = false;
      this.isMEliminarVisible = false;
    },
    inserView() {
      this.$router.push({ path: "inCenCosto" });
    },
    showAlert(message) {
      this.$swal(message);
    },
    async buscarMovimiento() {
      let formData = {
        Concepto: this.search,
      };
      let url = `${process.env.apiWebsite}/api/searchMovimientoPlanilla/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data);
      this.costosSearch = data;
    },

    editarMovimiento(movimiento) {
      console.log('entra')
      console.log(movimiento)
      this.isModalVisible = true;
      this.movimiento.CodigoConcepto = movimiento.CodigoConcepto;
      this.movimiento.Concepto = movimiento.Concepto;
      this.movimiento.Prioridad = movimiento.Prioridad;
      this.movimiento.TipoOperacion = movimiento.TipoOperacion;
      this.movimiento.Cuenta1 = movimiento.Cuenta1;
      this.movimiento.Cuenta2 = movimiento.Cuenta2;
      this.movimiento.Cuenta3 = movimiento.Cuenta3;
      this.movimiento.Cuenta4 = movimiento.Cuenta4;
      this.movimiento.MovimientoExcepcion1 = movimiento.MovimientoExcepcion1;
      this.movimiento.MovimientoExcepcion2 = movimiento.MovimientoExcepcion2;
      this.movimiento.MovimientoExcepcion3 = movimiento.MovimientoExcepcion3;
      this.movimiento.Aplica_iess = movimiento.Aplica_iess;
      this.movimiento.Aplica_imp_renta = movimiento.Aplica_imp_renta;
      this.movimiento.Aplica_Proy_Renta = movimiento.Aplica_Proy_Renta;
      this.movimiento.Empresa_Afecta_Iess = movimiento.Empresa_Afecta_Iess;
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
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.form-control{
  width: 250px;
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
  text-align: left;
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
  justify-content: left;
}

.modal-content {
  width: auto;
  justify-content: left;
}

.ingresodatos {
  display: flex;
  padding: 1%;
}

.ingresodatos input {
  justify-content: left;
  margin-left: 20px;
}

.marginColum {
  margin: 0 5px;
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
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
} */
</style>
