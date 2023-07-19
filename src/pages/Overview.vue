<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Centros Costos</p>
              <h4 class="card-title">{{ totalCC }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Realtime
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Trabajadores</p>
              <h4 class="card-title">{{ totalTr }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Realtime
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Promedio Salario</p>
              <h4 class="card-title">{{ promedioSueldo }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Realtime
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Promedio Edad</p>
              <h4 class="card-title">{{ promedioEdad }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Realtime
            </div>
          </stats-card>
        </div>

      </div>
      <div class="row">
        <div class="col-md-8">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Users Behavior</h4>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Género</h4>
              <p class="card-category">Trabajadores</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Mujer
                <i class="fa fa-circle text-danger"></i> Hombre
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Realtime
              </div>
            </template>
          </chart-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">2014 Sales</h4>
              <p class="card-category">All products including Taxes</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Tesla Model S
                <i class="fa fa-circle text-danger"></i> BMW 5 Series
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title">Tasks</h5>
              <p class="category">Backend development</p>
            </template>
            <l-table :data="tableData.data"
                     :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        moviData: '',
        movimientos: {
          moviIngresos: '',
          moviEgresos: '',
          moviC1: '',
          moviC2: '',
          moviC3: '',
        },
        totalCC: 0,
        trabajadores:'',
        promedioSueldo:0,
        promedioEdad:0,
        totalTr: 0,
        totalMov: 0,
        ingresos: 0,
        egresos: 0,
        ninguno: 0,
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        pieChart: {
          data: {
            labels: ['Mujer', 'Hombre'],
            series: [0, 0]
          }
        },
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        tableData: {
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            {title: 'Read "Following makes Medium better"', checked: false},
            {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        },
      }
    },
    mounted(){
      this.getMovPlanxTipoOperacion();
      this.getTotales();
      this.getTrabajadores();
    },
    methods:{
      async getMovPlanxTipoOperacion() {
        let url = `${process.env.apiWebsite}/api/getMovPlanxTipoOperacion/`;
        const { data } = await axios.get(url);
        //this.pieChart.data.series = [data.ingresos, data.egresos, data.ninguno];
        //this.pieChart.data.labels = [data.ingresos, data.egresos, data.ninguno];
      },
      async getTotales() {
        let formData = {
          sucursal: localStorage.getItem("codigoEmisor")
        };
        let url = `${process.env.apiWebsite}/api/getTotales/`;
        const { data } = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        //console.log(data)
        this.totalCC = data.totalCC;
        this.totalTr = data.totalTr;
        this.totalMov = data.totalMov;
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
        this.getPromedioSalario(data);
        this.getPromedioEdad(data);
        this.getPromedioGenero(data);
        //console.log(data);
      },

      getPromedioSalario(trabajadores){
        let total = trabajadores.length;
        let promedio = '';
        let suma = 0
        trabajadores.forEach(item => {
          suma += item.Remuneracion_Minima;
        });

        promedio = suma / total
        this.promedioSueldo = promedio.toFixed(2);
      },

      getPromedioEdad(trabajadores){
        let total = trabajadores.length;
        let promedio = '';
        let suma = 0
        trabajadores.forEach(item => {
          suma += this.getAge(item.FechaNacimiento);
        });

        promedio = suma / total
        this.promedioEdad = promedio.toFixed(2);
      },
      getPromedioGenero(trabajadores){
        let total = trabajadores.length;
        let promedio = '';
        let suma = 0
        let m = ''
        let h = ''
        trabajadores.forEach(item => {
          if (item.Genero == "M"){
            m++;
          }else{
            h++;
          }
        });
        
        this.porcentajeM = (m / total) * 100;
        this.porcentajeH = (h / total) * 100;
        this.pieChart.data.series = [this.porcentajeM.toFixed(2), this.porcentajeH.toFixed(2)];
        this.pieChart.data.labels = [this.porcentajeM.toFixed(2) + "%", this.porcentajeH.toFixed(2) + "%"];
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

    }
  }
</script>
<style>

</style>
