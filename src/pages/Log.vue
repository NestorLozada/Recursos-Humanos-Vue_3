<template>
  <div class="container">
    <form class="form" @submit.prevent="handleSubmit">
      <h2 class="form-title">Iniciar sesión</h2>
      <p class="pAlert" v-if="message" value>{{ message }}</p>
      <div class="form-group">
        <label for="username" class="form-label">Nombre de usuario</label>
        <input type="number" id="username" class="form-input" v-model="username" placeholder="Ingrese su nombre de usuario" required minlength="4" maxlength="4"/>
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" id="password" class="form-input" v-model="password" placeholder="Ingrese su contraseña" required />
      </div>
      <div class="form-group">
        <label for="emisor" class="form-label">Emisor</label>
        <select class="form-input" v-model="emisor" required>
          <option disabled value="">Please select one</option>
          <option v-for="(item, index) in comboEmisor" :key="item.Codigo" :value="item.Codigo">
            {{ index + 1 }}. {{ item.NombreEmisor }}
          </option>
        </select>
      </div>
      <button type="submit" class="form-button">
        Iniciar sesión
      </button>
    </form>
    <div class="modal" v-if="modalVisible">
      <div class="modal-content">
        <h3>Bienvenido</h3>
        <p>¡Has iniciado sesión correctamente!</p>
        <p>Fecha/Hora de inicio: {{ currtime }}</p>
        <button @click="hideModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      emisor: "",
      message: "",
      selected: null,
      comboEmisor: "",
      modalVisible: false,
      user: '',
      date: '',
      company: '',
      currtime: this.getCurrentDateTime(),
      validator: false,
    };
  },
  mounted() {
    this.message = "";
    this.getComboEmisores();
  },
  methods: {
    async handleSubmit() {
      this.login();
    },
    getCurrentDateTime() {
      const currentDateTime = new Date().toLocaleString();
      return currentDateTime;
    },
    async login() {
      this.message = ''
      this.validateForm()
      if(this.validator == true ) { return; }
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
      //console.log(data.success)
      this.getComboEmisores();
      if(data.success == 1){
        let token = data.access_token;
        this.user = data.user;
        this.date = data.date;
        this.company = data.company;
        this.showModal();
        if(token){
          localStorage.token = token;
          localStorage.user = this.user;
          localStorage.date = this.date;
          localStorage.codigoEmisor = data.cod_emisor
          localStorage.company = this.company;
        }else{
          this.$router.push('/').catch(()=>{})
        }
      }else{
        this.showAlert(data.message)
      }
    },

    validateForm(){
      if (this.username.length != 4) {
        this.message = 'El nombre del usuario debe tener 4 dígitos'
        this.validator = true
        return;
      }
      if (this.emisor == ''){ 
        this.message = 'Falta Código de Emisor'
        this.validator = true
        return;
      }
      this.validator = false
    },

    async getComboEmisores() {
      let url = `${process.env.apiWebsite}/api/getEmisor/`;
      const { data } = await axios.get(url);
      this.comboEmisor = data;
    },
    showAlert(message) {
      // Use sweetalert2
      this.$swal(message);
    },
    showModal() {
      this.modalVisible = true;
      //console.log('se muestra')
    },
    hideModal() {
      this.modalVisible = false;
      this.$router.push("/admin/overview");
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 90%;
  max-width: 400px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}



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

.modal-content button {
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

.modal-content button:hover {
  background-color: #444;
}
</style>
