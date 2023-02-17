<template>
    <section class="mt-5" id="learn">
        <h2 class="text-center mb-5">Please Enter The Details</h2>
        <div class="container">
            <div class="row align-items-center justify-content-between">
                <div class="col-12 col-md-6" >
                    <img src="@/assets/form.jpg" class="img-fluid" alt="">
                </div>
                <div class="col-12 col-md-6 ">
                    <form v-on:submit.prevent="onSubmit">
                        <div class="mb-3">
                            <label for="first-name" class="col-form-label">Enter Name</label>
                            <input type="text" name="" id="first-name" class="form-control" style="border: black 2px solid" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="first-name" class="col-form-label">Enter Rank</label>
                            <input type="number" v-model.number="rank" id="first-name" class="form-control" style="border: black 2px solid" required>
                        </div>
                        <div class="mb-3">
                            <label for="category" class="col-form-label">Select Category</label>
                            <select class="form-select" aria-label="Default select example" id="category" style="border: black 2px solid" v-model="category" required>
                                <option selected>Please Select</option>
                                <option value="BC">BC</option>
                                <option value="BCM">BCM</option>
                                <option value="OC">OC</option>
                                <option value="MBC">MBC</option>
                                <option value="SC">SC</option>
                                <option value="SCA">SCA</option>
                                <option value="ST">ST</option>

                            </select>
                        </div>
                        <div class="d-grid gap-2 mb-2">
                            <button class="btn btn-primary" style=" color:#FFFFFF;font-weight: 700;" type="submit" id="liveToastBtn">{{ btntxt }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    

    export default{
        data(){
            return{
                name: "",
                rank:null,
                category: "",
                btntxt: "Predict",
                rankEntered: true
            }
        },
        methods:{
            
            onSubmit(){
                console.log(this.rank);
                let rank = this.rank;
                let category = this.category;
                console.log(rank,category);
                this.$router.push({ name: 'result', params: { category,rank } })
            }
        }
    }
</script>

<style scoped>
    
</style>