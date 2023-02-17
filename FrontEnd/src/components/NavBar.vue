<template>
    <div>
        <nav class="navbar navbar-expand-md bg-dark navbar-dark py-3 fixed-top">
        <div class="container">
            <a href="#" class="navbar-brand">SCB</a> 
            <button class="navbar-toggler" type="button" data-bs-toggle = "collapse" data-bs-target = "#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
                
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/getmarks" class="nav-link">Predict College</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/allColleges" class="nav-link">All Colleges</router-link>
                    </li>
                    <li class="nav-item" v-if = "!admin">
                        <router-link to="/about" class="nav-link">About</router-link>
                    </li>
                    
                    <li class="nav-item" v-if = "admin">
                        <router-link to="/addCollege" class="nav-link">Add College</router-link>
                    </li>
                    <li class="nav-item" v-if = "admin">
                        <router-link to="/addRank" class="nav-link">Add Rank</router-link>
                    </li>
                    <li class="nav-item" v-if="!auth">
                        <router-link to="/signup" class="nav-link">Login/SignUp</router-link>
                    </li>
                    <li v-if="auth" class="nav-item">
                        <ul @click="onLogout" class="nav-link" style="cursor: pointer;">
                            Log Out
                        </ul>
                    </li>
                    <li v-if="auth" class="nav-item" >
                        
                        <router-link to="/dashboard" class="nav-link"><img src="@/assets/default.jpg" alt="" style="height: 2.5rem; width: 2.5rem;border-radius: 50%;margin-right: 5px; margin-top: -8px;"> <span style=" color: white;">  {{this.$store.state.userName}}</span></router-link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
    </div>
</template>

<script>

export default {
  computed: {
    auth() {
      return this.$store.getters.ifAuthenticated;
    },
    admin() {
        return this.$store.state.userRole == 'admin'
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>