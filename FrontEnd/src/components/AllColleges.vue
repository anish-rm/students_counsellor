<template>
    <div>
        <div class="alert mt-3 alert--success" :class="{'nodisplay' : !alert }" style="font-size: 20px;"> <p>{{ alertmsg }}</p> </div>
        <section class="mt-5" id="learn">
            <h2 class="text-center mb-3">All Colleges</h2>
            
            <div class="position-absolute top-50 start-50 translate-middle" >
                <div class="shapes" :class="{nodisplay: loaded}"></div>
            </div>
            
           
            <div class="container mb-5">
                <div class="row">
                    <div class="col-md-4 mb-4" v-for="college,i in colleges" :id="college._id">
                        <div class="card">
                            <img :src="`https://scbapi.anish-rm.repl.co/img/colleges/${college.image}`" class="card-img-top" alt="..." style="height: 12rem;">
                            
                            <div class="card-body">
                                <h5 class="card-title" style="font-weight: 900;">{{ college.name }}</h5>
                                <p class="card-text lead" style="font-size: 15px; font-weight: 600;"> <span><img src="@/assets/location.png" alt="" style="width: 20px;margin-top: -3px;"></span> {{ college.location }}</p>
                                <div class="row" style="margin-bottom: -26px;margin-top: -10px;">
                                    <div class="col-6">
                                        <p style="font-size: 12px;  font-weight: 900;"> <span><img src="@/assets/rank.png" alt="" style="width: 25px;"></span> <span style="color: #F90C0C;"> #{{ college.nirfRank }}</span>  out of 300 in Nirf</p>
                                    </div>
                        
                                    <div class="col-6">
                                        <p style="font-size: 12px;  font-weight: 900;"> <span><img src="@/assets/naac.png" alt="" style="width: 20px;"></span> NAAC Accrediation : <span style="color: #F90C0C;"> {{ college.naacAccrediation }} </span> </p>
                                    </div>  
                                </div>
                                <p class="card-text lead mt-3" style="font-size: 15px; font-weight: 600;padding-left: 3px;margin-bottom: -3px;"> <span><img src="@/assets/hostel.png" alt="" style="width: 20px;margin-top: -3px;"></span> {{ college.hostelFacilities }}</p>
                                <p class="card-text lead mt-2" style="font-size: 15px; font-weight: 600;padding-left: 3px;"> <span><img src="@/assets/placement.png" alt="" style="width: 20px;margin-top: -3px;"></span> <span style="margin-right: 5px;">Placement :</span>  {{ college.placement }}</p>
                                
                            </div>
                            
                            <div class="accordion" id="accordionExample" style="margin-top: -15px;">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" :id="`${college._id}`">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${i}`" aria-expanded="false" @click="changeShow" aria-controls="collapseTwo">
                                       Show More
                                    </button>
                                    </h2>
                                    <div :id="`collapse${i}`" class="accordion-collapse collapse" :aria-labelledby="`${college._id}`" data-bs-parent="#accordionExample">
                                    <div class="accordion-body" style="margin-top: -10px;">
                                        <div class="description">
                                            <p> <span style="font-weight: 600;">About :</span>  {{ college.description }}</p>
                                        </div>
                                        <div class="departments">
                                            <p > <span><img src="@/assets/department.png" alt="" style="width: 20px; margin-top: -3px; "></span> <span style="font-weight: 600;">Courses Available :</span>  {{ college.coursesAvailable.join(", ")}} </p> 
                                        </div>
                                        <div class="departments">
                                            <p > <span><img src="@/assets/contact.png" alt="" style="width: 22px; margin-top: -3px; "></span> <span style="font-weight: 600;">Contact :</span>  {{ college.contact}} </p> 
                                        </div>
                                        <div class="text-center mt-2" >
                                            <a :href="`${college.link}`"><button type="button" class="btn btn-primary">Know More >></button></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div class="card-body mb-3" >
                                <div class="row" style="margin-bottom: -26px;margin-top: -10px;">
                                <div class="col-8">
                                    <h5 style="font-size: 16px; font-weight: 600;margin-top: 5px;"> Ratings:<span style="margin-left: 5px;" v-for="index in 5" :key="index"><img src="@/assets/rated.png" alt="" style="width: 20px; margin-top: -5px;" v-if="index<=college.ratingsAverage"> <img src="@/assets/notrated.png" alt="" style="width: 20px;margin-top: -5px;" v-else></span></h5>
                                </div>                    
                                <div class="col-4" style="display: flex; justify-content: flex-end;">
                                    <a href="#" class="card-link" style=" color:black" data-bs-toggle= "modal" data-bs-target="#review" @click="review(college._id)">{{ college.ratingsQuantity }} Reviews</a>
                                </div>  
                                <div v-if="admin">
                                  <a href="#" data-bs-toggle= "modal" data-bs-target="#edit"><img src="../assets/edit.png" alt=""  style="width: 18px;margin-right: 10px;" @click="edit(college)"></a>
                                  <a href="#" data-bs-toggle= "modal" data-bs-target="#delete"><img src="../assets/Trash.svg" alt="" style="width:23px" class="delete" @click="deletee(college._id)"></a>
                                </div>
                            </div>
                                
                            </div>
                        </div>
                    </div>


                </div>
                
            </div>
        </section>
        <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header">
                    <div class="col-1">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close" style="border: none;background: #F8F5F5;"> <img src="../assets/back.png" alt=""></button>
                    </div>
                    <div class="col-10">
                        <h5 class="modal-title text-center deleteheading1" id="exampleModalLabel" style="font-weight: 600;">Do you want to Delete it.</h5>
                    </div>
                    <div class="col-1">
                    </div>
                </div>
                <div class="modal-body">
                    <div class="d-grid gap-2">
                        <div class="row">
                            <button id="deleteyes" data-bs-dismiss="modal" aria-label="Close" class="btn py-2 col mx-2 btn-success" style="font-weight: 700;" type="submit" @click="deleteCollege(true)">Yes</button>
                            <button data-bs-dismiss="modal" aria-label="Close" class="btn py-2 col mx-2 btn-danger" style="font-weight: 700;" type="submit" >No</button>
                        </div>
                    </div>
                </div>
            
            </div>
            
            </div>
            
        </div>
        <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content" >
                <div class="modal-header">
                    <div class="col-1">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close" style="border: none;background: #F8F5F5;"> <img src="../assets/back.png" alt=""></button>
                    </div>
                    <div class="col-10">
                        <h5 class="modal-title text-center deleteheading1" id="exampleModalLabel" style=" font-weight: 600;">Edit College</h5>
                    </div>
                    <div class="col-1">
                    </div>
                </div>
                <div class="modal-body">
                    <form ref="myform" @submit.prevent="onSubmit">
                    <div class="container" >
                        <div class="mb-3">
                            <label for="name" class="form-label" style="font-weight: 600;">College Name</label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="location" class="form-label" style="font-weight: 600;">Location</label>
                            <input type="text" class="form-control" id="location" v-model="location">
                        </div>
                        <div class="mb-3">
                            <label for="coursesAvailable" class="form-label" style="font-weight: 600;">Courses Available</label>
                            <input type="text" class="form-control" id="coursesAvailable" v-model="coursesAvailable">
                            <div id="Help" class="form-text">Please enter in this format CSE,IT,ECE</div>
                        </div>

                        <div class="mb-3">
                            <label for="naacAccrediation" class="form-label" style="font-weight: 600;">NAAC Accrediation</label>
                            <input type="text" class="form-control" id="naacAccrediation" v-model="naacAccrediation">
                        </div>
                        
                        <div class="mb-3">
                            <label for="description" class="form-label" style="font-weight: 600;">Description</label>
                            <textarea class="form-control" aria-label="With textarea" id="description" v-model="description"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="contact" class="form-label" style="font-weight: 600;">Contact</label>
                            <input type="text" class="form-control" id="contact" v-model="contact">
                        </div>

                        <div class="mb-3">
                            <label for="placement" class="form-label" style="font-weight: 600;">Placement</label>
                            <input type="text" class="form-control" id="placement" v-model="placement">
                        </div>

                        <div class="mb-3">
                            <label for="hostelFacilities" class="form-label" style="font-weight: 600;">Hostel Facilities</label>
                            <input type="text" class="form-control" id="hostelFacilities" v-model="hostelFacilities">
                        </div>

                        <div class="mb-3">
                            <label for="link" class="form-label" style="font-weight: 600;">College Link</label>
                            <input type="text" class="form-control" id="link" v-model="link">
                        </div>

                        <div class="mb-3">
                            <label for="nirfRank" class="form-label" style="font-weight: 600;">Nirf Rank</label>
                            <input type="text" class="form-control" id="nirfRank" v-model="nirfRank">
                        </div>
                        <div class="mb-3">
                            <label for="photo" class="form-label" style="font-weight: 600;">College Image</label>
                            <input class="form-control" type="file" accept='image/*' name="photo" id="ephoto">
                        </div>
                        <div class="d-grid gap-2 mb-2">
                            <button class="btn btn-primary p-2 mt-4" style="font-weight: 700;" type="submit">{{ btnvalue }}</button>
                        </div>
                        <div class="info text-center" :class="{nodisplay: !updated}">
                            <p class="lead" style="font-weight: 600;color: green;">Updated Successfully</p>
                        </div>
                        <!-- <button type="submit" class="btn btn-primary">{{ btnvalue }}</button> -->
                    </div>
                
                </form>
                </div>
            
            </div>
            </div>
        </div>
        <div class="modal fade" id="review" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content" style="background: #F8F5F5;">
                    <div class="modal-header" style="margin-bottom: -20px;">
                        <div class="col-1">
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" style="border: none;background: #F8F5F5;"> <img src="../assets/back.png" alt=""></button>
                        </div>
                        <div class="col-10">
                            <h5 class="modal-title text-center deleteheading1" id="exampleModalLabel" style=" font-weight: 600;">Reviews</h5>
                        </div>
                        <div class="col-1">
                        </div>
                    </div>
                    <div class="modal-body">
                        <Review :reviews = "reviews" :reviewId = "reviewId" />
                    </div>
                </div>
            </div>
        </div>
        <Footer :class="{nodisplay: !loaded}"></Footer>
    </div>
