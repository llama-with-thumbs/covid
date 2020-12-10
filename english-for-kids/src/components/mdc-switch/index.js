import {MDCSwitch} from '@material/switch';
import create from '../../utils/create.js';

export default function addSwitch() {

    const mdcSwitch = create('DIV', 'mdc-switch', null, document.body.querySelector('.mdc-top-app-bar__section--align-end'));
    const mdcSwitchTrack = create('DIV', 'mdc-switch__track', null, mdcSwitch);
    const mdcSwitchThumbUnderlay = create('DIV', 'mdc-switch__thumb-underlay', null, mdcSwitch);
    const mdcSwitchThumb = create('DIV', 'mdc-switch__thumb', null, mdcSwitchThumbUnderlay);
    const mdcSwitchNativeControl = create('INPUT', 'mdc-switch__native-control', null, mdcSwitchThumbUnderlay, ['type', 'checkbox'], ['id', 'basic-switch'], ['role', 'switch'], ['aria-checked', 'false']);
    // const label = create('LABEL', null, 'off/on', mdcSwitch, ['for', 'basic-switch'])

    setTimeout(function() {
        const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'));
        const switchElement = document.body.querySelector('.mdc-switch');
        switchElement.addEventListener('change', function(){
            const categories = document.querySelectorAll(".category");
            categories.forEach( category => {category.classList.toggle('game-active')});
        });
    }, 0);
    
}



