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
    var timer = setInterval(()=>{
        index++;
        addTransition();
        setTranslateX(-index * bannerWidth);
    }, 2000);

    function changePoint(index) {
        for(var i = 0; i < slides.length; i++) {
            slides[i].classList.remove('current');
        }
        slides[index-1].classList.add("current");
    }

    banner.addEventListener("transitionend", (e)=>{
        if (index >= 4){
            index = 1;
        }else if(index <= 0 ){
            index = 3;
        }
            removeTransition();
            setTranslateX(-index*bannerWidth);
        changePoint(index);
    });

    var startX = 0;
    var slideOffset = 0;
    var isMoving = false;
    banner.addEventListener('touchstart', (e)=>{
        startX = e.touches[0].clientX;
        slideOffset = 0;
        isMoving = false;
        removeTransition();
        clearInterval(timer);
    })

    banner.addEventListener('touchmove', (e)=>{
        isMoving = true;
        slideOffset = e.touches[0].clientX - startX;
        setTranslateX(-index*bannerWidth + slideOffset);
    })

    banner.addEventListener('touchend', (e)=>{
        if (isMoving) {
            if (Math.abs(slideOffset) >= bannerWidth / 3) {
                if (slideOffset > 0){
                    index--;
                }else{
                    index++;
                }
            }
                console.log(index, slideOffset, bannerWidth);

            addTransition();
            setTranslateX(-index*bannerWidth);
            clearInterval(timer);
            timer = setInterval(()=>{
                index++;
                addTransition();
                setTranslateX(-index * bannerWidth);
            }, 2000);
            isMoving = false;
        }
    });

}




