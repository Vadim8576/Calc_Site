
const click = document.getElementsByClassName('slider_container');
const slide = document.getElementsByClassName('slide');

const count = slide.length; // количество слайдов
const interval = 3000; // интервал анимации (3000 = 3 сек)
let item = 0; // начальный слайд



	const screenshots = document.querySelectorAll('[class^="screenshot-"]>img');			

	// console.log(screenshots);

	const screenshots_zoom = document.querySelectorAll('#img_container>img');

	// console.log(screenshots_zoom);

	const popup_shadow = document.getElementById('popup_shadow');	
	const img_container = document.getElementById('img_container');

	// const nav_btn = document.getElementsByClassName('nav_btn')[0];
	// const prev_btn = document.getElementsByClassName('prev_btn')[0];
	// const next_btn = document.getElementsByClassName('next_btn')[0];



let timer;


const run = () => {
	slide[item] && slide[item].classList.remove('on');
	item++;
	if(item > count-1) item = 0;
	slide[item] && slide[item].classList.add('on');
}



const intervalClear = () => {
	clearInterval(timer);
	timer = null;
	
}



let screenshot_number;


window.onload = function() {
	// ----------------------  Слайдер в шапке

	const nextSlide = (e) => {
		const t = e.target;

		if(t.id == 'left_btn') {
			slide[item] && slide[item].classList.remove('on');
			item -= 1;
		}

		if(t.id == 'right_btn') {
			slide[item] && slide[item].classList.remove('on');
			item += 1;
		}

		if(item < 0) item = count-1; 
		if(item > count-1) item = 0; 

		slide[item] && slide[item].classList.add('on');

		timer = setInterval(run, interval);
	}

	


	click[0].addEventListener('mousedown', intervalClear);
	click[0].addEventListener('mouseup', nextSlide);




	// --------------------------------------- Слайдер скриншотов 

		
	for(let i = 0; i<screenshots.length; i++) {
		// console.log('Preview фото загрузились');

		screenshots[i].addEventListener('click', function(e){
				
			popup_shadow.classList.add('dark');
								
			//Скролл, чтобы скриншот был посередине	
			let height = window.innerHeight;
			let h = getComputedStyle(this).height.replace('px', '');
			let yy = this.offsetTop - height / 2 + h / 2;
			scrollTo({
				top: yy,
				behavior: 'smooth'
			});
			
			screenshot_number = i;
			zoomNow(i);

		}, false)
				
	}

	

}


function zoomNow(i) {
	let www = zoomCalculate(screenshots_zoom[i]).width;
	let hhh = zoomCalculate(screenshots_zoom[i]).height;

	screenshots_zoom[i].style.width = www + 'px';
	screenshots_zoom[i].style.height = hhh + 'px';

	let t = setTimeout(function() {
		screenshots_zoom[i].classList.add('zoom');		
	}, 10);
}


function clearZoom() {
	for(let i of screenshots_zoom) {
		i.classList.contains('zoom') && i.classList.remove('zoom');
		i.style.width = '0';
		i.style.height = '0';
	}
}



function zoomCalculate(screenshots_zoom) {

	let www = screenshots_zoom.naturalWidth;
	let hhh = screenshots_zoom.naturalHeight;

	// console.log(screenshots_zoom);
	// console.log(www, hhh);

	let width = window.innerWidth;
	let height = window.innerHeight;
	let zoom_h, zoom_w;
	const k = hhh/www; // Соотношение сторон
	console.log(k);
	//Определяем ширину увеличенного скриншота
	if(height > width) {
		//портретная ариентация
		zoom_h = height * 0.85; // 0.85 - процент от высоты окна
		zoom_w = height * k;
		if(zoom_w > width - 100) {
			zoom_w = width - 100; // 60 - размер кнопки закрыть
			zoom_h = zoom_w * k;
			if(zoom_h > height * 0.85) {
				zoom_h = height * 0.85;
				zoom_w = zoom_h / k;
			}
		}

	} else {
		zoom_h = height * 0.85;
		zoom_w = zoom_h / k;
	}
	
	return {width: zoom_w, height: zoom_h};
}





// ---------------------------------------- Скролл к якорю
const logo_mnu_wrapper = document.getElementsByClassName('logo_mnu_wrapper')[0];
const mnu = document.getElementsByClassName('mnu')[0];
const mnu_btn = document.getElementById('mnu_btn');
const pad = document.getElementsByClassName('padding_top');
const header = document.getElementById('header');
const anchors = document.querySelectorAll('a[href*="#"]');
const shadow = document.getElementById('shadow');


