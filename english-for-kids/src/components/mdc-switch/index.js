import {MDCSwitch} from '@material/switch';
import create from '../../utils/create.js';

export default function addSwitch() {

    const mdcSwitch = create('DIV', 'mdc-switch', null, document.body);
    const mdcSwitchTrack = create('DIV', 'mdc-switch__track', null, mdcSwitch);
    const mdcSwitchThumbUnderlay = create('DIV', 'mdc-switch__thumb-underlay', null, mdcSwitch);
    const mdcSwitchThumb = create('DIV', 'mdc-switch__thumb', null, mdcSwitchThumbUnderlay);
    const mdcSwitchNativeControl = create('INPUT', 'mdc-switch__native-control', null, mdcSwitchThumbUnderlay, ['type', 'checkbox'], ['id', 'basic-switch'], ['role', 'switch'], ['aria-checked', 'false']);
    // const label = create('LABEL', null, 'off/on', mdcSwitch, ['for', 'basic-switch'])

    setTimeout(function() {
        console.log('addSwitch');
        const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'));
    }, 0);
    
}



