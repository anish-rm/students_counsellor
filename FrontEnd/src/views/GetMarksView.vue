<template>
    <div>
        <NavBar></NavBar>
        <PredictCollege />
        <FAQ></FAQ>
    </div>
</template>

<script>

    import PredictCollege from '@/components/PredictCollege.vue';
    import FAQ from '@/components/FAQ.vue'
    import NavBar from '@/components/NavBar.vue';

    export default{
        
        components:{
            // Form,
            FAQ,
            NavBar,
            PredictCollege
        }
    }
</script>