<template>
  <div class="home">
    <Hero></Hero>
    <WhyChooseUs></WhyChooseUs>
    <Colleges></Colleges>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import WhyChooseUs from '@/components/WhyChooseUs.vue'
import Colleges from '@/components/Colleges.vue'


export default {
  name: 'HomeView',
  components: {
    Hero,
    WhyChooseUs,
    Colleges
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
