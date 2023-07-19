<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row rowSearchNew">
        <div class="col-6">
          <div class="column">
            <button class="form-button newBtn" @click="insertarTrabajador">Nuevo</button>
          </div>
        </div>
        <div class="col-6">
          <div class="column">
            <input required v-model="search" class="form-control" placeholder="Search" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row">
                <div class="col-6">
                  <div class="column">
                    <h4 class="card-title">Trabajadores</h4>
                    <p class="card-category">Tabla</p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="column">
                    <export-excel
                      class   = "form-button excelBtn"
                      :data   = "trabajadorExcel"
                      :fields = "fields"
                      worksheet = "Trabajadores"
                      :name    = excelName>
                      (.xls)
                    </export-excel>
                  </div>
                </div>
              </div>
            </template>
            <table v-if="search == ''" class="table">
              <thead>
                <tr>
                  <th><b>N°</b></th>
                  <th>ID</th>
                  <th>TIPO</th>
                  <th>NOMBRES</th>
                  <th>APELLIDOS</th>
                  <th>DNI</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trabajador, index) in trabajadores" :key="index">
                  <td><b>{{ index + 1}}</b></td>
                  <td>{{ trabajador.Id_Trabajador }}</td>
                  <td>{{ trabajador.Tipo_trabajador }}</td>
                  <td>{{ trabajador.Nombres }}</td>
                  <td>{{ trabajador.Apellido_Paterno }} {{ trabajador.Apellido_Materno }}</td>
                  <td>{{ trabajador.Identificacion }}</td>
                  <td>
                    <button class="form-button pdfBtn" @click="exportToPDF(trabajador)">PDF</button>
                  </td>
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
                  <th><b>N°</b></th>
                  <th>ID</th>
                  <th>TIPO</th>
                  <th>NOMBRES</th>
                  <th>APELLIDOS</th>
                  <th>DNI</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trabajador, index) in trabajadoresFiltrados" :key="index">
                  <td><b>{{ index + 1 }}</b></td>
                  <td>{{ trabajador.Id_Trabajador }}</td>
                  <td>{{ trabajador.Tipo_trabajador }}</td>
                  <td>{{ trabajador.Nombres }}</td>
                  <td>{{ trabajador.Apellido_Paterno }} {{ trabajador.Apellido_Materno }}</td>
                  <td>{{ trabajador.Identificacion }}</td>
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
      <div class="modal-content1 md2">
        <h2>Editar Trabajador</h2>
        <div class="modal-body">
          <p class="pAlert" v-if="message" value>{{ message }}</p>
          <!-- <div class="row"> -->
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoOperacion">Tipo Trabajador:</label>
                  <input type="hidden" v-model="trabajadorE.Id_Trabajador" />
                  <select required class="form-control" id="tipoOperacion" v-model="trabajadorE.Tipo_trabajador">
                    <option v-for="(tipoTra) in TipoTrabajadorCombo" :value="tipoTra.Descripcion" :selected="tipoTra.Codigo === trabajadorE.Tipo_trabajador">{{ tipoTra.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CodigoConcepto">Apellido Paterno:</label>
                  <input required type="text" class="form-control" id="CodigoConcepto" placeholder="Ingrese el Apellido Paterno" v-model="trabajadorE.Apellido_Paterno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="concepto">Apellido Materno:</label>
                  <input required type="text" class="form-control" id="concepto" placeholder="Ingrese el Apellido Materno" v-model="trabajadorE.Apellido_Materno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Prioridad">Nombres:</label>
                  <input required type="text" class="form-control" id="Nombres" placeholder="Ingrese la Nombres" v-model="trabajadorE.Nombres">
                </div>
              </div>
              
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoOperacion">Identificacion:</label>
                  <input required type="text" class="form-control" id="Identificacion" placeholder="Ingrese la Identificacion" v-model="trabajadorE.Identificacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Entidad_Bancaria">Entidad Bancaria:</label>
                  <input required type="text" class="form-control" id="Entidad_Bancaria" placeholder="Ingrese la Entidad Bancaria" v-model="trabajadorE.Entidad_Bancaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CarnetIESS">Carnet IESS:</label>
                  <input required type="text" class="form-control" id="CarnetIESS" placeholder="Ingrese el Carnet IESS" v-model="trabajadorE.CarnetIESS">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Direccion">Direccion:</label>
                  <input required type="text" class="form-control" id="Direccion" placeholder="Ingrese la Direccion" v-model="trabajadorE.Direccion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Fijo">Telefono Fijo:</label>
                  <input required type="number" class="form-control" id="Telefono_Fijo" placeholder="Ingrese el Telefono Fijo" v-model="trabajadorE.Telefono_Fijo">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Movil">Telefono Movil:</label>
                  <input required type="number" class="form-control" id="Telefono_Movil" placeholder="Ingrese el Telefono Movil" v-model="trabajadorE.Telefono_Movil">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Genero">Genero:</label>
                  <select required class="form-control" id="Genero" v-model="trabajadorE.Genero">
                    <option v-for="(gene) in GeneroCombo" :value="gene.Codigo" :selected="trabajadorE.Genero === gene.Codigo">{{ gene.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Nro_Cuenta_Bancaria">Nro Cuenta Bancaria:</label>
                  <input required type="text" class="form-control" id="Nro_Cuenta_Bancaria" placeholder="Ingrese el Nro Cuenta Bancaria" v-model="trabajadorE.Nro_Cuenta_Bancaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Codigo_Categoria_Ocupacion">Categoria Ocupacion::</label>
                  <select required class="form-control" id="Codigo_Categoria_Ocupacion" v-model="trabajadorE.Codigo_Categoria_Ocupacion">
                    <option v-for="(catOcup) in CategoriaOcupacionCombo" :value="catOcup.Codigo" :selected="trabajadorE.Codigo_Categoria_Ocupacion === catOcup.Codigo">{{ catOcup.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Ocupacion:</label>
                  <input required type="text" class="form-control" id="Ocupacion" placeholder="Ingrese el Ocupacion" v-model="trabajadorE.Ocupacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Centro_Costos">Centro Costos:</label>
                  <select required class="form-control" id="Centro_Costos" v-model="trabajadorE.Centro_Costos">
                    <option v-for="(cenCos) in CentroCostosCombo" :value="cenCos.Codigo" :selected="trabajadorE.Centro_Costos === cenCos.NombreCentroCostos">{{ cenCos.Codigo }} - {{ cenCos.NombreCentroCostos }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Nivel Salarial:</label>
                  <input required type="text" class="form-control" id="Nivel_Salarial" placeholder="Ingrese el Nivel Salarial" v-model="trabajadorE.Nivel_Salarial">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoTrabajador">Estado Trabajador:</label>
                  <select required class="form-control" id="EstadoTrabajador" v-model="trabajadorE.EstadoTrabajador">
                    <option v-for="(estTra) in EstadoTrabajadorCombo" :value="estTra.Codigo" :selected="trabajadorE.Codigo === estTra.Codigo">{{ estTra.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Contrato">Tipo Contrato:</label>
                  <select required class="form-control" id="Tipo_Contrato" v-model="trabajadorE.Tipo_Contrato">
                    <option v-for="(tipoCon) in TipoContratoCombo" :value="tipoCon.Codigo" :selected="trabajadorE.Tipo_Contrato === tipoCon.Codigo">{{ tipoCon.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cese">Tipo Cese:</label>
                  <select class="form-control" id="Tipo_Cese" v-model="trabajadorE.Tipo_Cese">
                    <option value="0">No Aplica</option>
                    <option v-for="(tipoCese) in TipoCeseCombo" :value="tipoCese.Codigo" :selected="trabajadorE.Tipo_Cese === tipoCese.Codigo">{{ tipoCese.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoCivil">Estado Civil</label>
                  <select required class="form-control" id="EstadoCivil" v-model="trabajadorE.EstadoCivil">
                    <option v-for="(estCivi) in EstadoCivilCombo" :value="estCivi.Codigo" :selected="trabajadorE.EstadoCivil === estCivi.Codigo">{{ estCivi.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="TipodeComision">Tipo de Comision</label>
                  <select required class="form-control" id="TipodeComision" v-model="trabajadorE.TipodeComision">
                    <option v-for="(tipoComi) in TipodeComisionCombo" :value="tipoComi.Descripcion" :selected="trabajadorE.TipodeComision === tipoComi.Codigo">{{ tipoComi.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="TipodeComision">Tipo de Comision:</label>
                  <input required type="text" class="form-control" id="TipodeComision" placeholder="Ingrese el Tipo de Comision" v-model="trabajadorE.TipodeComision">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaNacimiento">Fecha de Nacimiento:</label>
                  <input required type="date" class="form-control" id="FechaNacimiento" placeholder="Ingrese el Fecha de Nacimiento" v-model="trabajadorE.FechaNacimiento">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaIngreso">Fecha de Ingreso:</label>
                  <input required type="date" class="form-control" id="FechaIngreso" placeholder="Ingrese el Fecha de Ingreso" v-model="trabajadorE.FechaIngreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaCese">Fecha de Cese:</label>
                  <input required type="date" class="form-control" id="FechaCese" placeholder="Ingrese el Fecha de Cese" v-model="trabajadorE.FechaCese">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="PeriododeVacaciones">Periodo de Vacaciones:</label>
                  <input required type="number" class="form-control" id="PeriododeVacaciones" placeholder="Ingrese el Periodo de Vacaciones" v-model="trabajadorE.PeriododeVacaciones">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaReingreso">Fecha de Reingreso:</label>
                  <input required type="date" class="form-control" id="FechaReingreso" placeholder="Ingrese el Fecha de Reingreso" v-model="trabajadorE.FechaReingreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EsReingreso">Es Reingreso:</label>
                  <select required class="form-control" id="EsReingreso" v-model="trabajadorE.EsReingreso">
                    <option v-for="(esRein) in EsReingresoCombo" :value="esRein.Codigo" :selected="trabajadorE.EsReingreso === esRein.Codigo">{{ esRein.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cuenta">Tipo Cuenta:</label>
                  <select required class="form-control" id="Tipo_Cuenta" v-model="trabajadorE.Tipo_Cuenta">
                    <option v-for="(tipoCuen) in TipoCuentaCombo" :value="tipoCuen.Codigo" :selected="trabajadorE.Tipo_Cuenta === tipoCuen.Codigo">{{ tipoCuen.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FormaCalculo13ro">Forma Calculo 13ro:</label>
                  <select required class="form-control" id="FormaCalculo13ro" v-model="trabajadorE.FormaCalculo13ro">
                    <option v-for="(decimo) in DecimoTerceroDecimoCuartoCombo" :value="decimo.Codigo" :selected="trabajadorE.FormaCalculo13ro === decimo.Codigo">{{ decimo.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FormaCalculo14ro">Forma Calculo 14ro:</label>
                  <select required class="form-control" id="FormaCalculo14ro" v-model="trabajadorE.FormaCalculo14ro">
                    <option v-for="(decimo) in DecimoTerceroDecimoCuartoCombo" :value="decimo.Codigo" :selected="trabajadorE.FormaCalculo14ro === decimo.Codigo">{{ decimo.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniComplementaria">Bonificacion Complementaria:</label>
                  <input required type="number" class="form-control" id="BoniComplementaria" placeholder="Ingrese el Bonificacion Complementaria" v-model="trabajadorE.BoniComplementaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniEspecial">Bonificacion Especial:</label>
                  <input required type="number" class="form-control" id="BoniEspecial" placeholder="Ingrese el Bonificacion Especial" v-model="trabajadorE.BoniEspecial">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Remuneracion_Minima">Remuneracion Minima:</label>
                  <input required type="number" class="form-control" id="Remuneracion_Minima" value="0" placeholder="Ingrese el Remuneracion Minima" v-model="trabajadorE.Remuneracion_Minima">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Fondo_Reserva">Fondo Reserva:</label>
                  <input required type="text" class="form-control" id="Fondo_Reserva" placeholder="Ingrese el Fondo Reserva" v-model="trabajadorE.Fondo_Reserva">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
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
        <input type="hidden" v-model="trabajadorE.COMP_Codigo" />
        <input type="hidden" v-model="trabajadorE.Id_Trabajador" />
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
      <div class="modal-content1 md2">
        <h2>Insertar Trabajador</h2>
        <div class="modal-body">
          <p class="pAlert" v-if="message" value>{{ message }}</p>
            <div class="row">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="tipoTrabajador">Tipo Trabajador:</label>
                  <select required class="form-control" id="tipoTrabajador" v-model="trabajador.Tipo_trabajador">
                    <option v-for="(tipoTra) in TipoTrabajadorCombo" :value="tipoTra.Descripcion" :selected="tipoTra.Codigo === trabajador.Tipo_trabajador">{{ tipoTra.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CodigoConcepto">Apellido Paterno:</label>
                  <input required type="text" class="form-control" id="CodigoConcepto" placeholder="Ingrese el Apellido Paterno" v-model="trabajador.Apellido_Paterno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="concepto">Apellido Materno:</label>
                  <input required type="text" class="form-control" id="concepto" placeholder="Ingrese el Apellido Materno" v-model="trabajador.Apellido_Materno">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Prioridad">Nombres:</label>
                  <input required type="text" class="form-control" id="Nombres" placeholder="Ingrese la Nombres" v-model="trabajador.Nombres">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Identificacion">Identificacion:</label>
                  <input required type="number" class="form-control" id="Identificacion" placeholder="Ingrese la Identificacion" v-model="trabajador.Identificacion" @input="validarIdentificacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Entidad_Bancaria">Entidad Bancaria:</label>
                  <input required type="text" class="form-control" id="Entidad_Bancaria" placeholder="Ingrese la Entidad Bancaria" v-model="trabajador.Entidad_Bancaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="CarnetIESS">Carnet IESS:</label>
                  <input required type="text" class="form-control" id="CarnetIESS" placeholder="Ingrese el Carnet IESS" v-model="trabajador.CarnetIESS">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Direccion">Direccion:</label>
                  <input required type="text" class="form-control" id="Direccion" placeholder="Ingrese la Direccion" v-model="trabajador.Direccion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Fijo">Telefono Fijo:</label>
                  <input required type="number" class="form-control" id="Telefono_Fijo" placeholder="Ingrese el Telefono Fijo" v-model="trabajador.Telefono_Fijo">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Telefono_Movil">Telefono Movil:</label>
                  <input required type="number" class="form-control" id="Telefono_Movil" placeholder="Ingrese el Telefono Movil" v-model="trabajador.Telefono_Movil">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Genero">Genero:</label>
                  <select required class="form-control" id="Genero" v-model="trabajador.Genero">
                    <option v-for="(gene) in GeneroCombo" :value="gene.Descripcion" :selected="trabajador.Genero === gene.Codigo">{{ gene.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Nro_Cuenta_Bancaria">Nro Cuenta Bancaria:</label>
                  <input required type="text" class="form-control" id="Nro_Cuenta_Bancaria" placeholder="Ingrese el Nro Cuenta Bancaria" v-model="trabajador.Nro_Cuenta_Bancaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Codigo_Categoria_Ocupacion">Categoria Ocupacion::</label>
                  <select required class="form-control" id="Codigo_Categoria_Ocupacion" v-model="trabajador.Codigo_Categoria_Ocupacion">
                    <option v-for="(catOcup) in CategoriaOcupacionCombo" :value="catOcup.Descripcion" :selected="trabajador.Codigo_Categoria_Ocupacion === catOcup.Codigo">{{ catOcup.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Ocupacion:</label>
                  <input required type="number" class="form-control" id="Ocupacion" placeholder="Ingrese el Ocupacion" v-model="trabajador.Ocupacion">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Centro_Costos">Centro Costos:</label>
                  <select required class="form-control" id="Centro_Costos" v-model="trabajador.Centro_Costos">
                    <option v-for="(cenCos) in CentroCostosCombo" :value="cenCos.Codigo" :selected="trabajador.Centro_Costos === cenCos.NombreCentroCostos">{{ cenCos.Codigo }} - {{ cenCos.NombreCentroCostos }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Ocupacion">Nivel Salarial:</label>
                  <input required type="text" class="form-control" id="Nivel_Salarial" placeholder="Ingrese el Nivel Salarial" v-model="trabajador.Nivel_Salarial">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoTrabajador">Estado Trabajador:</label>
                  <select required class="form-control" id="EstadoTrabajador" v-model="trabajador.EstadoTrabajador">
                    <option v-for="(estTra) in EstadoTrabajadorCombo" :value="estTra.Descripcion" :selected="trabajador.Codigo === estTra.EstadoTrabajador">{{ estTra.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Contrato">Tipo Contrato:</label>
                  <select required class="form-control" id="Tipo_Contrato" v-model="trabajador.Tipo_Contrato">
                    <option v-for="(tipoCon) in TipoContratoCombo" :value="tipoCon.Descripcion" :selected="trabajador.Tipo_Contrato === tipoCon.Codigo">{{ tipoCon.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cese">Tipo Cese:</label>
                  <select class="form-control" id="Tipo_Cese" v-model="trabajador.Tipo_Cese">
                    <option value="0">No Aplica</option>
                    <option v-for="(tipoCese) in TipoCeseCombo" :value="tipoCese.Descripcion" :selected="trabajador.Tipo_Cese === tipoCese.Codigo">{{ tipoCese.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EstadoCivil">Estado Civil</label>
                  <select required class="form-control" id="EstadoCivil" v-model="trabajador.EstadoCivil">
                    <option v-for="(estCivi) in EstadoCivilCombo" :value="estCivi.Descripcion" :selected="trabajador.EstadoCivil === estCivi.Codigo">{{ estCivi.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="TipodeComision">Tipo de Comision</label>
                  <select required class="form-control" id="TipodeComision" v-model="trabajador.TipodeComision">
                    <option v-for="(tipoComi) in TipodeComisionCombo" :value="tipoComi.Descripcion" :selected="trabajador.TipodeComision === tipoComi.Codigo">{{ tipoComi.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="TipodeComision">Tipo de Comision:</label>
                  <input required type="text" class="form-control" id="TipodeComision" placeholder="Ingrese el Tipo de Comision" v-model="trabajador.TipodeComision">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaNacimiento">Fecha de Nacimiento:</label>
                  <input required type="date" class="form-control" id="FechaNacimiento" placeholder="Ingrese el Fecha de Nacimiento" v-model="trabajador.FechaNacimiento">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaIngreso">Fecha de Ingreso:</label>
                  <input required type="date" class="form-control" id="FechaIngreso" placeholder="Ingrese el Fecha de Ingreso" v-model="trabajador.FechaIngreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaCese">Fecha de Cese:</label>
                  <input required type="date" class="form-control" id="FechaCese" placeholder="Ingrese el Fecha de Cese" v-model="trabajador.FechaCese" value="1900-01-01">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="PeriododeVacaciones">Periodo de Vacaciones:</label>
                  <input required type="number" class="form-control" id="PeriododeVacaciones" placeholder="Ingrese el Periodo de Vacaciones" v-model="trabajador.PeriododeVacaciones">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FechaReingreso">Fecha de Reingreso:</label>
                  <input required type="date" class="form-control" id="FechaReingreso" placeholder="Ingrese el Fecha de Reingreso" v-model="trabajador.FechaReingreso">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="EsReingreso">Es Reingreso:</label>
                  <select required class="form-control" id="EsReingreso" v-model="trabajador.EsReingreso">
                    <option v-for="(esRein) in EsReingresoCombo" :value="esRein.Descripcion" :selected="trabajador.EsReingreso === esRein.Codigo">{{ esRein.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Tipo_Cuenta">Tipo Cuenta:</label>
                  <select required class="form-control" id="Tipo_Cuenta" v-model="trabajador.Tipo_Cuenta">
                    <option v-for="(tipoCuen) in TipoCuentaCombo" :value="tipoCuen.Descripcion" :selected="trabajador.Tipo_Cuenta === tipoCuen.Codigo">{{ tipoCuen.Codigo }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FormaCalculo13ro">Forma Calculo 13ro:</label>
                  <select required class="form-control" id="FormaCalculo13ro" v-model="trabajador.FormaCalculo13ro">
                    <option v-for="(decimo) in DecimoTerceroDecimoCuartoCombo" :value="decimo.Codigo" :selected="trabajador.FormaCalculo13ro === decimo.Codigo">{{ decimo.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="FormaCalculo14ro">Forma Calculo 14ro:</label>
                  <select required class="form-control" id="FormaCalculo14ro" v-model="trabajador.FormaCalculo14ro">
                    <option v-for="(decimo) in DecimoTerceroDecimoCuartoCombo" :value="decimo.Codigo" :selected="trabajador.FormaCalculo14ro === decimo.Codigo">{{ decimo.Descripcion }}</option>
                  </select>
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniComplementaria">Bonificacion Complementaria:</label>
                  <input required type="number" class="form-control" id="BoniComplementaria" placeholder="Ingrese el Bonificacion Complementaria" v-model="trabajador.BoniComplementaria">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="BoniEspecial">Bonificacion Especial:</label>
                  <input required type="number" class="form-control" id="BoniEspecial" placeholder="Ingrese el Bonificacion Especial" v-model="trabajador.BoniEspecial">
                </div>
              </div>
              <input type="hidden" class="form-control" value="1" v-model="trabajador.FormaCalculo13ro">
              <input type="hidden" class="form-control" value="1" v-model="trabajador.FormaCalculo14ro">
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Remuneracion_Minima">Remuneracion Minima:</label>
                  <input required type="number" class="form-control" id="Remuneracion_Minima" placeholder="Ingrese el Remuneracion Minima" v-model="trabajador.Remuneracion_Minima">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group">
                  <label for="Fondo_Reserva">Fondo Reserva:</label>
                  <input required type="text" class="form-control" id="Fondo_Reserva" placeholder="Ingrese el Fondo Reserva" v-model="trabajador.Fondo_Reserva">
                </div>
              </div>
              <div class="column marginColum">
                <div class="form-group mesageArea">
                  <label for="Mensaje">Mensaje:</label>
                  <textarea type="text" class="form-control" id="Mensaje" placeholder="Mensaje (Opcional)" v-model="trabajador.Mensaje"></textarea>
                </div>
              </div>
            </div>
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

    <div hidden id="element-to-convert">
      <h2>Ficha del Trabajador {{ trabajadorPDF.Id_Trabajador }}</h2>
      <p>Nombre de la sucursal: {{ company }}</p>
      <p>Apellidos: {{ trabajadorPDF.Apellido_Paterno }} {{ trabajadorPDF.Apellido_Materno }}</p>
      <p>Nombre: {{ trabajadorPDF.Nombres }}</p>
      <p>Edad: {{ trabajadorPDF.Edad }} años</p>
      <p>Género: {{ trabajadorPDF.Genero }}</p>
      <p>Dirección: {{ trabajadorPDF.Direccion }}</p>
      <p>Teléfonos: {{ trabajadorPDF.Telefono_Fijo }} - {{ trabajadorPDF.Telefono_Movil }}</p>
      <p>Salario: $ {{ trabajadorPDF.Remuneracion_Minima }}</p>
      <p>Acumula 13ro: {{ trabajadorPDF.FormaCalculo13ro }}</p>
      <p>Acumula 14to: {{ trabajadorPDF.FormaCalculo14ro }}</p>
      <p>Acumula Fondos reserva: {{ trabajadorPDF.Fondo_Reserva }}</p>
      <p>Entidad Bancaria: {{ trabajadorPDF.Entidad_Bancaria }}</p>
      <p>Tipo Cuenta: {{ trabajadorPDF.Tipo_Cuenta }}</p>
      <p>Número de Cuenta: {{ trabajadorPDF.BancoCTA_CTE }}</p>
      <p>Fecha de Ingreso: {{ trabajadorPDF.FechaIngreso }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";
import Paginate from 'vuejs-paginate';
import pdf from 'vue-pdf'
import html2pdf from "html2pdf.js";

export default {
  components: {
    LTable,
    Card,
    Paginate,
    pdf
  },
  data() {
    return {
      company: localStorage.getItem("company"),
      Element: false,
      trabajadorPDF: {
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
        Tipo_trabajador: '',
        CodigoConcepto: '',
        Id_Trabajador: '',
        Concepto: '',
        Prioridad: '',
        TipoOperacion: '',
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
      trabajadores: "",
      TipoTrabajadorCombo: "",
      GeneroCombo: "",
      EstadoTrabajadorCombo: "",
      TipoCeseCombo: "",
      TipoContratoCombo: "",
      TipodeComisionCombo: "",
      CategoriaOcupacionCombo: "",
      DecimoTerceroDecimoCuartoCombo: "",
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
      validator: false,
      trabajadorExcel: [],
      fields: {
        'Apellido Materno'    : 'Apellido_Materno',
        'Apellido Paterno'    : 'Apellido_Paterno',
        'Edad'                : 'Edad',
        'Genero'              : 'Genero',
        'Direccion'           : 'Direccion',
        'Nombres'             : 'Nombres',
        'Telefono Movil'      : 'Telefono_Movil',
        'Telefono Fijo'       : 'Telefono_Fijo',
        'Remuneracion_Minima' : 'Remuneracion_Minima',
        'FormaCalculo13ro'    : 'FormaCalculo13ro',
        'FormaCalculo14ro'    : 'FormaCalculo14ro',
        'Fondo_Reserva'       : 'Fondo_Reserva',
        'Entidad_Bancaria'    : 'Entidad_Bancaria',
        'Tipo_Cuenta'         : 'Tipo_Cuenta',
        'BancoCTA_CTE'        : 'BancoCTA_CTE',
        'FechaIngreso'        : 'FechaIngreso',
      },
      excelName: '',
    };
  },
  mounted() {
    this.message = "";
    //this.getTrabajadores();
    this.getTipoTrabajador();
    this.getGenero();
    this.getEstadoTrabajador();
    this.getTipoContrato();
    this.getTipoCese();
    this.getEstadoCivil();
    this.getTipodeComision();
    this.getCategoriaOcupacion();
    this.getDecimoTerceroDecimoCuarto();
    this.getEsReingreso();
    this.getTipoCuenta();
    this.getCentrosCostos();
    this.getExcelName();
  },
  created() {
    this.getTrabajadores();
  },
  computed: {
    trabajadoresFiltrados() {
      const searchTerm = this.search.toLowerCase();
      return this.trabajadores.filter(trabajador => {
        const id = trabajador.Id_Trabajador.toString();
        // Aplica los criterios de búsqueda según tus necesidades
        return trabajador.Nombres.toLowerCase().includes(searchTerm) ||
          trabajador.Apellido_Paterno.toLowerCase().includes(searchTerm) ||
          trabajador.Apellido_Materno.toLowerCase().includes(searchTerm) ||
          trabajador.Identificacion.toLowerCase().includes(searchTerm) ||
          id.includes(searchTerm);
      });
    },
    trabajadoresPaginados() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.trabajadoresFiltrados.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.trabajadoresFiltrados.length / this.itemsPerPage);
    },
  },
  methods: {
    exportToPDF(trabajador) {
      console.log(trabajador.Tipo_Cuenta)
      console.log(this.getDescripcionByCodigo(this.TipoCuentaCombo, trabajador.Tipo_Cuenta))
      this.trabajadorPDF = trabajador
      this.trabajadorPDF.Edad = this.getAge(trabajador.FechaNacimiento)
      this.trabajadorPDF.FormaCalculo13ro = this.getDescripcionByCodigo(this.DecimoTerceroDecimoCuartoCombo, trabajador.FormaCalculo13ro)
      this.trabajadorPDF.FormaCalculo14ro = this.getDescripcionByCodigo(this.DecimoTerceroDecimoCuartoCombo, trabajador.FormaCalculo14ro)
      this.trabajadorPDF.Tipo_Cuenta = this.getDescripcionByCodigo(this.TipoCuentaCombo, trabajador.Tipo_Cuenta)
      this.trabajadorPDF.Genero = this.getDescripcionByCodigo(this.GeneroCombo, trabajador.Genero)
      const element = document.getElementById('element-to-convert');
      element.hidden = false;
      html2pdf(document.getElementById("element-to-convert"), {
				margin: 2,
  			filename: "trabajador_" + trabajador.Id_Trabajador,
			});
    },
    getExcelName(){
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + mm + yyyy;
      this.excelName = 'listadoTrabajadores' + formattedToday;
    },
    changePage(pageNumber) {
    this.currentPage = pageNumber;
  },
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
    async getTipodeComision(){
      let url = `${process.env.apiWebsite}/api/getTipodeComision/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.TipodeComisionCombo = data;
    },
    async getCategoriaOcupacion(){
      let url = `${process.env.apiWebsite}/api/getCategoriaOcupacion/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.CategoriaOcupacionCombo = data;
    },
    async getDecimoTerceroDecimoCuarto(){
      let url = `${process.env.apiWebsite}/api/getDecimoTerceroDecimoCuarto/`;
      const { data } = await axios.get(url);
      //console.log(data);
      this.DecimoTerceroDecimoCuartoCombo = data;
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
      this.getTrabajadoresExcel(data);
      this.trabajadores = data;
      //console.log(data);
    },

    getTrabajadoresExcel(trabajadores){
      trabajadores.forEach(item => {
        const trabajador = {
          Apellido_Materno    : item.Apellido_Materno,
          Apellido_Paterno    : item.Apellido_Paterno,
          Edad                : this.getAge(item.FechaNacimiento),
          Genero              : this.getDescripcionByCodigo(this.GeneroCombo, item.Genero),
          Direccion           : item.Direccion,
          Nombres             : item.Nombres,
          Telefono_Movil      : item.Telefono_Movil,
          Telefono_Fijo       : item.Telefono_Fijo,
          Remuneracion_Minima : item.Remuneracion_Minima,
          FormaCalculo13ro    : this.getDescripcionByCodigo(this.DecimoTerceroDecimoCuartoCombo, item.FormaCalculo13ro),
          FormaCalculo14ro    : this.getDescripcionByCodigo(this.DecimoTerceroDecimoCuartoCombo, item.FormaCalculo14ro),
          Fondo_Reserva       : item.Fondo_Reserva,
          Entidad_Bancaria    : item.Entidad_Bancaria,
          Tipo_Cuenta         : this.getDescripcionByCodigo(this.TipoCuentaCombo, item.Tipo_Cuenta),
          BancoCTA_CTE        : item.BancoCTA_CTE,
          FechaIngreso        : this.getDate(item.FechaIngreso),
        };
        this.trabajadorExcel.push(trabajador);
      });
    },

    getDescripcionByCodigo(combo, codigo) {
      const resultado = combo.find(item => item.Codigo === codigo.toString());
      return resultado ? resultado.Descripcion : "";
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
    validateForm(type){
      let Telefono_Fijo = (type == 'I') ? this.trabajador.Telefono_Fijo : this.trabajadorE.Telefono_Fijo
      let Telefono_Movil = (type == 'I') ? this.trabajador.Telefono_Movil : this.trabajadorE.Telefono_Movil
      if (Telefono_Fijo.length != 9) {
        this.message = 'El telefono fijo debe tener 9 dígitos'
        this.validator = true
        return;
      }
      if (Telefono_Movil.length != 10) {
        this.message = 'El telefono móvil debe tener 10 dígitos'
        this.validator = true
        return;
      }
      this.validator = false
    },
    insertarTrabajador() {
      this.isMInsertarVisible = true;
      const keys = Object.keys(this.trabajador);
      keys.forEach((key) => {
        //console.log(key)
        this.trabajador[key] = '';
      });
      this.trabajador.Tipo_Cese = 0
      this.trabajador.FechaCese = this.getDate('01-01-1900')
    },
    async insertTrabajador(trabajador) {
      this.message = "";
      if(this.auxBool == 1) { this.message = this.resultado; return;}
      this.validateForm('I')
      if(this.validator == true ) { return; }
      let formData = {};
      formData['COMP_Codigo'] = localStorage.getItem('codigoEmisor');
      const keys = Object.keys(trabajador);
      keys.forEach((key) => {
        if (!trabajador[key]) {
          formData[key] = 0;/////////////////////aqui
        } else {
          formData[key] = trabajador[key];
        }
      });
      formData['Fecha_Ult_Actualizacion'] = this.getDate(new Date);
      //console.log(getDate(new Date));
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
    getAge(fechaNacimiento){
      const fechaNac = this.getDate(fechaNacimiento);
      const fechaActual = new Date();
      const fechaNacDate = new Date(fechaNac);
      let edad = fechaActual.getFullYear() - fechaNacDate.getFullYear();
      const mesActual = fechaActual.getMonth();
      const mesNac = fechaNacDate.getMonth();
      if (mesActual < mesNac || (mesActual === mesNac && fechaActual.getDate() < fechaNacDate.getDate())) {
        edad--;
      }
      return edad;
    },
    editarTrabajador(trabajador) {
      //console.log('entra');
      //console.log(trabajador);
      this.isModalVisible = true;

      this.trabajadorE = Object.assign({}, trabajador);
      this.trabajadorE.FechaNacimiento = this.getDate(trabajador.FechaNacimiento)
      this.trabajadorE.FechaIngreso = this.getDate(trabajador.FechaIngreso)
      this.trabajadorE.FechaCese = this.getDate(trabajador.FechaCese)
      this.trabajadorE.FechaReingreso = this.getDate(trabajador.FechaReingreso)
      this.trabajadorE.Tipo_Cese = 0
    },
    async updateTrabajador(trabajadorE) {
      if(this.auxBool == 1) { this.message = this.resultado; return;}
      this.validateForm('E')
      if(this.validator == true ) { return; }
      let formData = {};
      formData['COMP_Codigo'] = localStorage.getItem('codigoEmisor');
      const keys = Object.keys(trabajadorE);
      keys.forEach((key) => {
        formData[key] = trabajadorE[key];
      });
      formData['Fecha_Ult_Actualizacion'] = this.getDate(new Date);
      //console.log(formData);
      this.isModalVisible = false;
      let url = `${process.env.apiWebsite}/api/updateTrabajador/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      //console.log(data);
      this.showAlert(data.message)
      this.getTrabajadores();
    },
    eliminarTrabajador(trabajadorE) {
      this.isMEliminarVisible = true;
      console.log(trabajadorE)
      this.trabajadorE.COMP_Codigo = trabajadorE.COMP_Codigo
      this.trabajadorE.Id_Trabajador = trabajadorE.Id_Trabajador
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
.form-control{
  width: 250px;
}

.md2 {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  text-align: left;
  width: 142vh;
  margin-right: 0;
}

.row{
  display: flex;
}

.excelBtn{
  width: fit-content;
  background-color: green;
  float: right;
}

.pdfBtn{
  background-color: red;
}
</style>