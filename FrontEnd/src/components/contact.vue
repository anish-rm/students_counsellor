<template>
    <div class="bg-secondary">
        <section class="contact bg-secondary" id="contact" style="margin-top:-20px">

            <h2 class="text-center">Contact Us</h2>

            <form action="" data-aos="zoom">

                <div class="inputBox" >
                    <input type="text" placeholder="Name" data-aos="fade-up"  >
                    <input type="email" placeholder="Email" data-aos="fade-up">
                </div>

                <div class="inputBox">
                    <input type="number" placeholder="Number" data-aos="fade-up">
                    <input type="text" placeholder="Subject" data-aos="fade-up">
                </div>

                <textarea name="" placeholder="Your Message" id="" cols="30" rows="10" data-aos="fade-up"></textarea>
                
                <input type="submit" value="send message" class="btn btn-dark">

            </form>

            </section>
    </div>
</template>


<style scoped>
.contact{
    padding-top: 90px;
    padding-bottom: 40px;
    width: 90%;
    margin: auto;
}
.contact form{
    max-width: 70rem;
    margin: 0 auto;
    text-align: center;
}

.contact form .inputBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.contact form textarea,
.contact form .inputBox input{
    width: 100%;
    padding:0.5rem;
    font-size: 1.6rem;
    color:var(--text-color-1);
    margin:.7rem 0;
    background: #fff;;
    border: none;
    box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.1);
    text-transform: none;
    border-radius: .5rem;
}

.contact form textarea{
    height: 20rem;
    resize: none;
}

.contact form .inputBox input{
    width: 49%;
}





</style>