let logo_mnu_height = +getComputedStyle(logo_mnu_wrapper).height.replace('px', '');
let headerHeight = +getComputedStyle(header).height.replace('px', '');


for(let anchor of anchors) {
	anchor.addEventListener('click', function(e){
		e.preventDefault();
		const block_y = document.getElementById(this.getAttribute('href').substr(1)).offsetTop - logo_mnu_height;
		
		scrollTo({
				top: block_y,
				behavior: 'smooth'
				
		});		
	});	
}







// Размеры шапки
document.onscroll = () => {	
	onscroll();
}


function onscroll() {
	const s = document.documentElement.scrollTop || document.body.scrollTop;
	
	let y;
	y = headerHeight - logo_mnu_height;
	
	
	//mini
	if(s > y && !logo_mnu_wrapper.classList.contains('mini')) {	
		logo_mnu_wrapper.classList.add('mini');
	}
	//maxi
	if(s <= y && logo_mnu_wrapper.classList.contains('mini')) {
		logo_mnu_wrapper.classList.remove('mini');
	}
	


}






window.onresize = () => {	
	resize();
	for(let screenshot of screenshots_zoom) {
		if(screenshot.classList.contains('zoom')) {
			let w = zoomCalculate(screenshot).width;
			let h = zoomCalculate(screenshot).height;
			screenshot.style.width = w + 'px';
			screenshot.style.height = h + 'px';
			img_container.style.width = w + 'px';
			img_container.style.height = h + 'px';
		}	
	}
	
}

resize();

function resize() {

	logo_mnu_height = +getComputedStyle(logo_mnu_wrapper).height.replace('px', '');
	headerHeight = +getComputedStyle(header).height.replace('px', '');
	temp_headerHeight = headerHeight;
	
	//console.log('logo_mnu_height = ', logo_mnu_height);
	//console.log('headerHeight = ', headerHeight);
	
	

	let width = window.innerWidth;
	let height = window.innerHeight;
	
	if(width <= 768 && !mnu.classList.contains('mini')) {
		mnuToMini();
	} else if(width > 768 && !mnu.classList.contains('active')){
		mnuToMaxi();
	}
	
	

	if(width <= 768) {
		intervalClear();
		console.log(timer);
	}
	
	if(width > 768 && !timer) {
		timer = setInterval(run, interval);
		 console.log(timer);
	}
	onscroll();

}

function mnuToMini() {
	mnu.classList.add('mini');
	mnu_btn.classList.add('mini');
	
}


function mnuToMaxi() {
	mnu.classList.contains('mini') && mnu.classList.remove('mini');
	mnu_btn.classList.contains('mini') && mnu_btn.classList.remove('mini');
}



// ---------------- Клики по меню

document.addEventListener('click', function(e){
		let width = window.innerWidth;
		let height = window.innerHeight;
		let target = e.target;
		//console.log(e.target.className);
		
		if(target.id == 'mnu_btn') {
			//logo_mnu_wrapper.classList.toggle('active');
			mnu.classList.toggle('active');
			mnu_btn.classList.toggle('active');
			shadow.classList.toggle('active');
			if(width > 768) {
				mnuToMaxi();
			}
		}
		
		if(target.className == 'links') {
			//убираем меню
			mnu.classList.contains('active') && mnu.classList.remove('active');
			mnu_btn.classList.contains('active') && mnu_btn.classList.remove('active');
			shadow.classList.contains('active') && shadow.classList.remove('active');
			if(width > 768) mnuToMaxi();
		}
		
		if(target.id == 'popup_shadow' || target.classList.contains('close_btn')) {
			popup_shadow.classList.contains('dark') && popup_shadow.classList.remove('dark');
			// img_container.innerHTML = '';
			clearZoom();
		}

		if(target.classList == 'prev_btn') {
			screenshot_number--;
			if(screenshot_number < 0) screenshot_number = screenshots_zoom.length - 1;
			clearZoom();
			zoomNow(screenshot_number);
		}
		
		if(target.classList == 'next_btn') {
			screenshot_number++;
			if(screenshot_number > screenshots_zoom.length - 1) screenshot_number = 0;
			clearZoom();
			zoomNow(screenshot_number);
		}
		
		
	});

