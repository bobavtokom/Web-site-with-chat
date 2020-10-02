

const slideContainer=document.querySelector('.container');
const slide=document.querySelector('.slides');
const prevBtn=document.getElementById('prev-btn');
const nextBtn=document.getElementById('next-btn');
const interval=1000;
let slides=document.querySelectorAll('.slide');
let index=1;
let slideId;







const firstClone=slides[0].cloneNode(true);
const lastClone=slides[slides.length-1].cloneNode(true);

firstClone.id='first-clone';
lastClone.id='last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth=slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;


const Startslide=()=>{
	slideId=setInterval(function(){
		index++;
		slide.style.transform = `translateX(${-slideWidth * index}px)`;
        slide.style.transition='.7s';
	}, 2000)
};
const getSlides=()=>document.querySelectorAll('.slide');

const moveToNextSlide=()=>{
	slides=getSlides();

	if(index>=slides.length-1)return;

	
	index++;
		slide.style.transform = `translateX(${-slideWidth * index}px)`;
        slide.style.transition='.7s';
}
const moveToPreviousSlide=()=>{
	if(index<=0)return;
	  index--;
		slide.style.transform = `translateX(${-slideWidth * index}px)`;
        slide.style.transition='.7s';
}
slide.addEventListener('transitionend',()=>{
	slides=getSlides();

	if(slides[index].id===firstClone.id){
		slide.style.transition='none';
		index=1;
		slide.style.transform = `translateX(${-slideWidth * index}px)`;
	};
	if(slides[index].id===lastClone.id){
		slide.style.transition='none';
		index=slides.length-2;
		slide.style.transform = `translateX(${-slideWidth * index}px)`;
	};
});
slideContainer.addEventListener('mouseenter',()=>{
     clearInterval(slideId);
});
slideContainer.addEventListener('mouseleave',Startslide);
nextBtn.addEventListener('click',moveToNextSlide);
	    
prevBtn.addEventListener('click',moveToPreviousSlide);

Startslide();
function myFunction() {
	var x = document.getElementById("main_ul");
	var slider=document.getElementById('slider');
	var nav=document.getElementById('nav');
	
	if (x.className === "main-ul") {
	  x.className += 'responsive';
	  x.style.marginTop='50px';
	  slider.style.marginTop='100px';
	  nav.style.display='flexbox';
	} else {
		x.className = 'main-ul';
		slider.style.marginTop='20px';

	}
	
  }

  
