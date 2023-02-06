<template>
    <div>
    <section class="p-5" id="learn">
        <div class="container">
            <div class="row align-items-center justify-content-between">
                <div class="col-md">
                    <img src="@/assets/form.jpg" class="img-fluid" alt="">
                </div>
                <div class="col-md p-5">
                    <form>
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Enter Name</label>
                <input type="text" name="" id="first-name" class="form-control">
                
            </div>
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Enter Rank</label>
                <input type="number" v-model.number="rank" id="first-name" class="form-control">
                
            </div>
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Select Department</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Computer Science</option>
                    <option value="1">Electrical And Communications And Engineering</option>
                    <option value="2">Information Technolgy</option>
                    <option value="3">Mechanical</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Select Category</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>BC</option>
                    <option value="1">MBC</option>
                    <option value="2">SE/ST</option>
                    <option value="3">OC</option>
                </select>
            </div>
        </form>
                    <a href="#" class="btn btn-dark mt-3" @click="gotoResult">Predict Results</a>
                </div>
            </div>
        </div>
    </section>
    <FAQ></FAQ>
    </div>
</template>

<script>
    // import Form from '@/components/form.vue'
    import FAQ from '@/components/FAQ.vue'

    export default{
        data(){
            return{
                rank:null
            }
        },
        components:{
            // Form,
            FAQ
        },
        methods:{
            gotoResult(){
                // eventBus.$emit('form-submitted',"hello");
                let rank = this.rank;
                console.log(rank);
                this.$router.push({ name: 'result', params: { rank } })
                // this.$router.push('/result/2000');
            }
        }
    }
</script>