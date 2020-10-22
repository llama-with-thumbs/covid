// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');



// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


//
function changetImage() {
  function nextFromArray(arr, partOfDay, currentImg) {
    let currNum = currentImg.slice(-7)[0]
    let addres = currentImg

    console.log(addres.match(/\.\/[a-z]+\/[a-z]+\//gi))

    if (parseInt(currNum) > arr.length - 1) {
      currNum = 1
    } else {
      currNum ++
    }
    return currentImg.replace(/\d\./g, currNum + '.')
  }
  const body = document.querySelector('.body')
  let today = new Date()
  let hour = today.getHours()
  const images = ['1.jpg', '2.jpg', '3.jpg', '5.jpg', '6.jpg']
  let timeOfDay
  if ( hour > 0 && hour < 24) {
    timeOfDay = 'morning'
  }
  document.body.style.backgroundImage = nextFromArray(images, timeOfDay, document.body.style.backgroundImage)
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date()
  let hour = today.getHours()

  if (hour > 0 && hour < 24) {
    document.body.style.backgroundImage = 
  "url('./assets/images/morning/morning-1.jpg')"
    greeting.textContent = 'Good Time, ';
  }
}




// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();

//next img
const nextButton = document.querySelector('.next-image');
nextButton.addEventListener('click', changetImage);