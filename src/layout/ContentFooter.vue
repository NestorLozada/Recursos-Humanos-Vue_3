<template>
  <!-- <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
          <li>
            <router-link :to="{path:'/admin'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        <a><b>Usuario:</b> {{ user }}</a>
      </div>
    </div>
  </footer> -->
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