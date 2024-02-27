"use strict";

const loadBtn = document.querySelector(".header-load-button");
const moreBtn = document.querySelector(".main-more-button");
const randomPhoto = document.getElementById("photo");
const loader = document.getElementById("loader");
const url = "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=60";
let offset = 60;

moreBtn.style.display = "none";

const showLoader = () => {
	loader.textContent = "";
	loader.style.display = "block";
	animateText("Loading...", 100);
};

const hideLoader = () => {
	loader.style.display = "none";
};

const animateText = (text, speed) => {
	let index = 0;
	const animation = setInterval(() => {
		if (index === text.length) {
			clearInterval(animation);
			setTimeout(() => {
				hideLoader();
			}, 500);
		} else {
			loader.textContent += text[index++];
		}
	}, speed);
};

const fetchData = async () => {
	showLoader();
	try {
		let data = await fetch(url);
		let response = await data.json();
		if (response) {
			loadPhoto(response);
			moreBtn.style.display = "block";
		}
	} catch (error) {
		console.error(error.message, "Что-то пошло не так!");
	} finally {
		hideLoader();
	}
};

const loadMorePhotos = async () => {
	showLoader();
	try {
		let data = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=60`);
		let response = await data.json();
		if (response) {
			offset += 30;
			loadPhoto(response);
		}
	} catch (error) {
		console.error(error.message, "Что-то пошло не так!");
	} finally {
		hideLoader();
	}
};

const loadPhoto = (arr) => {
	if (arr) {
		arr.forEach((elem) => {
			let img = document.createElement("img");
			img.src = elem.url;
			img.classList.add("photo");
			randomPhoto.appendChild(img);
		});
	}
};

loadBtn.addEventListener("click", fetchData);
moreBtn.addEventListener("click", loadMorePhotos);
