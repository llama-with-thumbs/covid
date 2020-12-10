import {MDCList} from "@material/list";
import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCDrawer} from "@material/drawer";


export default function addDrawer() {
  const listEl = document.querySelector('.mdc-drawer .mdc-list');
  const mainContentEl = document.querySelector('.main-content');
  const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
  const closeDrawerButton = document.getElementById("close-drawer");


    setTimeout(function() {
        console.log('addDrawer');
        const list = MDCList.attachTo(document.querySelector('.mdc-list'));
        list.wrapFocus = true;

        closeDrawerButton.addEventListener('click', (event) => {
          drawer.open = false;
        });
        
        listEl.addEventListener('click', (event) => {
          drawer.open = false;
        });
        
        const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
    });

    }, 0);
    
}
