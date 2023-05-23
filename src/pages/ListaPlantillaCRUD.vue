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
            body-classes="table-full-width table-responsive"
          >
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
                    <button class="form-button"  @click="editarCosto(costo)">Editar</button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarCosto(1, index)">Eliminar</button>
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
                      @click="eliminarCosto(2, index)">
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
        <h2>Editar Movimiento<b>{{ costo.CodigoE }}</b></h2>
        <div class="modal-body">
         
          <div class="form-group">
            <label for="movimientoPlanilla">Movimiento Planilla:</label>
            <input type="text" class="form-control" id="movimientoPlanilla" placeholder="Ingrese el movimiento de planilla">
          </div>
          <div class="form-group">
            <label for="codigoConcepto">Código de Concepto:</label>
            <input type="text" class="form-control" id="codigoConcepto" placeholder="Ingrese el código de concepto">
          </div>
          <div class="form-group">
            <label for="concepto">Concepto:</label>
            <input type="text" class="form-control" id="concepto" placeholder="Ingrese el concepto">
          </div>
          <div class="form-group">
            <label for="prioridad">Prioridad:</label>
            <input type="number" class="form-control" id="prioridad" placeholder="Ingrese la prioridad">
          </div>
          <div class="form-group">
            <label for="cuenta1">Cuenta 1:</label>
            <input type="text" class="form-control" id="cuenta1" placeholder="Ingrese la cuenta 1">
          </div>
          <div class="form-group">
            <label for="cuenta2">Cuenta 2:</label>
            <input type="text" class="form-control" id="cuenta2" placeholder="Ingrese la cuenta 2">
          </div>
          <div class="form-group">
            <label for="cuenta3">Cuenta 3:</label>
            <input type="text" class="form-control" id="cuenta3" placeholder="Ingrese la cuenta 3">
          </div>
          <div class="form-group">
            <label for="cuenta4">Cuenta 4:</label>
            <input type="text" class="form-control" id="cuenta4" placeholder="Ingrese la cuenta 4">
          </div>
         <div>
          <label for="movimientoPlanilla">Movimiento Planilla:</label>
      <input type="text" id="movimientoPlanilla"><br><br>

      <label for="codigoConcepto">Código de Concepto:</label>
      <input type="text" id="codigoConcepto"><br><br>

      <label for="ingresos">Ingresos:</label>
      <select id="ingresos">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select><br><br>

      <label for="cuentaCorriente">Cuenta Corriente:</label>
      <select id="cuentaCorriente">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select><br><br>

      <label for="movimientoExcepcion1">Movimiento Excepción 1:</label>
      <select id="movimientoExcepcion1">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select><br><br>

      <label for="movimientoExcepcion2">Movimiento Excepción 2:</label>
      <select id="movimientoExcepcion2">
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select><br><br>
         </div>
         <!--
          <label for="movimientoPlanilla">Movimiento Planilla:</label>
          <input type="text" id="movimientoPlanilla"><br><br>

          <label for="codigoConcepto">Código de Concepto:</label>
          <input type="text" id="codigoConcepto"><br><br>

          <label for="ingresos">Ingresos:</label>
          <select id="ingresos">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select><br><br>

          <label for="cuentaCorriente">Cuenta Corriente:</label>
          <select id="cuentaCorriente">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select><br><br>

          <label for="movimientoExcepcion1">Movimiento Excepción 1:</label>
          <select id="movimientoExcepcion1">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select><br><br>

          <label for="movimientoExcepcion2">Movimiento Excepción 2:</label>
          <select id="movimientoExcepcion2">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select><br><br>
         -->
          
                 
        
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
      costo: {
        CodigoE: '',
        NombreCentroCostosE: ''
      },
      movimientos: "",
      message: "",
      ncodigo: "",
      nnombre: "",
      search: "",
      movimientosSearch: "",
      isModalVisible: false,
      isMEliminarVisible: false,
    };
  },
  mounted() {
    this.message = "";
    (this.ncodigo = ""), (this.nnombre = ""), this.obtenerMovimientoPlantilla();
  },
  methods: {
   
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
    eliminarCosto(costo) {
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
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
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
.ingresodatos{
  display: flex;
  padding: 1%;
}
.ingresodatos input{
  justify-content: left;
  margin-left: 20px;
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
