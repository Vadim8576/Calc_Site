
const click = document.getElementsByClassName('slider_container');
const slide = document.getElementsByClassName('slide');

const count = slide.length; // количество слайдов
const interval = 3000; // интервал анимации (3000 = 3 сек)
let item = 0; // начальный слайд


// ----------------------  Слайдер в шапке

const run = () => {
    slide[item] && slide[item].classList.remove('on');
    item++;
    if(item > count-1) item = 0;
    slide[item] && slide[item].classList.add('on');
}


let timer = setInterval(run, interval);

// run();


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

const intervalClear = () => {
    clearInterval(timer);
    timer = null;
}


click[0].addEventListener('mousedown', intervalClear);
click[0].addEventListener('mouseup', nextSlide);




// --------------------------------------- Слайдер скриншотов 

const screenshots = document.querySelectorAll('[class^="screenshot-"]>img');			
const popup_shadow = document.getElementById('popup_shadow');	
const img_container = document.getElementById('img_container');

for(let scr_shot of screenshots) {
	//scr_shot.addEventListener('load', function() {
		console.log('Preview фото загрузились');
	
		scr_shot.addEventListener('click', function(e){
			const photo = new Image();
			
			
			const lastIndx = e.target.src.lastIndexOf('/');
			let url = e.target.src.slice(lastIndx).slice(1);
			url = 'img/ScreenShots/zoom/zoom_' + url;
			
			//console.log(e.target);
			
			photo.src = url;
			
			photo.className = 'zero';
		
			popup_shadow.classList.add('dark');
			
		
			const close_btn = document.createElement('div');
			close_btn.className = 'close_btn';
			
			const close_btn_hor = document.createElement('div');
			close_btn_hor.className = 'close_btn_hor';
			
			const close_btn_vert = document.createElement('div');
			close_btn_vert.className = 'close_btn_vert';
			
			close_btn.appendChild(close_btn_hor);
			close_btn.appendChild(close_btn_vert);
			
		
			
			//console.log('Увеличенное фото загрузилось');
			img_container.appendChild(photo);
			img_container.appendChild(close_btn);
			
			let t = setTimeout(function() {
				photo.classList.add('zoom');		
			}, 10);
			
			
			
			let height = window.innerHeight;
			let h = getComputedStyle(this).height.replace('px', '');
			let yy = this.offsetTop - height / 2 + h / 2;
			scrollTo({
				top: yy,
				behavior: 'smooth'
			});
		
		}, false)
		
	//}, false);
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
			img_container.innerHTML = '';
		}
		
		
		
		
	});

