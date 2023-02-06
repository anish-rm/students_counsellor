<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> 
     <router-view/>  -->
     <NavBar></NavBar>
     <Footer></Footer>

  </div>
</template>

<script>
    import NavBar from './components/NavBar.vue';
    import Footer from './components/Footer.vue';

    export default{
      components : {
        NavBar,
        Footer
      }
    }

</script>

<style>

</style>
