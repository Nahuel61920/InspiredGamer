let searchBtn = document.querySelector("#search-btn");
let searchForm = document.querySelector(".sitio-header .busqueda-form");

searchBtn.onclick = () =>{
    searchBtn.classList.toggle("fa-times");
    searchForm.classList.toggle('active');
    menuBtn.classList.remove("fa-times");
    navbar.classList.remove('active');
}

let menuBtn = document.querySelector("#menu-btn");
let navbar = document.querySelector(".sitio-header .navbar");

menuBtn.onclick = () =>{
    menuBtn.classList.toggle("fa-times");
    navbar.classList.toggle('active');
    searchBtn.classList.remove("fa-times");
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchBtn.classList.remove("fa-times");
    searchForm.classList.remove('active');
    menuBtn.classList.remove("fa-times");
    navbar.classList.remove('active');
}

ScrollReveal().reveal('.headline');


var swiper = new Swiper(".destacados-slider", {
    spaceBetween: 10,
    loop:true,
    centeredSlides: true,
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
        slidesPerView: 1,
        },
        768: {
        slidesPerView: 2,
        },
        1024: {
        slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".new-slider", {
    spaceBetween: 10,
    loop:true,
    centeredSlides: true,
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
        slidesPerView: 1,
        },
        450: {
        slidesPerView: 2,
        },
        892: {
        slidesPerView: 3,
        },
        1024: {
        slidesPerView: 4,
        },
    },
});