<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> 
     <router-view/>  -->
     <!-- <NavBar></NavBar>
     <Footer></Footer> -->
     <router-view/>

  </div>
</template>

<script>

    export default{
      created() {
      // console.log("path in app", this.$store.path);
      // this.$cookies.set("keyName", "hello");
      // const nn = this.$cookies.get("jwt");
      console.log(this.$cookies.keys());
      this.$store.dispatch("AutoLogin", this.$store.path);
      this.$store.path = null;
    }
    }

</script>

<style>

</style>
