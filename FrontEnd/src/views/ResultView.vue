<template>
    <div>
        <NavBar></NavBar>
        <result :rank="rank"></result>

    </div>
</template>
<script>
    import result from '@/components/result.vue';
    import NavBar from '@/components/NavBar.vue';
    export default{
        data(){
            return{
                items:[],
                rank:null
            }
        },
        components : {
            result,
            NavBar,
        },
        created(){//it is a lifecycle hook refer that. It will run as soon as the component is mounted to the dom
         console.log(this.$route.params.rank);
         this.rank = this.$route.params.rank;
        }
    }
</script>