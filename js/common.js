
const click = document.getElementsByClassName('slider_container');
const slide = document.getElementsByClassName('slide');

const count = slide.length; // количество слайдов
const interval = 3000; // интервал анимации (3000 = 3 сек)
let item = 0; // начальный слайд



const run = () => {
    slide[item] && slide[item].classList.remove('on');
    item++;
    if(item > count-1) item = 0;
    slide[item] && slide[item].classList.add('on');
}


let timer = setInterval(run, interval);

// run();


const next = (e) => {
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
}


click[0].addEventListener('mousedown', intervalClear);
click[0].addEventListener('mouseup', next);






let screen_shot = document.querySelectorAll('[class^="screenshot-"]>img');
console.log(screen_shot);

for(let scr_shot of screen_shot) {
	scr_shot.addEventListener('click', function(e){
		console.log(e.target);
		const popup_shadow = document.createElement('div');
		popup_shadow.className = 'popup_shadow';
		document.body.appendChild(popup_shadow);
		
		const img_container = document.createElement('div');
		img_container.className = 'img_container';
		popup_shadow.appendChild(img_container);
		
		
		//e.target.classList.add('zoom');
		
		console.log(e.path[0].src);
		
		const photo = new Image();
		photo.src = e.path[0].src;
		photo.className = 'zero';
		
		img_container.appendChild(photo);
		
		let t = setTimeout(function() {
			//photo.classList.contains('zero') &&	photo.classList.remove('zero');
			photo.classList.add('zoom');
			popup_shadow.classList.add('dark');
		}, 10);
		
	}, false)
}




// Скролл к якорю
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


let temp_headerHeight = headerHeight;


// Размеры шапки
document.onscroll = () => {	
	onscroll();
}


function onscroll() {
	const s = document.documentElement.scrollTop || document.body.scrollTop;
	
	let y;
	y = headerHeight - logo_mnu_height;
	
	console.log(s, y, logo_mnu_height, headerHeight, temp_headerHeight);

	
	
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
		
	});

