<template>
    <div>
    <section class="p-5">
        <div class="container">
            <!-- To use the grid we have to use row. It will surround our column -->
            <!-- For gap put g-num -->
            <h2 class="text-center mb-4">Why Choose Us?</h2>
            <div class="row text-center g-1">
                <!-- if we dont want 3 columns on small screen add breakpoint  -->
                <div class="col-md mb-3 mb-lg-0">
                    <!-- card,card-body -> its all just card properties -->
                    <div class="card bg-dark text-light">
                        <div class="card-body text-center">
                            <!-- Now bootstrap is providing its own icons -->
                            <!-- instead of h1,h2,h3 we can add class in bootstrap-->
                            <div class="h1 mb-3">
                                <i class="bi bi-shield-fill-check"></i>
                            </div>
                            <h3 class="card-title mb-3">
                                Privacy
                            </h3>
                            <p class="card-text mb-4">
                                We respect user's privacy.
No personal details were collected during the prediction process
                            </p>
                            
                        </div>
                    </div>
                </div>
                <div class="col-md mb-3 mb-lg-0">
                    <div class="card bg-secondary text-light">
                        <div class="card-body text-center">
                            <!-- Now bootstrap is providing its own icons -->
                            <!-- instead of h1,h2,h3 we can add class in bootstrap-->
                            <div class="h1 mb-3">
                                <i class="bi bi-bullseye"></i>
                            </div>
                            <h3 class="card-title mb-3">
                                Accuracy
                            </h3>
                            <p class="card-text">
                                We are not providing exactly what the user will get that course rather we provide a range where his possibility of getting those courses are high
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md mb-3 mb-lg-0">
                    <div class="card bg-dark text-light">
                        <div class="card-body text-center">
                            <!-- Now bootstrap is providing its own icons -->
                            <!-- instead of h1,h2,h3 we can add class in bootstrap-->
                            <div class="h1 mb-3">
                                <i class="bi bi-clipboard-data"></i>
                            </div>
                            <h3 class="card-title mb-3">
                                Significant Data
                            </h3>
                            <p class="card-text mb-4">
                                We provide only necessary and valid details of the colleges rather than misguiding with false data
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</div>
</template>