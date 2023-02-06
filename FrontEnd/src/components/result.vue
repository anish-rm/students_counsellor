<template>
    <div>
        <section class="p-5" id="learn">
            <h2 class="text-center mb-5">Predicted Colleges</h2>
            <!-- <img src="image" alt=""> -->
            <div class="container" v-for="college in colleges">
                <div class="row align-items-center justify-content-between">
                    <div class="col-md">
                        <img v-bind:src="college.images" class="img-fluid" alt="" style="height:300px;margin-left:50px;width:450px">
                    </div>
                    <div class="col-md p-5">
                        <h2>{{college.name}}</h2>
                        <p class="lead">
                            {{college.location}}
                        </p>
                        <p class="lead">
                            NAAC Accrediation : {{college.naacAccrediation}}
                        </p>
                        <p class="lead">
                            Placement Status : {{college.placement}}
                        </p>
                        <a :href="college.link" class="btn btn-dark mt-3"><i class="bi bi-chevron-right"></i>Read More</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import kongu from "@/assets/kongu.jpeg";
    import anna from "@/assets/anna.jpeg";
    import krishna from "@/assets/krishna.jpeg";
    import kumaraguru from "@/assets/kumaraguru.jpeg";
    import psg from "@/assets/psg.jpeg";
    import rajalaskhmi from "@/assets/rajalaskhmi.jpeg";
    import srm from "@/assets/srm.jpeg";
    import ssn from "@/assets/ssn.jpeg";
    import thiagarajar from "@/assets/thiagarajar.jpg";
    import cit from "@/assets/cit.jpeg";

    // import kongu from "@/assets/kongu.jpeg";

    export default{
        props: {
        rank: {
            type : Number,
            required: true,
            default: false
        },
    },
        data(){
            return{
                img1:'kongu.jpeg',
                selected:-1,
                colleges:[],
                details:[
                    {
                    id:0,
                    name : 'Kongu Engineering College',
                    location : 'Perundurai, Erode, TamilNadu ',
                    naac : 'It has recieved NAAC accrediation of A+++ in the year 2022',
                    placement : 'Last year 200 companies visted the campus and 100% placement was shown for the year 2021-2022',
                    img:kongu
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
            ]
            }
        },
        computed:{
                image(){
                    this.selected++;
                    return this.details[this.selected].img;
                }
        },
        created(){
            console.log(kongu);
            // console.log(this.details);
            fetch(`${this.$store.state.origin}api/v1/colleges?rank=${this.rank}`).then((response) => { // it returns a promise
      return response.json()// it return a promise
    }).then((data) => {
      this.colleges = data.data.colleges;
    }).catch((err) => { // promise will be rejected only if there is a network error for example if we are online
      console.log(err);
    })
        }
    }
</script>