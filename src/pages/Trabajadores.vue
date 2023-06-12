<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row rowSearchNew">
        <div class="column" style="margin-right: 500px">
          <button class="form-button" @click="insertarTrabajador">Nuevo</button>
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
                    <button class="form-button" @click="editarTrabajador(trabajador)">Editar</button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarTrabajador(trabajador)">Eliminar</button>
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
                    <button class="form-button" @click="editarTrabajador(trabajador)">Editar</button>
                  </td>
                  <td>
                    <button class="form-button" @click="eliminarTrabajador(trabajador)">Eliminar</button>
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
        <h2>Editar Trabajador</h2>
        <div class="modal-body">
          <!-- <div class="row"> -->
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoOperacion">Tipo Trabajador:</label>
                  <select class="form-control" id="tipoOperacion" v-model="trabajadorE.Tipo_trabajador">
                    <option v-for="(tipoTra) in TipoTrabajadorCombo" :value="tipoTra.Descripcion" :selected="tipoTra.Codigo === trabajadorE.Tipo_trabajador">{{ tipoTra.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CodigoConcepto">Apellido Paterno:</label>
                  <input type="text" class="form-control" id="CodigoConcepto" placeholder="Ingrese el Apellido Paterno" v-model="trabajadorE.Apellido_Paterno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="concepto">Apellido Materno:</label>
                  <input type="text" class="form-control" id="concepto" placeholder="Ingrese el Apellido Materno" v-model="trabajadorE.Apellido_Materno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Prioridad">Nombres:</label>
                  <input type="text" class="form-control" id="Nombres" placeholder="Ingrese la Nombres" v-model="trabajadorE.Nombres">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoOperacion">Identificacion:</label>
                  <input type="text" class="form-control" id="Identificacion" placeholder="Ingrese la Identificacion" v-model="trabajadorE.Identificacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Entidad_Bancaria">Entidad Bancaria:</label>
                  <input type="text" class="form-control" id="Entidad_Bancaria" placeholder="Ingrese la Entidad Bancaria" v-model="trabajadorE.Entidad_Bancaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CarnetIESS">Carnet IESS:</label>
                  <input type="text" class="form-control" id="CarnetIESS" placeholder="Ingrese el Carnet IESS" v-model="trabajadorE.CarnetIESS">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Direccion">Direccion:</label>
                  <input type="text" class="form-control" id="Direccion" placeholder="Ingrese la Direccion" v-model="trabajadorE.Direccion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Fijo">Telefono Fijo:</label>
                  <input type="text" class="form-control" id="Telefono_Fijo" placeholder="Ingrese el Telefono Fijo" v-model="trabajadorE.Telefono_Fijo">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Movil">Telefono Movil:</label>
                  <input type="text" class="form-control" id="Telefono_Movil" placeholder="Ingrese el Telefono Movil" v-model="trabajadorE.Telefono_Movil">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Genero">Genero:</label>
                  <select class="form-control" id="Genero" v-model="trabajadorE.Genero">
                    <option v-for="(gene) in GeneroCombo" :value="gene.Descripcion" :selected="trabajadorE.Genero === gene.Codigo">{{ gene.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Nro_Cuenta_Bancaria">Nro Cuenta Bancaria:</label>
                  <input type="text" class="form-control" id="Nro_Cuenta_Bancaria" placeholder="Ingrese el Nro Cuenta Bancaria" v-model="trabajadorE.Nro_Cuenta_Bancaria">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Codigo_Categoria_Ocupacion">Codigo Categoria Ocupacion:</label>
                  <input type="text" class="form-control" id="Codigo_Categoria_Ocupacion" placeholder="Ingrese el Codigo Categoria Ocupacion" v-model="trabajadorE.Codigo_Categoria_Ocupacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Ocupacion:</label>
                  <input type="text" class="form-control" id="Ocupacion" placeholder="Ingrese el Ocupacion" v-model="trabajadorE.Ocupacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Centro_Costos">Centro Costos:</label>
                  <select class="form-control" id="Centro_Costos" v-model="trabajadorE.Centro_Costos">
                    <option v-for="(cenCos) in CentroCostosCombo" :value="cenCos.Codigo" :selected="trabajadorE.Centro_Costos === cenCos.NombreCentroCostos">{{ cenCos.Codigo }} - {{ cenCos.NombreCentroCostos }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Nivel Salarial:</label>
                  <input type="text" class="form-control" id="Nivel_Salarial" placeholder="Ingrese el Nivel Salarial" v-model="trabajadorE.Nivel_Salarial">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoTrabajador">Estado Trabajador:</label>
                  <select class="form-control" id="EstadoTrabajador" v-model="trabajadorE.EstadoTrabajador">
                    <option v-for="(estTra) in EstadoTrabajadorCombo" :value="estTra.Descripcion" :selected="trabajadorE.Codigo === estTra.EstadoTrabajador">{{ estTra.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Contrato">Tipo Contrato:</label>
                  <select class="form-control" id="Tipo_Contrato" v-model="trabajadorE.Tipo_Contrato">
                    <option v-for="(tipoCon) in TipoContratoCombo" :value="tipoCon.Descripcion" :selected="trabajadorE.Tipo_Contrato === tipoCon.Codigo">{{ tipoCon.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cese">Tipo Cese:</label>
                  <select class="form-control" id="Tipo_Cese" v-model="trabajadorE.Tipo_Cese">
                    <option v-for="(tipoCese) in TipoCeseCombo" :value="tipoCese.Descripcion" :selected="trabajadorE.Tipo_Cese === tipoCese.Codigo">{{ tipoCese.Codigo }}</option>
                  </select>
                </div>
              </div>
              
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoCivil">Estado Civil</label>
                  <select class="form-control" id="EstadoCivil" v-model="trabajadorE.EstadoCivil">
                    <option v-for="(estCivi) in EstadoCivilCombo" :value="estCivi.Descripcion" :selected="trabajadorE.EstadoCivil === estCivi.Codigo">{{ estCivi.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="TipodeComision">Tipo de Comision:</label>
                  <input type="text" class="form-control" id="TipodeComision" placeholder="Ingrese el Tipo de Comision" v-model="trabajadorE.TipodeComision">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaNacimiento">Fecha de Nacimiento:</label>
                  <input type="date" class="form-control" id="FechaNacimiento" placeholder="Ingrese el Fecha de Nacimiento" v-model="trabajadorE.FechaNacimiento">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaIngreso">Fecha de Ingreso:</label>
                  <input type="date" class="form-control" id="FechaIngreso" placeholder="Ingrese el Fecha de Ingreso" v-model="trabajadorE.FechaIngreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaCese">Fecha de Cese:</label>
                  <input type="date" class="form-control" id="FechaCese" placeholder="Ingrese el Fecha de Cese" v-model="trabajadorE.FechaCese">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="PeriododeVacaciones">Periodo de Vacaciones:</label>
                  <input type="number" class="form-control" id="PeriododeVacaciones" placeholder="Ingrese el Periodo de Vacaciones" v-model="trabajadorE.PeriododeVacaciones">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaReingreso">Fecha de Reingreso:</label>
                  <input type="date" class="form-control" id="FechaReingreso" placeholder="Ingrese el Fecha de Reingreso" v-model="trabajadorE.FechaReingreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EsReingreso">Es Reingreso:</label>
                  <select class="form-control" id="EsReingreso" v-model="trabajadorE.EsReingreso">
                    <option v-for="(esRein) in EsReingresoCombo" :value="esRein.Descripcion" :selected="trabajadorE.EsReingreso === esRein.Codigo">{{ esRein.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BancoCTA_CTE">Banco CTA CTE:</label>
                  <input type="text" class="form-control" id="BancoCTA_CTE" placeholder="Ingrese el Banco CTA CTE" v-model="trabajadorE.BancoCTA_CTE">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cuenta">Tipo Cuenta:</label>
                  <select class="form-control" id="Tipo_Cuenta" v-model="trabajadorE.Tipo_Cuenta">
                    <option v-for="(tipoCuen) in TipoCuentaCombo" :value="tipoCuen.Descripcion" :selected="trabajadorE.Tipo_Cuenta === tipoCuen.Codigo">{{ tipoCuen.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniComplementaria">Bonificacion Complementaria:</label>
                  <input type="number" class="form-control" id="BoniComplementaria" placeholder="Ingrese el Bonificacion Complementaria" v-model="trabajadorE.BoniComplementaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniEspecial">Bonificacion Especial:</label>
                  <input type="number" class="form-control" id="BoniEspecial" placeholder="Ingrese el Bonificacion Especial" v-model="trabajadorE.BoniEspecial">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Remuneracion_Minima">Remuneracion Minima:</label>
                  <input type="number" class="form-control" id="Remuneracion_Minima" placeholder="Ingrese el Remuneracion Minima" v-model="trabajadorE.Remuneracion_Minima">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CuotaCuentaCorriente">Cuota Cuenta Corriente:</label>
                  <input type="number" class="form-control" id="CuotaCuentaCorriente" placeholder="Ingrese el Cuota Cuenta Corriente" v-model="trabajadorE.CuotaCuentaCorriente">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Fondo_Reserva">Fondo Reserva:</label>
                  <input type="text" class="form-control" id="Fondo_Reserva" placeholder="Ingrese el Fondo Reserva" v-model="trabajadorE.Fondo_Reserva">
                </div>
              </div>
              <div class="row">
                <div class="form-group mesageArea">
                  <label for="Mensaje">Mensaje:</label>
                  <textarea type="text" class="form-control" id="Mensaje" placeholder="Mensaje (Opcional)" v-model="trabajadorE.Mensaje"></textarea>
                </div>
              </div>
            </div>
          <!-- </div> -->
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="updateTrabajador(trabajadorE)">Editar</button>
          </div>
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="closeModal()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isMEliminarVisible" class="modal modal-style" id="deleteTrabajador" tabindex="-1" role="dialog"
      aria-labelledby="editLabel" aria-hidden="true">>
      <div class="modal-content">
        <h4>Esta seguro de eliminar el Trabajador N° <br><br><b>{{ trabajadorE.Id_Trabajador }}</b></h4>
        <input type="hidden" id="Codigo" v-model="trabajadorE.COMP_Codigo" />
        <input type="hidden" id="NombreCentroCostos" v-model="trabajadorE.Id_Trabajador" />
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="btnModel" @click="deleteTrabajador(trabajadorE.COMP_Codigo, trabajadorE.Id_Trabajador)">Si</button>
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
                  <label for="tipoTrabajador">Tipo Trabajador:</label>
                  <select class="form-control" id="tipoTrabajador" v-model="trabajador.Tipo_trabajador">
                    <option v-for="(tipoTra) in TipoTrabajadorCombo" :value="tipoTra.Descripcion" :selected="tipoTra.Codigo === trabajador.Tipo_trabajador">{{ tipoTra.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CodigoConcepto">Apellido Paterno:</label>
                  <input type="text" class="form-control" id="CodigoConcepto" placeholder="Ingrese el Apellido Paterno" v-model="trabajador.Apellido_Paterno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="concepto">Apellido Materno:</label>
                  <input type="text" class="form-control" id="concepto" placeholder="Ingrese el Apellido Materno" v-model="trabajador.Apellido_Materno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Prioridad">Nombres:</label>
                  <input type="text" class="form-control" id="Nombres" placeholder="Ingrese la Nombres" v-model="trabajador.Nombres">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoOperacion">Identificacion:</label>
                  <p v-if="cedmsg">{{ cedmsg }}</p>
                  <input type="number" class="form-control" id="Identificacion" placeholder="Ingrese la Identificacion" v-model="trabajador.Identificacion" @input="validarIdentificacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Entidad_Bancaria">Entidad Bancaria:</label>
                  <input type="text" class="form-control" id="Entidad_Bancaria" placeholder="Ingrese la Entidad Bancaria" v-model="trabajador.Entidad_Bancaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CarnetIESS">Carnet IESS:</label>
                  <input type="text" class="form-control" id="CarnetIESS" placeholder="Ingrese el Carnet IESS" v-model="trabajador.CarnetIESS">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Direccion">Direccion:</label>
                  <input type="text" class="form-control" id="Direccion" placeholder="Ingrese la Direccion" v-model="trabajador.Direccion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Fijo">Telefono Fijo:</label>
                  <input type="text" class="form-control" id="Telefono_Fijo" placeholder="Ingrese el Telefono Fijo" v-model="trabajador.Telefono_Fijo">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Movil">Telefono Movil:</label>
                  <input type="text" class="form-control" id="Telefono_Movil" placeholder="Ingrese el Telefono Movil" v-model="trabajador.Telefono_Movil">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Genero">Genero:</label>
                  <select class="form-control" id="Genero" v-model="trabajador.Genero">
                    <option v-for="(gene) in GeneroCombo" :value="gene.Descripcion" :selected="trabajador.Genero === gene.Codigo">{{ gene.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Nro_Cuenta_Bancaria">Nro Cuenta Bancaria:</label>
                  <input type="text" class="form-control" id="Nro_Cuenta_Bancaria" placeholder="Ingrese el Nro Cuenta Bancaria" v-model="trabajador.Nro_Cuenta_Bancaria">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Codigo_Categoria_Ocupacion">Codigo Categoria Ocupacion:</label>
                  <input type="text" class="form-control" id="Codigo_Categoria_Ocupacion" placeholder="Ingrese el Codigo Categoria Ocupacion" v-model="trabajador.Codigo_Categoria_Ocupacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Ocupacion:</label>
                  <input type="number" class="form-control" id="Ocupacion" placeholder="Ingrese el Ocupacion" v-model="trabajador.Ocupacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Centro_Costos">Centro Costos:</label>
                  <select class="form-control" id="Centro_Costos" v-model="trabajador.Centro_Costos">
                    <option v-for="(cenCos) in CentroCostosCombo" :value="cenCos.Codigo" :selected="trabajador.Centro_Costos === cenCos.NombreCentroCostos">{{ cenCos.Codigo }} - {{ cenCos.NombreCentroCostos }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Nivel Salarial:</label>
                  <input type="text" class="form-control" id="Nivel_Salarial" placeholder="Ingrese el Nivel Salarial" v-model="trabajador.Nivel_Salarial">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoTrabajador">Estado Trabajador:</label>
                  <select class="form-control" id="EstadoTrabajador" v-model="trabajador.EstadoTrabajador">
                    <option v-for="(estTra) in EstadoTrabajadorCombo" :value="estTra.Descripcion" :selected="trabajador.Codigo === estTra.EstadoTrabajador">{{ estTra.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Contrato">Tipo Contrato:</label>
                  <select class="form-control" id="Tipo_Contrato" v-model="trabajador.Tipo_Contrato">
                    <option v-for="(tipoCon) in TipoContratoCombo" :value="tipoCon.Descripcion" :selected="trabajador.Tipo_Contrato === tipoCon.Codigo">{{ tipoCon.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cese">Tipo Cese:</label>
                  <select class="form-control" id="Tipo_Cese" v-model="trabajador.Tipo_Cese">
                    <option v-for="(tipoCese) in TipoCeseCombo" :value="tipoCese.Descripcion" :selected="trabajador.Tipo_Cese === tipoCese.Codigo">{{ tipoCese.Codigo }}</option>
                  </select>
                </div>
              </div>
              
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoCivil">Estado Civil</label>
                  <select class="form-control" id="EstadoCivil" v-model="trabajador.EstadoCivil">
                    <option v-for="(estCivi) in EstadoCivilCombo" :value="estCivi.Descripcion" :selected="trabajador.EstadoCivil === estCivi.Codigo">{{ estCivi.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="TipodeComision">Tipo de Comision:</label>
                  <input type="text" class="form-control" id="TipodeComision" placeholder="Ingrese el Tipo de Comision" v-model="trabajador.TipodeComision">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaNacimiento">Fecha de Nacimiento:</label>
                  <input type="date" class="form-control" id="FechaNacimiento" placeholder="Ingrese el Fecha de Nacimiento" v-model="trabajador.FechaNacimiento">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaIngreso">Fecha de Ingreso:</label>
                  <input type="date" class="form-control" id="FechaIngreso" placeholder="Ingrese el Fecha de Ingreso" v-model="trabajador.FechaIngreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaCese">Fecha de Cese:</label>
                  <input type="date" class="form-control" id="FechaCese" placeholder="Ingrese el Fecha de Cese" v-model="trabajador.FechaCese">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="PeriododeVacaciones">Periodo de Vacaciones:</label>
                  <input type="number" class="form-control" id="PeriododeVacaciones" placeholder="Ingrese el Periodo de Vacaciones" v-model="trabajador.PeriododeVacaciones">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaReingreso">Fecha de Reingreso:</label>
                  <input type="date" class="form-control" id="FechaReingreso" placeholder="Ingrese el Fecha de Reingreso" v-model="trabajador.FechaReingreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EsReingreso">Es Reingreso:</label>
                  <select class="form-control" id="EsReingreso" v-model="trabajador.EsReingreso">
                    <option v-for="(esRein) in EsReingresoCombo" :value="esRein.Descripcion" :selected="trabajador.EsReingreso === esRein.Codigo">{{ esRein.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cuenta">Tipo Cuenta:</label>
                  <select class="form-control" id="Tipo_Cuenta" v-model="trabajador.Tipo_Cuenta">
                    <option v-for="(tipoCuen) in TipoCuentaCombo" :value="tipoCuen.Descripcion" :selected="trabajador.Tipo_Cuenta === tipoCuen.Codigo">{{ tipoCuen.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniComplementaria">Bonificacion Complementaria:</label>
                  <input type="number" class="form-control" id="BoniComplementaria" placeholder="Ingrese el Bonificacion Complementaria" v-model="trabajador.BoniComplementaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniEspecial">Bonificacion Especial:</label>
                  <input type="number" class="form-control" id="BoniEspecial" placeholder="Ingrese el Bonificacion Especial" v-model="trabajador.BoniEspecial">
                </div>
              </div>
              <input type="hidden" class="form-control" value="1" v-model="trabajador.FormaCalculo13ro">
              <input type="hidden" class="form-control" value="1" v-model="trabajador.FormaCalculo14ro">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Remuneracion_Minima">Remuneracion Minima:</label>
                  <input type="number" class="form-control" id="Remuneracion_Minima" placeholder="Ingrese el Remuneracion Minima" v-model="trabajador.Remuneracion_Minima">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Fondo_Reserva">Fondo Reserva:</label>
                  <input type="text" class="form-control" id="Fondo_Reserva" placeholder="Ingrese el Fondo Reserva" v-model="trabajador.Fondo_Reserva">
                </div>
              </div>
              <div class="row">
                <div class="form-group mesageArea">
                  <label for="Mensaje">Mensaje:</label>
                  <textarea type="text" class="form-control" id="Mensaje" placeholder="Mensaje (Opcional)" v-model="trabajador.Mensaje"></textarea>
                </div>
              </div>
            </div>
          <!-- </div> -->
        </div>
        <div class="modal-footer "></div>
        <div class="row btns">
          <div class="column">
            <button class="" style="margin: 0 20px;" @click="insertTrabajador(trabajador)">Insertar</button>
          </div>
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
/* import validarIdentificacion from "src/assets/js/validarIdentificacion.js" */
export default {
  components: {
    LTable,
    Card,
  },
  data() {
    return {
      trabajador: {
        Tipo_trabajador: '',
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
        Tipo_Cuenta: '',
        FormaCalculo13ro: '',
        FormaCalculo14ro: '',
        BoniComplementaria: '',
        BoniEspecial: '',
        Remuneracion_Minima: '',
        Fondo_Reserva: '',
        Mensaje: '',
      },
      trabajadorE: {
        CodigoConcepto: '',
        Id_Trabajador: '',
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
      resultado: '',
      auxBool: '',
      cedmsg: '',
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
    this.getCentrosCostos();
  },
  created() {
    this.getTrabajadores();
  },
  methods: {
    async getTipoTrabajador(){
      let url = `${process.env.apiWebsite}/api/getTipoTrabajador/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipoTrabajadorCombo = data;
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
    async getTipoCese(){
      let url = `${process.env.apiWebsite}/api/getTipoCese/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipoCeseCombo = data;
    },
    async getTipoContrato(){
      let url = `${process.env.apiWebsite}/api/getTipoContrato/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipoContratoCombo = data;
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
    async getCentrosCostos(){
      let url = `${process.env.apiWebsite}/api/getCentrosCostos/`;
      const { data } = await axios.get(url);
      //console.log(data);
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
      ////console.log(data);
    },


    showModal() {
      this.isModalVisible = true;
    },
    eliminarTrabajador(trabajadorE) {
      this.isMEliminarVisible = true;
      console.log(trabajadorE)
      this.trabajadorE.COMP_Codigo = trabajadorE.COMP_Codigo
      this.trabajadorE.Id_Trabajador = trabajadorE.Id_Trabajador
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
    insertarTrabajador() {
      this.isMInsertarVisible = true;
      const keys = Object.keys(this.trabajador);
      keys.forEach((key) => {
        //console.log(key)
        this.trabajador[key] = '';
      });  
    },

    async insertTrabajador(trabajador) {
      if(this.auxBool == 1) {this.showAlert(this.resultado); return;}
      let formData = {};
      formData['COMP_Codigo'] = localStorage.getItem('codigoEmisor');
      const keys = Object.keys(trabajador);
      keys.forEach((key) => {
        formData[key] = trabajador[key];
      });
      console.log(formData);
      let url = `${process.env.apiWebsite}/api/insertTrabajador/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      //this.isMInsertarVisible = false;
      console.log(data);
      this.showAlert(data.message)
      this.getTrabajadores();
    },

    getDate(oldDate){
      const fecha = new Date(oldDate);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
      const anio = fecha.getFullYear();
      const date = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
      return date;
    },

    editarTrabajador(trabajador) {
      console.log('entra');
      //console.log(trabajador);
      this.isModalVisible = true;

      this.trabajadorE = Object.assign({}, trabajador);
      this.trabajadorE.FechaNacimiento = this.getDate(trabajador.FechaNacimiento)
      this.trabajadorE.FechaIngreso = this.getDate(trabajador.FechaIngreso)
      this.trabajadorE.FechaCese = this.getDate(trabajador.FechaCese)
      this.trabajadorE.FechaReingreso = this.getDate(trabajador.FechaReingreso)
    },

    async updateTrabajador(trabajadorE) {
      if(this.auxBool == 1) {this.showAlert(this.resultado); return;}
      let formData = {};
      formData['COMP_Codigo'] = localStorage.getItem('codigoEmisor');
      const keys = Object.keys(trabajadorE);
      keys.forEach((key) => {
        formData[key] = trabajadorE[key];
      });
      console.log(formData);
      this.isModalVisible = false;
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

    async deleteTrabajador(COMP_Codigo, Id_Trabajador) {
      console.log(COMP_Codigo, Id_Trabajador)
      this.isMEliminarVisible = false;
      let formData = {
        sucursal: COMP_Codigo,
        codigoempleado: Id_Trabajador,
      };
      let url = `${process.env.apiWebsite}/api/deleteTrabajador/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data);
      this.showAlert(data.message)
      this.getTrabajadores();
    },

    validarIdentificacion(){
      // Eliminar espacios en blanco y guiones de la cédula
      let Identificacion = this.trabajador.Identificacion
      Identificacion = Identificacion.replace(/\s|-/g, '');

      // Verificar que la cédula tenga 10 dígitos
      if (Identificacion.length !== 10) {
        this.resultado = 'La cédula debe tener 10 dígitos';
        this.auxBool = 1;
        console.log('La cédula debe tener 10 dígitos')
        return;
      }

      // Obtener los primeros dos dígitos
      let provincia = parseInt(Identificacion.substr(0, 2), 10);

      // Verificar que los primeros dos dígitos estén en el rango válido
      if (provincia < 0 || provincia > 24) {
        this.resultado = 'Los dos primeros dígitos deben estar entre 0 y 24';
        this.auxBool = 1;
        console.log('Los dos primeros dígitos deben estar entre 0 y 24')
        return;
      }

      // Obtener el tercer dígito
      let tercerDigito = parseInt(Identificacion.charAt(2), 10);

      // Verificar que el tercer dígito sea menor a 6
      if (tercerDigito > 5) {
        this.resultado = 'El tercer dígito debe ser menor o igual a 5';
        this.auxBool = 1;
        console.log('El tercer dígito debe ser menor o igual a 5')
        return;
      }

      // Verificar que los siguientes dígitos sean consecutivos
      let consecutivo = true;
      for (let i = 3; i < 9; i++) {
        if (parseInt(Identificacion.charAt(i), 10) !== i - 2) {
          consecutivo = false;
          break;
        }
      }

      /* if (!consecutivo) {
        this.resultado = 'Los dígitos del cuarto al noveno deben ser consecutivos';
        this.auxBool = 1;
        console.log('Los dígitos del cuarto al noveno deben ser consecutivos')
        return;
      } */

      // Verificar el dígito verificador
      let digitoVerificador = parseInt(Identificacion.charAt(9), 10);
      let coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      let suma = 0;

      for (let i = 0; i < 9; i++) {
        let producto = coeficientes[i] * parseInt(Identificacion.charAt(i), 10);
        suma += producto >= 10 ? producto - 9 : producto;
      }

      let resultadoEsperado = (Math.ceil(suma / 10) * 10) - suma;
      if (resultadoEsperado !== digitoVerificador) {
        this.resultado = 'El dígito verificador no es válido';
        this.auxBool = 1;
        console.log('El dígito verificador no es válido')
        return;
      }
      console.log('La cédula es válida')
      //this.resultado = 'La cédula es válida';
      this.auxBool = 0;
    }
  },
};
</script>
<style>
.p{
  color: red;
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
  width: 142vh;
  margin-right: 0;
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

/* .modal{
    display: block !important; /* I added this to see the modal, you don't need this
}

.modal-dialog{
  display: inline-block;
    overflow-y: initial !important
} */
.modal-body{
    height: 68vh;
    overflow-y: scroll;
}

.mesageArea{
  column-count: 2;
  column-gap: 20px;
}

.row{
  display: flex;
}
</style>