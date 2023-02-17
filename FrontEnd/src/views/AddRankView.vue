<template>
    <section>
        <NavBar />
        <AddRank />
        <Footer />
    </section>
</template>

<script>

import AddRank from '../components/AddRank.vue'
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
export default{

    components:{
      AddRank,
      NavBar,
      Footer
    }
}

</script>

