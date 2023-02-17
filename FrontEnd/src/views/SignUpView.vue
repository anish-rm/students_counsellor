<template>
    <section class="p-4">
        <div class="container">
            <div class="row align-items-center justify-content-between login">
                <div class="col-md-6 mt-0 pt-0 mt-md-5 pt-md-5 pt-lg-5 mt-lg-5 pt-xl-0 mt-xl-0">
                    <img src="@/assets/signscb1.jpeg" class="img-fluid w-100" alt="">
                </div>
                <div class="col-md-6 mt-0 pt-0 mt-md-5 pt-md-5 pt-lg-5 mt-lg-5 pt-xl-0 mt-xl-0 p-lg-5 text-center">
                    <div class="p-3 pb-4">
                        <h1 style="font-weight: 700; font-size: 40px;">Welcome</h1>
                    </div>
                    <form  v-on:submit.prevent="onSubmit">
                        <div class="input-group mb-4" style="border:#653939; border-width:1px; border-style:solid; border-radius: 6px;">
                            <span class="input-group-text" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/usericon.png" alt=""></span>
                            <input type="text" class="form-control p-2" placeholder="Name"   required v-model="name">
                          </div>
                        <div class="input-group mb-4" style="border:#653939; border-width:1px; border-style:solid; border-radius: 6px;">
                            <span class="input-group-text" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/usericon.png" alt=""></span>
                            <input type="email" class="form-control p-2" placeholder="Email"   required v-model="email">
                          </div>
                        <!-- <div class="usernameError text-start" style="margin-top: -15px;display: none; color: red;"> UserName is incorrect</div> -->
                        <div class="input-group mb-3" style="border:#653939; border-width:1px; border-style:solid; border-radius: 6px;" >
                            <span class="input-group-text" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/passwordicon.png" alt=""></span>
                            <input :type="pwdtype" class="form-control p-2 password" placeholder="Password" aria-label="password" aria-describedby="basic-addon1"  id="password" v-model="password" required>
                            <span class="input-group-text eyeslash" :class="{nodisplay: !close}" @click="passwordChange" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/hide.png" alt=""></span>
                            <span class="input-group-text eyeopen" :class="{nodisplay: close}" id="basic-addon1" @click="passwordChange" style="background-color: #FFFFFF;"><img src="@/assets/view.png" alt=""></span>
                        </div>
                        <div class="input-group mb-3" style="border:#653939; border-width:1px; border-style:solid; border-radius: 6px;" >
                            <span class="input-group-text" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/passwordicon.png" alt=""></span>
                            <input :type="confirmpwdtype" class="form-control p-2 password" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1"  id="confirmpassword" v-model="passwordConfirm" required>
                            <span class="input-group-text eyeslash" :class="{nodisplay: !confirmClose}" @click="confirmPasswordChange" id="basic-addon1" style="background-color: #FFFFFF;"><img src="@/assets/hide.png" alt=""></span>
                            <span class="input-group-text eyeopen" :class="{nodisplay: confirmClose}" id="basic-addon1" @click="confirmPasswordChange" style="background-color: #FFFFFF;"><img src="@/assets/view.png" alt=""></span>
                        </div>
                        
                        <div class="d-grid gap-2 mb-2">
                            <button class="btn btn-primary" style=" color:#FFFFFF;font-weight: 700;" type="submit" id="liveToastBtn">{{ btntxt }}</button>
                        </div>
                    </form>
                    <div style="font-weight: 700;font-size: 18px;">
                        <h5 class="lead">Already have an account ? <span style="text-decoration: underline; font-size: 25px; font-weight: 600;"> <router-link to="/login" class="nav-link">Login</router-link> </span> </h5>
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
                name: null,
                email: null,
                password: null,
                close: true,
                confirmClose: true,
                passwordConfirm: null,
                pwdtype: "password",
                confirmpwdtype: "password",
                btntxt: "Sign Up"
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
            confirmPasswordChange(){
                this.confirmClose = !this.confirmClose
                if(this.confirmClose == true){
                    this.confirmpwdtype = "password"
                }
                else{
                    this.confirmpwdtype = "text"
                }
            },
            onSubmit() {
            const formData = {
                name: this.name,
                email: this.email,
                password: this.password,
                passwordConfirm: this.passwordConfirm
            };
            this.btntxt = "Signing Up..."
            this.$store.dispatch("signup", formData).then(() => {
                    this.btntext = "Sign Up"
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

</style>