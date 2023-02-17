<template>
    <div>
        <section class="mt-5" id="learn">
            <h2 class="text-center mb-3">Predicted Colleges</h2>
            
            <div class="position-absolute top-50 start-50 translate-middle" >
                <!-- <div class="spinner-grow" :class="{nodisplay: loaded}" role="status" style="margin-right:80px">
                    <span class="sr-only" style="margin-left: 50px; margin-top: 5px;">Loading...</span>
                </div> -->
                <div class="shapes" :class="{nodisplay: loaded}"></div>
            </div>
            
           
            <div class="container mb-5">
                <div class="row">
                    <div class="col-md-4 mb-4"  v-for="(college,i) in colleges">
                        <div class="card">
                            <img :src="`https://scbapi.anish-rm.repl.co/img/colleges/${college.image}`" class="card-img-top" alt="..." style="height: 12rem;">
                            <div class="card-body">
                                <h5 class="card-title" style="font-weight: 900;">{{ college.name }}</h5>
                                <p class="card-text lead" style="font-size: 15px; font-weight: 600;"> <span><img src="@/assets/location.png" alt="" style="width: 20px;margin-top: -3px;"></span> {{ college.location }}</p>
                                <div class="row" style="margin-bottom: -26px;margin-top: -10px;">
                                <div class="col-6">
                                    <p style="font-size: 12px;  font-weight: 900;"> <span><img src="@/assets/rank.png" alt="" style="width: 25px;"></span> <span style="color: #F90C0C;"> #{{ college.nirfRank }} </span>  out of 300 in Nirf</p>
                                </div>
                    
                                <div class="col-6">
                                    <p style="font-size: 12px;  font-weight: 900;"> <span><img src="@/assets/naac.png" alt="" style="width: 20px;"></span> NAAC Accrediation : <span style="color: #F90C0C;"> {{ college.naacAccrediation }} </span> </p>
                                </div>  
                                <p class="card-text lead mb-3" style="font-size: 15px; font-weight: 600;padding-left: 15px;margin-top: -10px;"> <span><img src="@/assets/hostel.png" alt="" style="width: 20px;margin-top: -3px;"></span> {{ college.hostelFacilities }}</p>

                            </div>
                            </div>
                            <ul class="list-group list-group-flush"  v-if="college.predictedDept.length == 1">
                                <li class="list-group-item" style="font-size: 14px;font-weight: 600;">BE {{ college.predictedDept[0].department }} <p style="font-weight: 200; font-size: 12px;margin-bottom: -5px;" class="lead">{{ category }}, Closing Rank: {{ college.predictedDept[0].rank }}</p> </li>
                            </ul>
                            <ul class="list-group list-group-flush"  v-else-if="college.predictedDept.length >= 2">
                                <li class="list-group-item" style="font-size: 14px;font-weight: 600;">BE {{ college.predictedDept[0].department }} <p style="font-weight: 200; font-size: 12px;margin-bottom: -5px;" class="lead">{{ category }}, Closing Rank: {{ college.predictedDept[0].rank }}</p> </li>
                                <li class="list-group-item" style="font-size: 14px;font-weight: 600;">BE {{ college.predictedDept[1].department }} <p style="font-weight: 200; font-size: 12px;margin-bottom: -5px;" class="lead">{{ category }}, Closing Rank: 2000</p> </li>
                            </ul>
                            <div class="accordion" id="accordionExample" v-if="college.predictedDept.length >= 2">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" :id="`${college._id}`">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${i}`" aria-expanded="false" @click="changeShow" aria-controls="collapseTwo">
                                       Show More
                                    </button>
                                    </h2>
                                    <div :id="`collapse${i}`" class="accordion-collapse collapse" :aria-labelledby="`${college._id}`" data-bs-parent="#accordionExample">
                                    <div class="accordion-body" style="margin-top: -20px;margin-left: -21px;">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item" style="font-size: 14px;font-weight: 600;" v-for="(dept,i) in college.predictedDept" :key="dept._id" v-if="i>=2">BE {{ dept.department }} <p style="font-weight: 200; font-size: 12px;margin-bottom: -5px;" class="lead">{{ category }}, Closing Rank: {{ dept.rank }}</p> </li>
                                        </ul>
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
                                <div class="text-center mt-2">
                                    <a :href="`${college.link}`"><button type="button" class="btn btn-primary">Read More >></button></a>
                                </div>
                            </div>
                                
                            </div>
                        </div>
                    </div>


                </div>
                
            </div>
        </section>
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
        props: {
       
    },
    components: {
            Review,
            Footer
        },
        data(){
            return{
                img1:'kongu.jpeg',
                show:"Show More",
                selected:-1,
                colleges:[],
                loaded: false,
                category : this.$route.params.category,
                details:[
                    {
                    id:0,
                    name : 'Kongu Engineering College',
                    location : 'Perundurai, Erode, TamilNadu ',
                    naac : 'It has recieved NAAC accrediation of A+++ in the year 2022',
                    placement : 'Last year 200 companies visted the campus and 100% placement was shown for the year 2021-2022',
                    },//'Kongu Engineering College','Vellore Institute of Technolgy','Anna University'],
                    {
                    id:1,
                    name : 'Vellore Institute of Technolgy',
                    location : 'Vellore, TamilNadu ',
                    naac : 'It has recieved NAAC accrediation of A++ in the year 2022',
                    placement : 'Last year 100 companies visted the campus and 80% placement was shown for the year 2021-2022',
                    // img:vit
                    },
                    {
                    id:2,
                    name : 'Anna University',
                    location : 'Chennai, TamilNadu ',
                    naac : 'It has recieved NAAC accrediation of A+in the year 2022',
                    placement : 'Last year 250 companies visted the campus and 97% placement was shown for the year 2021-2022',
                    // img:annauni
                    }
            ],
            reviewId : null,
            reviews : []
            }
        },
        computed:{
                image(){
                    this.selected++;
                    return this.details[this.selected].img;
                }
        },
        methods:{
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
            changeShow(){
                this.show = this.show=='Show More'? 'Show Less' : 'Show More';
            }
        },
        async created(){
            console.log(this.$route.params.category);
            // console.log(this.details);
            try {
                const url = `${this.$store.state.origin}api/v1/colleges/collegeRanks/${this.$route.params.category}/${this.$route.params.rank * 1}`
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