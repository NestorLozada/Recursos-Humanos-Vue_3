<template>
  <div :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.vue-notifyjs.notifications {
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;

  }

  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }

  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);

  }

  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
.p{
  color: red;
}
.nav-item {
  margin-right: 10px;
  margin-top: 5px;
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

.rowSearchNew {
  margin-bottom: 32px;
}

.form-control {
  width: 250px;
}

.main-panel {
  padding-left: 30px;
  padding-right: 30px;
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

.modal-body{
    height: auto;
    //overflow-y: scroll;
}

.search {
  justify-self: flex-end;
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

.form-button:hover {
  background-color: #444;
}

.newBtn{
  width: auto;
}
</style>
