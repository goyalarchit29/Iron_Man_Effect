/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

var colors = ['#FE2F03' ,  '#F8B5A7' , '#F59943' , '#FD1805' , '#F5D4D2'];

// Event Listeners
addEventListener('mousemove', function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

// Utility Functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Particle(x, y, radius, color) {
	var _this = this;

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.radians = Math.random() * Math.PI * 2 ;
	this.velocity = 0.05 ;
	this.distanceFromCenter = randomIntFromRange(50 , 120) ;

	this.lastMouse = {x: x , y: y} ;

	this.update = function () {
		
		const lastPoint = { x: this.x , y: this.y} ;

		// MOVE 
		this.radians += this.velocity ;

		//DRAG EFFECT 
		this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05 ;
		this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05 ;

		//CIRCULAR MOTION 	
		this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter ;
		this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter ;

		this.draw(lastPoint);
	};

	this.draw = lastPoint => {
		c.beginPath();
		c.strokeStyle = this.color ;
		c.moveTo(lastPoint.x , lastPoint.y) ;
		c.lineTo(this.x , this.y) ;
		c.stroke() ;
		c.closePath();
	};
}

// Implementation
var particles ;
function init() {
	particles = [];

	for (var i = 0; i < 80 ; i++) {
		const radius = (Math.random() * 2) + 1 ; 
		 particles.push(new Particle(canvas.width/2 , canvas.height/2 , radius , randomColor(colors)));
	}

	console.log(particles) ;
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(255 , 255 ,255 , 0.05)' ; 
	c.fillRect(0, 0, canvas.width, canvas.height);

	
	 particles.forEach(particle => {
	 	particle.update();
	 });
}

init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map