<template>
  <div class="about">
    <NavBar></NavBar>
      <About></About>
     <Footer></Footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import About from '@/components/about.vue'
  
  export default{
    components:{
      About,
      NavBar,
      Footer
    }
  }
</script>