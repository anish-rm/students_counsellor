<template>
    <div>
        <form @submit="sendData">
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Enter Name</label>
                <input type="text" name="" id="first-name" class="form-control">
                
            </div>
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Enter Rank</label>
                <input type="text" name="" id="first-name" class="form-control">
                
            </div>
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Select Department</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Computer Science</option>
                    <option value="1">Electrical And Communications And Engineering</option>
                    <option value="2">Information Technolgy</option>
                    <option value="3">Mechanical</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="first-name" class="col-form-label">Select Category</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>BC</option>
                    <option value="1">MBC</option>
                    <option value="2">SE/ST</option>
                    <option value="3">OC</option>
                </select>
            </div>
        </form>
    </div>
</template>

<script>
    export default{
        methods: {
            sendData(){
                 this.$emit('name', "Raja Tamil");
            }
        }
    }
</script>