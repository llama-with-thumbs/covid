import {MDCRipple} from '@material/ripple';

export default function addCard() {
    const selector = '.mdc-card__primary-action';
    const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
    return new MDCRipple(el);
    });
    
    console.log('addCard');
}