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
    gameBord.allSounds = getSound();
    gameBord.gameOn = false;
    gameBord.openHomePage = function() {
        //open home page
        main.innerHTML = '';
        gameBord.categories = [];
        for (let i = 0; i < categoriesImg.catName.length; i++){
            gameBord.categories.push(newCategory(categoriesImg.catName[i], categoriesImg.catImg[i], categoriesNamesList[i]));
        }
        _.shuffle(gameBord.categories).forEach( card => {
            main.appendChild(card.domElement);
        });
    }
    const main = document.getElementById('game-bord');

    main.innerHTML = '';
    gameBord.pronounce = function(word){
        if (gameBord.allSounds.hasOwnProperty(word)) {
            gameBord.allSounds[word].play();
        } else {
            gameBord.allSounds.error.play();
        }
        
    }
    gameBord.openCategory = function(categoryName) {    
        main.innerHTML = '';
        const currWordCards = [];
        for (let i = 0; i < 8; i++) {
            const img = gameBord.categoriesImages[categoryName][i];
            const ru = allWords().ru[categoryName][i];
            const en = allWords().en[categoryName][i];
            // console.log('category name: ', categoryName, ru, en);
            currWordCards.push(newWordCard(img, en, ru, en));
        }
        //flip the word card
        _.shuffle(currWordCards).forEach( card => {
            main.appendChild(card.domElement);
            card.domElement.addEventListener('click', e => {
                if(e.target.classList.contains('card-flip')) {
                    card.domElement.classList.add('flipped');
                }
                if(e.target.classList.contains('wordCard') && !e.target.classList.contains('flipped')) {
                    gameBord.pronounce(e.target.dataset.english);
                }
            });
            card.domElement.addEventListener('mouseleave', e => {
                card.domElement.classList.toggle('flipped', false);
            })
        
        });

    }

    for (let i = 0; i < categoriesNamesList.length; i++) {
        gameBord.categoriesImages[categoriesNamesList[i]] = categoriesImg.innerImg[categoriesNamesList[i]];
    }

    addSwitch();
    addButton();
    addDrawer();
    addTopAppBar();
    gameBord.openHomePage();
    

    //Event listener for opening a category
    main.addEventListener('click', e => { 
        //open category
        if(e.target.classList.contains('category')) {
            gameBord.openCategory(e.target.dataset.name);
        };

    });

    //Event listener for switcher 
    setTimeout(function() {
        const switchElement = document.body.querySelector('.mdc-switch');
        switchElement.addEventListener('change', function(){
            document.getElementById('game-bord').classList.toggle('game-active');
            // console.log(document.getElementById('game-bord'));
        });
    }, 0);

    //side menu links
    document.body.querySelector('.mdc-list').addEventListener('click', e => {
        if(e.target.classList.contains('mdc-list-item')) {
            if (e.target.dataset.category === 'categories') {
                gameBord.openHomePage();
                return;
            }
            gameBord.openCategory(e.target.dataset.category);
        }

    })
    
}


