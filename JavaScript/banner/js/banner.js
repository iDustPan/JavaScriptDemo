/**
 * Created by borderxlab on 2017/9/21.
 */
"use strict";

window.onload = () => {
    configureBanner()
}

function configureBanner() {
    var container = document.querySelector('.slides');
    var banner = document.querySelector('.mySlides');
    var slides = document.querySelectorAll('.page-control li')

    var bannerWidth = container.offsetWidth;

    function addTransition() {
        banner.style.transition = 'all 0.25s';
    }

    function removeTransition() {
        banner.style.transition = `none`;
    }

    function setTranslateX(offset) {
        if (isNaN(offset)) {
            offset = bannerWidth;
        }
        banner.style.transform = `translateX(${offset}px)`
    }

    var index = 1;
    setInterval(()=>{
        index++;
        addTransition();
        setTranslateX(-index * bannerWidth);
    }, 2000);

    function changePoint(index) {
        console.log(slides);
        console.log(slides[index-1].classList);
        for(var i = 0; i < slides.length; i++) {
            slides[i].classList.remove('current');
        }
        slides[index-1].classList.add("current");
    }

    banner.addEventListener("transitionend", (e)=>{
        if (index >= 4){
            index = 1;
            removeTransition();
            setTranslateX(-index*bannerWidth);
        }else if(index <= 0 ){
            index = 1;
        }
        changePoint(index);
    });
}


