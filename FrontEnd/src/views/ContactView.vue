<template>
    <div>
    <NavBar></NavBar>
        <contact></contact>
     <Footer></Footer>

    </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue';
    import Footer from '@/components/Footer.vue';
    import contact from '@/components/contact.vue';
    export default{
        components:{
            contact,
            NavBar,
        Footer
        }
    }
</script>