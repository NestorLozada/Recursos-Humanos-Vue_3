<template>
  <nav class="navbar navbar-expand-lg">
    <ul class="navbar-nav ml-auto ">
      <li class="nav-item">
        <a>
          <b>{{ user }}</b> 
        </a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto ">
      <li class="nav-item">
        <a><b>{{ date }}</b></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto ">
      <li class="nav-item">
        <a><b>{{ company }}</b></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="#" @click="logout" class="nav-link"> Log out </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {

  data() {
    return {
      activeNotifications: false,
      user: "",
      date: "",
      company: "",
    };
  },
  mounted() {
    this.getVariables()
  },
  methods: {
    getVariables() {
      this.user = localStorage.getItem("user");
      this.date = localStorage.getItem("date");
      this.company = localStorage.getItem("company");
    },
    logout() {
      localStorage.token = "";
      this.$router.push("/");
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
