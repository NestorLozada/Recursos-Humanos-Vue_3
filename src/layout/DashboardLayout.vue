<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Mantenimiento</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p @click="OpenLoginModal()">Centro Costos</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-notes"></i>
        <p>Movimiento plantilla</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <i class="nc-icon nc-paper-2"></i>
        <p>Trabajdor</p>
      </sidebar-link>
      <!-- <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>  -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
    <div class="modal" v-if="CostoLoginModal">
    <div class="modal-content">
      <h3>Iniciar sesión</h3>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <button @click="closeLoginModal">Cerrar</button>
    </div>
  </div>
  </div>
  
</template>
<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content form {
  margin-bottom: 20px;
}

.modal-content .form-group {
  margin-bottom: 10px;
}

.modal-content label {
  display: block;
  font-weight: bold;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-content button {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #444;
}

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    data(){
      return{
        CostoLoginModal: false
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      closeLoginModal(){
        this.CostoLoginModal = false;
      },
      OpenLoginModal(){
        this.CostoLoginModal = true;
      },
      async CentroCostos() {
      this.message = "";
      let formData = {
        nombreUsuario: this.username,
        passwordUsuario: this.password,
        codigoEmisor: this.emisor,
      };
      let url = `${process.env.apiWebsite}/api/login/`;
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
      });
      console.log(data.success)
      this.getComboEmisores();
      if(data.success == 1){
        let token = data.access_token;
        this.user = data.user;
        this.date = data.date;
        this.company = data.company;
        if(token){
          localStorage.token = token;
          localStorage.user = this.user;
          localStorage.date = this.date;
          localStorage.company = this.company;
        }else{
          this.$router.push('/').catch(()=>{})
        }
      }else{
        this.showAlert(data.message)
      }
      
    },
    }
  }

</script>
