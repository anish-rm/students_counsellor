<template>
    <section>
        <NavBar />
        <AllColleges />
    </section>
</template>

<script>

import AllColleges from '../components/AllColleges.vue'
import NavBar from '@/components/NavBar.vue';
export default{

    components:{
      AllColleges,
      NavBar,
    }
}

</script>