</template>

<script>
  
    import axios from "axios";
    import Review from "./Review.vue";
    import Footer from '@/components/Footer.vue';


    // import kongu from "@/assets/kongu.jpeg";

    export default{
        computed : {
            admin() {
                return this.$store.state.userRole == 'admin'
            }
        },
        components: {
            Review,
            Footer
        },
        data(){
            return{
                show:"Show More",
                selected:-1,
                colleges:[],
                loaded: false,
                category : this.$route.params.category,
                deleteId: null,
                alert:false,
                alertstyle: "d-none",
                alertmsg:"Deleted Successfully",
                alertType: false,
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
                btnvalue:"Update",
                editId : null,
                updated: false,
                reviewId : null,
                reviews : []
            }
        },
       
        methods:{
            changeShow(){
                this.show = this.show=='Show More'? 'Show Less' : 'Show More';
            },
            async review(id){
                this.reviewId = id
                try {
                const url = `http://127.0.0.1:7000/api/v1/reviews/getCollegeReview/${id}`
                const res = await axios({
                    method: 'GET',
                    url
                });
                console.log(res);
                this.reviews = res.data.data.reviews;
                } catch(err){   
                    console.log(err);
                }
            },  
            deletee(id){
                this.deleteId = id;
            },
            edit(college){
                this.editId = college._id;
                this.name=college.name;
                this.location = college.location;
                this.coursesAvailable = college.coursesAvailable.join(",");
                this.naacAccrediation =college.naacAccrediation;
                this.description = college.description;
                this.contact = college.contact;
                this.placement = college.placement;
                this.hostelFacilities = college.hostelFacilities;
                this.link= college.link;
                this.nirfRank = college.nirfRank;
            },
            async onSubmit() {
                this.btnvalue = "Updating...."
                const form = new FormData();
                console.log(document.getElementById('ephoto').files[0]);
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
                form.append('photo', document.getElementById('ephoto').files[0]);
                console.log(form);
                const config = {
                        headers: { Authorization: `Bearer ${this.$store.state.idToken}` }
                    };
                console.log(config);
                try {
                    const url = `${this.$store.state.origin}api/v1/colleges/${this.editId}`
                    const res = await axios({
                        method: 'PATCH',
                        url,
                        data : form,
                        headers: {'Authorization': 'Bearer '+this.$store.state.idToken}
                    });
                    this.btnvalue = "Update"
                    this.updated = true;
                    window.setTimeout(() => {
                        this.updated = false
                        this.$router.go();
                    },1000)
                    if(res.data.status === 'success') {
                        console.log("success");
                    }
                } catch (err) {
                    this.btnvalue = "Update"
                    console.log('error', err);
                }
            },
            async deleteCollege(chosen){
                if(chosen){
                    console.log(this.deleteId)
                    console.log("deleting...");
                try {
                    // const url = `${this.$store.state.origin}api/v1/closingRank`
                    const url = `${this.$store.state.origin}api/v1/colleges/${this.deleteId}`
                    const res = await axios({
                        method: 'DELETE',
                        url,
                        headers: {'Authorization': 'Bearer '+this.$store.state.idToken}
                    });
                    this.alert = true;
                    window.setTimeout(() => {
                            this.alert = false
                            this.$router.go();
                    },1000)
                    
                } catch (err) {
                    this.btnvalue = "Submit"
                    console.log('error', err);
                }
                }
            }
        },
        async created(){
            console.log("hi");
            try {
                const url = `http://127.0.0.1:7000/api/v1/colleges?sort=nirfRank`
                const res = await axios({
                    method: 'GET',
                    url
                });
                this.loaded = true
                this.colleges = res.data.data.colleges;
                
            } catch(err){   
                console.log(err);
            }
            
        }
    }
