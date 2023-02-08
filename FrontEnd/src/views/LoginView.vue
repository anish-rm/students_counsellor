<template>
    <section class="p-4">
        <div class="container">
            <div class="alert mt-3" :class="{'nodisplay' : !alert, 'alert--error': !alertType ,'alert--success': alertType  }" style="font-size: 20px;"> <p>{{ alertmsg }}</p> </div>
            <div class="row align-items-center justify-content-between login">
                <div class="col-md-6 mt-0 pt-0 mt-md-5 pt-md-5 pt-lg-5 mt-lg-5 pt-xl-0 mt-xl-0">
                    <img src="@/assets/Time management orange.png" class="img-fluid w-100" alt="">
                </div>
                <div class="col-md-6 mt-0 pt-0 mt-md-5 pt-md-5 pt-lg-5 mt-lg-5 pt-xl-0 mt-xl-0 p-lg-5 text-center">
                    <div class="p-3 pb-4">
                        <h1 style="color:#653939; font-weight: 700; font-size: 40px;">Sign In!</h1>
                    </div>
                    <form  v-on:submit.prevent="onSubmit">
                        <div class="input-group mb-4" style="border:#653939; border-width:1px; border-style:solid; border-radius: 6px;">
                            <span class="input-group-text" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/usericon.png" alt=""></span>
                            <input type="email" class="form-control p-2" placeholder="Email"   required v-model="email">
                          </div>
                        <div class="usernameError text-start" style="margin-top: -15px;display: none; color: red;"> UserName is incorrect</div>
                        <div class="input-group mb-3" style="border:#653939; border-width:1px; border-style:solid; border-radius: 6px;" >
                            <span class="input-group-text" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/passwordicon.png" alt=""></span>
                            <input :type="pwdtype" class="form-control p-2 password" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" id="password" v-model="password" required>
                            <span class="input-group-text eyeslash" :class="{nodisplay: !close}" @click="passwordChange" id="basic-addon1" style="background-color: #FFFFFF;cursor: pointer;"><img src="@/assets/hide.png" alt=""></span>
                            <span class="input-group-text eyeopen" :class="{nodisplay: close}" id="basic-addon1" @click="passwordChange" style="background-color: #FFFFFF;cursor: pointer;"><img src="@/assets/view.png" alt=""></span>
                        </div>
                        <div class="passwordError text-start" style="margin-top: -15px; color: red;display: none;">Password is incorrect</div>
                        <!-- <div class="mb-2 text-end">
                            <a href="#" class="forgot"><p>Forgot Password?</p></a>
                        </div> -->
                        <div class="d-grid gap-2 mb-5">
                            <button class="btn" style="background: #ED7014; color:#FFFFFF;font-weight: 700;" type="submit" id="liveToastBtn">Sign In</button>
                        </div>
                    </form>
                    <div style="color: #654e4e;font-weight: 700;font-size: 18px;">
                        <h5>Don't have an account ? <span style="text-decoration: underline; font-size: 25px; font-weight: 600;"> <router-link to="/signup" class="nav-link">SignUp</router-link> </span> </h5>
                    </div>
                </div>
            </div>
        </div>
    </section>


</template>

<script>

export default{
        data(){
            return{
                email: null,
                password: null,
                close: true,
                pwdtype: "password",
                alert:false,
                alertstyle: "d-none",
                alertmsg:"",
                alertType: false
            }
        },
        methods :{
            passwordChange(){
                this.close = !this.close
                if(this.close == true){
                    this.pwdtype = "password"
                }
                else{
                    this.pwdtype = "text"
                }
            },
            onSubmit(){
                const formData = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch("login", {
                    email: formData.email,
                    password: formData.password
                }).then(() => {
                    this.alert = true;
                    if(this.$store.state.error){
                        this.alertmsg = this.$store.state.error
                        window.setTimeout(() => {
                            this.alert = false
                            this.$store.state.error = null
                            this.alertmsg=""
                        },2000)
                    }
                })
                .catch(err => console.log(err));
                
            }
        }
    }
    


</script>

<style>
    .nodisplay{
        display: none;
    }
    .alert {
        position: fixed;
        top: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        z-index: 9999;
        color: #fff;
        font-size: 1.8rem;
        font-weight: 400;
        text-align: center;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 1.6rem 5rem;
        -webkit-box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.25);
        box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.25);
        }
        .alert--success {
        background-color: #20bf6b;
        }
        .alert--error {
        background-color: #eb4d4b;
        }

</style>