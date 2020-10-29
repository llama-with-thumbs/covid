// DOM Elements
const time = document.querySelector('.time')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const focus = document.querySelector('.focus');

const timeOfImage = document.querySelector('.time-of-image')
const imageNumber = document.querySelector('.image-number')
const startNum = Math.floor(Math.random() * 5) + 1

const nextButton = document.querySelector('.next-image')

const nextQuote = document.querySelector('.next-quote')
const blockquote = document.querySelector('.blockquote')

let imageQueue = []
let imageDir = './assets/images/'
let allDayNames = ['night', 'morning', 'day', 'evening' ]

const city = document.querySelector('.city')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const weatherIcon = document.querySelector('.weather-icon')

function createImageQueue() {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 6; j++) {
      imageQueue.push('url("' + imageDir +  allDayNames[i] + '/' + j + '.jpg")')
    }
  }
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds()

  let dateAndMonth = today.toGMTString().match(/^[a-z]+, \d{1,2} [a-z]+/gi);
  hour = hour % 12 || 12;

  if (sec === 0 && min === 0) {
    setBackImg()
    nextImage()
  }
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${dateAndMonth}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//
function nextImage() {
  let curImg = document.body.style.backgroundImage;
  let nextIndex = imageQueue.indexOf(curImg) + 1
  nextIndex = nextIndex > 23 ? 0 : nextIndex
  document.body.style.backgroundImage = imageQueue[nextIndex]

  nextButton.disabled = true;
  setTimeout(function() { nextButton.disabled = false }, 1000);
  updateNote()
}

function getTimeName(param) {
  let today = new Date()
  let hour = today.getHours()
  if (hour >= 6 && hour < 12) {
    return param ? 6 : 'morning'
  } else if (hour >= 12 && hour < 18) {
    return param ? 12 : 'day'
  } else if (hour >= 18 && hour < 24) {
    return param ? 18 : 'evening'
  } else if (hour < 6) {
    return param ? 0 : 'night'  
  }
}

//set Greeting
function setGreet() {
  greeting.textContent = 'Good ' + getTimeName() + ', '
  setTimeout(setGreet, 1000);
}

// Set Background and Greeting
function setBackImg() {
  setTimeout(function() { nextButton.disabled = false }, 1000)
  document.body.style.backgroundImage = imageQueue[getTimeName('num') + startNum]
  updateNote()
}

function inputBlur(e) {
  const targetClass = e.target.classList[0]
  if (e.target.value === '') {
    e.target.value = localStorage.getItem(targetClass)
  } else {
    localStorage.setItem(targetClass, e.target.value)
  }
  if (e.target.classList[0] === 'city') setWeather()
}

function clearInput(e) {
  setTimeout(() => e.target.value = '', 200);
}

// Get Name
function getName() {
  if (localStorage.getItem('name') !== null && localStorage.getItem('name') !== '') {
    name.value = localStorage.getItem('name');
  }
}

// Set Name
function setInputValue(e) {
  const targetClass = e.target.classList[0]
  if (e.type === 'keypress' && (e.which == 13 || e.keyCode == 13)) {
    if (e.target.value === '') e.target.value = localStorage.getItem(targetClass)
    localStorage.setItem(targetClass, e.target.value)
    if (e.target.classList[0] === 'city') setWeather()
    e.target.blur()
  } else {
    localStorage.getItem(targetClass)
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') !== null && localStorage.getItem('focus') !== '') {
    focus.value = localStorage.getItem('focus');
  }
}
function getCity() {
  if (localStorage.getItem('city') !== null && localStorage.getItem('city') !== '') {
    city.value = localStorage.getItem('city');
  }
}

function updateNote() {
  console.log('Note was updated')
  timeOfImage.textContent = document.body.style.backgroundImage.match(/\w+/g)[3]
  imageNumber.textContent = document.body.style.backgroundImage.match(/\d{1}/)
}

//get quote 
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`
  const res = await fetch(url)
  const data = await res.json() 
  blockquote.textContent = data.quoteText
}

//get Weather

async function setWeather() {
  let location = city.value
  console.log(location)
  const key = 'd4994bba990bd9ca7e94b53e2cfcaf1d'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=` + location + `&lang=en&appid=` + key + `&units=metric`
  const res = await fetch(url)
  const data = await res.json()

  temperature.textContent = `${data.main.temp}°C`
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weather.textContent = data.weather[0].description;
}

name.addEventListener('focus', clearInput)
name.addEventListener('keypress', setInputValue);
name.addEventListener('blur', inputBlur);

focus.addEventListener('focus', clearInput)
focus.addEventListener('keypress', setInputValue);
focus.addEventListener('blur', inputBlur);
nextQuote.addEventListener('click', getQuote);


city.addEventListener('focus', clearInput)
city.addEventListener('keypress', setInputValue);
city.addEventListener('blur', inputBlur);

document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', setWeather);

nextButton.addEventListener('click', nextImage);


// Run

showTime();
setGreet();

getName();
getFocus();
getCity();

createImageQueue()
setBackImg();

// getQuote();
// setWeather();

//next img

