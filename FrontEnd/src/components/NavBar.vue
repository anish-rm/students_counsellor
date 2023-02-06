<template>
    <div>
        <nav class="navbar navbar-expand-md bg-dark navbar-dark py-3 fixed-top">
        <div class="container">
            <a href="#" class="navbar-brand">SCB</a> 
            <button class="navbar-toggler" type="button" data-bs-toggle = "collapse" data-bs-target = "#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
                
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/getmarks" class="nav-link">GetMarks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link">Contact</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view/>
    </div>
</template>