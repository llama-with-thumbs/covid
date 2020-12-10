import addSwitch from './components/mdc-switch/index.js';
import addDrawer from './components/mdc-drawer/index.js';
import addTopAppBar from './components/mdc-top-app-bar/index.js';
import addButton from './components/mdc-button/index.js';
import newCategory from './components/category/index.js';
import images from './utils/category-images.js';
import newWordCard from './components/word-card/index.js';
import allWords from './utils/words-and-translations.js';
import getSound from './utils/audio.js';
import _ from 'lodash';

export default function start() {
    const categoriesNamesList = ['actionA','actionB','actionC','animalA','animalB','adjectives','emotions','clothes'];
    const categoriesImg = images();//{}
    const gameBord = {};
    gameBord.categories = [];
    gameBord.categoriesImages = {};
    const main = document.getElementById('game-bord');

    setTimeout(function(){ getSound().play(); }, 1000);

    main.innerHTML = '';
    gameBord.openCategory = function(categoryName) {    
        main.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const img = gameBord.categoriesImages[categoryName][i];
            const ru = allWords().ru[categoryName][i];
            const en = allWords().en[categoryName][i];
            console.log('category name: ', categoryName, ru, en);
            main.appendChild(newWordCard(img, en, ru, en).domElement);
        }
    }

    for (let i = 0; i < categoriesNamesList.length; i++) {
        gameBord.categoriesImages[categoriesNamesList[i]] = categoriesImg.innerImg[categoriesNamesList[i]];
    }

    // addSwitch();
    // addButton();
    // addDrawer();
    addTopAppBar();
    
    //create main page
    for (let i = 0; i < categoriesImg.catName.length; i++){
        gameBord.categories.push(newCategory(categoriesImg.catName[i], categoriesImg.catImg[i], categoriesNamesList[i]));
    }
    _.shuffle(gameBord.categories).forEach( cat => {main.appendChild(cat.domElement);});

    //open category
    main.addEventListener('click', e => { 
        if(e.target.classList.contains('category')) {
            gameBord.openCategory(e.target.dataset.name);
            // 
        };
    }
);

}


