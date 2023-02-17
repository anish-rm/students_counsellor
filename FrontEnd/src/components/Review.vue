<template>
    <div>
        <!-- <div class="text-center mb-2 nodisplay" v-if="!reviewed && auth">
            <button type="button" class="btn btn-dark" @click="add = !add">Add Review</button>
        </div> -->


        <form ref="myform " @submit.prevent="onSubmit"  v-if="!reviewed && auth">
            <div style="margin-bottom: -15px;">
                    <textarea class="form-control" aria-label="With textarea" id="description" v-model="addReview" style="border: 1px black solid;" placeholder="Add Review.."></textarea>
            </div>
            <div class="star-rating" style="margin-bottom: 0px;">
                <input type="radio" name="stars" id="star-a" value="5" v-model.number = "starRating"/>
                <label for="star-a"></label>

                <input type="radio" name="stars" id="star-b" value="4" v-model.number = "starRating"/>
                <label for="star-b"></label>
            
                <input type="radio" name="stars" id="star-c" value="3" v-model.number = "starRating"/>
                <label for="star-c"></label>
            
                <input type="radio" name="stars" id="star-d" value="2" v-model.number = "starRating"/>
                <label for="star-d"></label>
             
                <input type="radio" name="stars" id="star-e" value="1" v-model.number = "starRating"/>
                <label for="star-e"></label>

            </div>
            <div class="text-center mb-2 mt-1">
                <button type="submit" class="btn btn-dark">{{ btnvalue }}</button>
            </div>
        </form>

        <div class="text-center mb-2" v-if="!auth">
            <p>Please Login to Add Review</p>
        </div>


        
        <div class="card" v-if="userReviewed">
            <div class="card-body">
                
                <h4><img :src="`https://scbapi.anish-rm.repl.co/img/users/${photo}`" alt="" style="height: 2.5rem; width: 2.5rem;border-radius: 50%;margin-right: 5px; margin-top: -8px;"> <span style="font-weight: 600;">  Your Review</span></h4>
                <h5 style="font-size: 16px; font-weight: 600;margin-top: 5px;"> Ratings:<span style="margin-left: 5px;" v-for="index in 5" :key="index"><img src="@/assets/rated.png" alt="" style="width: 20px; margin-top: -5px;" v-if="index<=rating"> <img src="@/assets/notrated.png" alt="" style="width: 20px;margin-top: -5px;" v-else></span></h5>
                <p class="card-text">{{review}}</p>
                <a href="#" data-bs-toggle= "modal" data-bs-target="#edit"><img src="../assets/edit.png" alt=""  style="width: 18px;margin-right: 10px;" ></a>
                <a href="#" ><img src="../assets/Trash.svg" alt="" style="width:23px" @click="deleteReview()"></a>
            </div>
        </div>
        <div class="card mb-3" v-for="review in reviews">
            <div class="card-body" v-if="userId!=review.user._id">
                
                <h4><img :src="`https://scbapi.anish-rm.repl.co/img/users/${review.user.photo}`" alt="" style="height: 2.5rem; width: 2.5rem;border-radius: 50%;margin-right: 5px; margin-top: -8px;"> <span style="font-weight: 600;">  {{review.user.name}}</span></h4>
                <h5 style="font-size: 16px; font-weight: 600;margin-top: 5px;"> Ratings:<span style="margin-left: 5px;" v-for="index in 5" :key="index"><img src="@/assets/rated.png" alt="" style="width: 20px; margin-top: -5px;" v-if="index<=review.rating"> <img src="@/assets/notrated.png" alt="" style="width: 20px;margin-top: -5px;" v-else></span></h5>
                <p class="card-text">{{review.review}}</p>
            </div>
        </div>


       

    </div>
</template>

<script>
import axios from "axios";


export default{
    props: ['reviews','reviewId'],
    data(){
        return{
            username : "Anish",
            review : "",
            rating : null,
            userReviewed : false,
            photo: null,
            userId:null,
            addReview: "",
            add: false,
            starRating: 0,
            btnvalue: "Add Review",
            deleteReviewId: "",

        }
    },
     created(){
            this.review = "",
            this.rating = null,
            this.userReviewed = false,
            this.photo= null,
            this.userId=null,
            this.addReview= "",
            this.add= false,
            this.starRating= 0
            this.deleteReviewId = ""
     },
    computed : {
        auth() {
            return this.$store.getters.ifAuthenticated;
        },
        reviewed(){
            this.username = "";
            this.review ="";
            this.rating = null;
            this.photo = "";
            this.userReviewed = false;
            this.userId = ""; 
            this.deleteReviewId = "";
            this.reviews.forEach(element => {
                if(element.user._id === this.$store.state.userId){
                    console.log("anish")
                    this.username = element.user.name;
                    this.review = element.review;
                    this.rating = element.rating;
                    this.photo = element.user.photo;
                    this.userReviewed = true;
                    this.userId = element.user._id ,
                    this.deleteReviewId = element._id
                }
            });
            return this.userReviewed;
        }
    },
    mounted() {
        this.reviews.forEach(element => {
            if(element.user._id == this.$store.state.userId){
                this.username = element.user.name;
                this.review = element.review;
                this.rating = element.rating;
                this.userReviewed = true
            }
        });
    },
    methods: {
        dummy(){
            console.log(this.reviewId);
        },
        async deleteReview(){
            try {
                    // const url = `${this.$store.state.origin}api/v1/closingRank`
                    const url = `http://127.0.0.1:7000/api/v1/reviews/${this.deleteReviewId}`
                    const res = await axios({
                        method: 'DELETE',
                        url,
                        headers: {'Authorization': 'Bearer '+this.$store.state.idToken}
                    });
                    this.$router.go();
                    
                } catch (err) {
                    this.btnvalue = "Submit"
                    console.log('error', err);
                }
        },
        async onSubmit() {
        this.btnvalue = "Adding...."
        
        const data = {
            "review": this.addReview,
            "college": this.reviewId,
            "rating": this.starRating,
        }
      
    // console.log(config);
      try {
            // const url = `${this.$store.state.origin}api/v1/closingRank`
            const url = "http://127.0.0.1:7000/api/v1/reviews"
            const res = await axios({
                method: 'POST',
                url,
                data ,
                headers: {'Authorization': 'Bearer '+this.$store.state.idToken}
            });
            this.btnvalue = "Add Review"
            if(res.data.status === 'success') {
                console.log("success");
            }
            this.$router.go();

            this.review = "";
           
            this.rating = "";
        } catch (err) {
            this.btnvalue = "Submit"
            console.log('error', err);
        }
    }
    }

}

</script>

<style scoped>
    .nodisplay{
        display: none;
    }
    .star-rating {
  display: flex;
  align-items: center;
  width: 160px;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin: 40px auto;
  position: relative;
}
/* hide the inputs */
.star-rating input {
  display: none;
}
/* set properties of all labels */
.star-rating > label {
  width: 30px;
  height: 30px;
  font-family: Arial;
  font-size: 30px;
  transition: 0.2s ease;
  color: orange;
}
/* give label a hover state */
.star-rating label:hover {
    color: orange;

  transition: 0.2s ease;
}
.star-rating label:active::before {
  transform:scale(1.1);
}

/* set shape of unselected label */
.star-rating label::before {
  content: '\2606';
  position: absolute;
  top: 0px;
  line-height: 26px;
}
/* set full star shape for checked label and those that come after it */
.star-rating input:checked ~ label:before {
  content:'\2605';
}

@-moz-document url-prefix() {
  .star-rating input:checked ~ label:before {
  font-size: 36px;
  line-height: 21px;
  }
}  


</style>