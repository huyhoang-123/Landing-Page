
const elements = {
   slider: document.querySelector('.hero-section__slider'),
   sliderImg: document.getElementsByClassName("hero-section__slider--img"),
   dotButton: document.getElementsByClassName("navigate-dot__button")
};

let count = 0;
let autoSlide;

const changeSlide = (newIndex) => {
   elements.sliderImg[count].classList.remove('slide-show');
   count = newIndex;
   showSlider();
};

const slideNext = () => {
   let newIndex = count +1;
   if(newIndex >= elements.sliderImg.length){
       newIndex = 0;
   }
   changeSlide(newIndex);
};

const nextSlider = () => {
   clearInterval(autoSlide);
   slideNext();
};

const prevSlider = () => {
   clearInterval(autoSlide);
   let newIndex = count -1;
   if(newIndex < 0){
       newIndex = elements.sliderImg.length - 1;
   }
   changeSlide(newIndex);
};

const goToSlide = (index) => {
   clearInterval(autoSlide);
   changeSlide(index);
};

const updateDots = () => {
   for(let i = 0; i < elements.dotButton.length; i++){
       elements.dotButton[i].src = "/assets/images/circle-regular-full.svg";
   }
   elements.dotButton[count].src = "/assets/images/circle-solid-full.svg";
}

const showSlider = () => {
   updateDots();
   elements.sliderImg[count].classList.add('slide-show');
}

const navigate = (url) => {
   window.location.href = url;
};

document.addEventListener('DOMContentLoaded', () => {
   showSlider();
   autoSlide = setInterval(slideNext, 5000);
   
   for(let i = 0; i < elements.dotButton.length; i++){
       elements.dotButton[i].addEventListener('click', () => goToSlide(i));
   }
});

