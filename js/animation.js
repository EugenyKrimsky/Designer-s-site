/*
	preloader delay in line 27 should be less than animation delay in line 65!
*/
'use strict';
//_____________preloader_________________________________
let 
	page_body = document.body.style,
	images = document.images, //take all page images to check when they are loaded
	images_total_count = images.length, 
	images_loaded_count = 0,
	perc_display = document.getElementById('load-perc').style,
	calc_perc = 0;
for (let i = 0; i < images_total_count; i++) {
	const image_clone = new Image();
	image_clone.onload = image_loaded;
	image_clone.onerror = image_loaded;
	image_clone.src = images[i].src;
}
function image_loaded() {
	images_loaded_count++;
	calc_perc = (((100 / images_total_count) * images_loaded_count) << 0);
	perc_display.width = calc_perc + "%";
	if (images_loaded_count >= images_total_count) {
		setTimeout(() => {
			let preloader = document.getElementById('page-preloader');
			//if you want the preloader not to hide (for development), remove the "!" in condition
			if (!preloader.classList.contains('done')) {
				preloader.classList.add('done');
				window.scrollTo(0, 0);
				page_body.overflow = 'visible';
			}
		}, 1000);//preloader delay (preloader will skip after 1000 ms)
	}
}
//_____________animations_________________________________
let animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
}
function animOnScroll() {
	for (let i = 0; i < animItems.length; i++) {
		const animItem = animItems[i];
		const animItemHeight = animItem.offsetHeight;
		const animItemOffset = offset(animItem).top;
		const animStart = 4;

		let animItemPoint = window.innerHeight - animItemHeight / animStart;
		if (animItemHeight > window.innerHeight) {
			animItemPoint = window.innerHeight - window.innerHeight / animStart;
		}
		if ((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemHeight)) {
			animItem.classList.add('_active');
		}else{
//if you want the animation not to repeat, add the class "_anim-no-repeat" to the HTML element
			if (!animItem.classList.contains('_anim-no-repeat')) {
				animItem.classList.remove('_active');
			}
		}
	}	
}
function offset(element) {
	const rect = element.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}
setTimeout(() => {	
	animOnScroll();	
}, 1400); //animation delay (preloader start after 1000 ms)
