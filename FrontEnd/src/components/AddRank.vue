<template>
    <div>
        <div class="d-flex justify-content-center" >
                <div class="spinner-grow mt-5 mb-5" :class="{nodisplay: loaded}" role="status" style="margin-right:80px">
                    <span class="sr-only" style="margin-left: 50px; margin-top: 5px;">Loading...</span>
                </div>
        </div>
        <div  :class="{nodisplay: !loaded}" > 
            <h1 class="text-center mt-5">Add Rank</h1>
        </div>
        <form ref="myform " @submit.prevent="onSubmit"  :class="{nodisplay: !loaded}" >
            <div class="container mt-3" >
                <div class="mb-3">
                    <label for="exampleDataList" class="form-label" style="font-size: 25px;font-weight: 600;">College</label>
                    <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." v-model="college" style="border: black 2px solid">
                    <datalist id="datalistOptions" ref="collegeselected">
                        <option v-for="college in colleges" :value="`${college.id}`" >{{college.name}}</option>
                    </datalist>
                </div>
                <div class="mb-3">
                            <label for="category" class="col-form-label" style="font-size: 25px;font-weight: 600;">Select Category</label>
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
                <div class="mb-3">
                    <label for="department" class="form-label" style="font-size: 25px;font-weight: 600;">Department</label>
                    <input type="text" class="form-control" id="department" v-model="department"  style="border: black 2px solid">
                    <div id="Help" class="form-text">Please enter in this format Computer Science And Engineering</div>
                </div>

                <div class="mb-3">
                    <label for="first-name" class="col-form-label" style="font-size: 25px;font-weight: 600;">Enter Rank</label>
                    <input type="number" v-model.number="rank" id="first-name" class="form-control" style="border: black 2px solid" required>
                </div>
                
                <div class="d-grid gap-2 mb-5">
                    <button class="btn btn-primary p-2 mt-4" style="font-weight: 700;" type="submit">{{ btnvalue }}</button>
                </div>
                <!-- <button type="submit" class="btn btn-primary">{{ btnvalue }}</button> -->
            </div>
           
        </form>
    </div>
</template>

<script>
import axios from "axios";


export default{
    data() {
        return{
            name: "",
            category: "",
            department:"",
            btnvalue:"Submit",
            loaded: false,
            colleges: [],
            college: null,
            rank: null
        }
    },
    async created(){
       

        try {
                const url = `${this.$store.state.origin}api/v1/colleges`
                const res = await axios({
                    method: 'GET',
                    url 
                });
                this.loaded = true
                this.colleges = res.data.data.colleges;
                console.log(this.colleges);
            } catch(err){   
                console.log(err);
            }
    },
    methods: {
    async onSubmit() {
        this.btnvalue = "Adding...."
        var formData = new FormData();
        formData.append('college', this.college);
        formData.append('category', this.category);
        formData.append('department', this.department);
        formData.append('rank', this.rank);
        for (const value of formData.values()) {
            console.log(value);
        }
        const data = {
            "college": this.college,
            "category": this.category,
            "department": this.department,
            "rank": this.rank 
        }
      
    // console.log(config);
      try {
                const url = `${this.$store.state.origin}api/v1/closingRank`
                // const url = "http://127.0.0.1:7000/api/v1/closingRank"
                const res = await axios({
                    method: 'POST',
                    url,
                    data ,
                    headers: {'Authorization': 'Bearer '+this.$store.state.idToken}
                });
                this.btnvalue = "Submit"
                if(res.data.status === 'success') {
                    console.log("success");
                }
                this.college="";
                this.category ="";
                this.department ="";
                this.rank ="";
                this.$refs.myform.reset();
            } catch (err) {
                this.btnvalue = "Submit"
                console.log('error', err);
            }
    }
  }
  }

</script>