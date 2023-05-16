<template>
    <div class="container">
      <form class="form" @submit.prevent="handleSubmit">
        <h2 class="form-title">Iniciar sesión</h2>
        <p v-if="message" value>{{ message }}</p>
        <div class="form-group">
          <label for="username" class="form-label">Nombre de usuario</label>
          <input
            type="number"
            id="username"
            class="form-input"
            v-model="username"
            placeholder="Ingrese su nombre de usuario"
            required
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            class="form-input"
            v-model="password"
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <div class="form-group">
          <label for="emisor" class="form-label">Emisor</label>
          <select class="form-input" v-model="emisor" required>
            <option disabled value="">Please select one</option>
            <option v-for="(item, index) in comboEmisor" :key="item.Codigo" :value=item.Codigo>{{index + 1}}. {{ item.NombreEmisor }}</option>
          </select>
        </div>
        <button type="submit" class="form-button" @click="login">
          Iniciar sesión
        </button>
      </form>
    </div>
  </template>
  
  <script lang="js">
  import axios from "axios";
  export default {
    data() {
      return {
        username: "",
        password: "",
        emisor: "",
        message: "",
        selected: null,
        comboEmisor: ""
      };
    },
    computed() {},
    mounted() {
      this.message = "";
      this.getComboEmisores();
    },
    methods: {
      async login() {
        this.message = "";
        let formData = {
          nombreUsuario: this.username,
          passwordUsuario: this.password,
          codigoEmisor: this.emisor,
        };
        let url = "http://localhost:8000/api/login/";
        const { data } = await axios({
          method: "post",
          url: url,
          data: formData,
        });
        console.log(data);
        this.getComboEmisores();
        if(data.success == 1){
          this.message = data.message;
          this.$router.push({ path: "cenCosto" });
        }
      },
      async getComboEmisores() {
        let url = "http://localhost:8000/api/getEmisor/";
        const { data } = await axios.get(url);
        this.comboEmisor = data;
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
  
  .form-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
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
  
  .form-button:hover {
    background-color: #444;
  }
  </style>
  