</script>

<style scoped>
    .nodisplay{
        display:none
    }

    .nodisplay{
        display: none;
    }
    .alert {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        color: #fff;
        font-size: 1.8rem;
        font-weight: 400;
        text-align: center;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 1.6rem 5rem;
        box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.25);
        }
        .alert--success {
        background-color: #20bf6b;
        }
        .shapes {
   width: 44.8px;
   height: 44.8px;
   display: grid;
   animation: shapes-w7o2p3 1.5s infinite linear;
}

.shapes:before,
.shapes:after {
   content: "";
   grid-area: 1/1;
   background: #343a40;
   clip-path: polygon(0 0%,100% 0,100% 100%);
   animation: inherit;
   animation-name: shapes-8qpnlc;
}

.shapes:after {
   --s: -1;
}

@keyframes shapes-w7o2p3 {
   66% {
      transform: skewX(0deg);
   }

   80%, 100% {
      transform: skewX(-45deg);
   }
}

@keyframes shapes-8qpnlc {
   0% {
      transform: scale(var(--s,1)) translate(-0.5px,0);
   }

   33% {
      transform: scale(var(--s,1)) translate(calc(1px - 50%),calc(1px - 50%));
   }

   66% {
      transform: scale(var(--s,1)) translate(calc(1px - 50%),0%);
   }

   100% {
      transform: scale(var(--s,1)) translate(calc(0.5px - 50%),0%);
   }
}
        

</style>