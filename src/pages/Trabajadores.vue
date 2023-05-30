<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row rowSearchNew">
        <div class="column" style="margin-right: 500px">
          <button class="form-button" @click="insertarMovPlantilla">Nuevo</button>
        </div>
        <div class="column">
          <!-- <div class="row">
            <div class="column">
              <input v-model="search" class="form-control" placeholder="Search" />
            </div>
            <div class="column">
              <button class="form-button" @click="buscarMovimiento">Buscar</button>
            </div>
          </div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">
              <h4 class="card-title">Trabajadores</h4>
              <p class="card-category">Tabla</p>
            </template>
            <table v-if="search == ''" class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TIPO TRABAJADOR</th>
                  <th>NOMBRES</th>
                  <th>APELLIDOS</th>
                  <th>DNI</th>
                  <th>BANCO</th>
                  <th>TELEFONO</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trabajador, index) in trabajadores" :key="index">
                  <td>{{ trabajador.Id_Trabajador }}</td>
                  <td>{{ trabajador.Tipo_trabajador }}</td>
                  <td>{{ trabajador.Nombres }}</td>
                  <td>{{ trabajador.Apellido_Paterno }} {{ trabajador.Apellido_Materno }}</td>
                  <td>{{ trabajador.Identificacion }}</td>
                  <td>{{ trabajador.Entidad_Bancaria }}</td>
                  <td>{{ trabajador.Telefono_Movil }}</td>
                  <td>
                    <button class="form-button" @click="editarMovimiento(trabajador)">Editar</button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarMovimiento(trabajador)">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-if="search != ''" class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TIPO TRABAJADOR</th>
                  <th>NOMBRES</th>
                  <th>APELLIDOS</th>
                  <th>DNI</th>
                  <th>BANCO</th>
                  <th>TELEFONO</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trabajador, index) in trabajadoresSearch" :key="index">
                  <td>{{ trabajador.Id_Trabajador }}</td>
                  <td>{{ trabajador.Tipo_trabajador }}</td>
                  <td>{{ trabajador.Nombres }}</td>
                  <td>{{ trabajador.Apellido_Paterno }} {{ trabajador.Apellido_Materno }}</td>
                  <td>{{ trabajador.Identificacion }}</td>
                  <td>{{ trabajador.Entidad_Bancaria }}</td>
                  <td>{{ trabajador.Telefono_Movil }}</td>
                  <td>
                    <button class="form-button" @click="editarMovimiento(trabajador)">Editar</button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarMovimiento(trabajador)">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal modal-style" id="editTrabajador" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content1">
        <h2>Editar Movimiento</h2>
        <div class="modal-body">
          <!-- <div class="row"> -->
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CodigoConcepto">Codigo Planilla:</label>
                  <input type="text" class="form-control" id="CodigoConcepto" placeholder="Ingrese el codigo de planilla" v-model="movimientoE.CodigoConcepto" readonly>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="concepto">Concepto:</label>
                  <input type="text" class="form-control" id="concepto" placeholder="Ingrese el concepto" v-model="movimientoE.Concepto">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Prioridad">Prioridad:</label>
                  <input type="number" class="form-control" id="Prioridad" placeholder="Ingrese la Prioridad" v-model="movimientoE.Prioridad">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoOperacion">Tipo de Operacion:</label>
                  <select class="form-control" id="tipoOperacion" v-model="movimientoE.TipoOperacion">
                    <option v-for="(tipoOp) in TipoTrabajadorCombo" :value="tipoOp.NombreOperacion" :selected="movimientoE.TipoOperacion === tipoOp.CodigoTipooperacion">{{ tipoOp.CodigoTipooperacion }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta1">Cuenta 1:</label>
                  <input type="text" class="form-control" id="Cuenta1" placeholder="Ingrese la cuenta 1" v-model="movimientoE.Cuenta1">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta2">Cuenta 2:</label>
                  <input type="text" class="form-control" id="Cuenta2" placeholder="Ingrese la cuenta 2" v-model="movimientoE.Cuenta2">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta3">Cuenta 3:</label>
                  <input type="text" class="form-control" id="Cuenta3" placeholder="Ingrese la cuenta 3" v-model="movimientoE.Cuenta3">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Cuenta4">Cuenta 4:</label>
                  <input type="text" class="form-control" id="Cuenta4" placeholder="Ingrese la cuenta 4" v-model="movimientoE.Cuenta4">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="movimientoExcepcion1">Movimiento Excepción 1:</label>
                  <select class="form-control" id="movimientoExcepcion1" v-model="movimientoE.MovimientoExcepcion1">
                    <option v-for="(moExc1y2) in GeneroCombo" :value="moExc1y2.DesripMovimientoExce" :selected="movimientoE.MovimientoExcepcion1 === moExc1y2.CodigoMovimientoExce">{{ moExc1y2.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="movimientoExcepcion2">Movimiento Excepción 2:</label>
                  <select class="form-control" id="movimientoExcepcion2" v-model="movimientoE.MovimientoExcepcion2">
                    <option v-for="(moExc1y2) in GeneroCombo" :value="moExc1y2.DesripMovimientoExce" :selected="movimientoE.MovimientoExcepcion2 === moExc1y2.CodigoMovimientoExce">{{ moExc1y2.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="movimientoExcepcion3">Movimiento Excepción 3:</label>
                  <select class="form-control" id="movimientoExcepcion3" v-model="movimientoE.MovimientoExcepcion3">
                    <option v-for="(moExc3) in EstadoTrabajadorCombo" :value="moExc3.DesripMovimientoExce" :selected="movimientoE.MovimientoExcepcion3 === moExc3.CodigoMovimientoExce">{{ moExc3.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Aplica_iess">Aplica IESS:</label>
                  <select class="form-control" id="Aplica_iess" v-model="movimientoE.Aplica_iess">
                    <option v-for="(trabaIess) in TipoCeseCombo" :value="trabaIess.DesripMovimientoExce" :selected="movimientoE.Aplica_iess === trabaIess.CodigoMovimientoExce">{{ trabaIess.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Aplica_imp_renta">Impuesto Renta:</label>
                  <select class="form-control" id="Aplica_imp_renta" v-model="movimientoE.Aplica_imp_renta">
                    <option v-for="(trabaImpRenta) in TipoContratoCombo" :value="trabaImpRenta.DesripMovimientoExce" :selected="movimientoE.Aplica_imp_renta === trabaImpRenta.CodigoMovimientoExce">{{ trabaImpRenta.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Empresa_Afecta_Iess">Empresa Afecta IESS:</label>
                  <select class="form-control" id="Empresa_Afecta_Iess" v-model="movimientoE.Empresa_Afecta_Iess">
                    <option v-for="(trabaIess) in TipoCeseCombo" :value="trabaIess.DesripMovimientoExce" :selected="movimientoE.Empresa_Afecta_Iess === trabaIess.CodigoMovimientoExce">{{ trabaIess.CodigoMovimientoExce }}</option>
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
            <button class="" style="margin: 0 20px;" @click="updateMovPlan(movimientoE)">
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

    <div v-if="isMEliminarVisible" class="modal modal-style" id="deleteTrabajador" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h4>Esta seguro de eliminar el Movimiento de Plantilla <br><br>"<b>{{ movimiento.CodigoConcepto }}</b> - {{ movimiento.Concepto }}"</h4>
        <input type="hidden" id="Codigo" v-model="movimiento.CodigoConcepto" />
        <input type="hidden" id="NombreCentroCostos" v-model="movimiento.Concepto" />
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="btnModel" @click="deleteMovPlan(movimiento.CodigoConcepto, movimiento.Concepto)">Si</button>
          </div>
          <div class="column">
            <button style="margin: 0 20px;" @click="closeModal()">No</button>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isMInsertarVisible" class="modal modal-style" id="insertTrabajador" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content1">
        <h2>Insertar Trabajador</h2>
        <div class="modal-body">
          <!-- <div class="row"> -->
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoOperacion">Tipo Trabajador:</label>
                  <select class="form-control" id="tipoOperacion" v-model="movimiento.TipoOperacion">
                    <option v-for="(tipoOp) in TipoTrabajadorCombo" :value="tipoOp.NombreOperacion" :selected="tipoOp.CodigoTipooperacion === movimiento.TipoOperacion">{{ tipoOp.CodigoTipooperacion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CodigoConcepto">Codigo Planilla:</label>
                  <input type="text" class="form-control" id="CodigoConcepto" placeholder="Ingrese el codigo de planilla" v-model="movimiento.CodigoConcepto" readonly>
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
                <div class="form-group">
                  <label for="tipoOperacion">Tipo de Operacion:</label>
                  <select class="form-control" id="tipoOperacion" v-model="movimiento.TipoOperacion">
                    <option v-for="(tipoOp) in TipoTrabajadorCombo" :value="tipoOp.NombreOperacion" :selected="tipoOp.CodigoTipooperacion === movimiento.TipoOperacion">{{ tipoOp.CodigoTipooperacion }}</option>
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
                    <option v-for="(moExc1y2) in GeneroCombo" :value="moExc1y2.DesripMovimientoExce" :selected="movimiento.MovimientoExcepcion1 === moExc1y2.CodigoMovimientoExce">{{ moExc1y2.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="movimientoExcepcion2">Movimiento Excepción 2:</label>
                  <select class="form-control" id="movimientoExcepcion2" v-model="movimiento.MovimientoExcepcion2">
                    <option v-for="(moExc1y2) in GeneroCombo" :value="moExc1y2.DesripMovimientoExce" :selected="movimiento.MovimientoExcepcion2 === moExc1y2.CodigoMovimientoExce">{{ moExc1y2.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="movimientoExcepcion3">Movimiento Excepción 3:</label>
                  <select class="form-control" id="movimientoExcepcion3" v-model="movimiento.MovimientoExcepcion3">
                    <option v-for="(moExc3) in EstadoTrabajadorCombo" :value="moExc3.DesripMovimientoExce" :selected="movimiento.MovimientoExcepcion3 === moExc3.CodigoMovimientoExce">{{ moExc3.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Aplica_iess">Aplica IESS:</label>
                  <select class="form-control" id="Aplica_iess" v-model="movimiento.Aplica_iess">
                    <option v-for="(trabaIess) in TipoCeseCombo" :value="trabaIess.DesripMovimientoExce" :selected="movimiento.Aplica_iess === trabaIess.CodigoMovimientoExce">{{ trabaIess.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Aplica_imp_renta">Impuesto Renta:</label>
                  <select class="form-control" id="Aplica_imp_renta" v-model="movimiento.Aplica_imp_renta">
                    <option v-for="(trabaImpRenta) in TipoContratoCombo" :value="trabaImpRenta.DesripMovimientoExce" :selected="movimiento.Aplica_imp_renta === trabaImpRenta.CodigoMovimientoExce">{{ trabaImpRenta.CodigoMovimientoExce }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Empresa_Afecta_Iess">Empresa Afecta IESS:</label>
                  <select class="form-control" id="Empresa_Afecta_Iess" v-model="movimiento.Empresa_Afecta_Iess">
                    <option v-for="(trabaIess) in TipoCeseCombo" :value="trabaIess.DesripMovimientoExce" :selected="movimiento.Empresa_Afecta_Iess === trabaIess.CodigoMovimientoExce">{{ trabaIess.CodigoMovimientoExce }}</option>
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
            <button class="" style="margin: 0 20px;" @click="insertMovPlan(movimiento)">
              Insertar
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
      trabajador: {
        COMP_Codigo: '',
        Tipo_trabajador: '',
        Prioridad: '',
        Apellido_Paterno: '',
        Apellido_Materno: '',
        Nombres: '',
        Identificacion: '',
        Entidad_Bancaria: '',
        CarnetIESS: '',
        Direccion: '',
        Telefono_Fijo: '',
        Telefono_Movil: '',
        Genero: '',
        Nro_Cuenta_Bancaria: '',
        Codigo_Categoria_Ocupacion: '',
        Ocupacion: '',
        Centro_Costos: '',
        Nivel_Salarial: '',
        EstadoTrabajador: '',
        Tipo_Contrato: '',
        Tipo_Cese: '',
        EstadoCivil: '',
        TipodeComision: '',
        FechaNacimiento: '',
        FechaIngreso: '',
        FechaCese: '',
        PeriododeVacaciones: '',
        FechaReingreso: '',
        Fecha_Ult_Actualizacion: '',
        EsReingreso: '',
        BancoCTA_CTE: '',
        Tipo_Cuenta: '',
        RSV_Indem_Acumul: '',
        Año_Ult_Rsva_Indemni: '',
        Mes_Ult_Rsva_Indemni: '',
        FormaCalculo13ro: '',
        FormaCalculo14ro: '',
        BoniComplementaria: '',
        BoniEspecial: '',
        Remuneracion_Minima: '',
        CuotaCuentaCorriente: '',
        Fondo_Reserva: '',
        Mensaje: '',
      },
      trabajadorE: {
        CodigoConcepto: '',
        Concepto: '',
        Prioridad: '',
        TipoOperacion: '',
        Apellido_Materno: '',
        Nombres: '',
        Identificacion: '',
        Entidad_Bancaria: '',
        CarnetIESS: '',
        Direccion: '',
        Telefono_Fijo: '',
        Telefono_Movil: '',
        Genero: '',
        Nro_Cuenta_Bancaria: '',
        Codigo_Categoria_Ocupacion: '',
        Ocupacion: '',
        Centro_Costos: '',
        Nivel_Salarial: '',
        EstadoTrabajador: '',
        Tipo_Contrato: '',
        Tipo_Cese: '',
        EstadoCivil: '',
        TipodeComision: '',
        FechaNacimiento: '',
        FechaIngreso: '',
        FechaCese: '',
        PeriododeVacaciones: '',
        FechaReingreso: '',
        Fecha_Ult_Actualizacion: '',
        EsReingreso: '',
        BancoCTA_CTE: '',
        Tipo_Cuenta: '',
        RSV_Indem_Acumul: '',
        Año_Ult_Rsva_Indemni: '',
        Mes_Ult_Rsva_Indemni: '',
        FormaCalculo13ro: '',
        FormaCalculo14ro: '',
        BoniComplementaria: '',
        BoniEspecial: '',
        Remuneracion_Minima: '',
        CuotaCuentaCorriente: '',
        Fondo_Reserva: '',
        Mensaje: '',
      },
      trabajadores: "",
      TipoTrabajadorCombo: "",
      GeneroCombo: "",
      EstadoTrabajadorCombo: "",
      TipoCeseCombo: "",
      TipoContratoCombo: "",
      EstadoCivilCombo: "",
      EsReingresoCombo: "",
      TipoCuentaCombo: "",
      CentroCostosCombo: "",
      message: "",
      search: "",
      trabajadoresSearch: "",
      isModalVisible: false,
      isMEliminarVisible: false,
      isMInsertarVisible: false,
    };
  },
  mounted() {
    this.message = "";
    this.getTrabajadores();
    this.getTipoTrabajador();
    this.getGenero();
    this.getEstadoTrabajador();
    this.getTipoContrato();
    this.getTipoCese();
    this.getEstadoCivil();
    this.getEsReingreso();
    this.getTipoCuenta();
  },
  created() {
    this.getTrabajadores();
  },
  methods: {
    async getTipoTrabajador(){
      let url = `${process.env.apiWebsite}/api/getTipoTrabajador/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.TipoTrabajadorCombo = data;
    },
    async getGenero(){
      let url = `${process.env.apiWebsite}/api/getGenero/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.GeneroCombo = data;
    },
    async getEstadoTrabajador(){
      let url = `${process.env.apiWebsite}/api/getEstadoTrabajador/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.EstadoTrabajadorCombo = data;
    },
    async getTipoCese(){
      let url = `${process.env.apiWebsite}/api/getTipoCese/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.TipoCeseCombo = data;
    },
    async getTipoContrato(){
      let url = `${process.env.apiWebsite}/api/getTipoContrato/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.TipoContratoCombo = data;
    },
    async getEstadoCivil(){
      let url = `${process.env.apiWebsite}/api/getEstadoCivil/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.EstadoCivilCombo = data;
    },
    async getEsReingreso(){
      let url = `${process.env.apiWebsite}/api/getEsReingreso/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.EsReingresoCombo = data;
    },
    async getTipoCuenta(){
      let url = `${process.env.apiWebsite}/api/getTipoCuenta/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.TipoCuentaCombo = data;
    },
    async getCentrosCostos(){
      let url = `${process.env.apiWebsite}/api/getCentrosCostos/`;
      const { data } = await axios.get(url);
      console.log(data);
      this.CentroCostosCombo = data;
    },
    async getTrabajadores() {
      this.message = "";
      let formData = {
        sucursal: localStorage.getItem("codigoEmisor")
      };
      let url = `${process.env.apiWebsite}/api/getTrabajador/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      this.trabajadores = data;
      //console.log(data);
    },


    showModal() {
      this.isModalVisible = true;
    },
    eliminarMovimiento(movimiento) {
      this.isMEliminarVisible = true;
      console.log(movimiento)
      this.movimiento.CodigoConcepto = movimiento.CodigoConcepto
      this.movimiento.Concepto = movimiento.Concepto
    },
    closeModal() {
      this.isModalVisible = false;
      this.isMEliminarVisible = false;
      this.isMInsertarVisible = false;
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
    insertarMovPlantilla() {
      this.isMInsertarVisible = true;
      /* this.movimiento.CodigoConcepto = ''
      this.movimiento.Concepto = ''
      this.movimiento.Prioridad = ''
      this.movimiento.TipoOperacion = ''
      this.movimiento.Cuenta1 = ''
      this.movimiento.Cuenta2 = ''
      this.movimiento.Cuenta3 = ''
      this.movimiento.Cuenta4 = ''
      this.movimiento.MovimientoExcepcion1 = ''
      this.movimiento.MovimientoExcepcion2 = ''
      this.movimiento.MovimientoExcepcion3 = ''
      this.movimiento.Aplica_iess = ''
      this.movimiento.Aplica_imp_renta = ''
      this.movimiento.Aplica_Proy_Renta = ''
      this.movimiento.Empresa_Afecta_Iess = ''  */   
    },

    async insertMovPlan(movimiento) {
      
      let formData = {
        conceptos : movimiento.Concepto,
        prioridad : movimiento.Prioridad,
        tipooperacion : movimiento.TipoOperacion,
        cuenta1 : movimiento.Cuenta1,
        cuenta2 : movimiento.Cuenta2,
        cuenta3 : movimiento.Cuenta3,
        cuenta4 : movimiento.Cuenta4,
        MovimientoExcepcion1 : movimiento.MovimientoExcepcion1,
        MovimientoExcepcion2 : movimiento.MovimientoExcepcion2,
        MovimientoExcepcion3 : movimiento.MovimientoExcepcion3,
        Traba_Aplica_iess : movimiento.Aplica_iess,
        Traba_Proyecto_imp_renta : movimiento.Aplica_imp_renta,
        Aplica_Proy_Renta : movimiento.Aplica_imp_renta,
        Empresa_Afecta_Iess : movimiento.Empresa_Afecta_Iess,
      };
      console.log(formData);
      let url = `${process.env.apiWebsite}/api/insertMovimientoPlanilla/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      this.isMInsertarVisible = false;
      console.log(data);
      this.showAlert(data.message)
      this.getTrabajadores();
    },

    editarMovimiento(movimiento) {
      console.log('entra')
      console.log(movimiento)
      this.isModalVisible = true;
      this.movimientoE.CodigoConcepto = movimiento.CodigoConcepto;
      this.movimientoE.Concepto = movimiento.Concepto;
      this.movimientoE.Prioridad = movimiento.Prioridad;
      this.movimientoE.TipoOperacion = movimiento.TipoOperacion;
      this.movimientoE.Cuenta1 = movimiento.Cuenta1;
      this.movimientoE.Cuenta2 = movimiento.Cuenta2;
      this.movimientoE.Cuenta3 = movimiento.Cuenta3;
      this.movimientoE.Cuenta4 = movimiento.Cuenta4;
      this.movimientoE.MovimientoExcepcion1 = movimiento.MovimientoExcepcion1;
      this.movimientoE.MovimientoExcepcion2 = movimiento.MovimientoExcepcion2;
      this.movimientoE.MovimientoExcepcion3 = movimiento.MovimientoExcepcion3;
      this.movimientoE.Aplica_iess = movimiento.Aplica_iess;
      this.movimientoE.Aplica_imp_renta = movimiento.Aplica_imp_renta;
      this.movimientoE.Aplica_Proy_Renta = movimiento.Aplica_Proy_Renta;
      this.movimientoE.Empresa_Afecta_Iess = movimiento.Empresa_Afecta_Iess;
    },

    async updateMovPlan(movimiento) {
      this.isModalVisible = false;
      let formData = {
        codigoplanilla : movimiento.CodigoConcepto,
        conceptos : movimiento.Concepto,
        prioridad : movimiento.Prioridad,
        tipooperacion : movimiento.TipoOperacion,
        cuenta1 : movimiento.Cuenta1,
        cuenta2 : movimiento.Cuenta2,
        cuenta3 : movimiento.Cuenta3,
        cuenta4 : movimiento.Cuenta4,
        MovimientoExcepcion1 : movimiento.MovimientoExcepcion1,
        MovimientoExcepcion2 : movimiento.MovimientoExcepcion2,
        MovimientoExcepcion3 : movimiento.MovimientoExcepcion3,
        Traba_Aplica_iess : movimiento.Aplica_iess,
        Traba_Proyecto_imp_renta : movimiento.Aplica_imp_renta,
        Aplica_Proy_Renta : movimiento.Aplica_imp_renta,
        Empresa_Afecta_Iess : movimiento.Empresa_Afecta_Iess,
      };
      console.log(formData);
      let url = `${process.env.apiWebsite}/api/updateMovimientoPlanilla/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data);
      this.showAlert(data.message)
      this.getTrabajadores();
    },

    async deleteMovPlan(codConcepto, concepto) {
      this.isMEliminarVisible = false;
      let formData = {
        codigomovimiento: codConcepto,
        descripcionomovimiento: concepto,
      };
      let url = `${process.env.apiWebsite}/api/deleteMovimientoPlanilla/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data);
      this.showAlert(data.message)
      this.getTrabajadores();
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

.rowSearchNew{
  margin-bottom: 15px;
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
</style>