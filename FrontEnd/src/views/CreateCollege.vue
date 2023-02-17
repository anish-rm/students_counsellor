<template>
    <div>
        <NavBar></NavBar>
        <form ref="myform" @submit.prevent="onSubmit">
            <div class="container mt-5" >
                <div class="mb-3">
                    <label for="name" class="form-label">College Name</label>
                    <input type="text" class="form-control" id="name" v-model="name">
                </div>
                <div class="mb-3">
                    <label for="location" class="form-label">Location</label>
                    <input type="text" class="form-control" id="location" v-model="location">
                </div>
                <div class="mb-3">
                    <label for="coursesAvailable" class="form-label">Courses Available</label>
                    <input type="text" class="form-control" id="coursesAvailable" v-model="coursesAvailable">
                    <div id="Help" class="form-text">Please enter in this format CSE,IT,ECE</div>
                </div>

                <div class="mb-3">
                    <label for="naacAccrediation" class="form-label">NAAC Accrediation</label>
                    <input type="text" class="form-control" id="naacAccrediation" v-model="naacAccrediation">
                </div>
                
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" aria-label="With textarea" id="description" v-model="description"></textarea>
                </div>

                <div class="mb-3">
                    <label for="contact" class="form-label">Contact</label>
                    <input type="text" class="form-control" id="contact" v-model="contact">
                </div>

                <div class="mb-3">
                    <label for="placement" class="form-label">Placement</label>
                    <input type="text" class="form-control" id="placement" v-model="placement">
                </div>

                <div class="mb-3">
                    <label for="hostelFacilities" class="form-label">Hostel Facilities</label>
                    <input type="text" class="form-control" id="hostelFacilities" v-model="hostelFacilities">
                </div>

                <div class="mb-3">
                    <label for="link" class="form-label">College Link</label>
                    <input type="text" class="form-control" id="link" v-model="link">
                </div>

                <div class="mb-3">
                    <label for="nirfRank" class="form-label">Nirf Rank</label>
                    <input type="text" class="form-control" id="nirfRank" v-model="nirfRank">
                </div>
                <div class="mb-3">
                    <label for="photo" class="form-label">College Image</label>
                    <input class="form-control" type="file" accept='image/*' name="photo" id="photo">
                </div>
                <div class="d-grid gap-2 mb-5">
                    <button class="btn btn-primary p-2 mt-4" style="font-weight: 700;" type="submit">{{ btnvalue }}</button>
                </div>
                <!-- <button type="submit" class="btn btn-primary">{{ btnvalue }}</button> -->
            </div>
           
        </form>
         <Footer></Footer>

    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import axios from "axios";


export default{
    data() {
        return{
            name: "",
            location:"",
            coursesAvailable:"",
            naacAccrediation: "",
            description: "",
            contact: "",
            placement: "",
            hostelFacilities:"",
            link:"",
            nirfRank:"",
            btnvalue:"Submit"
        }
    },
    components:{
      NavBar,
      Footer
    },
    methods: {
    async onSubmit() {
        this.btnvalue = "Adding...."
      const form = new FormData();
      form.append('name', this.name);
      form.append('location', this.location);
      form.append('coursesAvailable', this.coursesAvailable);
      form.append('naacAccrediation', this.naacAccrediation);
      form.append('description', this.description);
      form.append('contact', this.contact);
      form.append('placement', this.placement);
      form.append('hostelFacilities', this.hostelFacilities);
      form.append('link', this.link);
      form.append('nirfRank', this.nirfRank);
      form.append('photo', document.getElementById('photo').files[0]);
      console.log(form);
      const config = {
            headers: { Authorization: `Bearer ${this.$store.state.idToken}` }
        };
    console.log(config);
      try {
                const url = `${this.$store.state.origin}api/v1/colleges/`
                const res = await axios({
                    method: 'POST',
                    url,
                    data : form,
                    headers: {'Authorization': 'Bearer '+this.$store.state.idToken}
                });
                this.btnvalue = "Submit"

                if(res.data.status === 'success') {
                    console.log("success");
                }
                this.name="";
                this.location ="";
                this.coursesAvailable ="";
                this.naacAccrediation ="";
                this.description ="";
                this.contact = "";
                this.placement ="";
                this.hostelFacilities ="";
                this.link="";
                this.nirfRank = "";
                this.$refs.myform.reset();
            } catch (err) {
                this.btnvalue = "Submit"
                console.log('error', err);
            }
    }
  }
  }

</script>