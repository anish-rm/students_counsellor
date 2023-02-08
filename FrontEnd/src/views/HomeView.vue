<template>
  <div class="home">
    <NavBar></NavBar>
    <Hero></Hero>
    <WhyChooseUs></WhyChooseUs>
    <Colleges></Colleges>
    <Footer></Footer>

  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import WhyChooseUs from '@/components/WhyChooseUs.vue'
import Colleges from '@/components/Colleges.vue'


export default {
  name: 'HomeView',
  components: {
    Hero,
    WhyChooseUs,
    Colleges,
    NavBar,
        Footer
  },
  data(){
    return{
      img:"kongu.jpeg"
    }
  }
}
</script>

<style>
  body::before{
    display: block;
    content: '';
    height: 60px;
}
</style>
